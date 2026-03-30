"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, X, Upload, ChevronDown, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Pagination from "@/app/component/Pagination/Pagination";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";

interface Program {
  id: number;
  programs: string;
}

interface Category {
  id: number;
  category: string;
}

interface GalleryItem {
  id: number;
  program_id: number;
  category_id: number;
  year: string;
  month: string | null;
  title: string;
  media_type: string;
  description: string | null;
  file_path: string | null;
  video_url: string | null;
  status: number;
  program: { programs: string };
  category: { category: string };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const emptyForm = {
  programId: "",
  categoryId: "",
  year: new Date().getFullYear().toString(),
  month: "",
  title: "",
  mediaType: "image",
  description: "",
  videoUrl: "",
};

export default function GalleryPage() {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [search, setSearch] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  //preview image show 
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  // pagination
const [currentPage, setCurrentPage] = useState(1);
const [perPage, setPerPage] = useState(25);

// pagination and filter
const filtered = galleryItems.filter(
  (item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.program.programs.toLowerCase().includes(search.toLowerCase()) ||
    item.category.category.toLowerCase().includes(search.toLowerCase())
);
// const filtered = galleryItems.filter(
//     (item) =>
//       item.title.toLowerCase().includes(search.toLowerCase()) ||
//       item.program.programs.toLowerCase().includes(search.toLowerCase()) ||
//       item.category.category.toLowerCase().includes(search.toLowerCase())
//   );
// pagination count
const startIndex = (currentPage - 1) * perPage;
const paginatedData = filtered.slice(startIndex, startIndex + perPage);
//model delete 
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);

useEffect(() => {
  setCurrentPage(1);
}, [search]);


  useEffect(() => {
    fetchDropdowns();
    fetchGalleryItems();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const [progRes, catRes] = await Promise.all([
        fetch("/api/gallery/program"),
        fetch("/api/gallery/category"),
      ]);
      const progData = await progRes.json();
      const catData = await catRes.json();
      setPrograms(progData.programs || []);
      setCategories(catData.categories || []);
    } catch (error) {
      console.error("Error fetching programs/categories:", error);
    }
  };

  const fetchGalleryItems = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryItems(data.galleryItems || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setFetching(false);
    }
  };

