"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast, { Toaster } from "react-hot-toast";

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
  const handleApprove = async () => {
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member to approve");
      return;
    }
    try {
      await fetch("/api/membership/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedMembers, status: 1 }),
      });
      setMemberships((prev) =>
        prev.map((m) =>
          selectedMembers.includes(m.id) ? { ...m, status: "approved" } : m
        )
      );
      toast.success("Selected member(s) approved successfully!");
      setSelectedMembers([]);
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
        onClick={handleApprove}
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

  
{/* Desktop Table */}
<div className="w-full md:overflow-x-scroll overflow-x-auto">
      <table className="min-w-[900px] md:min-w-full text-left border-collapse text-xs">
    
    <thead className="bg-[#1a4d2e] text-white">
      <tr>
        <th className="py-2">S.No</th>
        <th className="py-2">Select</th>
        <th className="py-2">Name</th>
        <th className="py-2">Contact</th>
        <th className="py-2">Location</th>
        <th className="py-2">Membership</th>
        <th className="py-2">Donation</th>
        <th className="py-2">Status</th>
        <th className="py-2">Applied Date</th>
        
      </tr>
    </thead>

    <tbody>
      {currentData.map((m, i) => (
        <tr key={m.id} className="border-b hover:bg-gray-50 transition">
          <td className="py-2 text-xs">{startIndex + i + 1}</td>
            <td className="py-2 text-xs">
              {m.status === "pending" && (
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(m.id)}
                  onChange={(e) =>
                    e.target.checked
                      ? setSelectedMembers([...selectedMembers, m.id])
                      : setSelectedMembers(selectedMembers.filter((id) => id !== m.id))
                  }
                  className="w-4 h-4 cursor-pointer"
                />
              )}
            </td>
            <td className="py-2 text-xs">{m.name}</td>
            <td className="py-2 text-xs">
              {m.email} <br />
              <span className="text-gray-400 text-xs">{m.mobile}</span>
            </td>
            <td className="py-2 text-xs">
  {m.city}, <span className="text-gray-400 text-xs">{m.state}</span>
</td>
            <td className="py-2 text-xs">{m.membership_type}</td>
            <td className="py-2 text-xs">{m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}</td>
            <td className="py-2 text-left">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  m.status === "approved"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : m.status === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                }`}
              >
                {m.status}
              </span>
            </td>
            <td className="py-2 text-xs">
              {new Date(m.created_at).toLocaleDateString("en-GB").replace(/\//g, "-")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="sm:hidden space-y-4">
    {currentData.map((m) => (
      <div key={m.id} className="bg-white p-4 rounded-xl shadow border border-gray-100 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-xs">{m.name}</h3>
            <p className="text-gray-400 text-xs">{m.email} | {m.mobile}</p>
          </div>
          {m.status === "pending" && (
            <input
              type="checkbox"
              checked={selectedMembers.includes(m.id)}
              onChange={(e) =>
                e.target.checked
                  ? setSelectedMembers([...selectedMembers, m.id])
                  : setSelectedMembers(selectedMembers.filter((id) => id !== m.id))
              }
              className="w-4 h-4 cursor-pointer"
            />
          )}
        </div>
        <p className="mt-1 text-xs">Location: {m.city}, {m.state}</p>
        <p className="mt-1 text-xs">Membership: {m.membership_type}</p>
        <p className="mt-1 text-xs">Donation: {m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}</p>
        <p className="mt-1 text-xs">
          Status:{" "}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              m.status === "approved"
                ? "bg-green-100 text-green-700 border border-green-200"
                : m.status === "rejected"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
            }`}
          >
            {m.status}
          </span>
        </p>
        <p className="mt-1 text-xs">
          Applied: {new Date(m.created_at).toLocaleDateString("en-GB").replace(/\//g, "-")}
        </p>
      </div>
    ))}
  </div>


{/* Reject Popup */}
{rejectPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-sm z-[9999]">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="font-semibold mb-4 text-base">Reject Members</h2>
      <textarea 
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        placeholder="Enter reject reason..."
        className="w-full border border-gray-300 rounded-md p-2 mb-4 text-xs"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setRejectPopup(false)}
          className="px-4 py-2 bg-gray-300 rounded-md text-xs"
        >
          Cancel
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-600 text-white rounded-md text-xs"
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