import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Agriculture" },
  ];

  return (
    <div>
      <PageBanner title="Agriculture" list={breadrumbs} />

      <section className="py-10 max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8 justify-center">

  {/* Image */}
  <div className="w-[220px] sm:w-[260px] md:w-[300px] aspect-square rounded-full overflow-hidden flex-shrink-0">
    <Image
      src="/assets/images/agriculture.png"
      alt="agriculture"
      width={400}
      height={400}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content */}
  <div className="w-full flex flex-col gap-6 justify-center md:ml-12 text-center md:text-left">

    <p className="uppercase text-sm sm:text-base md:text-lg lg:text-xl primary-text font-poppins">
  Agriculture-Based Initiatives
</p>

    <h2 className="font-medium text-[#1B2F7C] font-poppins text-xl sm:text-2xl md:text-3xl">
      <span className="block mb-2">Empowering Farmers, Sustaining</span>
      <span className="block">Agriculture</span>
    </h2>

    <p className="font-poppins text-[#101010] text-base leading-relaxed">
      Agri-Bra is a flagship initiative of Imaigal Trust aimed at
      transforming rural agriculture through innovation, sustainability,
      and community-driven practices. We work closely with farmers,
      agricultural experts, and industry partners to enhance productivity,
      ensure food security, and promote eco-friendly farming methods.
    </p>

  </div>
</section>

      <section className="pb-10 max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 mt-5">
  <div className="w-full lg:w-2/3 flex flex-col gap-6">
    <div className="section-box-lg">
      <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-base sm:text-lg md:text-xl mb-2">
  Farmer Producer Organizations (FPOs)
</h3>

<p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
  Supporting farmers through NABARD-backed FPCs, providing training,
  resources, and financial assistance for better productivity and
  market access.
</p>
    </div>

    <div className="section-box-lg">
      <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-base sm:text-lg md:text-xl mb-2">
  Organic & Sustainable Farming
</h3>

<p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
  Encouraging eco-friendly agricultural practices, organic certification
  programs, and training on natural pest control and soil health
  management
</p>
    </div>

    <div className="section-box-lg">
     <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-base sm:text-lg md:text-xl mb-2">
  Water Conservation & Climate Resilience
</h3>

<p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
  Implementing rainwater harvesting, drip irrigation, and sustainable
  water management strategies to combat climate change effects on farming
</p>
    </div>
  </div>

  <div className="w-full lg:w-1/3 flex justify-center">
    <Image
      src="/assets/images/agriculture.png"
      width={565.25}
      height={374}
      alt="agriculture"
      className="w-full max-w-[420px] h-auto"
    />
  </div>
</section>

<section className="w-full max-w-[1600px] mx-auto pt-0 px-4 md:px-10 mb-10">
  <div className="flex flex-col gap-6 w-full">
    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[#101010] text-base sm:text-lg md:text-xl mb-2">
  Technology &amp; Innovation in Agriculture
</h3>

<p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
  Implementing rainwater harvesting, drip irrigation, and sustainable
  water management strategies to combat climate change effects on farming.
</p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[#101010] text-base sm:text-lg md:text-xl mb-2">
  Technology &amp; Innovation in Agriculture
</h3>

<p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
  Implementing rainwater harvesting, drip irrigation, and sustainable
  water management strategies to combat climate change effects on farming.
</p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[#101010] text-base sm:text-lg md:text-xl mb-2">
        Market Linkages &amp; Financial Support
      </h3>
      <p className="font-poppins font-normal text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>
  </div>
</section>
    </div>
  );
}
