import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
context: { params: Promise<{ filename: string }> }
) {
const { filename } = await context.params;
  const filePath = path.join(process.cwd(), "public", "reports", filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
