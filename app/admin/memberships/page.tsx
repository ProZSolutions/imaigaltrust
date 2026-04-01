"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/component/Pagination/Pagination";

interface Membership {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  membership_type: string;
  voluntaryDonation: number;
  approved: boolean;
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
  approved: boolean | string;
  created_at: string;
}

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch("/api/membership");
        const data = await response.json();

        const enrichedData: Membership[] = (data.memberships || []).map((m: RawMembership) => ({
          ...m,
          voluntaryDonation: Number(m.voluntaryDonation) || 0,
          approved: Boolean(m.approved),
        }));

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

  const handleApprovalToggle = (id: number) => {
    setMemberships((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, approved: !m.approved } : m
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Membership Data</h1>
          <p className="text-sm text-gray-500">
            View and manage organization members
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d2e]"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[900px] w-full text-left border-collapse">
                <thead className="bg-[#1a4d2e] text-white">
                  <tr>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">S.No</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Name</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Contact</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Location</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Membership Type</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Voluntary Donation</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Approval</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Applied Date</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((member, index) => (
                      <tr
                        key={member.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-xs sm:text-sm">
                          {startIndex + index + 1}
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          {member.name}
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          <div>{member.email}</div>
                          <div className="text-xs text-gray-400">
                            {member.mobile}
                          </div>
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          {member.city}, {member.state}
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          <span className="px-2 py-1 text-xs rounded-full text-green-800">
                            {member.membership_type}
                          </span>
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          {member.voluntaryDonation > 0 ? (
  <span className="text-green-600 font-semibold">
    Paid ₹{member.voluntaryDonation}
  </span>
) : (
  <span className="text-gray-500">Free</span>
)}
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          <input
                            type="checkbox"
                            checked={member.approved}
                            onChange={() =>
                              handleApprovalToggle(member.id)
                            }
                            className="w-5 h-5 cursor-pointer"
                          />
                        </td>

                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-10 text-gray-500"
                      >
                        No memberships found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            defaultPerPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
            onPerPageChange={(value) => setPerPage(value)}
          />
        </>
      )}
    </div>
  );
}