import { NextResponse } from "next/server";

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

    console.log(`Updating registration ${resolvedParams.id} with status ${status}`);

    // @ts-ignore - status exists in DB but Prisma types might be out of sync
    const updatedRegistration = await prisma.eventRegistration.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        status: parseInt(status.toString()),
        reject_reason: reject_reason || null,
      } as any,
    });

    try {
      const parsedStatus = parseInt(status.toString());
      if (parsedStatus === 1 || parsedStatus === 2) {
        const eventInfo = await prisma.event.findUnique({
          where: { id: Number(updatedRegistration.event_id) },
          select: { title: true }
        });
        
        if (eventInfo?.title && updatedRegistration.email) {
          const { sendEventApprovalMail, sendEventRejectionMail } = await import("@/lib/sendMail");
          const applicantName = updatedRegistration.first_name + 
            (updatedRegistration.last_name ? " " + updatedRegistration.last_name : "");
            
          if (parsedStatus === 1) {
            await sendEventApprovalMail(updatedRegistration.email, applicantName, eventInfo.title);
          } else if (parsedStatus === 2) {
            await sendEventRejectionMail(updatedRegistration.email, applicantName, eventInfo.title);
          }
        }
      }
    } catch (mailError) {
      console.error("Failed to send status update mail:", mailError);
    }

    // Helper to serialize BigInt for JSON response
    const serializeResult = (obj: any) => {
      return JSON.parse(
        JSON.stringify(obj, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
    };

    return NextResponse.json({
      message: "Status updated successfully",
      registration: serializeResult(updatedRegistration),
    });
  } catch (error: any) {
    console.error("Error updating registration status:", error);
    return NextResponse.json(
      {
        message: "Failed to update status",
        error: error.message
      },
      { status: 500 }
    );
  }
}
