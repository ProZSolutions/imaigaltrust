import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export const metadata: Metadata = {
  title: "Transgender & Others | Imaigal Trust",
  description:
    "Imaigal Trust supports transgender individuals and other marginalized communities through skill development, healthcare support, social inclusion, and livelihood opportunities.",

  keywords: [
    "Transgender Empowerment",
    "Rural LGBTQ+ Support",
    "Inclusive Development Programs",
    "Transgender Skill Development",
    "Community Empowerment NGO",
    "Imaigal Trust Programs"
  ],

  openGraph: {
    title: "Transgender & Others | Imaigal Trust",
    description:
      "Empowering transgender individuals and marginalized communities through education, livelihood training, healthcare access, and advocacy programs.",
    images: [
      {
        url: "/assets/images/Transgend/Transgend.png",
        width: 1200,
        height: 630,
        alt: "Transgender Empowerment Program",
      },
    ],
  },
};

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    {
      id: 2,
      name: "Rural Development",
    },
    {
      id: 3,
      name: "Transgend & Others",
    },
  ];

  return (
    <div>
      <PageBanner
        title="Empowering Marginalized Communities"
        list={breadrumbs}
      />
      {/* SECTION 1 */}
<section className="py-10 md:py-14 w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
  <div className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-6 md:gap-8 justify-center text-center md:text-left">
    <h2 className="font-medium text-[#1B2F7C] font-poppins text-2xl ">
      Fostering Equality and Inclusion
    </h2>
    <p className="font-poppins font-normal text-[#101010] text-sm leading-relaxed">
      Imaigal Trust is dedicated to the upliftment of marginalized
      communities, including transgender individuals and other vulnerable
      groups in rural areas. Our initiatives focus on creating
      opportunities for social, economic, and personal growth through
      skill development, healthcare, and advocacy programs.
    </p>
  </div>

  {/* IMAGE RIGHT */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src="/assets/images/Transgend/Transgend.png"
      width={600}
      height={400}
      alt="Transgend"
      loading="lazy"
      className="w-full max-w-[550px] md:max-w-full h-auto object-cover rounded-lg"
    />
  </div>
</section>

      <section className="py-10 md:py-14 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-10">
  {/* Centered Heading above content */}
 <h2 className="font-medium text-[#101010] font-poppins text-center text-lg sm:text-xl md:text-xl lg:text-2xl">
  Key Initiatives for Empowerment
</h2>
  {/* Section Content (Text + Image) */}
<div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16 w-full">    {/* TEXT LEFT */}
    <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 font-poppins text-[#101010] mt-4">
        <div className="space-y-2">
         <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
  Social Inclusion & Rights Awareness
</h3>

<p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
  Advocating for equal rights and opportunities for transgender individuals and marginalized groups.
</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Skill Development & Livelihood Programs
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Providing vocational training, entrepreneurship support, and job placement assistance.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Healthcare & Well-being
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Ensuring access to medical care, mental health support, and awareness programs tailored for their needs.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Community Support & Empowerment
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Establishing self-help groups, mentorship programs, and safe spaces for community members.
          </p>
        </div>
      </div>
    </div>

    {/* IMAGE RIGHT */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image
        src="/assets/images/Transgend/Transgend2.png"
        width={565}
        height={374}
        alt="Transgend2"
        loading="lazy"
        className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
</section>

    <section className="py-10 md:py-14 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-10">

  {/* Centered Heading */}
  <h2 className="font-medium text-[#101010] font-poppins text-center text-lg sm:text-xl md:text-xl lg:text-2xl">
    Transformative Impacts
  </h2>

  {/* CONTENT CONTAINER */}
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16 w-full">

    {/* IMAGE LEFT */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
      <Image
        src="/assets/images/Transgend/Transgend3.png"
        width={565}
        height={374}
        alt="Transgend3"
        loading="lazy"
        className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
      />
    </div>

    {/* LIST RIGHT */}
    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 mt-2 md:mt-0">
      <ul className="space-y-6">

        <li className="flex items-center gap-3">
          <span className="flex items-center justify-center w-5 text-green-600 text-base">
            &raquo;
          </span>
          <p className="font-poppins text-[#101010] text-sm flex-1">
            Empowered [Number] transgender individuals through vocational training
          </p>
        </li>

        <li className="flex items-center gap-3">
          <span className="flex items-center justify-center w-5 text-green-600 text-base">
            &raquo;
          </span>
          <p className="font-poppins text-[#101010] text-sm flex-1">
            Conducted health awareness programs focusing on mental and physical well-being.
          </p>
        </li>

        <li className="flex items-center gap-3">
          <span className="flex items-center justify-center w-5 text-green-600 text-base">
            &raquo;
          </span>
          <p className="font-poppins text-[#101010] text-sm flex-1">
            Assisted in employment and entrepreneurship opportunities.
          </p>
        </li>

        <li className="flex items-center gap-3">
          <span className="flex items-center justify-center w-5 text-green-600 text-base">
            &raquo;
          </span>
          <p className="font-poppins text-[#101010] text-sm flex-1">
            Strengthened community networks and support systems.
          </p>
        </li>

      </ul>
    </div>

  </div>
</section>
    </div>
  );
}