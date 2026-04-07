import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function DELETE(
  request: any,
  { params }: { params: Promise<{ id: string }> }
) {
  // IMMEDIATELY check for build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Skipping during build" });
  }

  // Force dynamic execution
  try {
    await headers();
  } catch (e) {
    // Ignore headers error during build if it happens
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ report }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch report" }, { status: 500 });
  }
}

export async function GET(
  request: any,
  { params }: { params: Promise<{ id: string }> }
) {
  // IMMEDIATELY check for build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ report: null }, { status: 200 });
  }

  // Force dynamic execution
  try {
    await headers();
  } catch (e) {
    // Ignore headers error during build
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    // Delete the associated file
    const filePath = path.join(process.cwd(), "uploads", report.file_path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete DB record
    await prisma.annualReport.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}