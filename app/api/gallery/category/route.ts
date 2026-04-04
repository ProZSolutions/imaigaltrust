import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  // Force dynamic execution by accessing headers
  await headers();

  // Skip database operations during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ categories: [] }, { status: 200 });
  }

  try {
    const categories = await prisma.galleryCategory.findMany({
      where: { NOT: { status: -1 } },
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching gallery categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Force dynamic execution by accessing headers
  await headers();

  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    const body = await req.json();
    const { category, status } = body;

    if (!category) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.galleryCategory.create({
      data: {
        category,
        status: status !== undefined ? parseInt(status) : 1,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery category:", error);
    return NextResponse.json(
      { error: "Failed to create category", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
