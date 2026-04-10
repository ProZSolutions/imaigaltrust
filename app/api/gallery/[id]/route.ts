import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const { writeFile, mkdir } = await import("fs/promises");
        const path = await import("path");
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        
        const formData = await req.formData();
        const year = formData.get("year") as string;
        const month = formData.get("month") as string || null;
        const title = formData.get("title") as string;
        const media_type = formData.get("mediaType") as string;
        const description = formData.get("description") as string || null;
        const video_url = formData.get("videoUrl") as string || null;
        const program_id = parseInt(formData.get("programId") as string);
        const category_id = parseInt(formData.get("categoryId") as string);
        const file = formData.get("file") as File | null;

        let data: any = {
            year,
            month,
            title,
            media_type,
            description,
            video_url,
            program_id,
            category_id,
        };

        if (media_type === "image" && file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const galleryDir = path.join(process.cwd(), "public", "gallery");
            await mkdir(galleryDir, { recursive: true });
            const sanitizedName = file.name
                .replaceAll(" ", "_")
                .replace(/\.(jpg|jpeg|png)\.(jpg|jpeg|png)$/i, '.$2');
            const filename = `${Date.now()}-${sanitizedName}`;
            const fullPath = path.join(galleryDir, filename);
            data.file_path = filename; // Store only filename
            await writeFile(fullPath, buffer);
        }

        const updated = await prisma.gallery.update({
            where: { id },
            data,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating gallery item:", error);
        return NextResponse.json(
            { message: "Failed to update" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        await prisma.gallery.update({
            where: { id },
            data: { status: -1 }
        });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        return NextResponse.json(
            { message: "Failed to delete" },
            { status: 500 }
        );
    }
}