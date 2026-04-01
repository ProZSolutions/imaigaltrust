"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/app/component/DeleteModal/ConfirmDeleteModal";

interface EventItem {
  id: string;
  title: string;
  program?: string;
  status?: string;
  start_date?: string | null;
  start_time?: string | null;
  location?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDateIST = (date: string | Date | null | undefined) => {
    if (!date) return "-";
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatTimeIST = (dateTime: string | Date | null | undefined) => {
    if (!dateTime) return "-";

    const date = new Date(dateTime);

    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

//   const handleUpdate = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   try {
//     const res = await fetch(`/api/events/${eventId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       toast.success("Event updated successfully!");
//       // optional: redirect or refresh page
//     } else {
//       toast.error(data.message || "Update failed");
//     }
//   } catch (error) {
//     toast.error("Something went wrong");
//     console.error(error);
//   }
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
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const totalItems = events.length;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedEvents = events.slice(startIndex, endIndex);

  return (
<div className="space-y-6 w-full min-w-0">
      
      {/* Header */}
{/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">

  <div className="min-w-0">
    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
      Events
    </h1>

    <p className="text-sm text-gray-500">
      Manage charity events and community programs
    </p>
  </div>

  <Link
    href="/admin/events/add-event"
    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#096412] text-white rounded-lg hover:bg-[#074d0e] transition shadow font-semibold whitespace-nowrap"
  >
    <Plus size={18} />
    Add Event
  </Link>

</div>

      {/* Table */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full min-w-0">
  <div className="w-full overflow-x-auto">

    <table className="w-full min-w-[650px] table-auto text-sm">

      <thead className="bg-[#1a4d2e] text-white">
        <tr>

          <th className="px-3 py-3 w-[50px] text-xs uppercase">S.No</th>

          <th className="px-3 py-3 w-[160px] text-xs uppercase">
            Event Title
          </th>

          <th className="px-3 py-3 w-[120px] text-xs uppercase hidden md:table-cell">
            Program
          </th>

          <th className="px-3 py-3 w-[100px] text-xs uppercase">
            Status
          </th>

          <th className="px-3 py-3 w-[110px] text-xs uppercase">
            Start Date
          </th>

          <th className="px-3 py-3 w-[100px] text-xs uppercase hidden md:table-cell">
            Start Time
          </th>

          <th className="px-3 py-3 w-[150px] text-xs uppercase hidden lg:table-cell">
            Location
          </th>

          <th className="px-3 py-3 w-[120px] text-xs uppercase text-center">
            Actions
          </th>

        
        </tr>
      </thead>

      {/* BODY */}
      <tbody>

        {paginatedEvents.map((event: EventItem, index: number) => (

          <tr
  key={event.id}
  className="border-b border-gray-100 hover:bg-gray-50"
>

  <td className="px-4 py-3 text-center align-middle">
    {startIndex + index + 1}
  </td>

  <td className="px-2 py-3 font-medium truncate text-center align-middle">
    {event.title}
  </td>

  <td className="px-2 py-3 hidden md:table-cell text-center align-middle">
    {event.program}
  </td>

  <td className="px-2 py-3 text-center align-middle">
    <span
      className={`px-2 py-1 text-xs rounded-full ${
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

  <td className="px-2 py-3 text-center align-middle">
    {formatDateIST(event.start_date)}
  </td>

  <td className="px-2 py-3 hidden md:table-cell text-center align-middle">
    {formatTimeIST(event.start_time)}
  </td>

  <td className="px-2 py-3 truncate hidden lg:table-cell text-center align-middle">
    {event.location}
  </td>

  <td className="px-2 py-3 text-center align-middle">
    <div className="flex items-center justify-center gap-2">

      <Link
        href={`/admin/events/registrations?eventId=${event.id}`}
        className="p-2 text-[#096412] hover:bg-green-50 rounded-lg"
      >
        <Users size={18} />
      </Link>

      <Link
        href={`/admin/events/edit-event/${event.id}`}
        className="p-2 text-[#096412] hover:bg-green-50 rounded-lg"
      >
        <Edit size={18} />
      </Link>

      <button
        onClick={() => {
          setDeleteId(event.id);
          setShowDeleteModal(true);
        }}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
      >
        <Trash2 size={18} />
      </button>

    </div>
  </td>

</tr>
        ))}

      </tbody>

    </table>

  


</div>
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
      </div>

     

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