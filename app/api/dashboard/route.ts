import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  try {
    // Fetch counts from your database tables
    const ongoingCount = await prisma.event.count({ where: { status: "ongoing" } });
    const upcomingCount = await prisma.event.count({ where: { status: "upcoming" } });
    const registerCount = await prisma.eventRegistration.count();
    const eventCount = await prisma.event.count();
    const draftCount = await prisma.event.count({ where: { is_draft: true } });

    return NextResponse.json({
      ongoingCount,
      upcomingCount,
      registerCount,
      eventCount,
      draftCount,
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard counts" }, { status: 500 });
  }
}