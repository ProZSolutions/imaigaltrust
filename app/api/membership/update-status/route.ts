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

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}