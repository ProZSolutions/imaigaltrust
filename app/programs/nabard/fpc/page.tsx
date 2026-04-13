import type { Metadata } from "next";
import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import {
  FaUsers,
  FaHandshake,
  FaMoneyCheckAlt,
  FaBuilding,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Farmer Producer Companies (FPC) | Imaigal Trust",
  description:
    "Imaigal Trust supports the formation of Farmer Producer Companies (FPCs) to strengthen farmers' collective power, improve market access, and increase rural agricultural income.",
  keywords: [
    "Farmer Producer Companies",
    "FPC Program",
    "Farmer Collective Organizations",
    "Agriculture Market Linkages",
    "Rural Farmer Empowerment",
    "Imaigal Trust Programs"
  ],
  openGraph: {
    title: "Farmer Producer Companies | Imaigal Trust",
    description:
      "Empowering farmers through collective institutions, financial access, and improved agricultural market opportunities.",
    images: [
      {
        url: "/assets/images/programs/fpc.png",
        width: 1200,
        height: 630,
        alt: "Farmer Producer Companies",
      },
    ],
  },
};

export default function FPC() {
  const objectives = [
    {
      icon: <FaUsers />,
      text: "Organize farmers into collective business institutions",
    },
    {
      icon: <FaHandshake />,
      text: "Improve market access and financial inclusion",
    },
    {
      icon: <FaMoneyCheckAlt />,
      text: "Increase farmers’ income through collective action",
    },
  ];

  const activities = [
    {
      title: "Formation & Registration",
      desc: "End-to-end support in the legal formation and registration of Farmer Producer Companies.",
    },
    {
      title: "Governance Training",
      desc: "Upskilling farmers in governance, transparent management, and financial planning.",
    },
    {
      title: "Financial Access",
      desc: "Facilitating access to institutional credit and central/state government schemes.",
    },
    {
      title: "Market Linkages",
      desc: "Creating sustainable market linkages for agricultural products to ensure fair pricing.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Farmer Producer Companies"
        list={[
          { id: 1, name: "Programs", link: "/" },
          { id: 2, name: "FPC" },
        ]}
      />

      <div className="max-w-[1700px] mx-auto px-6 py-5 lg:px-16">
        {/* FPC Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6 inter-font">
           <h2 className="josefin-font font-bold text-[#1B2F7C] uppercase pt-25 text-lg sm:text-xl md:text-xl lg:text-2xl">
  Farmer Producer Companies (FPC)
</h2>
            
            {/* <div className="w-20 h-2 bg-[#1B2F7C] rounded-full"></div> */}
            <p className="text-black text-sml font-medium">
              Empowering farmers through collective bargaining and direct market
              access.
            </p>
            <p className="text-black text-sml">
              Farmer Producer Companies (FPCs) help farmers work collectively to
              improve their economic strength. <strong>Imaigal Trust</strong>{" "}
              supports the formation and development of these farmer-owned
              institutions to enable farmers to access markets, financial
              services, and agricultural technologies more effectively.
            </p>
            <p className="text-black text-sml">
              Through FPCs, farmers can reduce production costs, improve
              bargaining power, and gain better market opportunities.
            </p>
          </div>
          <div className="relative group">
  <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>

  <div className="relative h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg">
    <Image
      src="/assets/images/programs/fpc.png"
      alt="Farmer Producer Companies"
      fill
      className="object-cover"
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
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-700 shadow-md border border-primary/10 text-2xl">
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
                className="p-8 bg-white border-1 border-black rounded-3xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full bg-gradient-to-br from-white to-gray-50/30"
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

        {/* Beneficiaries & Why FPC Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-2">
          <div className="bg-primary p-8 rounded-3xl text-white">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaBuilding />
              </div>
              <h3 className="josefin-font font-bold uppercase text-lg">
                Collective Power
              </h3>
            </div>
            <p className="inter-font text-gray-100 text-base">
              By organizing into an FPC, small scale farmers gain the same
              advantages as large corporations—better prices for seeds,
              collective machinery, and direct access to wholesale buyers.
            </p>
          </div>
          <div className="bg-secondary-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="josefin-font font-bold secondary-text-900 uppercase mb-6 text-lg">
              Beneficiaries
            </h3>
            <ul className="space-y-4">
              {[
                "Small and marginal farmers",
                "Rural producer groups",
                "Women farmer collectives",
                "Youth agri-entrepreneurs",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-3 text-gray-700 inter-font"
                >
                  <span className="h-[24px] flex items-center text-green-600 text-sm">
                    &raquo;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
