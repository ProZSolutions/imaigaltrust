import React from "react";
import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Imaigal Trust",
  description:
    "Contact Imaigal Trust to learn more about our rural development initiatives, women's empowerment programs, sustainable agriculture projects, and community welfare activities.",
  keywords: [
    "Contact Imaigal Trust",
    "NGO Contact",
    "Imaigal Trust Address",
    "Rural Development NGO Contact",
    "Women Empowerment NGO India"
  ],
  openGraph: {
    title: "Contact Imaigal Trust",
    description:
      "Get in touch with Imaigal Trust to collaborate and support rural development and community empowerment initiatives.",
    url: "https://imaigaltrust.org/contact-us",
    siteName: "Imaigal Trust",
    type: "website",
  },
};

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Banner */}
      <PageBanner
        title="Contact Us"
        description="Get in touch with Imaigal Trust. We'd love to hear from you and discuss how we can work together to create positive change in rural communities."
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "Contact Us" },
        ]}
      />

      <ContactForm />
    </div>
  );
}