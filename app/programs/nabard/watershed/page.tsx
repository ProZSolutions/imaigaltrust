"use client";
import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import { FaWater, FaUsers, FaMountain } from "react-icons/fa";

export default function WatershedDevelopment() {
  const objectives = [
    {
      icon: <FaWater />,
      text: "Improve water availability in rain-fed agricultural regions",
    },
    {
      icon: <FaMountain />,
      text: "Prevent soil erosion and land degradation",
    },
    {
      icon: <FaUsers />,
      text: "Strengthen community participation in natural resource management",
    },
  ];

  const activities = [
    {
      title: "Water Harvesting",
      desc: "Construction of check dams and water harvesting structures to improve groundwater recharge.",
    },
    {
      title: "Land Development",
      desc: "Physical activities such as contour bunding and trenching to prevent run-off and erosion.",
    },
    {
      title: "Greening & Cover",
      desc: "Extensive plantation and vegetative cover development to restore degraded landscapes.",
    },
    {
      title: "Community Training",
      desc: "Empowering local communities with knowledge on sustainable land and water management.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Watershed Development"
        list={[
          { id: 1, name: "Programs", link: "/" },
          { id: 2, name: "Watershed Development" },
        ]}
      />

      <div className="max-w-[1700px] mx-auto px-6 py-5 lg:px-16">
        {/* Watershed Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6 inter-font">
           <h2 className="josefin-font pt-25 font-bold text-[#1B2F7C] uppercase text-lg sm:text-xl md:text-xl lg:text-2xl">
  Watershed Development
</h2>
            {/* <div className="w-20 h-2 bg-[#1B2F7C] rounded-full"></div> */}
            <p className="text-black text-sm font-medium leading-relaxed">
              Restoring degraded land and securing water resources for
              sustainable rural agriculture.
            </p>
            <p className="text-black text-sm leading-relaxed">
              The Watershed Development program focuses on improving soil and
              water conservation in rural landscapes. By restoring degraded land
              and improving groundwater recharge, the project helps farming
              communities maintain sustainable agricultural productivity.
            </p>
            <p className="text-black text-sm leading-relaxed">
              <strong>Imaigal Trust</strong> works closely with local
              communities to implement watershed activities that improve water
              availability, reduce soil erosion, and support long-term
              environmental sustainability.
            </p>
          </div>
         <div className="relative group">
  <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden">
    <Image
      src="/assets/images/programs/water.jpeg"
      alt="Watershed Development Project"
      fill
                className="object-contain-xl"
    />
  </div>
</div>
        </div>

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
                className="p-8 bg-white border-1 border-black-100 rounded-3xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full bg-gradient-to-br from-white to-gray-50/30"
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
        <div className="grid md:grid-cols-3 gap-8 mb-20 px-4">
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 md:col-span-1 flex flex-col items-center text-center space-y-4">
            <div className="text-primary text-2xl">
              <FaUsers />
            </div>
            <h4 className="josefin-font font-bold secondary-text-900 uppercase">
              Beneficiaries
            </h4>
            <p className="inter-font text-gray-600 text-xs">
              Farmers living in water-scarce and rain-fed agricultural regions,
              focusing on small-holder agrarian communities.
            </p>
          </div>

          <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12 text-white flex flex-col justify-center">
            <div className="relative z-10 space-y-4">
              <h2 className="josefin-font font-bold uppercase tracking-tight text-xl">
                Environmental Stewardship
              </h2>
              <p className="inter-font font-light italic opacity-90 text-base">
                &quot;Our watershed interventions go beyond water storage; they
                restore the ecological balance of the entire landscape, ensuring
                that rural livelihoods remain resilient against changing
                environmental patterns.&quot;
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
