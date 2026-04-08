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
        <Image
          src="/assets/images/agriculture.png"
          width={346.87}
          height={348.76}
          className="rounded-full object-cover w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]"
          alt="agriculture"
        />

        <div className="w-full h-auto flex flex-col gap-6 justify-center md:ml-12">
          <p className="uppercase primary-text poppins-font weihgt text-xl">
            Agriculture-Based Initiatives
          </p>
          <h2 className="font-medium text-[#1B2F7C] font-poppins text-2xl">
            <span className="block">Empowering Farmers, Sustaining</span>
            <span className="block">Agriculture</span>
          </h2>

          <p className="font-poppins font-normal text-[#101010] text-base">
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
      <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-lg">
        Farmer Producer Organizations (FPOs)
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
  Supporting farmers through NABARD-backed FPCs, providing training,
  resources, and
  
    financial assistance for better productivity and market access.

</p>
    </div>

    <div className="section-box-lg">
      <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-xl">
        Organic & Sustainable Farming
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
        Encouraging eco-friendly agricultural practices, organic certification
        programs, and training on natural pest control and soil health
        management
      </p>
    </div>

    <div className="section-box-lg">
      <h3 className="font-poppins font-medium tracking-normal text-[#101010] text-xl">
        Water Conservation & Climate Resilience
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
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
      <h3 className="font-poppins font-medium text-[#101010] text-xl">
        Technology &amp; Innovation in Agriculture
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[#101010] text-xl">
        Technology &amp; Innovation in Agriculture
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[#101010] text-xl">
        Market Linkages &amp; Financial Support
      </h3>
      <p className="font-poppins font-normal text-gray-500 mb-5 text-base">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>
  </div>
</section>
    </div>
  );
}
