import nodemailer from "nodemailer";
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
    const { fullName, phone, email, organisation, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Organisation:</b> ${organisation}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Imaigal Trust",
      html: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for reaching out to <b>Imaigal Trust</b>.</p>
        <p>We have received your message and our team will respond within <b> few days</b>.</p>
        <p><b>Your enquiry subject:</b> ${subject}</p>
        <br/>
        <p>Warm regards,</p>
        <p><b>Imaigal Trust Team</b></p>
        <p>Tamil Nadu, India</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.log("MAIL ERROR:", error);
    return NextResponse.json({ success: false, error });
  }
}