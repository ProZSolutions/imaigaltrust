"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

import {
  Users,
  Calendar,
  Mail,
  Phone,
  Clock,
  User,
  FileText,
  AlertCircle,
  Eye,
  X,
  Info,
  Check,
  Ban,
} from "lucide-react";

interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  source: string;
  motivation: string;
  special_requirements: string;
  created_at: string;
  status: number;
  reject_reason: string | null;
  cover_image: string | null;
  registration_start_date: string | null;
  registration_end_date: string | null;
  event: {
    title: string;
    location: string;
    cover_image: string | null;
    start_date: string;
    start_time: string;
    end_date: string | null;
    end_time: string | null;
    registration_start_date: string | null;
    registration_end_date: string | null;
    program: {
      programs: string;
    };
  };
}
export default function EventRegistrationsPage() {
  const router = useRouter();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const fetchRegistrations = async () => {
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();
      const eventId = searchParams.get("eventId");
      const url = eventId
        ? `/api/events/register?eventId=${eventId}`
        : "/api/events/register";

      const response = await fetch(url);
      const data = await response.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
      }
      if (data.event) {
        setEventInfo(data.event);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: number, reason?: string) => {
    try {
      const response = await fetch(`/api/events/register/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reject_reason: reason }),
      });

      if (response.ok) {
        toast.success(status === 1 ? "Registration approved!" : "Registration rejected");
        fetchRegistrations();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4 justify-end">
        <button
          onClick={() => router.push("/admin/events")}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded text-sml font-medium"
        >
          <IoArrowBack />
          Back
        </button>
      </div>
      {eventInfo && (
        <div className="bg-[#1a4d2e] rounded-xl p-6 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Calendar size={120} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-[10px] uppercase font-bold tracking-widest mb-1">Event Title</p>
                <h2 className="text-2xl font-black tracking-tight">{eventInfo.title}</h2>
              </div>
              {/* Note: Assuming status exists in event info or is passed down */}
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {registrations.length > 0 ? "Active Event" : "No Registrations"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-green-200/60 text-[10px] uppercase font-bold">Program</p>
                <p className="font-bold text-sm truncate">{eventInfo.program?.programs || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-green-200/60 text-[10px] uppercase font-bold">Start Date</p>
                <p className="font-bold text-sm">
                  {new Date(eventInfo.start_date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-green-200/60 text-[10px] uppercase font-bold">Start Time</p>
                <p className="font-bold text-sm">
                  {new Date(`1970-01-01T${eventInfo.start_time}`)
                    .toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-200/60 text-[10px] uppercase font-bold">Participants</p>
                <p className="font-black text-2xl">{registrations.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse table-auto">
            <thead className="bg-[#1a4d2e] text-white">
              <tr>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 w-[60px] text-center text-xs">
                  S.No
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-xs">
                  Name
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center border-r border-white/10 text-xs">
                  Age
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center border-r border-white/10 text-xs">
                  Gender
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-xs">
                  Email
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-center text-xs">
                  Phone
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-center text-xs">
                  Start Date
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-center text-xs">
                  End Date
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-center text-xs">
                  Reg. Date
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-center text-xs">
                  Status
                </th>
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-xs">
                  Source
                </th>
                <th className="p-4 font-bold uppercase tracking-wider w-[120px] text-center text-xs">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={11}
                    className="p-12 text-center text-gray-500 border-x border-gray-100"
                  >
                    <div className="flex justify-center items-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d2e]"></div>
                    </div>
                  </td>
                </tr>
              ) : registrations.length > 0 ? (
                registrations.map((reg, index) => (
                  <tr
                    key={reg.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-500 font-medium border-r border-gray-100 text-center text-xs">
                      {index + 1}
                    </td>
                    <td className="p-4 border-r border-gray-100">
                      <div className="font-bold text-gray-900 text-nowrap text-xs">
                        {reg.first_name} {reg.last_name}
                      </div>
                    </td>
                    <td className="p-4 text-center border-r border-gray-100">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold text-xs">
                        {reg.age}
                      </span>
                    </td>
                    <td className="p-4 text-center border-r border-gray-100">
                      <span className="text-gray-600 font-bold uppercase tracking-wider text-xs">
                        {reg.gender}
                      </span>
                    </td>
                    <td
                      className="p-4 text-[#1a4d2e] font-semibold border-r border-gray-100 truncate max-w-[150px] text-xs"
                      title={reg.email}
                    >
                      {reg.email}
                    </td>
                    <td className="p-4 text-gray-700 font-mono border-r border-gray-100 text-center text-xs">
                      {reg.phone}
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap border-r border-gray-100 text-center font-medium text-xs">
                      {new Date(reg.event.start_date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap border-r border-gray-100 text-center font-medium text-xs">
                      {reg.event.end_date
                        ? new Date(reg.event.end_date)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                        : "-"}
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap border-r border-gray-100 text-center font-medium text-xs">
                      {new Date(reg.created_at)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-4 text-center border-r border-gray-100">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        reg.status === 1 ? "bg-green-100 text-green-700" :
                        reg.status === 2 ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {reg.status === 1 ? "Approved" : reg.status === 2 ? "Rejected" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 italic whitespace-nowrap border-r border-gray-100 text-xs">
                      {reg.source || "-"}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-2 hover:bg-[#1a4d2e]/10 text-[#1a4d2e] rounded-full transition-colors group"
                          title="View Details"
                        >
                          <Eye
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(reg.id, 1)}
                          className={`p-2 rounded-full transition-colors ${reg.status === 1 ? "bg-green-100 text-green-600" : "hover:bg-green-100 text-green-600"}`}
                          title="Approve"
                          disabled={reg.status === 1}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt("Enter rejection reason:", reg.reject_reason || "");
                            if (reason !== null) {
                              handleStatusUpdate(reg.id, 2, reason);
                            }
                          }}
                          className={`p-2 rounded-full transition-colors ${reg.status === 2 ? "bg-red-100 text-red-600" : "hover:bg-red-100 text-red-600"}`}
                          title="Reject"
                          disabled={reg.status === 2}
                        >
                          <Ban size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={11}
                    className="p-12 text-center text-gray-500 border-x border-gray-100"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={48} className="text-gray-200" />
                      <p className="font-medium text-base">
                        No registrations yet
                      </p>
                      <p className="text-xs">
                        When users register for events, they will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      {/* Detail Modal Overlay */}
      {selectedReg && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 pointer-events-auto">
            {/* Modal Header */}
            <div className="bg-[#1a4d2e] p-6 text-white flex justify-between items-center">
              <div className="flex justify-center items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Registration Details</h3>
                    <p className="text-white/70 font-medium uppercase tracking-wider text-xs">
                      Registered on{" "}
                      {new Date(selectedReg.created_at)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h4 className="font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 text-xs">
                    Personal Information
                  </h4>
                  <div className="text-gray-300">
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem
                        label={<span className="text-black font-semibold text-xs">Full Name</span>}
                        value={<span className="text-gray-500 text-xs">{`${selectedReg.first_name} ${selectedReg.last_name}`}</span>}
                        icon={<User size={16} className="text-blue-600" />}
                      />
                      <DetailItem
                        label={<span className="text-black font-semibold text-xs">Age</span>}
                        value={<span className="text-gray-500 font-bold text-xs">{`${selectedReg.age} Years`}</span>}
                        icon={<Clock size={16} className="text-green-600" />}
                      />
                      <DetailItem
                        label={<span className="text-black font-semibold text-xs">Gender</span>}
                        value={<span className="text-gray-500 font-bold text-xs">{selectedReg.gender}</span>}
                        icon={<Users size={16} className="text-purple-600" />}
                      />
                      <DetailItem
                        label={<span className="text-black font-semibold text-xs">Source</span>}
                        value={<span className="text-gray-500 font-bold text-xs">{selectedReg.source || "-"}</span>}
                        icon={<Info size={16} className="text-yellow-600" />}
                      />
                      <DetailItem
                        label={<span className="text-black font-semibold text-xs">Status</span>}
                        value={
                          <span className={`font-bold text-xs ${
                            selectedReg.status === 1 ? "text-green-600" :
                            selectedReg.status === 2 ? "text-red-600" :
                            "text-yellow-600"
                          }`}>
                            {selectedReg.status === 1 ? "Approved" : selectedReg.status === 2 ? "Rejected" : "Pending"}
                          </span>
                        }
                        icon={<Info size={16} className={selectedReg.status === 1 ? "text-green-600" : selectedReg.status === 2 ? "text-red-600" : "text-yellow-600"} />}
                      />
                      {selectedReg.status === 2 && selectedReg.reject_reason && (
                        <div className="col-span-2">
                          <DetailItem
                            label={<span className="text-black font-semibold text-xs">Rejection Reason</span>}
                            value={<span className="text-red-500 italic text-xs">{selectedReg.reject_reason}</span>}
                            icon={<Ban size={16} className="text-red-500" />}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h4 className="font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 text-xs">
                    Contact Details
                  </h4>
                  <div className="space-y-4">
                    <DetailItem
                      label={<span className="text-black font-semibold text-xs">Email Address</span>}
                      value={<span className="text-gray-500 font-bold text-xs">{selectedReg.email}</span>}
                      icon={<Mail size={14} />}
                      highlight
                    />
                    <DetailItem
                      label={<span className="text-black font-semibold text-xs">Phone Number</span>}
                      value={<span className="text-gray-500 font-bold text-xs">{selectedReg.phone}</span>}
                      icon={<Phone size={14} />}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="md:col-span-2 space-y-6 mt-2">
                  <h4 className="font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 text-xs">
                    Participant Notes
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-xs">
                        <Info size={14} className="text-[#1a4d2e]" />
                        Motivation
                      </p>
                      <p className="text-sml text-gray-700 italic">
                        &quot;{selectedReg.motivation || "No motivation provided"}&quot;
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                      <p className="font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-xs">
                        <AlertCircle size={14} className="text-red-500" />
                        Special Requirements
                      </p>
                      <p className="text-red-700 font-medium text-xs">
                        {selectedReg.special_requirements || "None specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedReg(null)}
                className="px-6 py-2.5 bg-[#1a4d2e] text-white text-sml font-bold rounded-xl hover:bg-[#143d24] transition-all shadow-lg shadow-[#1a4d2e]/20"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  label,
  value,
  icon,
  highlight,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="font-bold text-gray-400 uppercase tracking-wider text-xs">
        {label}
      </p>
      <div
        className={`flex items-center gap-2 ${highlight ? "text-[#1a4d2e]" : "text-gray-800"}`}
      >
        {icon && <span className="opacity-50">{icon}</span>}
        <p className="font-bold truncate text-xs">{value}</p>
      </div>
    </div>
  );
}