import type { Metadata } from "next";
import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import {
  FaLightbulb,
  FaBookOpen,
  FaBuilding,
  FaUsers,
  FaChartPie,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Entrepreneurship Development Programme (EDP) | Imaigal Trust",
  description:
    "Imaigal Trust conducts Entrepreneurship Development Programme (EDP) trainings to empower rural youth and women with business skills, financial literacy, and enterprise development.",
  keywords: [
    "EDP Training",
    "Entrepreneurship Development Programme",
    "Rural Entrepreneurship",
    "Women Entrepreneurship Training",
    "Agri Business Training",
    "Imaigal Trust Programs"
  ],
  openGraph: {
    title: "EDP Trainings | Imaigal Trust",
    description:
      "Empowering rural youth and women through entrepreneurship training, business planning, and financial literacy programs.",
    images: [
      {
        url: "/assets/images/programs/edp(1).jpeg",
        width: 1200,
        height: 630,
        alt: "EDP Training Program",
      },
    ],
  },
};

export default function EDPTrainings() {
  const objectives = [
    {
      icon: <FaUsers />,
      text: "Promote entrepreneurship among rural youth and women",
    },
    {
      icon: <FaLightbulb />,
      text: "Encourage self-employment and small enterprise development",
    },
    {
      icon: <FaBookOpen />,
      text: "Build skills in business planning and management",
    },
    {
      icon: <FaBuilding />,
      text: "Support agri-based and rural enterprises",
    },
  ];

  const activities = [
    {
      title: "Awareness Workshops",
      desc: "Comprehensive sessions to inspire and inform potential entrepreneurs about local opportunities.",
    },
    {
      title: "Business Training",
      desc: "Direct training programs covering the essentials of starting and managing a small business.",
    },
    {
      title: "Plan Preparation",
      desc: "Professional guidance on drafting robust business plans and feasibility reports.",
    },
    {
      title: "Financial Literacy",
      desc: "Support for credit linkages and understanding government financial schemes.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="EDP Trainings"
        list={[
          { id: 1, name: "Programs", link: "/" },
          { id: 2, name: "EDP Trainings" },
        ]}
      />

      <div className="max-w-[1700px] mx-auto px-6 py-10 lg:px-16">
  {/* Main Section */}
  <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">

    {/* Content */}
    <div className="lg:col-span-7 space-y-6 inter-font order-1 text-center lg:text-left">
     <h2 className="josefin-font font-bold text-[#1B2F7C] uppercase tracking-tight text-lg sm:text-xl md:text-xl lg:text-2xl gap-2 leading-snug">
  Entrepreneurship Development Programme (EDP)
</h2>

      <p className="text-black font-semibold text-sm">
        Empowering rural youth and women to transition from job seekers to
        job creators.
      </p>

      <div className="space-y-6">
        <p className="text-black text-sm leading-relaxed">
          The Entrepreneurship Development Programme (EDP) conducted by{" "}
          <strong className="primary-text">Imaigal Trust</strong> focuses
          on building entrepreneurial skills among rural youth, women, and
          aspiring agri-entrepreneurs.
        </p>

        <p className="text-black text-sm leading-relaxed">
          Through EDP trainings, participants gain exposure to business
          planning, financial management, market opportunities, and
          government support schemes. The program aims to create
          sustainable livelihood opportunities and strengthen rural
          economies.
        </p>
      </div>
    </div>

    {/* Images */}
    <div className="lg:col-span-5 order-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Left column */}
        <div className="space-y-4">

          <div className="relative w-full aspect-[4/3] rounded-[6rem] overflow-hidden border-4 border-white hover:-translate-y-2 transition-transform duration-500">
            <Image
              src="/assets/images/programs/edp(1).jpeg"
              alt="EDP Training session 1"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white hover:translate-x-2 transition-transform duration-500">
            <Image
              src="/assets/images/programs/edp(2).jpeg"
              alt="EDP Training session 2"
              fill
              className="object-contain"
            />
          </div>

        </div>

        {/* Right column */}
        <div className="space-y-4 sm:pt-6 lg:pt-12">

          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white hover:-translate-x-2 transition-transform duration-500">
            <Image
              src="/assets/images/programs/edp(3).jpeg"
              alt="EDP Training session 3"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative w-full aspect-[4/3] rounded-[6rem] overflow-hidden border-4 border-white hover:translate-y-2 transition-transform duration-500">
            <Image
              src="/assets/images/programs/edp(4).jpeg"
              alt="EDP Training session 4"
              fill
              className="object-contain"
            />
          </div>

        </div>

      </div>
    </div>

  </div>


        {/* Objectives Section */}
        <div className="bg-secondary-50 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-gray-100">
          <h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">
            Objectives
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((obj, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-700 shadow-md border border-primary/10 text-xl">
                  {obj.icon}
                </div>
                <p className="inter-font font-medium text-gray-800 text-xs">
                  {obj.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Activities - Cleaner, more uniform grid */}
        <div className="mb-20">
          <h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">
            Key Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="p-8 bg-white border-1 border-black rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full items-start"
              >
                <div className="mb-6 w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <h3 className="josefin-font font-bold secondary-text-900 mb-4 uppercase tracking-wide text-base sm:text-sm md:text-sml">
  {activity.title}
</h3>
                <p className="text-gray-600 inter-font text-xs">
                  {activity.desc}
                </p>
              </div>
            ))}
            {/* Uniform Activity Item for "Exposure visits" */}
            <div className="p-8 bg-white border-1 border-black rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full items-start">
              <div className="mb-6 w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full"></div>
              <h3 className="josefin-font font-bold secondary-text-900 mb-4 uppercase tracking-wide text-base sm:text-sm md:text-sml">
                Exposure Visits
              </h3>
              <p className="text-gray-600 inter-font text-xs">
                Real-world exposure to successful enterprises and industry
                leaders.
              </p>
            </div>
            <div className="p-8 bg-white border-1 border-black rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full items-start">
              <div className="mb-6 w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full"></div>
              <h3 className="josefin-font font-bold secondary-text-900 mb-4 uppercase tracking-wide text-base sm:text-sm md:text-sml">
                Learning Visits
              </h3>
              <p className="text-gray-600 inter-font text-xs">
                Hands-on learning through visits to successful enterprises and
                interactions with industry leaders.
              </p>
            </div>
          </div>
        </div>

        {/* Beneficiaries & Why Section - Balanced & Integrated */}
<div className="grid lg:grid-cols-2 gap-8 mb-2 w-full">

  {/* Beneficiaries */}
  <div className="bg-secondary-50 p-6 md:p-10 rounded-3xl border border-gray-100 flex flex-col justify-center w-full min-w-0">
    
    <div className="flex items-center space-x-4 mb-8">
      <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0 text-lg">
        <FaUsers />
      </div>

      <h3 className="josefin-font font-bold secondary-text-900 uppercase break-words text-lg">
        Beneficiaries
      </h3>
    </div>

    <div className="grid gap-4">
      {[
        "Rural youth seeking self-employment",
        "Aspiring women entrepreneurs",
        "Farmers interested in agri-business",
        "Small-scale business enthusiasts",
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-start space-x-3 text-gray-700 inter-font bg-white/80 p-4 rounded-2xl border border-white shadow-sm w-full min-w-0"
        >
          <div className="flex items-center gap-2">
  <span className="text-green-600 mb-1 shrink-0 text-lg">
    &raquo;
  </span>

  <span className="font-medium break-words text-sm">
    {item}
  </span>
</div>
        </div>
      ))}
    </div>
  </div>

  {/* Empowering Section */}
  <div className="relative rounded-3xl overflow-hidden bg-primary p-6 md:p-14 text-white flex flex-col justify-center shadow-xl w-full min-w-0">

    <div className="relative z-10 space-y-6">
      <h2 className="josefin-font font-bold uppercase tracking-tight border-b border-white/20 pb-4 break-words text-lg sm:text-xl md:text-xl lg:text-xl">
  Empowering Rural Livelihoods
</h2>

      <p className="inter-font font-light italic opacity-95 break-words text-sml">
        &quot;Our Entrepreneurship Development Programme is designed not
        just to teach business, but to ignite the spirit of innovation
        in rural India, creating sustainable wealth within the
        community.&quot;
      </p>

      <div className="flex items-center space-x-2 pt-4">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <FaChartPie className="text-xs" />
        </div>

        <span className="font-medium uppercase tracking-widest text-white/70 break-words text-xs">
          Imaigal Trust Mission
        </span>
      </div>
    </div>

    {/* Simple pattern */}
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

  </div>

        </div>
      </div>
    </div>
  );
}
