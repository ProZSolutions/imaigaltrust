import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  // IMMEDIATELY check for build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({
      totalMembers: 0,
      paidMembers: 0,
      freeVolunteers: 0,
      pendingMembers: 0,
      approvedMembers: 0,
      rejectedMembers: 0,
      totalEvents: 0,
      pendingApprovals: 0,
      membershipRevenue: 0,
      ongoingEvents: 0,
      upcomingEvents: 0,
      pastEvents: 0,
      draftEvents: 0,
      registerCount: 0,
      annualReportCount: 0,
    });
  }

  // Force dynamic execution
  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");

    // Platform Summary
    const totalMembers = await prisma.membership.count();
    const totalEvents = await prisma.event.count();

    const pendingApprovals = await prisma.membership.count({
      where: { status: 0 },
    });

    const memberships = await prisma.membership.findMany({
      select: { membership_fee: true },
    });

    let membershipRevenue = 0;
    memberships.forEach((m: { membership_fee: number }) => {
      const fee = Number(m.membership_fee) || 0;
      membershipRevenue += isNaN(fee) ? 0 : fee;
    });
    
    const paidMembers = await prisma.membership.count({
      where: {
        membership_fee: {
          not: 0,
        },
      },
    });

    const freeVolunteers = await prisma.membership.count({
      where: {
        membership_type: "volunteer",
      },
    });

    const pendingMembers = await prisma.membership.count({
      where: { status: 0 },
    });

    const approvedMembers = await prisma.membership.count({
      where: { status: 1 },
    });

    const rejectedMembers = await prisma.membership.count({
      where: { status: 2 },
    });

    const ongoingEvents = await prisma.event.count({
      where: { status: "ongoing" },
    });

    const upcomingEvents = await prisma.event.count({
      where: { status: "upcoming" },
    });

    const pastEvents = await prisma.event.count({
      where: { status: "past" },
    });

    const draftEvents = await prisma.event.count({
      where: { is_draft: true },
    });

    const registerCount = await prisma.eventRegistration.count();
    const annualReportCount = await prisma.annualReport.count();

    return NextResponse.json({
      totalMembers,
      paidMembers,
      freeVolunteers,
      pendingMembers,
      approvedMembers,
      rejectedMembers,
      totalEvents,
      pendingApprovals,
      membershipRevenue,
      ongoingEvents,
      upcomingEvents,
      pastEvents,
      draftEvents,
      registerCount,
      annualReportCount,
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard counts" },
      { status: 500 }
    );
  }
}