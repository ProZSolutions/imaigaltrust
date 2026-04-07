import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ categories: [] }, { status: 200 });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
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
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
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
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
