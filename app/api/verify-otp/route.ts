import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const { email, otp } = await req.json();

    const record = await prisma.otp.findUnique({
      where: { email },
    });

    if (record && record.otp === otp && new Date() < record.expiresAt) {
      await prisma.otp.delete({ where: { email } });
      return NextResponse.json({ success: true, message: "OTP verified" });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}