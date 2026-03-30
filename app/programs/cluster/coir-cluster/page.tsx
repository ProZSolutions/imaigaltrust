import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Cluster Development", link: "" },
    {
      id: 3,
      name: "  Erode Kongu Coir Cluster",
    },
  ];

  return (
    <div>
      <PageBanner title="Erode Kongu Coir Cluster" list={breadrumbs} />

<section className="py-10 max-w-[1700px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8">
  {/* Left Side - Text */}
  <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center md:ml-12">
    <h2 className="text-[36px] leading-[46px] font-medium text-[#1B2F7C] font-poppins">
      Revitalizing the Coir Industry for Sustainable Growth
    </h2>

    <p className="font-poppins font-normal text-[16px] leading-[30px] text-[#101010]">
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
    <div className=" p-3 md:p-5 flex flex-col md:flex-row md:items-center gap-5">
      
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
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Modernizing coir processing techniques for increased efficiency.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Establishing common facility centers (CFCs) with advanced machinery.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Providing skill development and capacity-building programs for artisans.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Creating market linkages and branding for coir-based products.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
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
    <h2 className="font-poppins font-medium text-[36px] leading-[46px] text-[#101010] text-center">
      Core Initiatives
    </h2>

    {/* Two Column Layout */}
    <div className="flex flex-col md:flex-row md:items-center gap-8">

      {/* Left Column: text */}
      <div className="w-full md:w-1/2 flex flex-col mt-6 font-poppins text-[#101010] gap-8">

        <div className="space-y-4">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Technology Upgradation
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Introducing modern coir processing equipment to enhance productivity.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Skill Development
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Conducting training sessions for artisans to improve their craftsmanship.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Sustainability Initiatives
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Encouraging eco-friendly production methods and waste utilization.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Market Expansion
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
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
  <div className="max-w-[1700px] mx-auto ">
    <h3 className="sfurti-heading  mt-10 text-center">
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
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Improved livelihoods for local coir artisans and entrepreneurs.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Enhanced production quality and efficiency.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
              Strengthened coir-based businesses and self-help groups.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">
              &raquo;
            </span>
            <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
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
