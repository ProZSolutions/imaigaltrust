"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import { X, ZoomIn, Image as ImageIcon, Video, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  media_type: string;
  file_path: string | null;
  video_url: string | null;
  year: string;
  month: string | null;
  program: { programs: string };
  category: { category: string };
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeEmbedUrl = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

const getYouTubeThumbnail = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get("type") as "image" | "video" | null;

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video">(typeParam || "all");
  const [activeProgram, setActiveProgram] = useState("All");
  const [activeYear, setActiveYear] = useState("All Years");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = ["All Years", ...Array.from({ length: currentYear - 2017 + 1 }, (_, i) => (currentYear - i).toString())];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeParam) {
      setActiveTab(typeParam);
    } else {
      setActiveTab("all");
    }
  }, [typeParam]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setItems(data.galleryItems || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleTabChange = (tab: "all" | "image" | "video") => {
    setActiveTab(tab);
    if (tab === "all") {
      router.push("/gallery");
    } else {
      router.push(`/gallery?type=${tab}`);
    }
  };

  // Unique programs for filter tabs
  const programs = [
    "All",
    ...Array.from(new Set(items.map((i) => i.program.programs))),
  ];

  // Filtered items
  const filtered = items.filter((item) => {
    const typeMatch =
      activeTab === "all" ||
      (activeTab === "image" && item.media_type === "image") ||
      (activeTab === "video" && item.media_type === "video");
    const programMatch =
      activeProgram === "All" || item.program.programs === activeProgram;
    const yearMatch = activeYear === "All Years" || item.year === activeYear;
    return typeMatch && programMatch && yearMatch;
  });

  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning>
      {/* Page Banner */}
      <PageBanner
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "Gallery" },
        ]}
        title="Our Gallery"
        description="A visual journey through our programs, events, and the communities we serve across Tamil Nadu."
      />

      {/* Filter Section */}
      <section className="py-10 px-4 md:px-10 bg-[#F9FBF8] border-b border-[#E3ECE6]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {isMounted ? (
            <>
            {/* Filters Row */}
