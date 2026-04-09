"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { IoCallSharp } from "react-icons/io5";
import Button from "../Button/Button";
import { LuUserPen } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";

export default function SubHeader() {
  const router = useRouter();
  return (
    <div className="p-5 flex flex-col lg:flex-row justify-between items-center gap-4">

      <Link href="/">

        <Image
          src={"/assets/images/logo.png"}
          alt="Imaigal Trust logo"
          width={100}
          height={100}
          className="w-40 sm:w-48 lg:w-56 cursor-pointer"
        />
      </Link>

      <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-end">



        {/* Phone */}
        <div className="flex gap-2 items-center group cursor-pointer">
  {/* Phone Icon */}
  <span className="primary-text group-hover:text-green-500 transition-colors duration-300">
    {React.createElement(IoCallSharp, { className: "text-2xl sml:text-3xl" })}
  </span>

  {/* Phone Number */}
  <Link href="tel:+918248786810">
    <span className="text-black sml:text-xl group-hover:text-green-900 transition-colors duration-300 text-base">
      +91 82487 86810
    </span>
  </Link>
</div>

        {/* Email */}
        <div className="flex gap-2 items-center group cursor-pointer">
  {/* Icon */}
  <span className="primary-text group-hover:text-green-900 transition-colors duration-300">
    {React.createElement(IoMailOutline, { className: "text-2xl sml:text-3xl" })}
  </span>

  {/* Email */}
  <Link href="mailto:theimaigaltrust@gmail.com">
    <span className="text-black sml:text-xl break-all group-hover:text-green-900 transition-colors duration-300 text-base">
      theimaigaltrust@gmail.com
    </span>
  </Link>
</div>



       <Button
  label={
    <span className="flex gap-2 items-center">
      {React.createElement(LuUserPen, { className: "text-lg sm:text-xl" })}
      <span className="capitalize text-sm">Join Us</span>
    </span>
  }
  className="blue__btn rounded capitalize px-3 py-2 text-xs"
  onClick={() => router.push("/about/membership")} // <-- add this line
/>
      </div>
    </div>
  );
}