import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
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
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const galleryDir = path.join(process.cwd(), "public", "gallery");
                await mkdir(galleryDir, { recursive: true });

                const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
                const fullPath = path.join(galleryDir, filename);
                file_path = `/gallery/${filename}`;

                await writeFile(fullPath, buffer);
            } catch (fileError) {
                console.error("File Upload Error:", fileError);
                return NextResponse.json(
                    { message: "File upload failed", details: fileError instanceof Error ? fileError.message : "Unknown error" },
                    { status: 500 }
                );
            }
        }

        try {
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
        } catch (dbError) {
            console.error("Prisma Error:", dbError);
            return NextResponse.json(
                { message: "Prisma creation failed", details: dbError instanceof Error ? dbError.message : "Unknown error" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error creating gallery item:", error);
        return NextResponse.json(
            { message: "Failed to create gallery item", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Skip database operations during build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return NextResponse.json({ galleryItems: [] }, { status: 200 });
    }

    try {
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
