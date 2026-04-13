import type { Metadata } from "next";
import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import {
  FaUsers,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Climate Proofing of Agriculture | Imaigal Trust",
  description:
    "The Climate Proofing of Agriculture project by Imaigal Trust helps farmers adapt to climate change through climate-smart agriculture practices, resilient crops, and sustainable farming techniques.",
  keywords: [
    "Climate Proofing Agriculture",
    "Climate Smart Farming",
    "Sustainable Agriculture",
    "Farmer Climate Adaptation",
    "NABARD Climate Project",
    "Imaigal Trust Programs"
  ],
  openGraph: {
    title: "Climate Proofing of Agriculture | Imaigal Trust",
    description:
      "Supporting farmers with climate-resilient agriculture practices, drought-resistant crops, and sustainable resource management.",
    images: [
      {
        url: "/assets/images/programs/climate.png",
        width: 1200,
        height: 630,
        alt: "Climate Proofing Agriculture",
      },
    ],
  },
};

export default function ClimateProofing() {
  const objectives = [
    {
      icon: <FaShieldAlt />,
      text: "Reduce farmers’ vulnerability to climate-related risks",
    },
    {
      icon: <FaLeaf />,
      text: "Promote sustainable agricultural practices",
    },
    {
      icon: <FaUsers />,
      text: "Strengthen community knowledge on climate-resilient farming methods",
    },
  ];

  const activities = [
    {
      title: "Climate-Smart Ag Training",
      desc: "Comprehensive training for farmers on climate-smart agriculture practices and adaptation.",
    },
    {
      title: "Resilient Crop Varieties",
      desc: "Promotion and distribution of drought-resistant and climate-adaptive crop varieties.",
    },
    {
      title: "Awareness & Education",
      desc: "Community awareness programs focused on local climate adaptation and survival strategies.",
    },
    {
      title: "Conservation Techniques",
      desc: "Field demonstrations of sustainable soil health and effective water conservation techniques.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Climate Proofing"
        list={[
          { id: 1, name: "Programs", link: "/" },
          { id: 2, name: "Climate Proofing" },
        ]}
      />

      <div className="max-w-[1800px] mx-auto px-6 py-10 lg:px-16">
        {/* Main Content Section */}
        <section className="py-10 max-w-[1700px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8 mb-10">

  {/* Left Side - Text */}
  <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
    
    <h2 className="font-bold text-[#1B2F7C] uppercase josefin-font text-lg sm:text-xl md:text-xl lg:text-2xl">
  Climate Proofing of Agriculture
</h2>

    <p className="text-black font-medium">
      Building resilient farming systems to withstand irregular rainfall,
      droughts, and extreme weather.
    </p>

    <p className="text-black">
      Climate change poses increasing challenges for rural farmers through
      irregular rainfall, droughts, and extreme weather events. The Climate
      Proofing of Agriculture project aims to build resilient farming systems
      that can withstand these environmental changes.
    </p>

    <p className="text-black">
      Through community training and field demonstrations,{" "}
      <strong>Imaigal Trust</strong> promotes climate-smart agricultural
      practices that protect crops, conserve resources, and improve long-term
      farm sustainability.
    </p>

  </div>

  {/* Right Side - Image */}
  <div className="w-full md:w-1/2 flex justify-center">

    <div className="relative group w-full max-w-[565px]">

      <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>

      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src="/assets/images/programs/climate.png"
          alt="Climate Proofing Agriculture"
          fill
          className="object-cover-xl transition-transform duration-500"
        />
      </div>

    </div>

  </div>

</section>

       {/* Objectives Section */}
<div className="bg-secondary-50 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-gray-100">
  <h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">
  Objectives
</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {objectives.map((obj, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center space-y-4 px-6"
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

        {/* Key Activities Grid */}
        <div className="mb-20">
          <h2 className="josefin-font font-bold secondary-text-900 uppercase text-center mb-12 text-lg sm:text-xl md:text-xl lg:text-2xl">
            Key Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-black rounded-3xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full bg-gradient-to-br from-white to-gray-50/30"
              >
                <div className="mb-4 w-10 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <h3 className="josefin-font font-bold secondary-text-900 group-hover:primary-text transition-colors mb-4 text-base">
                  {activity.title}
                </h3>
                <p className="text-gray-500 inter-font text-xs">
                  {activity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficiaries & Impact */}
        <div className="grid md:grid-cols-3 gap-8 mb-2">
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex flex-col items-center text-center space-y-4">
            <div className="text-primary text-2xl">
              <FaUsers />
            </div>
            <h4 className="josefin-font font-bold secondary-text-900 uppercase">
              Target Beneficiaries
            </h4>
            <p className="inter-font text-gray-600 text-xs">
              Small and marginal farmers in climate-sensitive and drought-prone
              rural areas.
            </p>
          </div>

          <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12 text-white flex flex-col justify-center">
            <div className="relative z-10 space-y-4">
              <h2 className="josefin-font font-bold uppercase tracking-tight text-xl">
                Project Impact
              </h2>
              <p className="inter-font font-light italic opacity-90 text-base">
                Increasing the adaptive capacity of communities to mitigate the
                adverse effects of climate change while ensuring food security
                and stable livelihoods through scientific intervention.
              </p>
            </div>
            {/* Simple pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
