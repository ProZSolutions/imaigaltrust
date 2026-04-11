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
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState<number | null>(null);

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
        setFilteredRegistrations(data.registrations);
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

  const handleRejectClick = (id: number, currentReason: string | null) => {
    setRejectingId(id);
    setRejectReason(currentReason || "");
    setRejectPopup(true);
  };

  const confirmReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Reject reason is mandatory");
      return;
    }
    if (rejectingId) {
      await handleStatusUpdate(rejectingId, 2, rejectReason);
      setRejectPopup(false);
      setRejectReason("");
      setRejectingId(null);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = registrations.filter(reg => {
      const matchesSearch = 
        reg.first_name.toLowerCase().includes(query) ||
        reg.last_name.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.phone.includes(query);
      
      const matchesStatus = 
        statusFilter === "all" || 
        reg.status.toString() === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredRegistrations(filtered);
  }, [searchQuery, statusFilter, registrations]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 mb-4">
        <div className="relative w-full sm:w-64 max-w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search registrations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] focus:border-[#1a4d2e] transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {eventInfo && (
        <div className="bg-white rounded-xl p-6 text-gray-900 shadow-md border border-gray-100 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 text-[#1a4d2e]/10 group-hover:scale-110 transition-transform">
            <Calendar size={120} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Event Title</p>
                <h2 className="text-2xl font-black tracking-tight text-[#1a4d2e]">{eventInfo.title}</h2>
              </div>
              <span className="bg-green-50 text-[#1a4d2e] border border-green-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {registrations.length > 0 ? "Active Event" : "No Registrations"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Program</p>
                <p className="font-bold text-xs sm:text-sm truncate text-gray-700">{eventInfo.program?.programs || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Start Date</p>
                <p className="font-bold text-xs sm:text-sm text-gray-700">
                  {new Date(eventInfo.start_date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Start Time</p>
                <p className="font-bold text-xs sm:text-sm text-gray-700">
                  {eventInfo.start_time ?
                    (() => {
                      const [hours, minutes] = eventInfo.start_time.split(':');
                      const h = parseInt(hours);
                      const m = minutes || '00';
                      const ampm = h >= 12 ? 'PM' : 'AM';
                      const h12 = h % 12 || 12;
                      return `${h12}:${m} ${ampm}`;
                    })()
                    : "N/A"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Participants</p>
                <p className="font-black text-xl sm:text-2xl text-[#1a4d2e]">{registrations.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-100 w-fit shadow-sm">
        {[
          { id: "all", label: "All", count: registrations.length },
          { id: "0", label: "Pending", count: registrations.filter(r => r.status === 0).length },
          { id: "1", label: "Approved", count: registrations.filter(r => r.status === 1).length },
          { id: "2", label: "Rejected", count: registrations.filter(r => r.status === 2).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              statusFilter === tab.id
                ? "bg-white text-[#1a4d2e] shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
              statusFilter === tab.id ? "bg-[#1a4d2e] text-white" : "bg-gray-200 text-gray-600"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1000px] md:min-w-[1100px] text-left border-collapse table-auto">
            <thead className="bg-[#1a4d2e] text-white">
              <tr>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 w-[60px] text-center text-[10px]">
                  S.No
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-[10px]">
                  Full Name
                </th>
                <th className="p-3 font-bold uppercase tracking-wider text-center border-r border-white/10 text-[10px] w-[80px]">
                  Age
                </th>
                <th className="p-3 font-bold uppercase tracking-wider text-center border-r border-white/10 text-[10px] w-[100px]">
                  Gender
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-[10px] min-w-[180px]">
                  Email Address
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-center text-[10px] w-[110px]">
                  Phone
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-center text-[10px] w-[100px]">
                  Start Date
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-center text-[10px] w-[100px]">
                  End Date
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-center text-[10px] w-[100px]">
                  Reg. Date
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-center text-[10px] w-[100px]">
                  Status
                </th>
                <th className="p-3 font-bold uppercase tracking-wider border-r border-white/10 text-[10px] w-[100px]">
                  Source
                </th>
                <th className="p-3 font-bold uppercase tracking-wider w-[140px] text-center text-[10px]">
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
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg, index) => (
                  <tr
                    key={reg.id}
                    className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="p-3 text-gray-500 font-medium border-r border-gray-100 text-center text-[11px]">
                      {index + 1}
                    </td>
                    <td className="p-3 border-r border-gray-100">
                      <div className="font-bold text-gray-900 whitespace-nowrap text-[11px]">
                        {reg.first_name} {reg.last_name}
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-gray-100 text-gray-600 font-bold text-[11px]">
                      {reg.age}
                    </td>
                    <td className="p-3 text-center border-r border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                      {reg.gender}
                    </td>
                    <td
                      className="p-3 text-[#1a4d2e] font-semibold border-r border-gray-100 whitespace-nowrap text-[11px]"
                      title={reg.email}
                    >
                      {reg.email}
                    </td>
                    <td className="p-3 text-gray-700 font-mono border-r border-gray-100 text-center text-[11px]">
                      {reg.phone}
                    </td>
                    <td className="p-3 text-gray-600 whitespace-nowrap border-r border-gray-100 text-center font-medium text-[11px]">
                      {new Date(reg.event.start_date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-3 text-gray-600 whitespace-nowrap border-r border-gray-100 text-center font-medium text-[11px]">
                      {reg.event.end_date
                        ? new Date(reg.event.end_date)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                        : "-"}
                    </td>
                    <td className="p-3 text-gray-500 whitespace-nowrap border-r border-gray-100 text-center font-medium text-[11px]">
                      {new Date(reg.created_at)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-3 text-center border-r border-gray-100">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${reg.status === 1 ? "bg-green-50 text-green-700 border-green-100" :
                          reg.status === 2 ? "bg-red-50 text-red-700 border-red-100" :
                            "bg-yellow-50 text-yellow-700 border-yellow-100"
                        }`}>
                        {reg.status === 1 ? "Approved" : reg.status === 2 ? "Rejected" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 italic whitespace-nowrap border-r border-gray-100 text-[10px]">
                      {reg.source || "-"}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all group border border-blue-100"
                          title="View Details"
                        >
                          <Eye
                            size={14}
                            className="group-hover:scale-110 transition-transform"
                          />
                        </button>
                        {reg.status === 0 && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(reg.id, 1)}
                              className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-all border border-green-100"
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleRejectClick(reg.id, reg.reject_reason)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all border border-red-100"
                              title="Reject"
                            >
                              <Ban size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={12}
                    className="p-12 text-center text-gray-300 border-x border-gray-50"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={40} className="text-gray-200" />
                      <p className="font-bold text-gray-400 text-xs">
                        {searchQuery ? "No matching records found" : "No registrations yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                          <span className={`font-bold text-xs ${selectedReg.status === 1 ? "text-green-600" :
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
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-3">
              <div className="flex gap-2">
                {selectedReg.status === 0 && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedReg.id, 1);
                        setSelectedReg(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-all shadow-md flex items-center gap-2"
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectClick(selectedReg.id, selectedReg.reject_reason);
                        setSelectedReg(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-all shadow-md flex items-center gap-2"
                    >
                      <Ban size={14} />
                      Reject
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Popup */}
      {rejectPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <Ban size={24} />
              <h2 className="font-black uppercase tracking-widest text-sm">Reject Application</h2>
            </div>
            <p className="text-gray-500 text-[11px] mb-4">Please provide a reason for rejecting this registration. This will be visible to the admin team.</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason here..."
              className="w-full border border-gray-200 rounded-xl p-3 mb-5 text-[11px] focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none h-32 resize-none transition-all placeholder:text-gray-300"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setRejectPopup(false);
                  setRejectReason("");
                  setRejectingId(null);
                }}
                className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-[11px] font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-5 py-2 bg-red-600 text-white rounded-xl text-[11px] font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Confirm Reject
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