import {guidelineContent,ourProgramContent,quickLinkContent} from "@/app/content/Footer";
import React from "react";
import FooterLinkList from "../Footer/FooterLinks/FooterLinks";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
export default function SecondaryFooter() {
  return (
    <div className="bg-secondary-50 py-10">
      {/* Center Container */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* Our Programs */}
          <div className="flex flex-col">
            <p className="secondary-heading">Our Programs</p>
            <div className="mt-4 flex flex-col gap-2">
              {ourProgramContent?.map((li) => (
                <FooterLinkList
                  key={li?.id}
                  link={li?.link}
                  content={li?.content}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <p className="secondary-heading">Quick Links</p>
            <div className="mt-4 flex flex-col gap-2">
              {quickLinkContent?.map((li) => (
                <FooterLinkList
                  key={li?.id}
                  link={li?.link}
                  content={li?.content}
                />
              ))}
            </div>
          </div>

          {/* Policies & Guidelines */}
          <div className="flex flex-col">
            <p className="secondary-heading">Policies & Guidelines</p>
            <div className="mt-4 flex flex-col gap-2">
              {guidelineContent?.map((li) => (
                <FooterLinkList
                  key={li?.id}
                  link={li?.link}
                  content={li?.content}
                />
              ))}
            </div>
          </div>
              {/* Contact */}
<div className="flex flex-col items-start mb-6">
  <p className="secondary-heading">Contact</p>

  <div className="mt-4 space-y-3">

    <Link href="tel:+918248786810" className="flex items-center gap-2 hover:text-green-700">
      <IoIosArrowForward className="text-green-700"/>
      +91 82487 86810
    </Link>

    <Link href="tel:+919500960020" className="flex items-center gap-2 hover:text-green-700">
      <IoIosArrowForward className="text-green-700" />
      +91 95009 60020
    </Link>

    <Link href="mailto:theimaigaltrust@gmail.com" className="flex items-center gap-2 hover:text-green-700">
      <IoIosArrowForward className="text-green-700"/>
      theimaigaltrust@gmail.com
    </Link>

  </div>

  {/* Follow Us */}
  <div className="mt-8">
    <p className="secondary-heading">Follow Us</p>

    <div className="mt-4 flex gap-5 flex-wrap">
      {/* <Link href="#" target="_blank">
        <Image
          src="/assets/images/facebook.svg"
          alt="Facebook"
          width={30}
          height={30}
          className="transition duration-300 hover:scale-110"
        />
      </Link>

      <Link href="#" target="_blank">
        <Image
          src="/assets/images/instagram.svg"
          alt="Instagram"
          width={30}
          height={30}
          className="transition duration-300 hover:scale-110"
        />
      </Link> */}

      <Link
        href="https://wa.me/918248786810"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
         
          src="/assets/images/whatsapp.svg"
          alt="Whatsapp"
          width={30}
          height={30}
          className="transition duration-300 hover:scale-110"
        />
      </Link>

      <Link
        href="https://www.youtube.com/watch?v=RxlbXsfVZno"
        target="_blank"
      >
        <Image
          src="/assets/images/youtube.svg"
          alt="Youtube"
          width={30}
          height={30}
          className="transition duration-300 hover:scale-110"
        />
      </Link>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}