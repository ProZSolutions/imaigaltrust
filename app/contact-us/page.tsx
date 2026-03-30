"use client";
import React, { useState } from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";

import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

export default function ContactUs() {
  const [subject, setSubject] = useState("General Enquiry");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organisation: "",
    message: "",
  });


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const subjects = [
    "General Enquiry",
    "Program Information",
    "Donation & CSR",
    "Volunteer / Internship",
    "Partnership",
    "Media & Press",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Full Name validation (only alphabets and spaces, max 15 chars)
    if (name === "fullName") {
      const nameRegex = /^[A-Za-z\s]*$/;

      if (!nameRegex.test(value)) {
        return;
      }

      if (value.length > 15) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Name cannot exceed 15 characters",
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          fullName: "",
        }));
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Phone validation
    else if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }

    // Other fields
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  //handleSubmit
const handleSubmit = async (e: React.FormEvent) => {  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);
  setSubmitStatus({ type: null, message: "" });

  try {

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        subject,
      }),
    });

    const data = await res.json();

    if (data.success) {

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        organisation: "",
        message: "",
      });

      setSubject("General Enquiry");

      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);


    } else {
      throw new Error("Mail failed");
    }

  } catch {

    setSubmitStatus({
      type: "error",
      message: "Something went wrong. Please try again later.",
    });

  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="bg-white min-h-screen">
      {/* Page Banner */}
      <PageBanner
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "Contact Us" },
        ]}
        title="Get in Touch With Imagial Trust"
        description="Whether you're a farmer seeking help, a donor, partner, or volunteer — we're here to listen and respond."
      />

      {/* Contact Section */}
      <section className="py-20 ">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <span className="inline-block bg-[#E7F3EC] text-green-700 
              text-sm sm:text-base md:text-lg lg:text-xl  font-semibold tracking-wide sm:tracking-wider md:tracking-widest  px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5  rounded  mb-3 sm:mb-4"
              >
              CONTACT INFORMATION
            </span>

            {/* <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3022] mb-4">
              We&apos;re Based in <br /> Tamil Nadu, India
            </h2> */}

            <p className="text-gray-600 mb-8 max-w-[450px]">
              Our team works across rural districts of Tamil Nadu. Visit us at
              our office or reach us through any of the channels below.
            </p>

            {/* Address */}
            <div className="bg-[#f0f9f3] rounded-xl p-5 mb-4 flex gap-4 max-w-[450px] border-none">
              <div className="w-10 h-10 bg-green-700 shrink-0 rounded-md flex items-center justify-center text-white text-lg">
                <IoLocationSharp />
              </div>

              <div>
                <h4 className="font-bold text-[#1B3022] mb-1 text-sm tracking-wide">
                  OFFICE ADDRESS
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No. 1/1A, <br />
                  S Uduppam, Namakkal, <br />
                  Tamil Nadu –  637019.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#f0f9f3] rounded-xl p-5 mb-4 flex gap-4 max-w-[450px] border-none">
              <div className="w-10 h-10 bg-green-700 shrink-0 rounded-md flex items-center justify-center text-white">
                <IoCall className="text-lg" />
              </div>

              <div>
                <h4 className="font-bold text-[#1B3022] mb-1 text-sm tracking-wide">
                  PHONE
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {/* General:{" "} */}
                  <a href="tel:+918248786810" className="hover:text-green-700">
                    +91 82487 86810
                  </a>
                  <br />
                  {/* Programs:{" "} */}
                  <a href="tel:+919500960020" className="hover:text-green-700">
                    +91 95009 60020
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#f0f9f3] rounded-xl p-5 flex gap-4 max-w-[450px] border-none">
              <div className="w-10 h-10 bg-green-700 shrink-0 rounded-md flex items-center justify-center text-white">
                <IoMail className="text-lg" />
              </div>

              <div>
                <h4 className="font-bold text-[#1B3022] mb-1 text-sm tracking-wide">
                  EMAIL
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  <a
                    href="mailto:theimaigaltrust@gmail.com"
                    className="text-gray-600 hover:text-green-700 font-medium hover:underline"
                  >
                    mugilnilavan11@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white border border-[#E5EFE7] rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-[#1B3022] mb-2">
              Send Us a Message
            </h3>

            <p className="text-gray-500 text-sm mb-6">
              Please fill out the form below and our team will get back to you
              promptly.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Success / Error Message */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-md text-sm mb-6 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-[#2D6A4F] border border-[#2D6A4F]/20"
                      : "bg-red-50 text-red-600 border border-red-600/20"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 text-xs font-bold tracking-wider">
                  <label className="text-[#1B3022] uppercase">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    suppressHydrationWarning
                    className={`bg-[#f9fbf9] border rounded-md p-3.5 w-full transition font-normal text-sm ${
                      errors.fullName
                        ? "border-red-500 bg-red-50"
                        : "border-[#e6ede7] focus:border-[#2D6A4F] outline-none"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-500 font-normal">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 text-xs font-bold tracking-wider">
                  <label className="text-[#1B3022] uppercase">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Mobile Number"
                    suppressHydrationWarning
                    className={`bg-[#f9fbf9] border rounded-md p-3.5 w-full transition font-normal text-sm ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-[#e6ede7] focus:border-[#2D6A4F] outline-none"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500 font-normal">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email + Organisation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 text-xs font-bold tracking-wider">
                  <label className="text-[#1B3022] uppercase">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    suppressHydrationWarning
                    className={`bg-[#f9fbf9] border rounded-md p-3.5 w-full transition font-normal text-sm ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-[#e6ede7] focus:border-[#2D6A4F] outline-none"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 font-normal">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 text-xs font-bold tracking-wider">
                  <label className="text-[#1B3022] uppercase">
                    Organisation / Village
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Optional"
                    suppressHydrationWarning
                    className="bg-[#f9fbf9] border border-[#e6ede7] rounded-md p-3.5 w-full focus:border-[#2D6A4F] outline-none transition font-normal text-sm"
                  />
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#1B3022] tracking-wider uppercase">
                  Subject <span className="text-red-500">*</span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {subjects.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSubject(item);
                        setSubmitStatus({ type: null, message: "" });
                      }}
                      className={`px-5 py-2 text-xs rounded-full border transition font-medium
                      ${
                        subject === item
                          ? "bg-green-700 text-white border-[#2D6A4F]"
                          : "bg-white border-[#e6ede7] text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 text-xs font-bold tracking-wider">
                <label className="text-[#1B3022] uppercase">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your enquiry or how we can help you..."
                  suppressHydrationWarning
                  className={`resize-none bg-[#f9fbf9] border rounded-md p-3.5 w-full transition font-normal text-sm ${
                    errors.message
                      ? "border-red-500 bg-red-50"
                      : "border-[#e6ede7] focus:border-[#2D6A4F] outline-none"
                  }`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 font-normal">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-700  text-white px-6 py-3 rounded-md w-full font-medium transition flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {/* <p className="text-xs text-gray-500 mt-4">
              We respect your privacy.{" "}
              <span className="text-green-700">
                80G Tax Exemption available for donors.
              </span>
            </p> */}
          </div>
        </div>
      </section>
    </div>
  );
}