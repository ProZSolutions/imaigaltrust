"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Trash2, ChevronDown, Edit } from "lucide-react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";
interface Category {
  id: number;
  category: string;
  status: number;
  created_at: string;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    category: "",
    status: "1",
  });

  const [errors, setErrors] = useState<{ category?: string }>({});
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);


  //delete model
  const [deleteId, setDeleteId] = useState<number | null>(null);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/gallery/category");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormData({
      category: cat.category,
      status: cat.status.toString(),
    });
    setIsModalOpen(true);
  };

 const handleDelete = async () => {
  if (!deleteId) return;

  try {
    const res = await fetch(`/api/gallery/category/${deleteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // remove deleted category from UI immediately
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));

      toast.success("Category deleted successfully");
    } else {
      toast.error("Failed to delete category");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setDeleteModalOpen(false);
    setDeleteId(null);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  const toastId = toast.loading(
    editingId ? "Updating category..." : "Creating category..."
  );

  try {
    const url = editingId
      ? `/api/gallery/category/${editingId}`
      : "/api/gallery/category";

    const response = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success(
        editingId
          ? "Category updated successfully "
          : "Category created successfully ",
        { id: toastId }
      );

      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ category: "", status: "1" });
      fetchCategories();
    } else {
      toast.error("Failed to save category ", { id: toastId });
    }
  } catch (error) {
    console.error("Error saving category:", error);
    toast.error("Something went wrong ", { id: toastId });
  } finally {
    setLoading(false);
  }
};


const validate = () => {
  const newErrors: { category?: string } = {};

  if (!formData.category.trim()) {
    newErrors.category = "Category name is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ category: "", status: "1" });
    setIsModalOpen(true);
  };
  // ACTIVE CATEGORY FILTER
  const activeCategories = categories;

  // PAGINATION LOGIC
  const startIndex = (currentPage - 1) * perPage;
  const paginatedCategories =
    perPage === activeCategories.length
      ? activeCategories
      : activeCategories.slice(startIndex, startIndex + perPage);

  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Categories</h1>
          <p className="text-sm text-gray-500">
            Manage your gallery organizational categories
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#096412] text-white rounded-xl hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/10 font-bold active:scale-95"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#1a4d2e] text-white">
            <tr>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
                Category Name
              </th>
              <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fetching ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-[#1a4d2e] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 font-medium">
                      Loading categories...
                    </span>
                  </div>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-gray-400 italic"
                >
                  No categories found. Click &quot;Add Category&quot; to get started.
                </td>
              </tr>
            ) : (
              paginatedCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-green-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                  </td>
                  <td className="px-6 py-4">
                    <span
  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
    Number(cat.status) === 1
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-gray-100 text-gray-600 border border-gray-200"
  }`}
>
  <span
    className={`w-1.5 h-1.5 rounded-full mr-2 ${
      Number(cat.status) === 1 ? "bg-green-600" : "bg-gray-500"
    }`}
  ></span>
  {Number(cat.status) === 1 ? "Active" : "Inactive"}
</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                        setDeleteId(cat.id);
                        setDeleteModalOpen(true);
              }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      {!fetching && activeCategories.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={activeCategories.length}
          defaultPerPage={25}
          onPageChange={(page) => setCurrentPage(page)}
          onPerPageChange={(count) => setPerPage(count)}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999999] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header - Using sidebar dark green for premium integration */}
            <div className="bg-[#1a4d2e] p-8 flex justify-between items-center text-white relative overflow-hidden text-center justify-center">
              <div className="relative z-10 w-full">
                <h2 className="text-2xl font-bold tracking-tight josefin-font text-white">
                  {editingId ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-sm text-green-100/60 mt-1 font-medium italic">
                  {editingId ? "Update existing category details" : "Create a new organizational category"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-8 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 transform hover:rotate-90 z-20"
                title="Close"
              >
                <X size={20} />
              </button>
              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#096412]/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#096412]/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Category Name
                </label>
               <input
  type="text"
  value={formData.category}
  onChange={(e) => {
    const value = e.target.value
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    setFormData({ ...formData, category: value });

    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
  }}
  placeholder="e.g. Health Programs, Rural Development"
  className={`w-full px-5 py-4 border rounded-2xl outline-none ${
    errors.category ? "border-red-500" : "border-gray-200"
  }`}
/>

{errors.category && (
  <p className="text-red-500 text-sm mt-1 ml-1">
    {errors.category}
  </p>
)}
              </div>

              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold text-sm"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-4 border border-[#096412]/20 text-[#096412]/70 rounded-2xl font-bold hover:bg-green-50/50 transition-all duration-300 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-4 bg-[#096412] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    editingId ? "Update Category" : "Create Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDeleteModal
  isOpen={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={handleDelete}
  title="Confirm Delete"
  message="Are you sure you want to delete this category?"
/>
    </div>
  );
}
