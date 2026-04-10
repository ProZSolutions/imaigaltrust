"use client";
import React, { useState } from "react";
import { IoLocationSharp, IoCall, IoMail } from "react-icons/io5";

export default function ContactForm() {
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

    if (name === "fullName") {
      const nameRegex = /^[A-Za-z\s]*$/;

      if (!nameRegex.test(value)) return;

      if (value.length > 15) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Name cannot exceed 15 characters",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, fullName: "" }));
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    else if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }

    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });

        setTimeout(() => {
    setSubmitStatus({ type: null, message: "" });
  }, 5000);

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          organisation: "",
          message: "",
        });

        setSubject("General Enquiry");
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>

          <span className="bg-green-50 text-green-800 px-4 py-2 rounded-md text-sm font-semibold tracking-wide">
            CONTACT INFORMATION
          </span>

          <p className="text-gray-600 mt-4 mb-8  text-[16px] leading-relaxed max-w-md">
            Our team works across rural districts of Tamil Nadu. Visit us at our office
            or reach us through any of the channels below.
          </p>

          <div className="space-y-6">

            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
  <div className="bg-green-700 p-2.5 rounded-lg text-white">
    <IoLocationSharp size={16} />
  </div>

  <div>
    <h3 className="font-semibold text-sm text-gray-800 mb-1">
      OFFICE ADDRESS
    </h3>

    <a
      href="https://www.google.com/maps/search/?api=1&query=1/1A,S.Uduppam,Namakkal,Tamilnadu-637019"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 text-sm hover:text-green-700"
    >
      1/1A, S. Uduppam, S. Uduppam Post, Sellapampatti Via, Namakkal, Tamil Nadu - 637019
    </a>
  </div>
</div>

            <div className="flex items-start gap-3 bg-green-50 px-5 py-4 rounded-xl">
  <div className="bg-green-700 p-2 rounded-lg text-white">
    <IoCall size={16} />
  </div>

              <div>
  <h3 className="font-semibold text-sm text-gray-800 mb-1">
    PHONE
  </h3>

  <p className="text-gray-600 text-sm">
    <a href="tel:+918248786810" className="hover:text-green-700">
      +91 82487 86810
    </a>
  </p>

  <p className="text-gray-600 text-sm">
    <a href="tel:+919500960020" className="hover:text-green-700">
      +91 95009 60020
    </a>
  </p>
</div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 px-5 py-4 rounded-xl">
  <div className="bg-green-700 p-2 rounded-lg text-white">
    <IoMail size={16} />
  </div>

  <div>
    <h3 className="font-semibold text-sm text-gray-800 mb-1">EMAIL</h3>

    <p className="text-gray-600 text-sm">
      <a href="mailto:theimaigaltrust@gmail.com" className="hover:text-green-700">
        theimaigaltrust@gmail.com
      </a>
    </p>

    
   
  </div>
</div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-md border-gray-200">
 {submitStatus.type && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
<h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
  Send Us a Message
</h2>     


          <p className="text-[15px] text-gray-500 mt-1 mb-6">
            Please fill out the form below and our team will get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            

            {/* NAME + PHONE */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-semibold text-black block mb-2">
                  FULL NAME <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 text-sm py-3 border rounded-lg bg-[#fffdf4]
                  ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-black block mb-2">
                  PHONE NUMBER <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className={`w-full px-4 text-sm py-3 border rounded-lg bg-[#fffdf4]
                  ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

            </div>

            {/* EMAIL + ORG */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-semibold text-black block mb-2">
                  EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 text-sm py-3 border rounded-lg bg-[#fffdf4]
                  ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-black block mb-2">
                  ORGANISATION / VILLAGE
                </label>

                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-[#fffdf4]"
                />
              </div>

            </div>

            {/* SUBJECT */}
            <div>
              <label className="text-xs font-semibold text-black block mb-2">
                SUBJECT <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {subjects.map((subj) => (
                  <button
                    type="button"
                    key={subj}
                    onClick={() => setSubject(subj)}
                    className={`px-4 py-2 text-sm rounded-full border transition 
                    ${
                      subject === subj
                        ? "bg-green-700 text-white border-green-700"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-xs font-semibold text-black block mb-2">
                YOUR MESSAGE <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your enquiry or how we can help you..."
                className={`w-full px-4 py-3 text-sm border rounded-lg resize-none bg-[#fffdf4]
                ${errors.message ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

           

          </form>
        </div>
      </div>
    </section>
  );
}