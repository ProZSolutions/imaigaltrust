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

//use effect to fetch data
  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch("/api/membership");
        const data = await response.json();

       const enrichedData: Membership[] = (data.memberships || []).map((m: RawMembership) => ({
  ...m,
  voluntaryDonation: Number(m.voluntaryDonation) || 0,
status: m.status || "pending",}));

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

//approeve
 const handleApprove = async () => {
  if (selectedMembers.length === 0) {
    toast.error("Please select at least one member to approve");
    return;
  }

  try {
    await fetch("/api/membership/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: selectedMembers,
        status: "approved",
      }),
    });

    setMemberships((prev) =>
      prev.map((member) =>
        selectedMembers.includes(member.id)
          ? { ...member, status: "approved" }
          : member
      )
    );

    toast.success("Selected member(s) approved successfully!"); 

    setSelectedMembers([]);
  } catch (error) {
    console.error(error);
    toast.error("Failed to approve members");
  }
};

//reject 
const handleReject = async () => {
  if (!rejectReason.trim()) {
    toast.error("Reject reason is mandatory"); 
    return;
  }

  try {
    await fetch("/api/membership/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: selectedMembers,
        status: "rejected",
        reason: rejectReason,
      }),
    });

    setMemberships((prev) =>
      prev.map((member) =>
        selectedMembers.includes(member.id)
          ? { ...member, status: "rejected" }
          : member
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      {/* Header + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Membership Data</h1>
          <p className="text-sm text-gray-500">
            View and manage organization members
          </p>
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
          <div className="hidden sm:block bg-white rounded-2xl shadow overflow-x-auto border border-gray-100">
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
                {currentData.map((member, index) => (
                  <tr
                    key={member.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2">{startIndex + index + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedMembers([...selectedMembers, member.id])
                            : setSelectedMembers(
                                selectedMembers.filter((id) => id !== member.id)
                              )
                        }
                        disabled={member.status !== "pending"}
                        className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-3 py-2">{member.name}</td>
                    <td className="px-3 py-2">
                      {member.email} <br />
                      <span className="text-gray-400">{member.mobile}</span>
                    </td>
                    <td className="px-3 py-2">
                      {member.city}, {member.state}
                    </td>
                    <td className="px-3 py-2">{member.membership_type}</td>
                    <td className="px-3 py-2">
                      {member.voluntaryDonation > 0
                        ? `₹${member.voluntaryDonation}`
                        : "Free"}
                    </td>
                    <td className="px-3 py-2">
                      {member.status === "approved" && (
                        <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">
                          Approved
                        </span>
                      )}
                      {member.status === "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                      {member.status === "rejected" && (
                        <span className="bg-red-800 text-white px-2 py-1 rounded-full text-xs">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {currentData.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-400">
                      {member.email} | {member.mobile}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedMembers([...selectedMembers, member.id])
                        : setSelectedMembers(
                            selectedMembers.filter((id) => id !== member.id)
                          )
                    }
                    disabled={member.status !== "pending"}
                    className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs mt-1">
                  Location: {member.city}, {member.state}
                </p>
                <p className="text-xs mt-1">
                  Membership: {member.membership_type}
                </p>
                <p className="text-xs mt-1">
                  Donation: {member.voluntaryDonation > 0
                    ? `₹${member.voluntaryDonation}`
                    : "Free"}
                </p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  {member.status === "approved" ? (
                    <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">
                      Approved
                    </span>
                  ) : member.status === "pending" ? (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  ) : (
                    <span className="bg-red-800 text-white px-2 py-1 rounded-full text-xs">
                      Rejected
                    </span>
                  )}
                </p>
                <p className="text-xs mt-1">
                  Applied: {new Date(member.created_at).toLocaleDateString()}
                </p>
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
              required
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className={`px-4 py-2 text-white rounded-lg ${
                  rejectReason.trim()
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
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