  const openAddForm = () => {
    setEditItem(null);
    setFormData({ ...emptyForm });
    setSelectedFile(null);
    setShowForm(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditItem(item);
    setFormData({
      programId: item.program_id.toString(),
      categoryId: item.category_id.toString(),
      year: item.year,
      month: item.month || "",
      title: item.title,
      mediaType: item.media_type,
      description: item.description || "",
      videoUrl: item.video_url || "",
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditItem(null);
    setFormData({ ...emptyForm });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const toastId = toast.loading(
    editItem ? "Updating gallery..." : "Creating gallery..."
  );

  try {
    const data = new FormData();
    data.append("programId", formData.programId);
    data.append("categoryId", formData.categoryId);
    data.append("year", formData.year);
    data.append("month", formData.month);
    data.append("title", formData.title);
    data.append("mediaType", formData.mediaType);
    data.append("description", formData.description);

    if (formData.mediaType === "image" && selectedFile) {
      data.append("file", selectedFile);
    } else if (formData.mediaType === "video") {
      data.append("videoUrl", formData.videoUrl);
    }

    const url = editItem ? `/api/gallery/${editItem.id}` : "/api/gallery";
    const method = editItem ? "PUT" : "POST";

    const response = await fetch(url, { method, body: data });

    if (response.ok) {
      toast.success(
        editItem
          ? "Gallery item updated successfully"
          : "Gallery item created successfully",
        { id: toastId }
      );

      closeForm();
      fetchGalleryItems();
    } else {
      const result = await response.json();
      toast.error(result.message || "Failed to save gallery item", {
        id: toastId,
      });
    }
  } catch (error) {
    console.error("Error saving gallery item:", error);
    toast.error("An error occurred while saving", { id: toastId });
  } finally {
    setLoading(false);
  }
};

const handleDelete = async () => {
  if (!selectedId) return;

  try {
    const res = await fetch(`/api/gallery/${selectedId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Deleted successfully");
      fetchGalleryItems(); // refresh list
    } else {
      toast.error("Delete failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-sm text-gray-500">View and manage gallery items</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#096412] text-white rounded-xl hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/10 font-bold active:scale-95"
        >
          <Plus size={20} />
          Add Gallery
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by title, program or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 cursor-pointer rounded-xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none text-sm transition-all shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#1a4d2e] text-white">
            <tr>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">S.No</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Program</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Category</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Year</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Month</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Type</th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fetching ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-[#1a4d2e] border-t-transparent rounded-full animate-spin" />
                    <span className="font-semibold text-gray-600">Loading gallery...</span>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">
                  {search ? "No items match your search." : 'No gallery items found. Click "Add Gallery" to start.'}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (

                <tr key={item.id} className="hover:bg-green-50/30 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-sm">{startIndex + idx + 1}</td>
                  <td className="px-6 py-4 text-gray-800 font-semibold capitalize">{item.title}</td>
                  <td className="px-6 py-4 text-gray-600">{item.program.programs}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category.category}</td>
                  <td className="px-6 py-4 text-gray-600">{item.year}</td>
                  <td className="px-6 py-4">
                    <a
                    href={item.media_type === "image" ? item.file_path ?? "" : item.video_url ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-sm font-semibold hover:underline"
                     >
                     View
                    </a>
                  </td>
                  <td className="px-7 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                       onClick={() => {
                       setSelectedId(item.id);
                       setShowDeleteModal(true);
              }}
               className="text-red-500"
>
  <Trash2 size={16} />
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       
      </div>
 <Pagination
  currentPage={currentPage}
  totalItems={filtered.length}
  defaultPerPage={perPage}
  onPageChange={(page) => setCurrentPage(page)}
  onPerPageChange={(value) => {
    setPerPage(value);
    setCurrentPage(1);
  }}
/>
   {/* another tab view image or video  */}
{previewItem && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
      
      <button
        onClick={() => setPreviewItem(null)}
        className="absolute top-2 right-2 text-red-500 font-bold"
      >
        ✕
      </button>

      {previewItem.media_type === "image" ? (
        <Image
          src={previewItem.file_path || ""}
          alt="preview"
          width={600}
          height={500}
          className="w-full max-h-[500px] object-contain"
        />
      ) : (
        <video
          controls
          className="w-full max-h-[500px]"
        >
          <source src={previewItem.video_url || ""} type="video/mp4" />
        </video>
      )}
    </div>
  </div>
)}
      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999999] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header - Dark premium integration */}
            <div className="bg-[#1a4d2e] p-8 flex justify-between items-center text-white relative overflow-hidden text-center justify-center">
              <div className="relative z-10 w-full">
                <h2 className="text-2xl font-bold tracking-tight josefin-font">
                  {editItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                </h2>
                <p className="text-sm text-green-100/60 mt-1 font-medium italic">
                  {editItem ? "Update the details below" : "Fill in the details to create a new gallery item"}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="absolute right-6 top-8 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 transform hover:rotate-90 z-20"
              >
                <X size={20} />
              </button>
              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#096412]/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#096412]/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
            </div>

            <form onSubmit={handleSubmit} suppressHydrationWarning className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Program */}
                <div className="space-y-2.5">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Program</label>
                  <div className="relative">
                    <select
                      required
                      suppressHydrationWarning
                      value={formData.programId}
                      onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold text-sm shadow-sm"
                    >
                      <option value="">Select Program</option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>{p.programs}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2.5">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Category</label>
                  <div className="relative">
                    <select
                      required
                      suppressHydrationWarning
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold text-sm shadow-sm"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.category}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Year */}
                <div className="space-y-2.5">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Year</label>
                  <input
                    type="number"
                    required
                    suppressHydrationWarning
                    min="2000"
                    max="2100"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all font-semibold text-sm shadow-sm"
                  />
                </div>

                {/* Month */}
                <div className="space-y-2.5">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Month (Optional)</label>
                  <div className="relative">
                    <select
                      suppressHydrationWarning
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold text-sm shadow-sm"
                    >
                      <option value="">Select Month</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m.toLowerCase()}>{m}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">Title</label>
                <input
                  type="text"
                  required
                  suppressHydrationWarning
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Workshop Highlights"
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all font-semibold text-sm shadow-sm"
                />
              </div>

              {/* Media Type */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Media Type</label>
                <div className="flex gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      suppressHydrationWarning
                      name="mediaType"
                      value="image"
                      checked={formData.mediaType === "image"}
                      onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                      className="w-4 h-4 text-[#096412] focus:ring-[#096412]"
                    />
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">Image</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      suppressHydrationWarning
                      name="mediaType"
                      value="video"
                      checked={formData.mediaType === "video"}
                      onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                      className="w-4 h-4 text-[#096412] focus:ring-[#096412]"
                    />
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">Video Link</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">Description</label>
                <textarea
                  rows={3}
                  suppressHydrationWarning
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter details..."
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all font-semibold text-sm resize-none shadow-sm"
                />
              </div>

              {/* File / Video */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  {formData.mediaType === "image" ? "File Upload" : "Video URL / Embed"}
                </label>
                {formData.mediaType === "image" ? (
                  <div
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className={`border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer group ${selectedFile ? "border-[#096412] bg-green-50/50 shadow-inner" : "border-gray-200 hover:border-[#096412] hover:bg-green-50/10"
                      }`}
                  >
                    <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <Upload className={`mx-auto mb-3 w-8 h-8 ${selectedFile ? "text-[#096412]" : "text-gray-300 group-hover:text-[#096412]"}`} />
                    <p className={`text-sm font-bold transition-colors ${selectedFile ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}>
                      {selectedFile
                        ? selectedFile.name
                        : editItem?.file_path
                          ? `Current: ${editItem.file_path.split("/").pop()} (click to replace)`
                          : "Click to upload"}
                    </p>
                  </div>
                ) : (
                  <input
                    type="url"
                    suppressHydrationWarning
                    required={formData.mediaType === "video"}
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all font-semibold text-sm shadow-sm"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-3.5 border border-[#096412]/20 text-[#096412]/70 rounded-2xl font-bold hover:bg-green-50/50 transition-all duration-300 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3.5 bg-[#096412] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : editItem ? (
                    "Update Gallery"
                  ) : (
                    "Save Gallery"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDeleteModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Delete Gallery"
  message="Are you sure you want to delete this gallery item?"
/>
    </div>
  );
}
