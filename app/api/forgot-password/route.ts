import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

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
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
