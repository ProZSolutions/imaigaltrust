import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found" },
        { status: 404 }
      );
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store OTP in DB
    await prisma.user.update({
      where: { email },
      data: { otp },
    });

    // email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
     
      html: `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9;">
    <div style="max-width:500px; margin:auto; background:white; padding:25px; border-radius:8px; border:1px solid #eee;">
      
      <h2 style="text-align:center; color:#333;">Password Reset Request</h2>

      <p>Hello,</p>

      <p>You requested to reset your password. Use the OTP below to continue:</p>

      <div style="text-align:center; margin:25px 0;">
        <span style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#2E7D32;">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for <b>1 minute 30 seconds</b>. Please do not share it with anyone.</p>

      <p>If you did not request a password reset, you can safely ignore this email.</p>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:#777; text-align:center;">
        This is an automated email. Please do not reply.
      </p>

    </div>
  </div>
`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}