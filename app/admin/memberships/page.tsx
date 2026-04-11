"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast, { Toaster } from "react-hot-toast";
import { Ban } from "lucide-react";

interface Membership {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  membership_type: string;
  voluntaryDonation: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface RawMembership {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  membership_type: string;
  voluntaryDonation: string | number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch("/api/membership");
        const data = await response.json();
        const enrichedData: Membership[] = (data.memberships || []).map(
          (m: RawMembership) => ({
            ...m,
            voluntaryDonation: Number(m.voluntaryDonation) || 0,
            status: m.status || "pending",
          })
        );
        setMemberships(enrichedData);
      } catch (error) {
        console.error("Failed to fetch memberships:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMemberships();
  }, []);

  const filteredMemberships = memberships.filter((m) =>
    statusFilter === "all" ? true : m.status === statusFilter
  );

  const totalItems = filteredMemberships.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = filteredMemberships.slice(startIndex, endIndex);

  // Approve members
  const handleApprove = async (ids?: string[]) => {
    const targetIds = ids || selectedMembers;
    if (targetIds.length === 0) {
      toast.error("Please select at least one member to approve");
      return;
    }
    try {
      await fetch("/api/membership/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: targetIds, status: 1 }),
      });
      setMemberships((prev) =>
        prev.map((m) =>
          targetIds.includes(m.id) ? { ...m, status: "approved" } : m
        )
      );
      toast.success("Member(s) approved successfully!");
      if (!ids) setSelectedMembers([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve members");
    }
  };

  // Reject members
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Reject reason is mandatory");
      return;
    }
    try {
      await fetch("/api/membership/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedMembers,
          status: 2,
          reason: rejectReason,
        }),
      });
      setMemberships((prev) =>
        prev.map((m) =>
          selectedMembers.includes(m.id) ? { ...m, status: "rejected" } : m
        )
      );
      toast.success("Selected member(s) rejected successfully!");
      setRejectPopup(false);
      setRejectReason("");
      setSelectedMembers([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject members");
    }
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 mx-auto">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm mb-6 w-full">
        <div>
          <h1 className="font-bold text-gray-800 text-xl">Membership Data</h1>
          <p className="text-gray-500 text-xs">View and manage organization members</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => handleApprove()}
            disabled={selectedMembers.length === 0}
            className="px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold w-full md:w-auto text-xs transition-all"
          >
            Approve
          </button>
          <button
            onClick={() => setRejectPopup(true)}
            disabled={selectedMembers.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold w-full md:w-auto text-xs transition-all"
          >
            Reject
          </button>
        </div>
      </div>


      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1200px] text-left border-collapse text-xs">
            <thead className="bg-[#1a4d2e] text-white">
              <tr>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Select</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Membership</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Donation</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider text-center">Status</th>
                <th className="px-4 py-3 font-bold uppercase tracking-wider">Applied Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d2e]"></div>
                      <span>Loading memberships...</span>
                    </div>
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center text-gray-500 font-bold">
                    <p className="text-lg mb-1">No registrations found</p>
                    <p className="text-gray-400 font-normal">There are no records matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                currentData.map((m, i) => (
                  <tr key={m.id} className="hover:bg-green-50/30 transition-colors group">
                    <td className="px-4 py-4 text-gray-500 font-medium">{startIndex + i + 1}</td>
                    <td className="px-4 py-4 text-xs">
                      {m.status === "pending" && (
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(m.id)}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedMembers([...selectedMembers, m.id])
                              : setSelectedMembers(
                                selectedMembers.filter((id) => id !== m.id)
                              )
                          }
                          className="w-4 h-4 rounded border-gray-300 text-[#1a4d2e] focus:ring-[#1a4d2e] cursor-pointer"
                        />
                      )}
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">{m.name}</td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-700">{m.email}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">{m.mobile}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-700 font-medium">{m.city}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">{m.state}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-700 font-medium">
                        {m.membership_type}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${m.status === "approved"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : m.status === "rejected"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 font-medium italic min-w-[120px]">
                      <div className="flex flex-col">
                        <span className="text-gray-700">
                          {new Date(m.created_at)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </span>
                        <span className="text-[10px] text-gray-400 not-italic">
                          {new Date(m.created_at).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards - Shown only on mobile */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d2e]"></div>
            <span className="mt-2 text-gray-400 text-xs font-medium">Loading members...</span>
          </div>
        ) : currentData.length === 0 ? (
          <div className="p-16 text-center text-gray-500 font-bold bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
            No registrations found
          </div>
        ) : (
          currentData.map((m) => (
            <div
              key={m.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base">{m.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${m.status === "approved"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : m.status === "rejected"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                    >
                      {m.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(m.created_at).toLocaleDateString("en-GB").replace(/\//g, "-")}
                    </span>
                  </div>
                </div>
                {m.status === "pending" && (
                  <div className="ml-4 pt-1">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(m.id)}
                      onChange={(e) =>
                        e.target.checked
                          ? setSelectedMembers([...selectedMembers, m.id])
                          : setSelectedMembers(
                            selectedMembers.filter((id) => id !== m.id)
                          )
                      }
                      className="w-5 h-5 rounded-lg border-gray-300 text-[#1a4d2e] focus:ring-[#1a4d2e] cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-50 text-[11px]">
                <div className="space-y-1">
                  <p className="text-gray-400 font-medium uppercase tracking-tighter">Contact</p>
                  <p className="text-gray-700 font-bold">{m.email}</p>
                  <p className="text-gray-500 font-semibold">{m.mobile}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-medium uppercase tracking-tighter">Location</p>
                  <p className="text-gray-700 font-bold">{m.city}</p>
                  <p className="text-gray-500 font-semibold">{m.state}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-medium">Membership</span>
                  <span className="font-bold text-gray-800 text-xs">{m.membership_type}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-medium">Donation</span>
                  <p className="font-black text-[#1a4d2e] text-sm">
                    {m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}
                  </p>
                </div>
              </div>

              {m.status === "pending" && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleApprove([m.id])}
                    className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-green-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMembers([m.id]);
                      setRejectPopup(true);
                    }}
                    className="flex-1 py-2 bg-red-50 text-red-700 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>


      {/* Reject Popup */}
      {rejectPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <Ban size={24} />
              <h2 className="font-black uppercase tracking-widest text-sm">Reject Members</h2>
            </div>
            <p className="text-gray-500 text-[11px] mb-4">Please provide a reason for rejecting these membership applications. This will be recorded for future reference.</p>
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
                }}
                className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-[11px] font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 bg-red-600 text-white rounded-xl text-[11px] font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        defaultPerPage={perPage}
        onPageChange={(page) => setCurrentPage(page)}
        onPerPageChange={(value) => setPerPage(value)}
      />
    </div>

  );
}