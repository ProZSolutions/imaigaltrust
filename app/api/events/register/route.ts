import { NextResponse } from "next/server";
import { headers } from "next/headers";

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
    const body = await request.json();
    const {
      event_id,
      first_name,
      last_name,
      age,
      gender,
      email,
      phone,
      source,
      motivation,
      special_requirements,
      consent,
    } = body;

    if (
      !event_id ||
      !first_name ||
      !last_name ||
      !age ||
      !email ||
      !phone ||
      !motivation ||
      consent === undefined
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        event_id: parseInt(event_id.toString()),
        first_name: first_name,
        last_name: last_name,
        age: parseInt(age.toString()),
        gender: gender || null,
        email: email,
        phone: phone,
        source: source || null,
        motivation: motivation,
        special_requirements: special_requirements || null,
        consent: !!consent,
      },
    });

    return NextResponse.json({
      message: "Registration successful!",
      registration,
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { message: "Failed to process registration" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ registrations: [] }, { status: 200 });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const whereClause = eventId ? { event_id: parseInt(eventId) } : {};

    const registrations = await prisma.eventRegistration.findMany({
      where: whereClause,
      include: {
        event: {
          select: {
            title: true,
            location: true,
            cover_image: true,
            start_date: true,
            start_time: true,
            end_date: true,
            end_time: true,
            registration_start_date: true,
            registration_end_date: true,
            program: {
              select: {
                programs: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { message: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
