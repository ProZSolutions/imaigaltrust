"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

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
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const eventInfo = registrations.length > 0 ? registrations[0].event : null;

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
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {eventInfo.cover_image && (
                <div className="w-full md:w-72 h-48 md:h-auto overflow-hidden shrink-0 border-r border-gray-100 italic relative">
                  <Image
                    src={eventInfo.cover_image}
                    alt={eventInfo.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                  <div className="col-span-2 lg:col-span-4 mb-2">
                    <p className="font-bold text-black uppercase tracking-[0.2em] mb-1 text-xs">
                      Event Name
                    </p>
                    <h1 className="font-extrabold text-[#2d2a4a] tracking-tight text-2xl">
                      {eventInfo.title}
                    </h1>
                  </div>

                  <div>
                    <p className="font-bold text-black uppercase tracking-[0.15em] mb-2 text-xs">
                      Event Period
                    </p>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800 flex items-center gap-2 text-xs">
                        <Calendar size={14} className="text-[#1a4d2e]" />
                        {new Date(eventInfo.start_date)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </p>
                      {eventInfo.end_date && (
                        <p className="font-semibold text-gray-500 flex items-center gap-2 text-xs">
                          <Clock size={14} className="text-gray-300" />
                          Ends:{" "}
                          {new Date(eventInfo.end_date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-black uppercase tracking-[0.15em] mb-2 text-xs">
                      Registration Dates
                    </p>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800 flex items-center gap-2 text-xs">
                        <FileText size={14} className="text-blue-500" />
                        {eventInfo.registration_start_date
                          ? new Date(eventInfo.registration_start_date)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : "Not set"}
                      </p>
                      {eventInfo.registration_end_date && (
                        <p className="font-semibold text-red-500 flex items-center gap-2 text-xs">
                          <AlertCircle size={14} className="text-red-300" />
                          Closes:{" "}
                          {new Date(eventInfo.registration_end_date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-black uppercase tracking-[0.15em] mb-2 text-xs">
                      Location / Venue
                    </p>
                    <p className="font-bold text-gray-800 flex items-start gap-2 text-xs">
                      <User
                        size={14}
                        className="text-[#1a4d2e] shrink-0 mt-0.5"
                      />
                      {eventInfo.location}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-black uppercase tracking-[0.15em] mb-2 text-right text-xs">
                      Total Impact
                    </p>
                    <div className="text-right">
                      <p className="font-black text-[#1a4d2e] text-xl">
                        {registrations.length}
                      </p>
                      <p className="font-black text-gray-500 uppercase tracking-widest text-xs">
                        REGISTERED PARTICIPANTS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button className="px-4 py-3 font-black text-[#1a4d2e] border-b-2 border-[#1a4d2e] uppercase tracking-[0.1em] text-xs">
                Registrations List
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-auto">
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
                <th className="p-4 font-bold uppercase tracking-wider border-r border-white/10 text-xs">
                  Source
                </th>
                <th className="p-4 font-bold uppercase tracking-wider w-[80px] text-center text-xs">
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
                    <td className="p-4 text-gray-600 italic whitespace-nowrap border-r border-gray-100 text-xs">
                      {reg.source || "-"}
                    </td>
                    <td className="p-4 text-center">
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