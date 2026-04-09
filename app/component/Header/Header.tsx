"use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { TbHome } from "react-icons/tb";
import "./Header.css";
import Navbar from "./NavBar/NavBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div className="main-header p-5">
      <header className="md:px-4 py-2">
        <Navbar hideNavItems={isLoginPage || isAdminPage} />
      </header>
    </div>
  );
}
