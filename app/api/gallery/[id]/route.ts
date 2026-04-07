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
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const body = await req.json();
        const { year, month, title, mediaType, description, videoUrl, programId, categoryId, status } = body;

        const updated = await prisma.gallery.update({
            where: { id },
            data: {
                year,
                month,
                title,
                media_type: mediaType,
                description,
                video_url: videoUrl,
                program_id: parseInt(programId),
                category_id: parseInt(categoryId),
                status: typeof status === 'string' ? parseInt(status) : status,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating gallery item:", error);
        return NextResponse.json(
            { message: "Failed to update" },
            { status: 500 }
        );
    }

    let file_path = existing.file_path || null;

    if (media_type === "image" && file && file.size > 0) {
      const galleryDir = path.join(process.cwd(), "gallery");

      await mkdir(galleryDir, { recursive: true });

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const fullPath = path.join(galleryDir, filename);

      await writeFile(fullPath, buffer);

      if (existing.file_path) {
        const oldFile = path.join(galleryDir, existing.file_path);
        try {
          await unlink(oldFile);
        } catch {}
      }

      file_path = filename;
    }

    if (media_type === "video") {
      file_path = null;
    }

    const updated = await prisma.gallery.update({
      where: { id: galleryId },
      data: {
        program_id,
        category_id,
        year,
        month,
        title,
        media_type,
        description,
        file_path,
        video_url: media_type === "video" ? video_url : null,
      },
    });

    return NextResponse.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
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

    await prisma.gallery.update({
      where: { id: galleryId },
      data: { status: -1 },
    });

    return NextResponse.json({
      message: "Deleted successfully (soft delete)",
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);

    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}