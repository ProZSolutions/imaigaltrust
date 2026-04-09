"use client";

import React, { useState, useEffect } from "react";
import PageBanner from "../component/Banner/PageBanner/PageBanner";
import { Calendar, MapPin, Users, Clock, X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import "./registration.css";
import toast from "react-hot-toast";

interface Event {
  id: number;
  title: string;
  program: string;
  category: string;
  status: "upcoming" | "ongoing" | "past";
  start_date: string;
  end_date: string | null;
  registration_start_date: string | null;
  registration_end_date: string | null;
  start_date_formatted: string;
  start_time_formatted: string;
  end_time_formatted: string | null;
  start_time: string;
  location: string;
  short_description: string;
  cover_image: string | null;
}

export default function NewsEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [searchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   
  const {
    register,
    handleSubmit,
    reset,
      formState: { errors, isSubmitting },
   
  } = useForm<RegistrationFormData>();

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  interface RegistrationFormData {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    email: string;
    phone: string;
    source: string;
    motivation: string;
    specialRequirements: string;
    consent: boolean;
  }

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      if (!selectedEvent) return;

      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          first_name: data.firstName,
          last_name: data.lastName,
          age: parseInt(data.age),
          gender: data.gender,
          email: data.email,
          phone: data.phone,
          source: data.source,
          motivation: data.motivation,
          special_requirements: data.specialRequirements,
          consent: data.consent,
        }),
      });

      const resData = await response.json();

if (!response.ok) {
  throw new Error(resData.message || "Failed to register");
}


toast.success("Registration submitted successfully!");

