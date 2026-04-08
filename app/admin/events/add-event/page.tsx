"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface Program {
  id: number;
  programs: string;
  status: number;
  created_at: string;
}

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    registrationStartDate: new Date().toISOString().split("T")[0], // Default to current date
    registrationEndDate: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  useEffect(() => {
    // Fetch programs and categories from existing API endpoints
    const fetchDropdowns = async () => {
      try {
        const [progRes, catRes] = await Promise.all([
          fetch("/api/gallery/program"),
          fetch("/api/gallery/category"),
        ]);
        const progData = await progRes.json();
        const catData = await catRes.json();
        if (progData.programs) setPrograms(progData.programs);
        if (catData.categories) setCategories(catData.categories);
      } catch (error) {
        console.error("Error fetching dependencies:", error);
      }
    };
    fetchDropdowns();
  }, []);
//form validation
  const validateForm = () => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.title.trim()) newErrors.title = "Event title is required";
  if (!formData.programId) newErrors.programId = "Program is required";
  if (!formData.status) newErrors.status = "Status is required";
  if (!formData.categoryId) newErrors.categoryId = "Category is required";

  if (!formData.startDate) newErrors.startDate = "Start date is required";
  if (!formData.startTime) newErrors.startTime = "Start time is required";
  if (!formData.endDate) newErrors.endDate = "End date is required";
  if (!formData.endTime) newErrors.endTime = "End time is required";
  if (!formData.location.trim()) newErrors.location = "Location is required";
  if (!formData.registrationEndDate) {
  newErrors.RegistrationEndDate = "Registration End Date is required";
}

// End date must be after start date
if (
  formData.registrationStartDate &&
  formData.registrationEndDate &&
  formData.registrationEndDate < formData.registrationStartDate
) {
  newErrors.RegistrationEndDate =
    "Registration End Date must be after Start Date";
}

  if (!formData.shortDescription.trim())
    newErrors.shortDescription = "Short description is required";

  if (!formData.fullDescription.trim())
    newErrors.fullDescription = "Full description is required";

 if (!formData.contactPerson.trim()) {
  newErrors.contactPerson = "Contact person is required";
}

// Contact Email / Phone required
if (!formData.contactEmail.trim()) {
  newErrors.contactEmail = "Contact Email or Phone is required";
}

// Email or phone validation
if (formData.contactEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (
    !emailRegex.test(formData.contactEmail) &&
    !phoneRegex.test(formData.contactEmail)
  ) {
    newErrors.contactEmail =
      "Enter valid email or 10-digit phone number";
  }
}
  // Email validation
  if (formData.contactEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; 

  if (
    !emailRegex.test(formData.contactEmail) &&
    !phoneRegex.test(formData.contactEmail)
  ) {
    newErrors.contactEmail = "Enter valid email or 10-digit phone number";
  }
}

// Cover Image 
if (!coverImage) {
  newErrors.coverImage = "Cover image is required";
}

// Gallery 
if (galleryImages.length > 10) {
  newErrors.galleryImages = "Maximum 10 images allowed";
}

// Video URL 
if (formData.videoUrl) {
  const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/;
  if (!urlPattern.test(formData.videoUrl)) {
    newErrors.videoUrl = "Enter valid YouTube or Vimeo URL";
  }
}

 if (!formData.registrationEndDate) newErrors.RegistrationEndDate = "RegistrationEndDate date is required";

  return newErrors;
};
// const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setCoverImage(e.target.files[0]);
//     }
//   };


const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const maxSize = 2 * 1024 * 1024; // 2MB

  if (file.size > maxSize) {
    setErrors((prev) => ({
      ...prev,
      coverImage: "Image must be 2MB or smaller",
    }));

    e.target.value = ""; // reset file input
    setCoverImage(null);
    return;
  }

  // If file size is valid
  setErrors((prev) => ({
    ...prev,
    coverImage: "",
  }));

  setCoverImage(file);
};
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  // const handleGalleryImagesChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files);
  //     setGalleryImages((prev) => [...prev, ...newFiles]);
  //   }
  // };
  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const maxSize = 2 * 1024 * 1024; // 2MB
  const validFiles: File[] = [];

  Array.from(files).forEach((file) => {
    if (file.size > maxSize) {
      alert(`${file.name} is larger than 2MB`);
    } else {
      validFiles.push(file);
    }
  });

  if (validFiles.length > 0) {
    setGalleryImages((prev: File[]) => [...prev, ...validFiles]);
  }

  e.target.value = ""; // reset input
};
  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };


  const [activeAction, setActiveAction] = useState<"draft" | "publish" | null>(null);

