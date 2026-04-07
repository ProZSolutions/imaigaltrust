"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/component/Pagination/Pagination";
import toast, { Toaster } from "react-hot-toast";

interface Membership {
  id: number;
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
  id: number;
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
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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

  const totalItems = memberships.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = memberships.slice(startIndex, endIndex);

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
        body: JSON.stringify({ ids: selectedMembers, status: "approved" }),
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
          status: "rejected",
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
    <div className=" w-[650px] mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex w-[650px] flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Membership Data</h1>
          <p className="text-sm text-gray-500">View and manage organization members</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleApprove}
            disabled={selectedMembers.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold w-full sm:w-auto"
          >
            Approve
          </button>
          <button
            onClick={() => setRejectPopup(true)}
            disabled={selectedMembers.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold w-full sm:w-auto"
          >
            Reject
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d2e]"></div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden  w-[650px] sm:block bg-white rounded-2xl shadow overflow-x-auto border border-gray-100">
            <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[#1a4d2e] text-white">
                <tr>
                  <th className="px-3 py-2">S.No</th>
                  <th className="px-3 py-2">Select</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">Membership</th>
                  <th className="px-3 py-2">Donation</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((m, i) => (
                  <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-3 py-2">{startIndex + i + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(m.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedMembers([...selectedMembers, m.id])
                            : setSelectedMembers(selectedMembers.filter((id) => id !== m.id))
                        }
                        disabled={m.status !== "pending"}
                        className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-3 py-2">{m.name}</td>
                    <td className="px-3 py-2">
                      {m.email} <br />
                      <span className="text-gray-400">{m.mobile}</span>
                    </td>
                    <td className="px-3 py-2">
                      {m.city}, {m.state}
                    </td>
                    <td className="px-3 py-2">{m.membership_type}</td>
                    <td className="px-3 py-2">
                      {m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          m.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : m.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2">{new Date(m.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {currentData.map((m) => (
              <div key={m.id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-sm">{m.name}</h3>
                    <p className="text-xs text-gray-400">{m.email} | {m.mobile}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(m.id)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedMembers([...selectedMembers, m.id])
                        : setSelectedMembers(selectedMembers.filter((id) => id !== m.id))
                    }
                    disabled={m.status !== "pending"}
                    className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs mt-1">Location: {m.city}, {m.state}</p>
                <p className="text-xs mt-1">Membership: {m.membership_type}</p>
                <p className="text-xs mt-1">Donation: {m.voluntaryDonation > 0 ? `₹${m.voluntaryDonation}` : "Free"}</p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      m.status === "approved"
                        ? "bg-green-800 text-white"
                        : m.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-800 text-white"
                    }`}
                  >
                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                  </span>
                </p>
                <p className="text-xs mt-1">Applied: {new Date(m.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            defaultPerPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
            onPerPageChange={(value) => setPerPage(value)}
          />
        </>
      )}

      {/* Reject Popup */}
      {rejectPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-3">Reject Reason</h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full border p-2 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRejectPopup(false)} className="px-4 py-2 bg-gray-200 rounded-lg">
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className={`px-4 py-2 text-white rounded-lg ${
                  rejectReason.trim() ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}