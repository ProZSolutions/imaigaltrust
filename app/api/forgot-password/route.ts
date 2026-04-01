import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import otpStore from "@/lib/otp-store";

function generateOTP(length = 6) {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Check if email exists in DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Email not registered" }, { status: 404 });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP with 5 minute expiry
    otpStore.set(email, { otp, expires: Date.now() + 1.5* 60 * 1000 });

    // Send OTP via nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Imaigal Trust" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 1.5 minutes.`,
      html: `<p>Your OTP is: <b>${otp}</b>. It is valid for 1.5 minutes.</p>`,
    });

    return NextResponse.json({ message: "OTP sent to your email!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
