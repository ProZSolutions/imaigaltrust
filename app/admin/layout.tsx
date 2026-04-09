"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  FileText,
  LogOut,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  ClipboardList,
  Calendar,
} from "lucide-react";

export default function AdminLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(
    pathname.includes("/admin/gallery"),
  );
  const [isEventsOpen, setIsEventsOpen] = useState(
    pathname.includes("/admin/events"),
  );
  const [mounted, setMounted] = useState(false);

  //     useEffect(() => {
  //   const token = sessionStorage.getItem("authToken");

  //   if (token) {
  //     router.push("/admin");
  //   }
  // }, [router]);

  React.useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }

    setMounted(true);
  }, [router]);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutGrid,
    },
    {
      label: "Membership",
      href: "/admin/memberships",
      icon: Users,
    },
    {
      label: "Annual Report",
      href: "/admin/annual-report",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    router.push("/login");
  };
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#112e1a] text-white flex flex-col flex-shrink-0 h-screen">
        {/* Logo */}
        <div className="p-8 border-b border-white/5 flex-shrink-0">
          <h2 className="font-bold tracking-widest josefin-font text-gray-400 brightness-125 uppercase text-lg">Admin Portal</h2>
          <p className="text-gray-400 mt-1 uppercase tracking-[0.2em] text-xs">Management System</p>
        </div>

        {/* Navigation (scrollable) */}
        <nav className="flex-1 mt-6 px-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                    ? "bg-white text-[#096412] shadow-lg shadow-black/10 font-bold"
                    : "text-green-50/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-[#096412]" : "text-green-400/80 group-hover:text-white"}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Gallery Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.includes("/admin/gallery")
                ? "text-white"
                : "text-green-50/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon
                  size={20}
                  className={
                    pathname.includes("/admin/gallery")
                      ? "text-white/90"
                      : "text-green-400/80 group-hover:text-white"
                  }
                />
                <span className="font-semibold">Gallery</span>
              </div>
              {isGalleryOpen ? (
                <ChevronDown size={14} className="opacity-60" />
              ) : (
                <ChevronRight size={14} className="opacity-60" />
              )}
            </button>

            {isGalleryOpen && (
              <div className="mt-1 flex flex-col gap-1 px-2">
                <Link
                  href="/admin/gallery/program"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${pathname === "/admin/gallery/program"
                    ? "bg-white text-[#096412] shadow-md"
                    : "text-green-100 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <ClipboardList size={16} className={pathname === "/admin/gallery/program" ? "text-[#096412]" : "text-green-400/60"} />
                  Program
                </Link>
                <Link
                  href="/admin/gallery/category"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${pathname === "/admin/gallery/category"
                    ? "bg-white text-[#096412] shadow-md"
                    : "text-green-100 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <LayoutGrid size={16} className={pathname === "/admin/gallery/category" ? "text-[#096412]" : "text-green-400/60"} />
                  Category
                </Link>
                <Link
                  href="/admin/gallery/add-gallery"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${pathname === "/admin/gallery/add-gallery"
                    ? "bg-white text-[#096412] shadow-md"
                    : "text-green-100 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <ImageIcon size={16} className={pathname === "/admin/gallery/add-gallery" ? "text-[#096412]" : "text-green-400/60"} />
                  Photos
                </Link>
              </div>
            )}
          </div>

          {/* Events Menu */}
          <div className="pt-2">
            <button
              onClick={() => setIsEventsOpen(!isEventsOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.includes("/admin/events")
                ? "text-white"
                : "text-green-50/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <Calendar
                  size={20}
                  className={
                    pathname.includes("/admin/events")
                      ? "text-white/90"
                      : "text-green-400/80 group-hover:text-white"
                  }
                />
                <span className="font-semibold">Events</span>
              </div>
              {isEventsOpen ? (
                <ChevronDown size={14} className="opacity-60" />
              ) : (
                <ChevronRight size={14} className="opacity-60" />
              )}
            </button>

            {isEventsOpen && (
              <div className="mt-1 flex flex-col gap-1 px-2">
                <Link
                  href="/admin/events"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${pathname === "/admin/events"
                    ? "bg-white text-[#096412] shadow-md"
                    : "text-green-100 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Calendar size={16} className={pathname === "/admin/events" ? "text-[#096412]" : "text-green-400/60"} />
                  All Events
                </Link>
                <Link
                  href="/admin/events/drafts"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${pathname === "/admin/events/drafts"
                    ? "bg-white text-[#096412] shadow-md"
                    : "text-green-100 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <FileText size={16} className={pathname === "/admin/events/drafts" ? "text-[#096412]" : "text-green-400/60"} />
                  Drafts
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 py-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            {mounted &&
              pathname
                .split("/")
                .filter((segment) => segment !== "")
                .map((segment, index, array) => {
                  let href = `/${array.slice(0, index + 1).join("/")}`;

                  // Special breadcrumb names
                  let displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

                  if (href === "/admin") {
                    href = "/admin";
                    displayName = "Dashboard";
                  }
                  else if (href === "/admin/gallery") {
                    href = "/admin/gallery/program";
                    displayName = "Gallery";
                  }
                  else if (href === "/admin/events") {
                    href = "/admin/events";
                    displayName = "Events";
                  }

                  const isLast = index === array.length - 1;

                  return (
                    <React.Fragment key={`${href}-${index}`}>
                      {index > 0 && <ChevronRight size={14} className="text-gray-300" />}

                      {isLast ? (
                        <span className="font-bold text-[#096412] tracking-wide text-lg">
                          {displayName}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className="text-gray-600 hover:text-green-900 transition-colors font-medium text-sm"
                        >
                          {displayName}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}

          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sml font-bold text-gray-700">Administrator</span>
              <span className="text-gray-400 uppercase tracking-tighter text-xs">Imaigal Trust</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-[#096412] text-white flex items-center justify-center rounded-full shadow-lg shadow-green-900/20 font-bold group-hover:scale-105 transition-transform">
                  A
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors text-xs"
                  >
                    View Website
                  </Link>
                  <div className="my-1 border-t border-gray-50" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors font-semibold text-xs"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto bg-[#f8fbfa]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-xl shadow-green-900/5 rounded-3xl p-8 border border-gray-100">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