//handleSubmit
 const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
  e.preventDefault();

  setActiveAction(isDraft ? "draft" : "publish");
    setLoading(true);
  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    const firstError = Object.values(newErrors)[0] as string;

    toast.error(firstError, {
      duration: 3000,
      position: "top-right",
    });

    setActiveAction(null); // reset action
    return;
  }

  setLoading(true);

  try {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("isDraft", String(isDraft));

    if (coverImage) {
      data.append("coverImage", coverImage);
    }

    galleryImages.forEach((file) => {
      data.append("galleryImages", file);
    });

    const response = await fetch("/api/events", {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Event saved successfully");

      setTimeout(() => {
        router.push("/admin/events");
      }, 1500);
    } else {
      toast.error(result.message || "Failed to save event");
    }

  } catch {
    console.error("Error saving event:");
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
    setActiveAction(null); // reset button state
  }
};

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <Link
          href="/admin/events"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-bold text-gray-800 text-xl">Add New Event</h1>
          <p className="text-gray-500 text-xs">
            Create a new event with detailed information
          </p>
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
              {errors.title && (
  <p className="text-red-500 text-xs">{errors.title}</p>
)}
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

      {programs
        .filter((p: Program) => Number(p.status) === 1) // ✅ only active
        .map((p: Program) => (
          <option key={p.id} value={p.id}>
            {p.programs}
          </option>
        ))}
    </select>

    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      <ChevronDown size={18} />
    </div>

    {errors.programId && (
      <p className="text-red-500 text-xs">{errors.programId}</p>
    )}
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
                {errors.status && (
  <p className="text-red-500 text-xs">{errors.status}</p>
)}
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
                  {categories.map((c: { id: string; category: string }) => (
    <option key={c.id} value={c.id}>
      {c.category}
    </option>
  ))}
</select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={18} />
                </div>
                {errors.categoryId && (
  <p className="text-red-500 text-xs">{errors.categoryId}</p>
)}
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
              {errors.startDate && (
  <p className="text-red-500 text-xs">{errors.startDate}</p>
)}
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
              {errors.startTime && (
  <p className="text-red-500 text-xs">{errors.startTime}</p>
)}
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
              {errors.endDate && (
  <p className="text-red-500 text-xs">{errors.endDate}</p>
)}
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
              {errors.endTime && (
  <p className="text-red-500 text-xs">{errors.endTime}</p>
)}
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
              {errors.location && (
  <p className="text-red-500 text-xs">{errors.location}</p>
)}
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
              {errors.shortDescription && (
  <p className="text-red-500 text-xs">
    {errors.shortDescription}
  </p>
)}
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700 text-xs">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Comprehensive details about the event, schedule, speakers, etc."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all resize-y"
              />
                {errors.fullDescription && (
  <p className="text-red-500 text-xs">
    {errors.fullDescription}
  </p>
)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-bold text-gray-700 text-xs">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => {
                  const value = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(value)) {
                    handleInputChange(e);
                 }
                }}
                placeholder="Name"
                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
                  />

            {errors.contactPerson && (
            <p className="text-red-500 text-xs">
               {errors.contactPerson}
              </p>
              )}
              </div>

              <div className="space-y-2">
  <label className="block font-bold text-gray-700 text-xs">
    Contact Email/Phone <span className="text-red-500">*</span>
  </label>

  <input
    type="email"
    name="contactEmail"
    value={formData.contactEmail}
    onChange={handleInputChange}
    placeholder="Email or phone number"
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
  />

  {errors.contactEmail && (
    <p className="text-red-500 text-xs">
      {errors.contactEmail}
    </p>
  )}