<div className="flex flex-col lg:flex-row lg:items-center gap-6">
  
  {/* Media Type Tabs (Left Side) */}
  <div className="flex gap-2 p-1 bg-white border border-[#D8E8DC] rounded-full shadow-sm">
    {(["all", "image", "video"] as const).map((tab) => (
      <button
        key={tab}
        onClick={() => handleTabChange(tab)}
        className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
          activeTab === tab
            ? "bg-[#1F5D33] text-white shadow-lg scale-105"
            : "text-[#5E6E64] hover:text-[#1F5D33]"
        }`}
      >
        {tab === "image" && <ImageIcon size={14} />}
        {tab === "video" && <Video size={14} />}
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>

  {/* Year Dropdown (Right Side) */}
  <div className="relative group lg:ml-auto">
    <select
      value={activeYear}
      onChange={(e) => setActiveYear(e.target.value)}
      className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-[#D8E8DC] rounded-xl font-bold text-[#1F5D33] focus:outline-none focus:ring-2 focus:ring-[#1F5D33]/20 focus:border-[#1F5D33] cursor-pointer shadow-sm min-w-[160px] text-xs"
    >
      {years.map((y) => {
        const count =
          y === "All Years"
            ? items.length
            : items.filter((i) => i.year === y).length;

        return (
          <option key={y} value={y}>
            {y} {count > 0 ? `(${count})` : ""}
          </option>
        );
      })}
    </select>

    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1F5D33]/50">
      <ChevronDown size={14} />
    </div>
  </div>

</div>

              {/* Program Filter Pills */}
              <div className="flex gap-2 flex-wrap pt-2 border-t border-[#E3ECE6]">
                <span className="font-bold text-[#5E6E64] uppercase tracking-wider py-1.5 px-1 mr-2 text-xs">Programs:</span>
                {programs.map((prog) => (
                  <button
                    key={prog}
                    onClick={() => setActiveProgram(prog)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${activeProgram === prog
                        ? "bg-[#1F5D33] text-white border-[#1F5D33] shadow-md"
                        : "bg-white text-[#5E6E64] border-[#D8E8DC] hover:border-[#1F5D33] hover:text-[#1F5D33]"
                      }`}
                  >
                    {prog}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="h-32 flex items-center justify-center text-[#5E6E64] animate-pulse text-xs">
              Initializing filters...
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto">

          {/* Count Badge */}
          {!loading && (
            <p className="text-[#5E6E64] mb-6 text-xs">
              Showing <span className="font-bold text-[#1F5D33]">{filtered.length}</span> item{filtered.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-[#1F5D33] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#5E6E64] font-medium">Loading gallery...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#E7F3EC] text-[#1F5D33]">
                <ImageIcon size={28} />
              </div>
              <p className="text-[#1B3022] font-semibold text-base">No items found</p>
              <p className="text-[#5E6E64] text-xs">Try changing the filters above.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#E3ECE6] bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setLightbox(item)}
                >
                  {/* Media Container */}
                  {item.media_type === "image" ? (
                    <div className="relative w-full overflow-hidden">
                    <Image
  src={item.file_path ? `/api/gallery-image/${item.file_path}` : "/defaultImages1.jpg"}
  alt={item.title}
  width={600}
  height={400}
/>
                      {/* Zoom Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                      </div>
                    </div>
                  ) : (
                    /* Video Thumbnail */
                    <div className="relative w-full bg-[#1B3022] aspect-video flex items-center justify-center overflow-hidden">
                      {item.video_url && getYouTubeThumbnail(item.video_url) ? (
                        <Image
                          src={getYouTubeThumbnail(item.video_url)!}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info Bar */}
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1B3022] mb-1 line-clamp-1 text-sm">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold bg-[#E7F3EC] text-[#1F5D33] px-2 py-0.5 rounded-full text-xs">
                        {item.category.category}
                      </span>
                      <span className="text-[#5E6E64] text-xs">
                        {item.month ? `${item.month.charAt(0).toUpperCase() + item.month.slice(1)} ` : ""}
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Media */}
           {lightbox.media_type === "image" && lightbox.file_path ? (
  <Image
  src={lightbox.file_path ? `/api/gallery/${lightbox.file_path}` : "/defaultImages1.jpg"}
  alt={lightbox.title}
  width={900}
  height={600}
  className="w-full object-contain max-h-[65vh]"
/>
) : lightbox.media_type === "video" ? (
              <div className="aspect-video w-full bg-black">
                {lightbox.video_url && getYouTubeId(lightbox.video_url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(lightbox.video_url)}
                    title={lightbox.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                    <Video size={48} className="opacity-20" />
                    <p className="text-xs">Invalid video link or video unavailable</p>
                    {lightbox.video_url && (
                      <p className="bg-white/10 px-2 py-1 rounded text-xs">{lightbox.video_url}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[40vh] flex items-center justify-center bg-gray-50 text-gray-400">
                <ImageIcon size={48} className="opacity-20" />
              </div>
            )}

            {/* Meta Info */}
            <div className="p-5">
              <h2 className="font-bold text-[#1B3022] mb-1 text-base">{lightbox.title}</h2>
              {lightbox.description && (
                <p className="text-[#5E6E64] mb-3 text-xs">{lightbox.description}</p>
              )}
              <div className="flex gap-3 flex-wrap text-xs">
                <span className="bg-[#E7F3EC] text-[#1F5D33] font-semibold px-3 py-1 rounded-full">
                  {lightbox.program.programs}
                </span>
                <span className="bg-gray-100 text-gray-600 font-semibold px-3 py-1 rounded-full">
                  {lightbox.category.category}
                </span>
                <span className="bg-gray-100 text-gray-600 font-semibold px-3 py-1 rounded-full">
                  {lightbox.month ? `${lightbox.month.charAt(0).toUpperCase() + lightbox.month.slice(1)} ` : ""}
                  {lightbox.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryNavPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}