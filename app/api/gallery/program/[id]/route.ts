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
    const { prisma } = await import("@/lib/prisma");
    const body = await req.json();
    const { programs, status } = body;

    if (!programs) {
      return NextResponse.json(
        { error: "Program name is required" },
        { status: 400 }
      );
    }

    const created = await prisma.galleryProgram.create({
      data: {
        programs,
        status: Number(status),
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const body = await req.json();
        const { programs, status } = body;

        if (!programs) {
            return NextResponse.json(
                { error: "Program name is required" },
                { status: 400 }
            );
        }

        const updated = await prisma.galleryProgram.update({
            where: { id },
            data: {
                programs,
                status: typeof status === 'string' ? parseInt(status) : status,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating program:", error);
        return NextResponse.json(
            { error: "Failed to update" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        await prisma.galleryProgram.update({
            where: { id },
            data: { status: -1 }
        });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting program:", error);
        return NextResponse.json(
            { error: "Failed to delete" },
            { status: 500 }
        );
    }
}