</div>
            
            </div>
          </div>
        </section>

        {/* MEDIA & COVERAGE */}
        <section>
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-bold text-[#1a4d2e] text-lg">
              Media & Coverage <span className="text-red-500">*</span>
            </h2>
            <p className="text-gray-500 text-xs">Visual assets for the event</p>
          </div>

          <div className="space-y-6">
            <div className="bg-[#fffdf7] border border-[#f5ead3] p-6 rounded-xl">
              <div className="flex gap-4 items-start">
                <div className="mt-1 text-yellow-600">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    The cover image appears as the card thumbnail on the events
                    listing page.
                  </h3>
                  <p className="text-gray-600 mt-1 text-xs">
                    Recommended: 1200 x 630 px (16:9), JPG or PNG, max 2 MB.
                  </p>
                </div>
                
              </div>
              

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
                  {coverImage ? (
  <div className="relative w-full h-full">
    <Image
      src={URL.createObjectURL(coverImage)}
      alt="Cover Preview"
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
                    Accepted: JPG, PNG, WEBP · Max: 2 MB
                  </p>
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="mt-4 text-red-500 font-semibold self-start hover:text-red-700 text-xs"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>
            {errors.coverImage && (
  <p className="text-red-500 mt-2 text-xs">
    {errors.coverImage}
  </p>
)}

            <div className="space-y-2 pt-4">
              <label className="block font-bold text-gray-700 uppercase tracking-wide text-xs">
                Additional Gallery Images{" "}<span className="text-red-500">*</span> 
                <span className="font-normal text-gray-500 normal-case text-xs">
                  (Shown in the event gallery section)
                </span>
              </label>

              <div
                className="w-full border-2 border-dashed border-[#f5ead3] bg-[#fffdf7] rounded-xl p-10 text-center cursor-pointer hover:bg-[#fff9e6] hover:border-yellow-400 transition-all group"
                onClick={() =>
                  document.getElementById("galleryUpload")?.click()
                }
              >
                <input
                  id="galleryUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryImagesChange}
                />
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <p className="font-bold text-gray-800 text-base">
                  Drag & drop or click to upload gallery images
                </p>
                <p className="text-gray-500 mt-2 text-xs">
                  JPG, PNG, GIF · Max 200 MB per file · Multiple files allowed
                </p>
              </div>
              

              {/* Gallery Previews */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                  {galleryImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Gallery item ${index}`}
                        fill
                        className="object-cover"
                      />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
  <button
    type="button"
    onClick={() => removeGalleryImage(index)}
    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg z-10"
  >
    <X size={16} />
  </button>
</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.coverImage && (
  <p className="text-red-500 mt-2 text-xs">
    {errors.coverImage}
  </p>
)}

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
              {errors.videoUrl && (
  <p className="text-red-500 text-xs">
    {errors.videoUrl}
  </p>
)}
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
                Registration End Date <span className="text-red-500">*</span>
              </label>
              <input
               type="date"
  name="registrationEndDate"
  min={formData.registrationStartDate}
  value={formData.registrationEndDate}
  onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4d2e]/20 focus:border-[#1a4d2e] outline-none transition-all"
              />
            {errors.RegistrationEndDate && (
  <p className="text-red-500 text-xs">{errors.RegistrationEndDate}</p>
)}
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">

  {/* Save Draft */}
  <button
    type="button"
    onClick={(e) => handleSubmit(e, true)}
    disabled={loading && activeAction === "publish"}
    className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
  >
    {loading && activeAction === "draft" ? (
      <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
    ) : (
      "Save as Draft"
    )}
  </button>

  {/* Publish */}
  <button
    type="button"
    onClick={(e) => handleSubmit(e, false)}
    disabled={loading && activeAction === "draft"}
    className="px-8 py-3 bg-[#1a4d2e] hover:bg-[#133922] text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
  >
    {loading && activeAction === "publish" ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : null}

    Publish Event
  </button>

</div>
        </div>
      </div>
    
  );
}
