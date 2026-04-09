"use client";

import React, { useState, useEffect } from "react";
import { Trash2, X, Plus, FileText } from "lucide-react";
import toast from "react-hot-toast";

import Pagination from "@/app/component/Pagination/Pagination";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";
interface Report {
  id: number;
  type: string;
  year: string;
  language: string;
  file_path: string;
}

export default function AnnualReportFormPage() {
  const [formData, setFormData] = useState({
    type: "pdf",
    year: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
    language: "tamil",
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [fetching, setFetching] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedReports = reports.slice(startIndex, startIndex + perPage);

  // model delete
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [reports]);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/annual-report");
      const data = await res.json();

      if (Array.isArray(data)) setReports(data);
      else if (Array.isArray(data.data)) setReports(data.data);
      else if (Array.isArray(data.reports)) setReports(data.reports);
      else setReports([]);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const closeForm = () => setShowForm(false);

  const isValidYear = (year: string) => {
    const match = year.match(/^(\d{4})-(\d{4})$/);
    if (!match) return false;
    const startYear = parseInt(match[1]);
    const endYear = parseInt(match[2]);
    return startYear >= 2017 && endYear === startYear + 1;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidYear(formData.year)) {
      toast.error("Invalid year format (2017-2018)");
      return;
    }

    if (!formData.file) {
      toast.error("Please select a file ");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("type", formData.type);
    data.append("year", formData.year);
    data.append("language", formData.language);
    data.append("file", formData.file);

    try {
      const response = await fetch("/api/annual-report", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("Annual Report submitted successfully ");
        fetchReports(); // Refresh reports

        // Reset form
        setFormData({
          type: "pdf",
          year: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
          language: "tamil",
          file: null,
        });
        // Close form
        setShowForm(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = (id: number) => {
  //   toast((t) => (
  //     <div className="flex flex-col gap-3">
  //       <p className="font-semibold">Delete this report?</p>
  //       <div className="flex gap-2 justify-end">
  //         <button
  //           onClick={() => toast.dismiss(t.id)}
  //           className="px-3 py-1 bg-black rounded text-xs"
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           onClick={async () => {
  //             toast.dismiss(t.id);
  //             try {
  //               const res = await fetch(`/api/annual-report/${id}`, {
  //                 method: "DELETE",
  //               });
  //               if (res.ok) {
  //                 toast.success("Deleted successfully ");
  //                 fetchReports();
  //               } else toast.error("Delete failed ");
  //             } catch {
  //               toast.error("Something went wrong ");
  //             }
  //           }}
  //           className="px-3 py-1 bg-red-600 text-white rounded text-xs"
  //         >
  //           Delete
  //         </button>
  //       </div>
  //     </div>
  //   ));
  // };

  const handleDelete = async () => {
  if (!deleteId) return;

  try {
    const res = await fetch(`/api/annual-report/${deleteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Deleted successfully");
      fetchReports();
    } else {
      toast.error("Delete failed");
    }
  } catch {
    toast.error("Something went wrong");
  } finally {
    setDeleteOpen(false);
    setDeleteId(null);
  }
};

  const getAcceptType = () => {
    switch (formData.type) {
      case "pdf":
        return ".pdf,application/pdf";
      case "excel":
        return ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      case "word":
        return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      default:
        return "*/*";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="font-bold text-gray-800 text-xl">Annual Report</h1>
          <p className="text-gray-500 text-xs">
            Upload and manage organization annual reports
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#096412] text-white rounded-xl hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/10 font-bold active:scale-95"
        >
          <Plus size={20} /> Add Annual Report
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999999] p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="bg-[#1a4d2e] p-6 flex justify-between items-center text-white">
              <div className="text-center w-full">
                <h2 className="font-bold text-lg">Add Annual Report</h2>
                <p className="text-green-100/60 italic text-xs">
                  Upload report details
                </p>
              </div>
              <button
                onClick={closeForm}
                className="absolute right-6 top-8 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 transform hover:rotate-90 z-20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Type */}
                  <div className="space-y-2.5">
                    <label className="block font-bold text-gray-700 ml-1 text-xs">
                      Report Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold shadow-sm text-xs"
                    >
                      <option value="pdf">PDF</option>
                      <option value="word">Word</option>
                      <option value="excel">Excel</option>
                    </select>
                  </div>

                  {/* Year */}
                  <div className="space-y-2.5">
                    <label className="block font-bold text-gray-700 ml-1 text-xs">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g. 2023-2024"
                      required
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all font-semibold shadow-sm text-xs"
                    />
                  </div>

                  {/* Language */}
                  <div className="space-y-2.5">
                    <label className="block font-bold text-gray-700 ml-1 text-xs">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none transition-all appearance-none bg-white font-semibold shadow-sm text-xs"
                    >
                      <option value="tamil">Tamil</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  {/* File */}
                  <div className="space-y-2.5">
  <label className="block font-bold text-gray-700 ml-1 text-xs">
    Upload Report File ({formData.type.toUpperCase()})
  </label>

  <input
    type="file"
    accept={getAcceptType()}
    onChange={handleFileChange}
    required
    className="w-full px-5 py-3 border border-gray-200 rounded-2xl 
    focus:ring-4 focus:ring-[#096412]/5 focus:border-[#096412] outline-none 
    file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 
    file:text-xs file:font-bold file:bg-[#096412]/10 file:text-[#096412] 
    hover:file:bg-[#096412]/20 transition-all font-semibold text-sm 
    bg-gray-50/50 cursor-pointer file:cursor-pointer"
  />
</div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 md:flex-none px-12 py-4 bg-[#096412] text-white font-bold rounded-2xl hover:bg-[#074d0e] transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    {loading ? "Uploading..." : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        {fetching ? (
          <div className="py-10 text-center text-gray-500 font-medium">
            Loading...
          </div>
        ) : reports.length === 0 ? (
          <div className="py-10 text-center text-gray-400 italic">
            No reports found
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-[#1a4d2e] text-white">
                <tr>
                  <th className="px-10 py-4 font-bold uppercase tracking-wider text-xs">
                    Year
                  </th>
                  <th className="px-12 py-4 font-bold uppercase tracking-wider text-xs">
                    Type
                  </th>
                  <th className="px-12 py-4 font-bold uppercase tracking-wider text-xs">
                    Language
                  </th>
                  <th className="px-12 py-4 font-bold uppercase tracking-wider text-xs">
                    File
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-right text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedReports.map((r) => (
                  <tr key={r.id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-10 py-4 text-gray-700 font-semibold">{r.year}</td>
                    <td className="px-12 py-4 text-gray-600 capitalize">{r.type}</td>
                    <td className="px-12 py-4 text-gray-600 capitalize">{r.language}</td>
                    <td className="px-8 py-4">
                      <a
  href={`/api/annual-report/file/${r.file_path}`} 
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-3 py-1.5 text-blue-700 font-semibold rounded-lg transition text-xs"
>
  <FileText size={16} />
  View
</a>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button
                       onClick={() => {
                        setDeleteId(r.id);
                        setDeleteOpen(true);
                      }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ConfirmDeleteModal
  isOpen={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  onConfirm={handleDelete}
  title="Confirm Delete"
  message="Are you sure you want to delete this report?"
/>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={reports.length}
        defaultPerPage={perPage}
        onPageChange={(page) => setCurrentPage(page)}
        onPerPageChange={(value) => {
          setPerPage(value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}