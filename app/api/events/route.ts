import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extracting data from FormData
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

    // Handle File Upload for Cover Image
    const coverImageFile = formData.get("coverImage") as File | null;
    let coverImagePath = null;

    if (coverImageFile) {
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

const uploadDir = path.join(process.cwd(), "public/assets/images/events");
      await mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${coverImageFile.name.replace(/\s+/g, "-")}`;
// coverImagePath = `/assets/images/events/${fileName}`;
coverImagePath = `/assets/images/events/${fileName}`;
      const fullPath = path.join(uploadDir, fileName);

      await writeFile(fullPath, buffer);
    }

    // Prepare dates for Prisma (Prisma expects ISO-8601 or Date objects)
    const formatToDateTime = (dateStr: string, timeStr: string | null) => {
      if (!dateStr) return null;
      // If no time is provided, default to midnight.
      // Note: For MySQL @db.Time, we'll send a full DateTime and Prisma handles it if mapped correctly.
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Skip database operations during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ events: [] }, { status: 200 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const draftsOnly = searchParams.get("drafts") === "true";

    console.log(`Fetching events from Prisma (drafts: ${draftsOnly})...`);
    const events = await prisma.event.findMany({
      where: {
        status_active: 1, // Only show active events
        is_draft: draftsOnly, // Show either drafts or published based on param
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
    console.log("Events fetched successfully:", events.length);

    const formattedEvents = events.map((event: typeof events[0]) => ({
      ...event,
      program: event.program?.programs || "N/A",
      start_date_formatted: event.start_date.toLocaleDateString("en-GB"), // Format date for UI
      start_time_formatted: event.start_time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }), // Format time for UI
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events", error: errorMessage },
      { status: 500 }
    );
  }
}

