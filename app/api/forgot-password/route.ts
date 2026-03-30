import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

function generateOTP(length = 6) {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");
}

// In-memory OTP store (use DB in production)
const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email exists in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email not registered" },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP with 5 minute expiry
    otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    // Email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"Imaigal Trust" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });

    return NextResponse.json({
      message: "OTP sent to your email!",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}