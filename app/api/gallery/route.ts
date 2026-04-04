import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request: Request) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ message: "Skipping during build" });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const formData = await request.formData();
        const programIdRaw = formData.get("programId");
        const categoryIdRaw = formData.get("categoryId");

        if (!programIdRaw || !categoryIdRaw) {
            return NextResponse.json(
                { message: "Please select a Program and Category" },
                { status: 400 }
            );
        }

        const program_id = parseInt(programIdRaw as string);
        const category_id = parseInt(categoryIdRaw as string);

        if (isNaN(program_id) || isNaN(category_id)) {
            return NextResponse.json(
                { message: "Invalid Program or Category selection" },
                { status: 400 }
            );
        }

        const year = formData.get("year") as string;
        const month = formData.get("month") as string || null;
        const title = formData.get("title") as string;
        const media_type = formData.get("mediaType") as string;
        const description = formData.get("description") as string || null;
        const video_url = formData.get("videoUrl") as string || null;
        const file = formData.get("file") as File | null;

        if (!title || !year) {
            return NextResponse.json(
                { message: "Title and Year are required" },
                { status: 400 }
            );
        }

        let file_path = null;

        if (media_type === "image" && file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const galleryDir = path.join(process.cwd(), "public", "gallery");
            await mkdir(galleryDir, { recursive: true });
            const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
            const fullPath = path.join(galleryDir, filename);
            file_path = `/gallery/${filename}`;
            await writeFile(fullPath, buffer);
        }

        const newGalleryItem = await prisma.gallery.create({
            data: {
                year,
                month,
                title,
                media_type,
                description,
                file_path,
                video_url,
                program_id,
                category_id
            }
        });

        return NextResponse.json(
            { message: "Gallery item created successfully", data: newGalleryItem },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating gallery item:", error);
        return NextResponse.json(
            { message: "Failed to create gallery item" },
            { status: 500 }
        );
    }
}

export async function GET() {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1' && !process.env.DATABASE_URL) {
        return NextResponse.json({ galleryItems: [] }, { status: 200 });
    }

    try {
        await headers();
    } catch (e) {}

    try {
        const { prisma } = await import("@/lib/prisma");
        const galleryItems = await prisma.gallery.findMany({
            where: { NOT: { status: -1 } },
            include: {
                program: true,
                category: true,
            },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json({ galleryItems });
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return NextResponse.json(
            { message: "Failed to fetch gallery items" },
            { status: 500 }
        );
    }
}
