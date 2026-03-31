import { NextResponse } from "next/server";
import otpStore from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Get OTP record
    const record = otpStore.get(email);
    if (!record) {
      return NextResponse.json(
        { message: "No OTP found for this email" },
        { status: 400 }
      );
    }

    // Check expiry
    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    // Check if OTP matches
    if (record.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // OTP is correct → remove from store
    otpStore.delete(email);

    return NextResponse.json({
      message: "OTP verified! You can reset your password now.",
    });

  } catch (err) {
    console.error("OTP Verification Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}