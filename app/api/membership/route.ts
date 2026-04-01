import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const memberships = await prisma.membership.findMany({
//       orderBy: { created_at: "desc" },
//     });

//     return NextResponse.json({
//       success: true,
//       memberships,
//     });
//   } catch (err) {
//     const error = err as Error;
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  try {
    const memberships = await prisma.membership.findMany({
      orderBy: { created_at: "desc" },
    });

    const formatted = memberships.map((m) => ({
      ...m,
      voluntaryDonation: m.voluntary_donation, // convert here
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
  try {
    const body = await req.json();

    // Log the received body for debugging
    console.log("Received membership body:", body);

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
        membership_fee: body.fee || "",

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
      { success: false, message: err.message, details: (err as { code?: string }).code },
      { status: 500 }
    );
  }
}