import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Banner */}
      <PageBanner
        title="Contact Us"
        description="Get in touch with Imagial Trust. We'd love to hear from you and discuss how we can work together to create positive change in rural communities."
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "Contact Us" },
        ]}
      />

      <ContactForm />
    </div>
  );
}