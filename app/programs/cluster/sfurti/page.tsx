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
      name: "SFURTI",
    },
  ];

  return (
    <div>
      <PageBanner
        title="Scheme of Fund for Regeneration of Traditional Industries"
        list={breadrumbs}
      />

     <section className="py-10 max-w-[1600px] mx-auto px-4 md:px-10">
  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

    {/* LEFT CONTENT */}
    <div className="w-full flex flex-col gap-6 justify-center">
      <h2 className="font-medium text-[#1B2F7C]  leading-[1.2] font-poppins text-2xl">
        Reviving Traditional Industries, Empowering Rural Communities
      </h2>

      <p className="font-poppins leading-relaxed text-[#101010] text-sm">
        The Scheme of Fund for Regeneration of Traditional Industries
        (SFURTI) is a government-backed initiative aimed at revitalizing
        India’s traditional industries by promoting cluster-based
        development. Imaigal Trust actively supports this mission by
        implementing SFURTI projects that enhance the productivity,
        competitiveness, and sustainability of rural artisans and
        entrepreneurs.
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="w-full flex justify-center">
      <Image
        src="/assets/images/sfurti/sfurti.png"
        width={565}
        height={374}
        alt="SFURTI Program"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>

  </div>
</section>

      <section className="py-2 px-4 md:px-10">
        
        <div className="max-w-[1600px] mx-auto">
        <h3 className="sfurti-heading text-center">
  SFURTI Goals & Objectives
</h3>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Left: Image */}
            <div className="w-full md:w-1/2">
             <Image
                src="/assets/images/sfurti/sfurti2.png"
                width={565.25}
                height={374}
                alt="agriculture"
                 className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Right: Heading + List */}
            <div className="w-full md:w-1/2 flex flex-col">
              {/* <h3 className="sfurti-heading">SFURTI Goals &amp; Objectives</h3> */}

              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-3">
                  <span className="h-[24px] flex items-center text-green-600 text-sm">
                    &raquo;
                  </span>
                  <p className="font-poppins text-[#101010] text-sm">
                    Organizing artisans into{" "}
                    <span className="font-semibold">
                      self-sustaining clusters
                    </span>{" "}
                    to enhance collective growth.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-[24px] flex items-center text-green-600 text-sm">
                    &raquo;
                  </span>
                  <p className="font-poppins text-[#101010] text-sm">
                    Providing{" "}
                    <span className="font-semibold">
                      modern infrastructure, skill development, and
                      technological support
                    </span>{" "}
                    to traditional industries.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-[24px] flex items-center text-green-600 text-sm">
                    &raquo;
                  </span>
                  <p className="font-poppins text-[#101010] text-sm">
                    Enhancing{" "}
                    <span className="font-semibold">market linkages</span> to
                    increase income opportunities for rural artisans.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-[24px] flex items-center text-green-600 text-sm">
                    &raquo;
                  </span>
                  <p className="font-poppins text-[#101010] text-sm">
                    Promoting{" "}
                    <span className="font-semibold">
                      sustainable and eco-friendly practices
                    </span>{" "}
                    in traditional manufacturing.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

     <section className="pt-8 pb-5 px-4 md:px-10">
  <div className="max-w-[1600px] mx-auto flex flex-col gap-10">

    {/* Centered Heading */}
    <h2 className="font-poppins font-medium text-[#101010] text-center text-lg sm:text-xl md:text-2xl lg:text-2xl">
  Core Industry Sectors
</h2>

    {/* Two Column Layout */}
    <div className="flex flex-col md:flex-row items-center gap-12">

      {/* Left Column - Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-10 font-poppins text-[#101010]">

        {/* Coir */}
        <div className="space-y-3">
         <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
  Coir Industry Development
</h3>

<p className="text-xs sm:text-sm md:text-base leading-relaxed">
  Strengthening coir-based enterprises through improved
  processing techniques and market expansion.
</p>
        </div>

        {/* Handicrafts */}
        <div className="space-y-3">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Handicrafts & Handloom
          </h3>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            Preserving and modernizing traditional weaving and craft
            industries.
          </p>
        </div>

        {/* Agro */}
        <div className="space-y-3">
          <h3 className="font-medium text-base sm:text-lg md:text-xl mb-2">
            Agro-based & Rural Industries
          </h3>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            Supporting small-scale food processing, herbal products,
            and organic farming initiatives.
          </p>
        </div>

      </div>

      {/* Right Column - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assets/images/sfurti/sfurti3.png"
          width={565}
          height={374}
          alt="agriculture"
          className="w-full max-w-[565px] h-auto object-cover rounded-lg"
        />
      </div>

    </div>
  </div>
</section>
    </div>
  );
}
