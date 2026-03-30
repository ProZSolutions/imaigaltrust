"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Trash2, ChevronDown, Edit } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "@/app/component/Pagination/Pagination";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";

interface Program {
  id: number;
  programs: string;
  status: number;
  created_at: string;
}

export default function AdminProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
   const [formData, setFormData] = useState({
    programs: "",
    status: "1",
  });

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const totalItems = programs.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = programs.slice(startIndex, endIndex);

 //model delete
 const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

// error handling
  const [errors, setErrors] = useState<{ programs?: string }>({});

  useEffect(() => {
    fetchPrograms();
  }, []);

const fetchPrograms = async () => {
  try {
    const res = await fetch("/api/gallery/program");
    const data = await res.json();
      setPrograms(data.programs || []);
  } catch (error) {
    console.error("Error fetching programs:", error);
  } finally {
    setFetching(false);
  }
};

  const handleEdit = (prog: Program) => {
    setEditingId(prog.id);
    setFormData({
      programs: prog.programs,
      status: prog.status.toString(),
    });
    setIsModalOpen(true);
  };

  // const handleDelete = async (id: number) => {
  //   if (!confirm("Are you sure you want to delete this program.")) return;

  //   try {
  //     const res = await fetch(`/api/gallery/program/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (res.ok) {
  //       fetchPrograms();
  //     } else {
  //       alert("Failed to delete program");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting program:", error);
  //   }
  // };

 const handleDelete = async () => {
  if (!deleteId) return;

  const toastId = toast.loading("Deleting program...");

  try {
    const res = await fetch(`/api/gallery/program/${deleteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Program deleted successfully", { id: toastId });
      fetchPrograms();
    } else {
      toast.error("Failed to delete program", { id: toastId });
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong", { id: toastId });
  } finally {
    setDeleteModalOpen(false);
    setDeleteId(null);
  }
};
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const url = editingId
  //       ? `/api/gallery/program/${editingId}`
  //       : "/api/gallery/program";

  //     const response = await fetch(url, {
  //       method: editingId ? "PUT" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       setIsModalOpen(false);
  //       setEditingId(null);
  //       setFormData({ programs: "", status: "1" });
  //       fetchPrograms();
  //     } else {
  //       alert("Failed to save program");
  //     }
  //   } catch (error) {
  //     console.error("Error saving program:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let newErrors: any = {};

  // validation
  if (!formData.programs.trim()) {
    newErrors.programs = "Program name is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error("Please fix the errors before submitting.");
    return;
  }

  setErrors({});
  setLoading(true);

  const toastId = toast.loading(
    editingId ? "Updating program..." : "Creating program..."
  );

  try {
    const url = editingId
      ? `/api/gallery/program/${editingId}`
      : "/api/gallery/program";

    const response = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        status: Number(formData.status),
      }),
    });

    if (response.ok) {
      toast.success(
        editingId
          ? "Program updated successfully"
          : "Program created successfully",
        { id: toastId }
      );

      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ programs: "", status: "1" });
      fetchPrograms();
    } else {
      toast.error("Failed to save program", { id: toastId });
    }
  } catch (error) {
    console.error("Error saving program:", error);
    toast.error("Something went wrong", { id: toastId });
  } finally {
    setLoading(false);
  }
};

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ programs: "", status: "1" });
    setIsModalOpen(true);
  };

  return (
    
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Programs</h1>
          <p className="text-sm text-gray-500">
            Manage your gallery programs and initiatives
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#096412] text-white rounded-xl hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/10 font-bold active:scale-95"
        >
          <Plus size={20} />
          Add Program
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#1a4d2e] text-white">
            <tr>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
                Program Name
              </th>
              <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
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
                      Loading programs...
                    </span>
                  </div>
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-gray-400 italic"
                >
                  No programs found. Click &quot;Add Program&quot; to get started.
                </td>
              </tr>
            ) : (
              currentData.map((prog) => (
                <tr
                  key={prog.id}
                  className="hover:bg-green-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {prog.programs}
                  </td>
                  <td className="px-6 py-4">
                   <span
  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
    Number(prog.status) === 1
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-gray-100 text-gray-600 border border-gray-200"
  }`}
>
  <span
    className={`w-1.5 h-1.5 rounded-full mr-2 ${
      Number(prog.status) === 1 ? "bg-green-600" : "bg-gray-500"
    }`}
  ></span>
  {Number(prog.status) === 1 ? "Active" : "Inactive"}
</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(prog)}
                        className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(prog.id);
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
      <Pagination
  currentPage={currentPage}
  totalItems={totalItems}
  defaultPerPage={perPage}
  onPageChange={(page) => setCurrentPage(page)}
  onPerPageChange={(value) => setPerPage(value)}
/>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999999] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header - Dark premium integration */}
            <div className="bg-[#1a4d2e] p-8 flex justify-between items-center text-white relative overflow-hidden text-center justify-center">
              <div className="relative z-10 w-full">
                <h2 className="text-2xl font-bold tracking-tight josefin-font">
                  {editingId ? "Edit Program" : "Add New Program"}
                </h2>
                <p className="text-sm text-green-100/60 mt-1 font-medium italic">
                  {editingId ? "Update existing program details" : "Create a new initiative or program"}
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
                  Program Name
                </label>
                <input
  type="text"
  value={formData.programs}
  onChange={(e) =>
    setFormData({
      ...formData,
      programs: e.target.value
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    })
  }
  placeholder="e.g. Tree Plantation, Blood Donation"
  className={`w-full px-5 py-4 border rounded-2xl outline-none
  ${errors.programs ? "border-red-500" : "border-gray-200"}`}
/>
{errors.programs && (
  <p className="text-red-500 text-sm mt-1 ml-1">
    {errors.programs}
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
                 disabled={loading}
                  className="flex-1 px-4 py-4 border border-[#096412]/20 text-[#096412]/70 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
                    editingId ? "Update Program" : "Create Program"
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
  message="Are you sure you want to delete this program?"
/>
    </div>
  );
}
