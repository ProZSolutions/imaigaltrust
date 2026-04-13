import type { Metadata } from "next";
import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import {
  FaInfoCircle,
  FaLink,
  FaDonate,
  FaGlobe,
  FaExclamationTriangle,
  FaHistory,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMailOutline, IoCall } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Disclaimer | Imaigal Trust",
  description:
    "Read the official disclaimer of Imaigal Trust regarding website information, external links, donations, and limitation of liability.",
  keywords: [
    "Imaigal Trust Disclaimer",
    "NGO Website Disclaimer",
    "Donation Disclaimer",
    "External Links Policy",
    "Website Liability Disclaimer"
  ],
  openGraph: {
    title: "Disclaimer | Imaigal Trust",
    description:
      "Important information about website usage, donations, and liability policies of Imaigal Trust.",
    url: "https://www.imaigaltrust.org/disclaimer",
    siteName: "Imaigal Trust",
  },
};
export default function DisclaimerPage() {
  const sections = [
    {
      title: "General Information",
      icon: <FaInfoCircle />,
      content:
        "All content on this website, including text, images, documents, and other materials, is provided for informational purposes related to the activities and initiatives of Imaigal Trust. The information should not be considered professional, financial, or legal advice. Users are encouraged to verify any information before relying on it.",
    },
    {
      title: "External Links Disclaimer",
      icon: <FaLink />,
      content:
        "This website may contain links to external websites that are not maintained or controlled by Imaigal Trust. We do not guarantee the accuracy, relevance, or completeness of information found on these third-party websites. Imaigal Trust is not responsible for the content, policies, or practices of external websites.",
    },
    {
      title: "Donation Disclaimer",
      icon: <FaDonate />,
      content:
        "Donations made through this website are voluntary contributions to support the charitable activities and programs conducted by Imaigal Trust. The trust reserves the right to allocate donations according to its priorities and project needs. While we maintain transparency in the use of funds, specific allocation of donations may vary depending on ongoing programs and requirements.",
    },
    {
      title: "Website Availability",
      icon: <FaGlobe />,
      content:
        "We make reasonable efforts to keep the website running smoothly. However, Imaigal Trust is not responsible for temporary unavailability of the website due to technical issues beyond our control.",
    },
    {
      title: "Limitation of Liability",
      icon: <FaExclamationTriangle />,
      content:
        "Under no circumstances shall Imaigal Trust be held liable for any loss or damage arising from the use of this website or reliance on any information provided on the website. Users access and use the website at their own discretion and risk.",
    },
    {
      title: "Changes to This Disclaimer",
      icon: <FaHistory />,
      content:
        "Imaigal Trust reserves the right to update or modify this Disclaimer at any time without prior notice. Changes will be posted on this page.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Disclaimer"
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "Disclaimer" },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12">
          {/* <p className="text-gray-500 mb-6 font-medium">
            Last Updated: March 6, 2026
          </p> */}
          <p className="text-gray-700 text-base">
            The information provided on this website{" "}
            <strong>www.imaigaltrust.org</strong> (the &quot;Website&quot;) is published
            by <strong>Imaigal Trust</strong> for general informational purposes
            only. While we strive to ensure that the information on this website
            is accurate and up to date, we make no guarantees regarding the
            completeness, reliability, or accuracy of the information.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white border border-black rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary text-lg">
                  {section.icon}
                </div>
                <h3 className="josefin-font font-bold secondary-text-900 uppercase tracking-wide text-lg">
                  {section.title}
                </h3>
              </div>
              <p className="inter-font text-gray-600">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-[3rem] p-10 md:p-14">

  <h2 className="josefin-font font-bold black-text uppercase mb-8 text-center text-2xl">
    Contact Information
  </h2>

  <p className="text-gray-600 italic text-center max-w-2xl mx-auto mb-10 text-base">
    If you have any questions regarding this Disclaimer, please
    contact us at our administrative office.
  </p>

 {/* Contact Card */}
<div className="bg-white p-1 border rounded-3xl shadow-sm max-w-xl mx-auto">

  <div className="flex flex-col gap-1">

    {/* Location */}
<div className="flex items-center gap-4 p-3 rounded-xl transition-colors">
  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
    <FaMapMarkerAlt className="text-green-700 text-lg" />
  </div>

  <span className="text-gray-700 font-medium">
    Imaigal Trust Headquarters, Tamil Nadu, India
  </span>
</div>

{/* Email */}
<div className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer">
  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
    <IoMailOutline className="text-green-700 text-lg" />
  </div>

  <a
    href="mailto:theimaigaltrust@gmail.com"
    className="text-gray-700 font-medium break-all"
  >
    theimaigaltrust@gmail.com
  </a>
</div>

{/* Phone */}
<div className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer">
  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
    <IoCall className="text-green-700 text-lg" />
  </div>

  <a
    href="tel:+918248786810"
    className="text-gray-700 font-medium"
  >
    +91 82487 86810, +91 95009 60020
  </a>
</div>
</div>
</div>

</div>
</div>
</div>
    
  );
}