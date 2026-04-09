"use client";

import React, { useState, useEffect, use } from "react";
import { ChevronDown, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  interface Program {
    id: number | string;
    programs: string;
  }

  interface Category {
    id: number | string;
    category: string;
  }

  const [programs, setPrograms] = useState<Program[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    programId: "",
    status: "",
    categoryId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    shortDescription: "",
    fullDescription: "",
    contactPerson: "",
    contactEmail: "",
    videoUrl: "",
    registrationStartDate: "",
    registrationEndDate: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, catRes, eventRes] = await Promise.all([
          fetch("/api/gallery/program"),
          fetch("/api/gallery/category"),
          fetch(`/api/events/${id}`),
        ]);

        const progData = await progRes.json();
        const catData = await catRes.json();
        const eventData = await eventRes.json();

        if (progData.programs) setPrograms(progData.programs);
        if (catData.categories) setCategories(catData.categories);

        if (eventData.event) {
          const e = eventData.event;

          const formatDate = (dateStr: string | null) => {
            if (!dateStr) return "";
            return new Date(dateStr).toISOString().split("T")[0];
          };

          const formatTime = (dateStr: string | null) => {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            return date.toTimeString().split(" ")[0].substring(0, 5);
          };

          setFormData({
            title: e.title || "",
            programId: e.program_id?.toString() || "",
            status: e.status || "",
            categoryId: e.category_id?.toString() || "",
            startDate: formatDate(e.start_date),
            startTime: formatTime(e.start_time),
            endDate: formatDate(e.end_date),
            endTime: formatTime(e.end_time),
            location: e.location || "",
            shortDescription: e.short_description || "",
            fullDescription: e.full_description || "",
            contactPerson: e.contact_person || "",
            contactEmail: e.contact_email || "",
            videoUrl: e.video_url || "",
            registrationStartDate: formatDate(e.registration_start_date),
            registrationEndDate: formatDate(e.registration_end_date),
          });

          if (e.cover_image) {
            setPreviewImage(e.cover_image);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading event data");
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
  e.preventDefault();

  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("isDraft", String(isDraft));

    if (coverImage) data.append("coverImage", coverImage);

    // Show toast for update
    await toast.promise(
      fetch(`/api/events/${id}`, {
        method: "PUT",
        body: data,
      }).then(async (res) => {
        const json = await res.json();
        const errorMessage =
          json?.message || json?.error || "Failed to update event";
        if (!res.ok) throw new Error(errorMessage);
        return json;
      }),
      {
        loading: isDraft ? "Saving draft..." : "Updating event...",
        success: isDraft ? "Draft saved successfully!" : "Event updated successfully!",
        error: (err) => err.message,
      },
      { duration: 2000 }
    );

    // Navigate after success
    router.push("/admin/events");
  } catch (error) {
    console.error("Error updating event:", error);
  }
};
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
            {/* <Toaster position="top-right" /> */}
      
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <Link
          href="/admin/events"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-bold text-gray-800 text-xl">Edit Event</h1>
          <p className="text-gray-500 text-xs">Update event information</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-12">
        {/* EVENT IDENTITY */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">
              Events Identity
            </h2>
            <p className="text-gray-500 text-xs">
              Basic information about the event
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block font-bold text-gray-700 text-xs">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Program <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="programId"
                  value={formData.programId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all bg-white"
                >
                  <option value="">Select Program</option>
                  {programs.map((p: Program) => (
                    <option key={p.id} value={p.id}>
                      {p.programs}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Event Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="past">Past</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((c: Category) => (
                    <option key={c.id} value={c.id}>
                      {c.category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATE & LOCATION */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">
              Date & Location
            </h2>
            <p className="text-gray-500 text-xs">
              When and where the event takes place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block font-bold text-gray-700 text-xs">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Event venue or link"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">Content</h2>
            <p className="text-gray-500 text-xs">
              Detailed descriptions and contact info
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief summary of the event (max 200 characters)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Full Description
              </label>
              <textarea
                rows={6}
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Comprehensive details about the event, schedule, speakers, etc."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-bold text-gray-700 text-xs">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Name of organizer/contact"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-bold text-gray-700 text-xs">
                  Contact Email/Phone
                </label>
                <input
                  type="text"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="Email or phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MEDIA & COVERAGE */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">
              Media & Coverage
            </h2>
            <p className="text-gray-500 text-xs">Visual assets for the event</p>
          </div>

          <div className="space-y-6">
            <div className="bg-[#fffdf7] border border-[#f5ead3] p-6 rounded-xl">
              <div className="mt-6 flex flex-col md:flex-row gap-6">
                <div
                  className="w-full md:w-64 h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 hover:border-[#1a4d2e] transition-all overflow-hidden relative"
                  onClick={() =>
                    document.getElementById("coverUpload")?.click()
                  }
                >
                  <input
                    id="coverUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageChange}
                  />
                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previewImage}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Upload size={24} />
                      </div>
                      <p className="font-semibold text-gray-700 mt-2 text-xs">
                        Choose Cover Image
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-medium text-gray-700 text-xs">
                    Click the thumbnail to upload a cover image.
                  </p>
                  <p className="text-gray-500 mt-1 text-xs">
                    Accepted: JPG, PNG, WEBP · Max: 5 MB
                  </p>
                  {(coverImage || previewImage) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setPreviewImage(null);
                      }}
                      className="mt-4 text-red-500 font-semibold self-start hover:text-red-700 text-xs"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="block font-bold text-gray-700 uppercase tracking-wide text-xs">
                Event Video Link{" "}
                <span className="font-normal text-gray-500 normal-case text-xs">
                  (YouTube or Vimeo embed optional)
                </span>
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* REGISTRATION */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">
              Registration & Application Form
            </h2>
            <p className="text-gray-500 text-xs">
              Configure registration timelines if applicable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Registration Start Date
              </label>
              <input
                type="date"
                name="registrationStartDate"
                value={formData.registrationStartDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Registration End Date
              </label>
              <input
                type="date"
                name="registrationEndDate"
                value={formData.registrationEndDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="px-8 py-3 bg-[#1a4d2e] hover:bg-[#133922] text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            Update Event
          </button>
        </div>
      </div>
    </div>
  );
}
