"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, FileText, Layers, DollarSign, UserPlus, CheckCircle, XCircle } from "lucide-react";

type Counts = {
  totalMembers: number;
  paidMembers: number;
  freeVolunteers: number;
  pendingMembers: number;
  approvedMembers: number;
  rejectedMembers: number;
  totalEvents: number;
  pendingApprovals: number;
  membershipRevenue: number;
  ongoingEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  draftEvents: number;
  registerCount: number;
  annualReportCount: number;
};

type CardProps = {
  icon: React.ReactNode;
  title: string;
  count: number | string;
  color: "green" | "blue" | "yellow" | "purple" | "red" | "indigo";
};

function Card({ icon, title, count, color }: CardProps) {
  const bgColors: Record<CardProps["color"], string> = {
    green: "from-green-100 to-green-200",
    blue: "from-blue-100 to-blue-200",
    yellow: "from-yellow-100 to-yellow-200",
    purple: "from-purple-100 to-purple-200",
    red: "from-red-100 to-red-200",
    indigo: "from-indigo-100 to-indigo-200",
  };
  const textColors: Record<CardProps["color"], string> = {
    green: "text-green-800",
    blue: "text-blue-800",
    yellow: "text-yellow-800",
    purple: "text-purple-800",
    red: "text-red-800",
    indigo: "text-indigo-800",
  };
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${bgColors[color]} shadow-lg transform hover:-translate-y-1 transition-all`}>
      <div className="flex items-center justify-between mb-3 text-xl">{icon}</div>
      <h3 className="font-semibold text-gray-700 text-xs">{title}</h3>
      <p className={`text-2xl font-bold ${textColors[color]} mt-1`}>{count}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts>({
    totalMembers: 0,
    paidMembers: 0,
    freeVolunteers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    totalEvents: 0,
    pendingApprovals: 0,
    membershipRevenue: 0,
    ongoingEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    draftEvents: 0,
    registerCount: 0,
    annualReportCount: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="space-y-12 p-6">

      {/* ===== Platform Summary (Blue) ===== */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-xl border border-blue-200">
        <h2 className="font-bold text-blue-800 mb-6 text-xl">Platform Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card icon={<Users className="text-blue-600" />} title="Total Members" count={counts.totalMembers} color="blue" />
          <Card icon={<Layers className="text-purple-600" />} title="Total Events" count={counts.totalEvents} color="purple" />
          <Card icon={<UserPlus className="text-yellow-600" />} title="Pending Approvals" count={counts.pendingApprovals} color="yellow" />
          <Card icon={<DollarSign className="text-green-600" />} title="Membership Revenue" count={`₹${counts.membershipRevenue}`} color="green" />
        </div>
      </section>

      {/* ===== Event Summary (Dark Purple Cards) ===== */}
      <section className="bg-purple-50 p-6 rounded-2xl shadow-inner border border-purple-200">
        <h2 className="font-bold text-purple-800 mb-6 text-xl">Events Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Clock />, title: "Ongoing Events", count: counts.ongoingEvents, color: "green" },
            { icon: <Calendar />, title: "Upcoming Events", count: counts.upcomingEvents, color: "blue" },
            { icon: <FileText />, title: "Past Events", count: counts.pastEvents, color: "red" },
            { icon: <Layers />, title: "Draft Events", count: counts.draftEvents, color: "purple" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className={`bg-${item.color}-100 text-${item.color}-600 w-12 h-12 flex items-center justify-center rounded-full mb-4 text-2xl`}>
                {item.icon}
              </div>
              <h3 className="text-md font-semibold text-gray-700 mb-1">{item.title}</h3>
              <p className={`text-xl font-bold text-${item.color}-700`}>{item.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Registrations Table with Icons ===== */}
      <section className="bg-yellow-50 p-6 rounded-3xl shadow-md border border-yellow-200">
        <h2 className="font-bold text-yellow-800 mb-6 text-xl">Registrations Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">Type</th>
                <th className="py-3 px-6 text-right text-gray-700 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { icon: <Users className="text-yellow-600 w-5 h-5" />, label: "Total Registrations", count: counts.registerCount },
                { icon: <DollarSign className="text-green-600 w-5 h-5" />, label: "Paid Members", count: counts.paidMembers },
                { icon: <UserPlus className="text-blue-600 w-5 h-5" />, label: "Free Volunteers", count: counts.freeVolunteers },
                { icon: <Clock className="text-purple-600 w-5 h-5" />, label: "Pending Members", count: counts.pendingMembers },
                { icon: <CheckCircle className="text-green-600 w-5 h-5" />, label: "Approved Members", count: counts.approvedMembers },
                { icon: <XCircle className="text-red-600 w-5 h-5" />, label: "Rejected Members", count: counts.rejectedMembers },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-yellow-50 transition">
                  <td className="py-4 px-6 flex items-center gap-3 text-gray-800">{item.icon} {item.label}</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-800">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== Membership Breakdown (Left-accent Cards) ===== */}
      {/* <section className="bg-green-50 p-6 rounded-2xl shadow-xl border border-green-200">
        <h2 className="font-bold text-green-800 mb-6 text-xl">Membership Breakdown</h2>
        <div className="space-y-4">
          {[
            { icon: <Users className="text-blue-600 w-10 h-10" />, label: "Total Members", count: counts.totalMembers, border: "border-blue-600" },
            { icon: <DollarSign className="text-green-600 w-10 h-10" />, label: "Paid Members", count: counts.paidMembers, border: "border-green-600" },
            { icon: <UserPlus className="text-yellow-600 w-10 h-10" />, label: "Free Volunteers", count: counts.freeVolunteers, border: "border-yellow-600" },
            { icon: <Users className="text-purple-600 w-10 h-10" />, label: "Pending Members", count: counts.pendingMembers, border: "border-purple-600" },
            { icon: <Users className="text-indigo-600 w-10 h-10" />, label: "Approved Members", count: counts.approvedMembers, border: "border-indigo-600" },
            { icon: <Users className="text-red-600 w-10 h-10" />, label: "Rejected Members", count: counts.rejectedMembers, border: "border-red-600" },
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all border-l-8 ${item.border}`}>
              {item.icon}
              <div className="flex flex-col ml-4">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="font-bold text-gray-800 text-lg">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ===== Annual Reports ===== */}
      <section className="bg-indigo-50 p-6 rounded-2xl shadow-lg border border-indigo-200">
        <h2 className="font-bold text-indigo-800 mb-6 text-xl">Annual Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card icon={<FileText className="text-indigo-600" />} title="Annual Reports" count={counts.annualReportCount} color="indigo" />
        </div>
      </section>

    </div>
  );
}