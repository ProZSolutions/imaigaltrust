"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, FileText } from "lucide-react";
import Pagination from "@/app/component/Pagination/Pagination";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";
import toast from "react-hot-toast";


export default function DraftsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
//pagination states
  const [currentPage, setCurrentPage] = useState(1);
const [perPage, setPerPage] = useState(25);
const startIndex = (currentPage - 1) * perPage;
const paginatedEvents = events.slice(startIndex, startIndex + perPage);
//delete model 
const [deleteId, setDeleteId] = useState<string | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchDrafts = async () => {
    try {
      // We'll update the API to support a filter or create a new endpoint,
      // but for now let's assume we can pass a query param or there's a specific drafts endpoint.
      // Given the previous task, I'll check if /api/events/drafts exists or update /api/events.
      const response = await fetch("/api/events?drafts=true");
      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

const formatDateIST = (date: string | Date | null) => {
  if (!date) return "-";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
const handleDelete = async () => {
  if (!deleteId) return;

  try {
    const response = await fetch(`/api/events/${deleteId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Draft deleted successfully");

      // refresh list
      fetchDrafts();
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setShowDeleteModal(false);
    setDeleteId(null);
  }
};
  return (
<div className="space-y-6 w-full min-w-0">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#096412]/10 rounded-lg text-[#096412]">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-xl">Draft Events</h1>
            <p className="text-gray-500 text-xs">Review and finish incomplete event listings</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

  {/* Horizontal Scroll */}
  <div className="w-full overflow-x-auto">

    <table className="w-full min-w-[650px] table-auto text-xs">

      <thead className="bg-[#1a4d2e] text-white">
        <tr>
          <th className="p-4 font-bold w-16 uppercase text-xs">S.No</th>
          <th className="p-4 font-bold text-left uppercase text-xs">Event Title</th>
          <th className="p-4 font-bold text-left uppercase text-xs">Program</th>
          <th className="p-4 font-bold text-left uppercase text-xs">Status</th>
          <th className="p-4 font-bold text-left uppercase text-xs">Start Date</th>
          <th className="p-4 font-bold text-left uppercase text-xs">End Date</th>
          <th className="p-4 font-bold text-left uppercase text-xs">Location</th>
          <th className="p-4 font-bold text-left uppercase text-center text-xs">Actions</th>
        </tr>
      </thead>
            <tbody>
              {isLoading ? (
                <tr>
                 <td colSpan={10} className="p-4 text-center text-gray-500">
                    <div className="flex justify-center items-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d2e]"></div>
                    </div>
                  </td>
                </tr>
              ) : events.length > 0 ? (
                paginatedEvents.map(
                  (
                    event: {
                      id: string;
                      title: string;
                      program: string;
                      status: string;
                      start_date: string;
                      end_date: string;
                      location: string;
                    },
                    index: number,
                  ) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50/50"
                    >
                      <td className="p-4">{startIndex + index + 1}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {event.title}
                      </td>
                      <td className="p-4 text-gray-600">{event.program}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${event.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : event.status === "ongoing"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {event.status}
                        </span>
                      </td>
                     <td className="p-4 text-gray-600 whitespace-nowrap text-xs">
  {formatDateIST(event.start_date)}
</td>

<td className="p-4 text-gray-600 whitespace-nowrap text-xs">
  {event.end_date ? formatDateIST(event.end_date) : "-"}
</td>

<td className="p-4 text-gray-600">{event.location}</td>
                      <td className="p-2 flex">
                        <div className="flex gap-1">
                          <Link
                            href={`/admin/events/edit-event/${event.id}`}
                            className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-all duration-200 border border-transparent hover:border-green-100"
                            title="Edit & Publish"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => {
                            setDeleteId(event.id);
                            setShowDeleteModal(true);
                          }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-100"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={48} className="text-gray-300" />
                      <p className="font-medium text-base">
                        No draft events found
                      </p>
                      <p className="text-xs">
                        Drafts will appear here when you click &quot;Save as
                        Draft&quot; in the add event form.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
  currentPage={currentPage}
  totalItems={events.length}
  defaultPerPage={perPage}
  onPageChange={(page) => setCurrentPage(page)}
  onPerPageChange={(value) => {
    setPerPage(value);
    setCurrentPage(1);
  }}
/>
      </div>
      

<ConfirmDeleteModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Delete Draft"
  message="Are you sure you want to delete this draft event?"
/>
    </div>
  );
}
