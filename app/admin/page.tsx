"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Users, FileText, Layers } from "lucide-react";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    ongoingCount: 0,
    upcomingCount: 0,
    registerCount: 0,
    eventCount: 0,
    draftCount: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setCounts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

      {/* Ongoing */}
      <div className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <Clock className="text-green-600 group-hover:scale-110 transition" />
          <span className="text-xs font-semibold text-green-600 bg-green-200 px-2 py-1 rounded-full">
            LIVE IN
          </span>
        </div>
        <h3 className="text-sm text-gray-500 font-medium">Ongoing Events</h3>
        <p className="text-3xl font-bold text-green-700 mt-1">
          {counts.ongoingCount}
        </p>
      </div>

      {/* Upcoming */}
      <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="text-blue-600 group-hover:scale-110 transition" />
        </div>
        <h3 className="text-sm text-gray-500 font-medium">Upcoming Events</h3>
        <p className="text-3xl font-bold text-blue-700 mt-1">
          {counts.upcomingCount}
        </p>
      </div>

      {/* Registrations */}
      <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-yellow-100">
        <div className="flex items-center justify-between mb-4">
          <Users className="text-yellow-600 group-hover:scale-110 transition" />
        </div>
        <h3 className="text-sm text-gray-500 font-medium">Registrations</h3>
        <p className="text-3xl font-bold text-yellow-700 mt-1">
          {counts.registerCount}
        </p>
      </div>

      {/* Events */}
      <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <Layers className="text-purple-600 group-hover:scale-110 transition" />
        </div>
        <h3 className="text-sm text-gray-500 font-medium">Total Events</h3>
        <p className="text-3xl font-bold text-purple-700 mt-1">
          {counts.eventCount}
        </p>
      </div>

      {/* Drafts */}
      <div className="group bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-red-100">
        <div className="flex items-center justify-between mb-4">
          <FileText className="text-red-600 group-hover:scale-110 transition" />
        </div>
        <h3 className="text-sm text-gray-500 font-medium">Draft Events</h3>
        <p className="text-3xl font-bold text-red-700 mt-1">
          {counts.draftCount}
        </p>
      </div>

    </div>
  );
}