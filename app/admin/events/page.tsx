"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


const formatDateIST = (date: string | Date | null) => {
  if (!date) return "-";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
const formatTimeIST = (dateTime: string | Date | null) => {
  if (!dateTime) return "-";

  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
// const formatTimeIST = (timeString: string) => {
//   if (!timeString) return "-";

//   const date = new Date(`1970-01-01T${timeString}`);

//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

  const handleDelete = async () => {
  if (!deleteId) return;

  try {
    const response = await fetch(`/api/events/${deleteId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Event deleted successfully");
      fetchEvents();
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch {
    toast.error("Something went wrong");
  } finally {
    setShowDeleteModal(false);
    setDeleteId(null);
  }
};

  //pagination

  const totalItems = events.length;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedEvents = events.slice(startIndex, endIndex);
//model delete 
const [deleteId, setDeleteId] = useState<string | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          <p className="text-sm text-gray-500">
            Manage charity events and community programs
          </p>
        </div>
        <Link
          href="/admin/events/add-event"
          className="flex items-center gap-2 bg-[#096412] hover:bg-[#074d0e] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/10 transition-all duration-300 active:scale-95"
        >
          <Plus size={20} />
          Add Event
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  
  <div className="w-full overflow-x-auto">

    <table className="min-w-[1400px] w-full text-left border-collapse">

      <thead className="bg-[#1a4d2e] text-white">
        <tr>
          <th className="p-4 font-bold w-16 uppercase text-xs">S.No</th>
          <th className="p-4 font-bold uppercase text-xs">Event Title</th>
          <th className="p-4 font-bold uppercase text-xs">Program</th>
          <th className="p-4 font-bold uppercase text-xs">Status</th>
          <th className="p-4 font-bold uppercase text-xs">Start Date</th>
          <th className="p-4 font-bold uppercase text-xs">End Date</th>
          <th className="p-4 font-bold uppercase text-xs">Start Time</th>
          <th className="p-4 font-bold uppercase text-xs">End Time</th>
          <th className="p-4 font-bold uppercase text-xs">Location</th>
          <th className="p-4 font-bold uppercase text-xs text-center">Actions</th>
        </tr>
      </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    <div className="flex justify-center items-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d2e]"></div>
                    </div>
                  </td>
                </tr>
              ) : paginatedEvents.length > 0 ? (
                paginatedEvents.map(
                  (
                    event: {
                      id: string;
                      title: string;
                      program: string;
                      status: string;
                      start_date: string;
                      end_date?: string;
                      start_time:string;
                      end_time?:string;
                      location: string;
                    },
                    index: number,
                  ) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">{startIndex + index + 1}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {event.title}
                      </td>
                      <td className="p-4 text-gray-600">{event.program}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            event.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : event.status === "ongoing"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                     <td className="p-4 text-gray-600 text-sm whitespace-nowrap">
  {formatDateIST(event.start_date)}
</td>

<td className="p-4 text-gray-600 text-sm whitespace-nowrap">
  {event.end_date ? formatDateIST(event.end_date) : "-"}
</td>

<td className="p-4 text-gray-600 text-sm whitespace-nowrap">
  {formatTimeIST(event.start_time)}
</td>

<td className="p-4 text-gray-600 text-sm whitespace-nowrap">
  {event.end_time ? formatTimeIST(event.end_time) : "-"}
</td>
                      <td className="p-4 text-gray-600">{event.location}</td>
                      <td className="p-4 py-5">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/events/registrations?eventId=${event.id}`}
                            className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-all duration-200 border border-transparent hover:border-green-100"
                            title="View Registrations"
                          >
                            <Users size={18} />
                          </Link>
                          <Link
                            href={`/admin/events/edit-event/${event.id}`}
                            className="p-2 text-[#096412] hover:bg-green-50 rounded-lg transition-all duration-200 border border-transparent hover:border-green-100"
                            title="Edit"
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
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No events found. Click &quot;Add Event&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
      {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          defaultPerPage={perPage}
          onPageChange={(page) => setCurrentPage(page)}
          onPerPageChange={(count) => {
            setPerPage(count);
            setCurrentPage(1);
          }}
        />
        <ConfirmDeleteModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Delete Event"
  message="Are you sure you want to delete this event?"
/>
    
    </div>
  );
}
