import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  // Force dynamic execution by accessing headers
  await headers();

  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, memberships: [] }, { status: 200 });
  }

  try {
    const memberships = await prisma.membership.findMany({
      orderBy: { created_at: "desc" },
    });

    const formatted = memberships.map((m: any) => ({
      ...m,
      voluntaryDonation: m.voluntary_donation,
    }));

    return NextResponse.json({
      success: true,
      memberships: formatted,
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Force dynamic execution by accessing headers
  await headers();

  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, id: 0 });
  }

  try {
    const body = await req.json();

    const extractFeeAmount = (feeString: string): number => {
      if (!feeString) return 0;
      const match = feeString.match(/₹?([\d,]+(?:\.\d{2})?)/);
      if (match && match[1]) {
        return Number(match[1].replace(/,/g, ""));
      }
      return 0;
    };

    const result = await prisma.membership.create({
      data: {
        name: body.name || "",
        dob: body.dob ? new Date(body.dob) : new Date(),
        email: body.email || "",
        mobile: body.mobile || "",
        address: body.address || "",
        city: body.city || "",
        pincode: body.pincode || "",
        state: body.state || "",
        membership_type: body.membershipType || "",
        interest: body.interest || "",
        membership_fee: extractFeeAmount(body.fee),
        voluntary_donation: body.voluntaryDonation ? Number(body.voluntaryDonation) : 0,
        status: 0,
        is_active: 1
      }
    });

    return NextResponse.json({
      success: true,
      id: result.id
    });
  } catch (error) {
    const err = error as Error;
    console.error("Prisma error details:", err);
    return NextResponse.json(
      { success: false, message: err.message, details: (err as any).code },
      { status: 500 }
    );
  }
}