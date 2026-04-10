import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Skipping during build" });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const programId = parseInt(formData.get("programId") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const status = formData.get("status") as "upcoming" | "ongoing" | "past";
    const startDate = formData.get("startDate") as string;
    const startTime = formData.get("startTime") as string;
    const endDate = formData.get("endDate") as string | null;
    const endTime = formData.get("endTime") as string | null;
    const location = formData.get("location") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string || null;
    const contactPerson = formData.get("contactPerson") as string || null;
    const contactEmail = formData.get("contactEmail") as string || null;
    const videoUrl = formData.get("videoUrl") as string || null;
    const registrationStartDate = formData.get("registrationStartDate") as string || null;
    const registrationEndDate = formData.get("registrationEndDate") as string || null;
    const isDraft = formData.get("isDraft") === "true";

    const coverImageFile = formData.get("coverImage") as File | null;
    let coverImagePath = null;

    if (coverImageFile) {
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/assets/images/events");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${coverImageFile.name.replace(/\s+/g, "-")}`;
      coverImagePath = `/assets/images/events/${fileName}`;
      const fullPath = path.join(uploadDir, fileName);
      await writeFile(fullPath, buffer);
    }

    const formatToDateTime = (dateStr: string, timeStr: string | null) => {
      if (!dateStr) return null;
      const time = timeStr ? timeStr : "00:00";
      return new Date(`${dateStr}T${time}:00`);
    };

    const event = await prisma.event.create({
      data: {
        title,
        program_id: programId,
        category_id: categoryId,
        status,
        start_date: new Date(startDate),
        start_time: formatToDateTime(startDate, startTime)!,
        end_date: endDate ? new Date(endDate) : null,
        end_time: (endDate && endTime) ? formatToDateTime(endDate, endTime) : null,
        location,
        short_description: shortDescription,
        full_description: fullDescription,
        contact_person: contactPerson,
        contact_email: contactEmail,
        video_url: videoUrl,
        cover_image: coverImagePath,
        registration_start_date: registrationStartDate ? new Date(registrationStartDate) : null,
        registration_end_date: registrationEndDate ? new Date(registrationEndDate) : null,
        is_draft: isDraft,
      },
    });

    return NextResponse.json({
      message: isDraft ? "Event drafted successfully!" : "Event published successfully!",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ events: [] }, { status: 200 });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(request.url);
    const draftsOnly = searchParams.get("drafts") === "true";

    const events = await prisma.event.findMany({
      where: {
        status_active: 1,
        is_draft: draftsOnly,
      },
      include: {
        program: {
          select: {
            programs: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

    // Auto-sync status based on dates
    const syncPromises = events.map(async (event: any) => {
      let newStatus = event.status;
      const startDate = new Date(event.start_date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = event.end_date ? new Date(event.end_date) : startDate;
      endDate.setHours(0, 0, 0, 0);

      if (now < startDate) {
        newStatus = "upcoming";
      } else if (now >= startDate && now <= endDate) {
        newStatus = "ongoing";
      } else if (now > endDate) {
        newStatus = "past";
      }

      // Only update if status actually changed
      if (newStatus !== event.status) {
        await prisma.event.update({
          where: { id: event.id },
          data: { status: newStatus },
        });
        event.status = newStatus; // reflect in return data
      }
      return event;
    });

    await Promise.all(syncPromises);

    const formattedEvents = events.map((event: any) => ({
      ...event,
      id: Number(event.id),
      program_id: Number(event.program_id),
      category_id: Number(event.category_id),
      program: event.program?.programs || "N/A",
      start_date_formatted: event.start_date.toLocaleDateString("en-GB"),
      start_time_formatted: event.start_time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      end_time_formatted: event.end_time
        ? event.end_time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : null,
    }));

    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
