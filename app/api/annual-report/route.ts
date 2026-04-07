import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request: Request) {
  // IMMEDIATELY check for build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Skipping during build" });
  }

  // Force dynamic execution
  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");

    const formData = await request.formData();
    const type = formData.get("type") as string;
    const year = formData.get("year") as string;
    const language = formData.get("language") as string;
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ message: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const reportsDir = path.join(process.cwd(), "public", "reports");
    await mkdir(reportsDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, buffer);

    const annualReport = await prisma.annualReport.create({
      data: { type, year, language, file_path: filename },
    });

    return NextResponse.json(
      { message: "Report uploaded successfully", data: annualReport },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Failed to upload report" }, { status: 500 });
  }
}

export async function GET() {
  // IMMEDIATELY check for build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
    return NextResponse.json({ reports: [] }, { status: 200 });
  }

  // Force dynamic execution
  try {
    await headers();
  } catch (e) {}

  try {
    const { prisma } = await import("@/lib/prisma");
    const reports = await prisma.annualReport.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { message: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
