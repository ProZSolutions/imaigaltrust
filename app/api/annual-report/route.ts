import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as string;
    const year = formData.get("year") as string;
    const language = formData.get("language") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(process.cwd(), "public", "reports");
    await mkdir(reportsDir, { recursive: true });

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = path.join(reportsDir, filename);
    const relativePath = `/reports/${filename}`;

    await writeFile(filePath, buffer);

    // Save to database
    const annualReport = await prisma.annualReport.create({
      data: {
        type,
        year,
        language,
        file_path: relativePath,
      },
    });

    return NextResponse.json(
      { message: "Report uploaded successfully", data: annualReport },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading report:", error);
    return NextResponse.json(
      { message: "Failed to upload report" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
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