setIsModalOpen(false);
reset();

} catch (error) {
  console.error("Registration failed:", error);

  
  toast.error(
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again."
  );
}
  }

  const filters = ["All Events", "Upcoming", "Ongoing", "Past"];

  useEffect(() => {
    setMounted(true);
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (data.events) {
          setEvents(data.events);
          setFilteredEvents(data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Apply Tab Filter
    if (activeFilter !== "All Events") {
      const filterLower = activeFilter.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.status?.toLowerCase() === filterLower ||
          event.category?.toLowerCase().includes(filterLower) ||
          event.program?.toLowerCase().includes(filterLower),
      );
    }

    // Apply Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.short_description.toLowerCase().includes(query),
      );
    }

    setFilteredEvents(filtered);
  }, [activeFilter, searchQuery, events]);

  const breadcrumbs = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "News & Events", link: "/news-events" },
  ];

  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      <PageBanner
        title="News & Events"
        subtitle="WHAT'S COMING"
        list={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-2 rounded-full shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-1 items-center px-2">
            <span className="font-bold text-gray-400 mr-2 uppercase tracking-wider pl-4 text-xs">
              Filter
            </span>
            {mounted &&
              filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-[#1a4d2e] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="font-bold text-gray-800 Josefin-font text-xl">
            {mounted &&
              (activeFilter === "All Events"
                ? "Upcoming Events"
                : `${activeFilter} Events`)}
          </h2>
          <p className="text-gray-500 mt-1 text-xs">
            {filteredEvents.length} events found
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d2e]"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Image & Status Tag */}
                <div className="relative h-48 overflow-hidden">
               <Image
  src={`/api/events/images/${event.cover_image?.split("/").pop()}`}
  alt={event.title}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
/>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm font-bold text-gray-800 uppercase tracking-widest rounded-md text-xs">
                      {event.status}
                    </span>
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-sm font-medium text-white uppercase tracking-widest rounded-md text-xs">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-gray-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#1a4d2e]" />
                      <span>{event.start_date_formatted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#1a4d2e]" />
                      <span>
                        {event.start_time_formatted}
                        {event.end_time_formatted &&
                          ` - ${event.end_time_formatted}`}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-3 group-hover:text-[#1a4d2e] transition-colors text-base">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-4 text-gray-500 text-xs">
                    <MapPin size={14} className="text-[#1a4d2e]" />
                    <span>{event.location}</span>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-2 text-xs">
                    {event.short_description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-semibold text-blue-600 text-xs">
                      <Users size={14} />
                      <span>
                        {(() => {
                          const now = new Date();
                          const today = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            now.getDate(),
                          );

                          // Use registration_start_date and registration_end_date from DB
                          const regStart = event.registration_start_date
                            ? new Date(event.registration_start_date)
                            : null;
                          const regEnd = event.registration_end_date
                            ? new Date(event.registration_end_date)
                            : null;

                          if (!regStart) return "Registration Open"; // Fallback if no specific dates set

                          const normalize = (d: Date) =>
                            new Date(
                              d.getFullYear(),
                              d.getMonth(),
                              d.getDate(),
                            );
                          const start = normalize(regStart);
                          const end = regEnd ? normalize(regEnd) : start;

                          if (today >= start && today <= end) {
                            return "Registration Open";
                          } else if (today < start) {
                            return "Coming Soon";
                          } else {
                            return "Registration Closed";
                          }
                        })()}
                      </span>
                    </div>
                    {(() => {
                      const now = new Date();
                      const today = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                      );

                      const regStart = event.registration_start_date
                        ? new Date(event.registration_start_date)
                        : null;
                      const regEnd = event.registration_end_date
                        ? new Date(event.registration_end_date)
                        : null;

                      let isEnabled = true;

                      if (regStart) {
                        const normalize = (d: Date) =>
                          new Date(d.getFullYear(), d.getMonth(), d.getDate());
                        const start = normalize(regStart);
                        const end = regEnd ? normalize(regEnd) : start;
                        isEnabled = today >= start && today <= end;
                      }

                      return (
                        <button
                          disabled={!isEnabled}
                          onClick={() => handleRegisterClick(event)}
                          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            isEnabled
                              ? "bg-[#fdf2e9] text-[#d35400] hover:bg-[#d35400] hover:text-white"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Register →
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">
              No Events Found
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              We couldn&apos;t find any events matching your current filters.
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp border border-gray-100">
            {/* Header */}
            <div className="bg-[#1a4d2e] p-8 pb-6 text-white relative">
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm font-bold text-white uppercase tracking-widest rounded-md mb-3 text-xs">
                    {selectedEvent.category || "EVENT REGISTRATION"}
                  </span>
                  <h2 className="font-bold text-white Josefin-font tracking-tight text-2xl">
                    {selectedEvent.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Event Info Row */}
              <div className="flex flex-wrap gap-3 text-white/90 relative z-10 text-xs">
                <div className="flex items-center gap-1.5 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <Calendar size={14} className="text-yellow-400" />
                  <span className="font-medium">
                    {selectedEvent.start_date_formatted}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <Clock size={14} className="text-yellow-400" />
                  <span className="font-medium">
                    {selectedEvent.start_time_formatted} -{" "}
                    {selectedEvent.end_time_formatted || "End"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <MapPin size={14} className="text-yellow-400" />
                  <span className="font-medium">{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            
           {/* Form */}
<div className="bg-white p-8 max-h-[60vh] overflow-y-auto w-full">
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

    {/* Personal Information */}
    <div>
      <h3 className="font-bold text-[#1a4d2e] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 text-xs">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* First Name */}
        <div className="space-y-1.5">
  <label className="font-semibold text-gray-600 text-xs">
    First Name <span className="text-red-500">*</span>
  </label>
  <input
    {...register("firstName", {
      required: "First Name is required",
      pattern: {
        value: /^[A-Za-z\s]+$/, // letters + spaces only
        message: "First Name can contain letters and spaces only, no numbers",
      },
    })}
    onInput={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
    }}
    placeholder="Enter first name"
    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
  />
  {errors.firstName && (
    <p className="text-red-500 text-xs">{errors.firstName.message}</p>
  )}
</div>

        {/* Last Name */}
       <div className="space-y-1.5">
  <label className="font-semibold text-gray-600 text-xs">
    Last Name <span className="text-red-500">*</span>
  </label>
  <input
    {...register("lastName", {
      required: "Last Name is required",
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Last Name can contain letters and spaces only, no numbers",
      },
    })}
    onInput={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
    }}
    placeholder="Enter last name"
    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
  />
  {errors.lastName && (
    <p className="text-red-500 text-xs">{errors.lastName.message}</p>
  )}
</div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

        {/* Age */}
        <div className="space-y-1.5">
          <label className="font-semibold text-gray-600 text-xs">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 1, message: "Enter valid age" },
            })}
            placeholder="e.g. 18"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
          />
          {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-1.5 relative">
          <label className="font-semibold text-gray-600 text-xs">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
            >
              <option value="">— Select —</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} /> */}
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
        </div>

      </div>
    </div>

    {/* Contact Details */}
    <div className="pt-2">
      <h3 className="font-bold text-[#1a4d2e] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 text-xs">
        Contact Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-semibold text-gray-600 text-xs">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter valid email",
              },
            })}
            placeholder="you@email.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
  <label className="font-semibold text-gray-600 text-xs">
    Phone Number <span className="text-red-500">*</span>
  </label>
  <input
    {...register("phone", {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Enter valid 10-digit number",
      },
    })}
    onInput={(e) => {
    
      let value = e.currentTarget.value.replace(/[^0-9]/g, '');
     
      if (value.length > 10) value = value.slice(0, 10);
      e.currentTarget.value = value;
    }}
    placeholder="e.g. 9876543210"
    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
  />
  {errors.phone && (
    <p className="text-red-500 text-xs">{errors.phone.message}</p>
  )}
</div>

      </div>
    </div>

    {/* Participation Details */}
    <div className="pt-2">
      <h3 className="font-bold text-[#1a4d2e] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 text-xs">
        Participation Details
      </h3>

      <div className="space-y-5">

        {/* Motivation */}
        <div className="space-y-1.5">
          <label className="font-semibold text-gray-600 text-xs">
            Why do you want to attend? <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("motivation", { required: "This field is required" })}
            rows={3}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-xs"
          />
          {errors.motivation && <p className="text-red-500 text-xs">{errors.motivation.message}</p>}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            {...register("consent", { required: "You must consent" })}
            className="mt-1 w-4 h-4"
          />
          <label className="text-gray-600 text-xs">
            I consent to the Foundation collecting and using my data <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

      </div>
    </div>

    {/* Footer Submit */}
    <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 bg-[#1a4d2e] text-white font-bold rounded-lg text-xs"
      >
        {isSubmitting ? "Submitting..." : "Complete Registration"}
      </button>
    </div>

  </form>
</div>

            
          </div>
        </div>
      )}
    </div>
  );
}
