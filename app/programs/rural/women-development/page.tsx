import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Rural Development" },
    { id: 3, name: "Women Development" },
  ];

  return (
    <div>
      <PageBanner
        title="Empowering Rural Women for a Better Future"
        list={breadrumbs}
      />

      {/* SECTION 1 */}
      <section className="pt-8 sm:pt-10 md:pt-14 pb-4 sm:pb-6 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-16">
        {/* TEXT */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 justify-center">
          <h2 className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[32px] sm:leading-[38px] md:leading-[44px] lg:leading-[48px] font-medium text-[#1B2F7C] font-poppins">
            Building Stronger Communities Through Women’s Empowerment
          </h2>

          <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#101010]">
            Imaigal Trust is committed to uplifting rural women by providing
            them with the necessary skills, resources, and opportunities to
            achieve financial independence and social empowerment. Our Women
            Development initiatives focus on creating self-reliant communities
            where women play a pivotal role in economic and social growth.
          </p>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/images/women/women.png"
            width={565}
            height={374}
            alt="women"
            className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
          />
        </div>
      </section>

      {/* SECTION 2 */}
<section className="pt-8 sm:pt-10 md:pt-14 pb-4 sm:pb-4 md:pb-6 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-6 md:gap-10">
          {/* HEADING */}
          <h2 className="font-poppins font-medium text-[22px] sm:text-[28px] md:text-[34px] lg:text-[36px] leading-[32px] md:leading-[44px] text-[#101010] text-center">
            Core Empowerment
          </h2>

          {/* CONTENT */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
            {/* LEFT CONTENT */}
            <div className="w-full md:w-1/2 flex flex-col mt-2 md:mt-6 font-poppins text-[#101010] gap-6 md:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-medium text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
                  Livelihood & Skill Development
                </h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                  Training programs in tailoring, handicrafts, food processing,
                  and other income-generating activities.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-medium text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
                  Education & Financial Literacy
                </h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                  Workshops on entrepreneurship, savings, and self-help group
                  (SHG) formation.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-medium text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
                  Employment & Entrepreneurship Support
                </h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                  Encouraging eco-friendly production methods and waste
                  utilization.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-medium text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
                  Health & Well-being
                </h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                  Awareness programs on maternal health, nutrition, hygiene, and
                  mental well-being.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/assets/images/women/core.png"
                width={565}
                height={374}
                alt="core"
                className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
<section className="pt-8 sm:pt-10 md:pt-12 pb-2 sm:pb-4 md:pb-6 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-6 md:gap-10">
          {/* HEADING */}
          <h2 className="font-poppins font-medium text-[22px] sm:text-[28px] md:text-[34px] lg:text-[36px] leading-[32px] md:leading-[44px] text-[#101010] text-center">
            Impact & Achievements
          </h2>

          {/* CONTENT */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
            {/* LEFT CONTENT */}
            <div className="w-full md:w-1/2 flex flex-col mt-2 md:mt-6 font-poppins text-[#101010] gap-6 md:gap-8 order-1 md:order-1">
              <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                    Trained over [Number] women in skill development programs.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                    Established multiple SHGs for financial independence.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                    Enabled women entrepreneurs to access markets and financial aid.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] md:leading-[24px]">
                    Improved health awareness and access to medical facilities for women.
                  </p>
                </li>
              </ul>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-1/2 flex justify-center order-2 md:order-2">
              <Image
                src="/assets/images/women/impact.png"
                width={565}
                height={374}
                alt="impact"
                className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}