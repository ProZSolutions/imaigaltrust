import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ event: null }, { status: 200 });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        program: true,
        category: true,
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const formattedEvent = {
      ...event,
      id: Number(event.id),
      program_id: Number(event.program_id),
      category_id: Number(event.category_id),
    };

    return NextResponse.json({ event: formattedEvent });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ message: "Error fetching event" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const programId = parseInt(formData.get("programId") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const status = formData.get("status") as "upcoming" | "ongoing" | "past";
    const startDate = formData.get("startDate") as string;
    const startTime = formData.get("startTime") as string;
    const endDate = formData.get("endDate") as string || null;
    const endTime = formData.get("endTime") as string || null;
    const location = formData.get("location") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string || null;
    const contactPerson = formData.get("contactPerson") as string || null;
    const contactEmail = formData.get("contactEmail") as string || null;
    const videoUrl = formData.get("videoUrl") as string || null;
    const registrationStartDate = formData.get("registrationStartDate") as string || null;
    const registrationEndDate = formData.get("registrationEndDate") as string || null;
    const isDraft = formData.get("isDraft") === "true";

    const coverImageFile = formData.get("coverImage") as File | string | null;
    let coverImagePath = undefined;

    if (coverImageFile instanceof File) {
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

    const updateData: any = {
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
      registration_start_date: registrationStartDate ? new Date(registrationStartDate) : null,
      registration_end_date: registrationEndDate ? new Date(registrationEndDate) : null,
      is_draft: isDraft,
    };

    if (coverImagePath) {
      updateData.cover_image = coverImagePath;
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    const formattedEvent = {
      ...event,
      id: Number(event.id),
      program_id: Number(event.program_id),
      category_id: Number(event.category_id),
    };

    return NextResponse.json({
      message: "Event updated successfully!",
      event: formattedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        await headers();
    } catch (e) { }

    try {
        const { prisma } = await import("@/lib/prisma");
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await request.json();

        const event = await prisma.event.update({
            where: { id },
            data: body,
        });

        const formattedEvent = {
            ...event,
            id: Number(event.id),
            program_id: Number(event.program_id),
            category_id: Number(event.category_id),
        };

        return NextResponse.json({
            message: "Event updated successfully!",
            event: formattedEvent,
        });
    } catch (error) {
        console.error("Error patching event:", error);
        return NextResponse.json(
            { message: "Failed to update event" },
            { status: 500 }
        );
    }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    await prisma.event.update({
      where: { id },
      data: { status_active: 0 }
    });

    return NextResponse.json({ message: "Event deleted successfully (soft delete)" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}
