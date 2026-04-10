import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Skipping during build" });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const body = await request.json();
    const { status, reject_reason } = body;

    const updatedRegistration = await (prisma.eventRegistration as any).update({
      where: { id: BigInt(resolvedParams.id) },
      data: {
        status: parseInt(status.toString()),
        reject_reason: reject_reason || null,
      },
    });

    return NextResponse.json({
      message: "Status updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating registration status:", error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}
