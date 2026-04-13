import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export const metadata: Metadata = {
  title: "Erode Kongu Coir Cluster | Imaigal Trust",
  description:
    "The Erode Kongu Coir Cluster initiative under the SFURTI scheme strengthens the coir industry by empowering rural artisans, improving production quality, and promoting sustainable coir-based businesses.",
  keywords: [
    "Erode Kongu Coir Cluster",
    "SFURTI Coir Cluster",
    "Coir Industry Development",
    "Rural Artisan Support",
    "Coir Products Tamil Nadu",
    "Imaigal Trust Cluster Development",
  ],
  openGraph: {
    title: "Erode Kongu Coir Cluster | Imaigal Trust",
    description:
      "Revitalizing the coir industry in Erode through technology, training, and sustainable development under the SFURTI cluster initiative.",
    url: "https://imaigaltrust.org/programs/cluster-development/erode-kongu-coir-cluster",
    siteName: "Imaigal Trust",
    type: "website",
    images: [
      {
        url: "/assets/images/coir/agriculture.png",
        width: 1200,
        height: 630,
        alt: "Erode Kongu Coir Cluster",
      },
    ],
  },
};

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Cluster Development", link: "" },
    {
      id: 3,
      name: "Erode Kongu Coir Cluster",
    },
  ];

  return (
    <div>
      <PageBanner title="Erode Kongu Coir Cluster" list={breadrumbs} />

<section className="py-10 max-w-[1700px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8">
  {/* Left Side - Text */}
  <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center md:ml-12">
    <h2 className="font-medium text-[#1B2F7C] font-poppins text-2xl gap-2 leading-[1.2]">
      Revitalizing the Coir Industry for Sustainable Growth
    </h2>

    <p className="font-poppins font-normal leading-relaxed text-[#101010] text-sm">
      The Erode Kongu Coir Cluster is a pioneering initiative aimed at
      strengthening the coir industry in the Erode region by enhancing
      production, quality, and market linkages. Supported under the SFURTI
      scheme, this cluster is focused on empowering rural coir artisans,
      promoting sustainable practices, and boosting economic growth.
    </p>
  </div>

  {/* Right Side - Image */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src="/assets/images/coir/agriculture.png"
      width={565}
      height={374}
      alt="agriculture"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>

</section>
      <section className="py-1 px-4 md:px-10">
  <div className="max-w-[1600px] mx-auto">
<h3 className="sfurti-heading text-center">Cluster Development Goals</h3>
    <div className="p-3 md:p-5 flex flex-col md:flex-row md:items-center gap-5">
      
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assets/images/coir/agriculture2.png"
          width={565.25}
          height={374}
          alt="agriculture2"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Right: Heading + List */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
       

        <ul className="mt-8 ml-10 space-y-6">
          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Modernizing coir processing techniques for increased efficiency.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Establishing common facility centers (CFCs) with advanced machinery.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Providing skill development and capacity-building programs for artisans.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Creating market linkages and branding for coir-based products.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Promoting eco-friendly and sustainable coir production methods.
            </p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
      <section className="pt-4 pb-5 px-4 md:px-10">
  <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
    
    {/* Centered Heading */}
    <h2 className="font-poppins font-medium text-[#101010] text-center text-2xl">
      Core Initiatives
    </h2>

    {/* Two Column Layout */}
    <div className="flex flex-col md:flex-row md:items-center gap-8">

      {/* Left Column: text */}
      <div className="w-full md:w-1/2 flex flex-col mt-6 font-poppins text-[#101010] gap-8">

        <div className="space-y-4">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
  Technology Upgradation
</h3>

<p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
  Introducing modern coir processing equipment to enhance productivity.
</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Skill Development
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Conducting training sessions for artisans to improve their craftsmanship.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Sustainability Initiatives
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Encouraging eco-friendly production methods and waste utilization.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Market Expansion
          </h3>
          <p className="font-normal text-xs sm:text-sm md:text-base leading-relaxed">
            Strengthening supply chains and increasing product outreach through e-commerce and direct marketing.
          </p>
        </div>

      </div>

      {/* Right Column: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assets/images/coir/agriculture3.png"
          width={565}
          height={374}
          alt="agriculture3"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

    </div>
  </div>
</section>


      <section className="py-6 px-4 md:px-10">
  <div className="max-w-[1700px] mx-auto">
    <h3 className="sfurti-heading mt-10 text-center">
          Benefits
        </h3>
    <div className="p-3 md:p-5 flex flex-col md:flex-row items-center gap-8">
      
      {/* Left: Image */}
      <div className="w-full md:w-1/2">
        <Image
          src="/assets/images/coir/agriculture4.png"
          width={565.25}
          height={374}
          alt="agriculture4"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Right: Heading + List */}
      <div className="w-full md:w-1/2 flex flex-col">
        

        <ul className="mt-8 ml-10 space-y-6">
          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Improved livelihoods for local coir artisans and entrepreneurs.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Enhanced production quality and efficiency.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Strengthened coir-based businesses and self-help groups.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-sm">
              &raquo;
            </span>
            <p className="font-poppins text-[#101010] text-sm">
              Increased employment opportunities in rural areas.
            </p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}
