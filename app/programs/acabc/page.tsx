import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import {
  FaCheckCircle,
  FaSeedling,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaUsers,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "ACABC Program | Imaigal Trust",
  description:
    "The ACABC program by Imaigal Trust empowers agricultural graduates to establish Agri-Clinics and Agri-Business Centres that provide professional advisory services to farmers and improve rural agricultural productivity.",
  keywords: [
    "ACABC Program",
    "Agri Clinics",
    "Agri Business Centres",
    "Agriculture Advisory Services",
    "Farmer Support Programs",
    "Agricultural Entrepreneurship",
    "Imaigal Trust Programs"
  ],
  openGraph: {
    title: "ACABC – Agri Clinics & Agri Business Centres",
    description:
      "Supporting agricultural graduates to become agri-entrepreneurs and provide professional services to farmers.",
    images: [
      {
        url: "/assets/images/programs/acabc.png",
        width: 1200,
        height: 630,
        alt: "ACABC Program",
      },
    ],
  },
};

export default function ACABCProgram() {
  const steps = [
    {
      title: "Selection",
      desc: "Identifying passionate agricultural graduates with a vision for rural transformation.",
    },
    {
      title: "Training",
      desc: "Providing specialized entrepreneurship and technical training through nodal institutes.",
    },
    {
      title: "Establishment",
      desc: "Supporting the setup of Agri-Clinics and Agri-Business Centres in rural areas.",
    },
    {
      title: "Service Delivery",
      desc: "Enabling graduates to provide doorstep technical services and inputs to farmers.",
    },
  ];

  const objectives = [
    {
      icon: <FaHandHoldingHeart />,
      text: "Provide accessible and professional agricultural advisory services to farmers",
    },
    {
      icon: <FaSeedling />,
      text: "Improve farm productivity through scientific farming practices",
    },
    {
      icon: <FaGraduationCap />,
      text: "Encourage agri-entrepreneurship among trained agricultural graduates",
    },
    {
      icon: <FaCheckCircle />,
      text: "Support farmers in accessing government schemes and agricultural resources",
    },
  ];

  const services = [
    {
      title: "Soil testing and nutrient management guidance",
      desc: "Expert guidance on soil fertility and balanced nutrient application for better yields.",
    },
    {
      title: "Crop protection and pest management advice",
      desc: "Timely advice on pest control and sustainable crop protection strategies.",
    },
    {
      title: "Guidance on improved seed varieties",
      desc: "Access to high-yielding seed varieties and modern scientific cultivation techniques.",
    },
    {
      title: "Assistance with farm inputs and tools",
      desc: "Helping farmers acquire the right tools and inputs for efficient farming operations.",
    },
    {
      title: "Post-harvest management and storage",
      desc: "Effective strategies for reducing post-harvest losses and ensuring safe storage.",
    },
    {
      title: "Market linkage and price information",
      desc: "Providing farmers with market trends, price updates, and connections to reliable buyers.",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="ACABC (Ongoing Program)"
        list={[
          { id: 1, name: "Programs", link: "/" },
          { id: 2, name: "ACABC" },
        ]}
      />

<div className="max-w-[1600px] mx-auto px-4 md:px-10 py-16">        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">

  {/* TEXT */}
  <div className="space-y-4 sm:space-y-5 md:space-y-6 inter-font">
    
    <h2 className="font-medium text-[#1B2F7C] font-poppins text-2xl gap-2 leading-[1.2]">
      ACABC – Agri-Clinics and Agri-Business Centres
    </h2>

    <p className="text-black-700 font-medium text-sm">
      Empowering agricultural graduates to transform rural farming
      through professional advisory services.
    </p>

    <p className="text-black-600 text-sm leading-relaxed">
      The Agri-Clinics and Agri-Business Centres (ACABC) program is a
      Government of India initiative designed to provide professional
      agricultural services to farmers. <strong>Imaigal Trust</strong>{" "}
      implements this program by supporting trained agricultural
      graduates to establish advisory centres that help farmers improve
      crop productivity and adopt modern farming techniques.
    </p>

    <p className="text-black-600 text-sm  leading-relaxed">
      These agri-clinics act as knowledge hubs for rural farmers,
      providing guidance on crop planning, soil health management, pest
      control, and improved agricultural technologies.
    </p>

  </div>

  {/* IMAGE */}
  <div className="relative group">
    
    <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-primary/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>

    <div className="relative w-full rounded-2xl overflow-hidden border-4 border-white flex justify-center">
      {/* IMAGE */}
<div className="relative group">

  <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-primary/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>

  <div className="relative w-full rounded-2xl overflow-hidden border-4 border-white flex justify-center">
    <Image
      src="/assets/images/programs/acabc.png"
      alt="ACABC Program Interaction"
      width={565}
      height={374}
      className="w-full max-w-[665px] h-auto object-cover rounded-lg"
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
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-700 shadow-md border border-primary/10 text-2xl">
                  {obj.icon}
                </div>
                <p className="inter-font font-medium text-black-800 text-xs">
                  {obj.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Services Grid */}
        <div className="mb-20">
                    <h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">

            Key Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
               className="p-8 bg-white border border-black-200 rounded-3xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-full bg-gradient-to-br from-white to-gray-50/30"
              >
                <div className="mb-6 w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <h3 className="josefin-font font-bold secondary-text-900 group-hover:primary-text transition-colors mb-4 min-h-[56px] flex items-center text-base sm:text-lg md:text-sml">
  {service.title}
</h3>

<p className="text-gray-600 inter-font flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
  {service.desc}
</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Process */}
<div className="mb-20">
  <div className="text-center mb-12">
<h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">      Implementation Process
    </h2>
    <p className="text-gray-600 inter-font max-w-2xl mx-auto">
      Our structured approach ensures that agricultural graduates are
      well-equipped to serve as professional consultants for the farming
      community.
    </p>
  </div>

  <div className="grid md:grid-cols-4 gap-8 relative items-stretch">
    {steps.map((step, index) => (
      <div key={index} className="relative flex flex-col h-full">

        <div className="bg-white border border-primary/20 p-6 rounded-2xl shadow-sm hover:border-primary hover:shadow-md transition-all flex flex-col items-center text-center h-full">

          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
            {index + 1}
          </div>

          <h4 className="josefin-font font-bold secondary-text-900 mb-2 uppercase">
            {step.title}
          </h4>

          <p className="text-gray-500 inter-font text-xs">
            {step.desc}
          </p>

        </div>

        {index < steps.length - 1 && (
          <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 text-primary/30 z-10">
            <span className="flex items-center text-green-600 text-2xl">
              &raquo;
            </span>
          </div>
        )}

      </div>
    ))}
  </div>
</div>

        {/* Why ACABC? */}
      <div className="grid md:grid-cols-3 gap-10 mb-2">
          <div className="flex items-start space-x-4">
            <div className="text-primary mt-1">
              <FaUsers size={24} />
            </div>
            <div>
              <h4 className="josefin-font font-bold secondary-text-900 uppercase mb-1">
                Graduates Empowerment
              </h4>
              <p className="text-gray-500 inter-font text-xs">
                Creating job opportunities for skilled agri-graduates in rural
                areas.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-primary mt-1">
              <FaGlobeAmericas size={24} />
            </div>
            <div>
              <h4 className="josefin-font font-bold secondary-text-900 uppercase mb-1">
                Regional Reach
              </h4>
              <p className="text-gray-500 inter-font text-xs">
                Extending professional services to remote villages where experts
                are scarce.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-primary mt-1">
              <FaChartLine size={24} />
            </div>
            <div>
              <h4 className="josefin-font font-bold secondary-text-900 uppercase mb-1">
                Sustainable Growth
              </h4>
              <p className="text-gray-500 inter-font text-xs">
                Driving long-term economic stability for both farmers and
                entrepreneurs.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center text-white p-12 text-center space-y-6">
            <h2 className="josefin-font font-bold uppercase tracking-tight text-2xl">
              Impact
            </h2>
            <p className="inter-font max-w-3xl font-light italic text-lg">
              &quot;Through the ACABC program, Imaigal Trust supports hundreds of
              farmers by providing timely agricultural guidance, improving crop
              yields, and strengthening rural agri-entrepreneurship.&quot;
            </p>
          </div>
          {/* Background pattern */}
          {/* <div className="h-64 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div> */}
        </div>
      </div>
    </div>
  );
}
