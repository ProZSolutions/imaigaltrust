import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ success: true });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { db } = await import("@/lib/db");
    const { ids, status, reason } = await req.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No IDs provided" },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE memberships 
       SET status = ?, reject_reason = ? 
       WHERE id IN (?)`,
      [status, reason || null, ids]
    );

    if (status === 1 || status === 2) {
      const { sendMembershipApprovalMail, sendMembershipRejectionMail } = await import("@/lib/sendMail");
      const [members] = await db.query(
        `SELECT email, name FROM memberships WHERE id IN (?)`,
        [ids]
      ) as any;

      if (Array.isArray(members)) {
        for (const member of members) {
          if (member.email) {
            try {
              if (status === 1) {
                await sendMembershipApprovalMail(member.email, member.name || "Member");
              } else if (status === 2) {
                await sendMembershipRejectionMail(member.email, member.name || "Member");
              }
            } catch (error) {
              console.error(`Failed to send mail to ${member.email}:`, error);
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}