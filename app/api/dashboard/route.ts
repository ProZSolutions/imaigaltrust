import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // --- Platform Summary ---
    // const totalMembers = await prisma.membership.count();
    // const totalEvents = await prisma.event.count();
    // const pendingApprovals = await prisma.membership.count({ where: { status: 0 } });

    // // Sum membership_fee (stored as string in DB)
    // const memberships = await prisma.membership.findMany({ select: { membership_fee: true } });
    // const membershipRevenue = memberships.reduce((sum, m) => {
    //   const fee = parseFloat(m.membership_fee || "0");
    //   return sum + (isNaN(fee) ? 0 : fee);
    // }, 0);

    // --- Event Summary ---
    const ongoingEvents = await prisma.event.count({ where: { status: "ongoing" } });
    const upcomingEvents = await prisma.event.count({ where: { status: "upcoming" } });
    const pastEvents = await prisma.event.count({ where: { status: "past" } });
    const draftEvents = await prisma.event.count({ where: { is_draft: true } });
      const totalMembers = await prisma.membership.count();
const pendingApprovals = await prisma.membership.count({ where: { status: 0 } });
const memberships = await prisma.membership.findMany({ select: { membership_fee: true } });
const membershipRevenue = memberships.reduce((sum, m) => sum + parseFloat(m.membership_fee || "0"), 0);
    // --- Registrations ---
    const registerCount = await prisma.eventRegistration.count();

    return NextResponse.json({
      totalMembers,
      // totalEvents,
      pendingApprovals,
      membershipRevenue,
      ongoingEvents,
      upcomingEvents,
      pastEvents,
      draftEvents,
      registerCount,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard counts" }, { status: 500 });
  }
}