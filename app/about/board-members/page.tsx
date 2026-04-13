import type { Metadata } from "next";

import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";

import React from "react";
import "./page.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Board Members | Imaigal Trust",
  description: "Leadership team and board of directors of Imaigal Trust.",
};

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Board Members" },
  ];

  return (
    <div>
      <PageBanner title="Board Members" list={breadrumbs} />
      <div className="max-w-[1700px] mx-auto w-full">

      <section className="py-10 px-4 md:px-20 flex flex-col md:flex-row items-center gap-8 justify-center">
        <Image
          src="/assets/images/about/board-members/boardOfDirector.png"
          width={480}
          height={354}
          alt="agriculture"
          className="object-cover w-[320px] h-auto sm:w-[260px] sm:h-auto md:w-[320px] md:h-auto lg:w-[480px] lg:h-auto mx-auto rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.7),0_0_3px_rgba(255,255,255,1)]"
        />

        <div className="w-full h-auto flex flex-col gap-6 justify-center md:ml-12">
          <h2 className="font-medium text-[#1B2F7C] font-poppins text-lg sm:text-sml md:text-xl lg:text-2xl">
  <span className="block poppins-font">BOARD OF DIRECTORS</span>
</h2>

          <p className="poppins-font font-normal text-[#101010] text-justify text-sm">
            At Imaigal Trust, our leadership team comprises visionary
            individuals who bring expertise in rural development, agriculture,
            social work, and policy-making. Our board members are dedicated to
            uplifting communities and ensuring transparency, impact, and
            sustainability in our initiatives.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="md:hidden max-w-[600px] mx-auto flex flex-col items-center gap-6">
          <h2 className="font-medium text-[#096412] font-poppins text-center text-lg sm:text-xl md:text-2xl">
  Founder’s Vision:
</h2>
          <h3 className="font-poppins font-semibold text-[#1B2F7C] text-center text-base sm:text-lg md:text-xl">
  Leading Change for a Sustainable Future
</h3>
          <div className="flex-shrink-0 w-full mb-6">
            <div className="bg-gray-100 p-8 rounded-xl flex flex-col items-center border border-gray-200">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-sm bg-white p-2 max-w-[360px]">
                <Image
                  src="/assets/images/about/board-members/member_5.png"
                  alt="Mr. Prabhu R"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center space-y-2">
                <h4 className="poppins-font font-bold text-[#1B2F7C] text-xl">
                  Mr. Prabhu R
                </h4>
                <p className="poppins-font font-medium text-[#096412] uppercase tracking-wider text-sm">
                  Founder & Chief Strategist
                </p>
              </div>
            </div>
          </div>
          <p className="font-poppins text-[#101010] text-justify text-sm">
            Mr. R. Prabhu is the founding Managing Trustee and Financial Trustee
            of Imagal Trust. He oversees the Trust&apos;s overall strategic
            direction, financial governance, and program implementation across
            Tamil Nadu. With a strong academic foundation in agriculture and
            agri-business management, he brings both technical knowledge and
            deep grassroots experience to his leadership role.
          </p>
          <p className="font-poppins text-[#101010] text-justify text-sm">
            As a dedicated social worker, Mr. Prabhu has championed the cause of
            smallholder farmers in Namakkal district and beyond — building
            systems that empower rural communities through sustainable
            agriculture, collective action, and institutional support.
          </p>

          <div className="w-full flex flex-col gap-3 mt-4">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                Qualification:
              </span>
              <span className="text-[#101010]">
                M.Sc., PG Diploma in Agri Business Management
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                Location:
              </span>
              <span className="text-[#101010]">
                S.Uduppam, Namakkal District, Tamil Nadu
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                Occupation:
              </span>
              <span className="text-[#101010]">Social Worker</span>
            </div>
          </div>

          {/* <button className="mt-6 inline-block bg-[#1B2F7C] text-white font-poppins font-medium px-6 py-3 rounded cursor-pointer hover:bg-[#164197] hover:scale-105">
            VIEW PROFILE
          </button> */}
        </div>

        {/* DESKTOP LAYOUT (≥ md) */}
        <div className="hidden md:flex max-w-[1350px] mx-auto items-stretch gap-8">
          {/* Left: Image + framed background + caption */}
          <div className="flex-shrink-0 w-[440px]">
            <div className="bg-gray-100 p-8 rounded-xl flex flex-col h-full border border-gray-200">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm bg-white p-2">
                <Image
                  src="/assets/images/about/board-members/member_5.png"
                  alt="Mr. Prabhu R"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center space-y-2">
                <h4 className="poppins-font font-bold text-[#1B2F7C] text-2xl">
                  Mr. Prabhu R
                </h4>
                <p className="poppins-font font-medium text-[#096412] uppercase tracking-wider text-base">
                  Founder & Chief Strategist
                </p>
              </div>
            </div>
          </div>

          {/* Right: Heading + Text */}
          <div className="flex-1 flex flex-col justify-center gap-6 py-4">
            <p className="poppins-font font-medium text-[#096412] text-xl">
              Founder’s Vision:
            </p>
            <h2 className="poppins-font - font-semibold text-[#1B2F7C] text-2xl">
              Leading Change for a Sustainable Future
            </h2>
            <p className="poppins-font text-[#101010] text-justify text-sm">
              Mr. R. Prabhu is the founding Managing Trustee and Financial
              Trustee of Imagal Trust. He oversees the Trust&apos;s overall
              strategic direction, financial governance, and program
              implementation across Tamil Nadu. With a strong academic
              foundation in agriculture and agri-business management, he brings
              both technical knowledge and deep grassroots experience to his
              leadership role.
            </p>
            <p className="poppins-font text-[#101010] text-justify text-sm">
              As a dedicated social worker, Mr. Prabhu has championed the cause
              of smallholder farmers in Namakkal district and beyond — building
              systems that empower rural communities through sustainable
              agriculture, collective action, and institutional support.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Qualification:
                </span>
                <span className="text-[#101010]">
                  M.Sc., PG Diploma in Agri Business Management
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Location:
                </span>
                <span className="text-[#101010]">
                  S.Uduppam, Namakkal District, Tamil Nadu
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Occupation:
                </span>
                <span className="text-[#101010]">Social Worker</span>
              </div>
            </div>

            {/* <button className="inline-flex items-center justify-center bg-[#1B2F7C] text-white font-poppins font-medium uppercase px-6 py-3 rounded-md shadow-sm hover:bg-[#164197] hover:scale-105 max-w-[170px] cursor-pointer">
              VIEW PROFILE
            </button> */}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        {/* ========== MOBILE ONLY ========== */}
        <div className="md:hidden max-w-[600px] mx-auto flex flex-col items-center gap-6">
          <h2 className="font-poppins font-medium text-[#096412] text-base sm:text-lg md:text-xl">
  Cultivating Growth:
</h2>

<h3 className="font-poppins font-semibold text-[#1B2F7C] text-center text-base sm:text-lg md:text-xl lg:text-2xl">
  Leadership in Agriculture & Rural Development
</h3>

          <div className="flex-shrink-0 w-full mb-6">
            <div className="bg-gray-100 p-8 rounded-xl flex flex-col items-center border border-gray-200">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-sm bg-white p-2 max-w-[360px]">
                <Image
                  src="/assets/images/about/board-members/member_1.png"
                  alt="Mrs. A. Poongodi"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center space-y-2">
                <h4 className="poppins-font font-bold text-[#1B2F7C] text-xl">
                  Mrs. A. Poongodi
                </h4>
                <p className="poppins-font font-medium text-[#096412] uppercase tracking-wider text-sm">
                  Director of Agriculture & Rural Development
                </p>
              </div>
            </div>
          </div>

          {/* 3) Text blocks */}
          <div className="w-full flex flex-col gap-4">
            <p className="font-poppins text-[#101010] text-justify text-xs">
              Mrs. A. Poongodi serves as Secretary of Imagal Trust and plays a
              central role in coordinating the Trust&apos;s administrative
              operations, program documentation, and community outreach
              activities. She is a qualified social worker with additional
              specialisation in agri-business management.
            </p>
            <p className="font-poppins text-[#101010] text-justify text-sm">
              Mrs. A. Poongodi is particularly focused on women&apos;s participation
              in agricultural livelihoods, self-help group formation, and
              community-led development initiatives. Her leadership has been
              instrumental in expanding the Trust&apos;s reach among women
              farming communities.
            </p>
            <div className="w-full flex flex-col gap-3 mt-4">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                  Qualification:
                </span>
                <span className="text-[#101010]">
                  M.S.W., PG Diploma in Agri Business Management
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                  Location:
                </span>
                <span className="text-[#101010]">
                  S.Uduppam, Namakkal District, Tamil Nadu
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-[#1B2F7C] sm:min-w-[120px]">
                  Occupation:
                </span>
                <span className="text-[#101010]">Social Worker</span>
              </div>
            </div>{" "}
          </div>

          {/* 4) Button */}
          {/* <button className="mt-6 inline-block bg-[#1B2F7C] text-white font-poppins font-medium px-6 py-3 rounded cursor-pointer hover:bg-[#164197] hover:scale-105">
            VIEW PROFILE
          </button> */}
        </div>

        {/* ========== DESKTOP ONLY ========== */}
        <div className="hidden md:flex max-w-[1350px] mx-auto items-stretch gap-8 md:flex-row-reverse">
          {/* Right: Image + framed background + caption */}
          <div className="flex-shrink-0 w-[440px]">
            <div className="bg-gray-100 p-8 rounded-xl flex flex-col h-full border border-gray-200">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm bg-white p-2">
                <Image
                  src="/assets/images/about/board-members/member_1.png"
                  alt="Mrs. A. Poongodi"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center space-y-2">
                <h4 className="poppins-font font-bold text-[#1B2F7C] text-2xl">
                  Mrs. A. Poongodi
                </h4>
                <p className="poppins-font font-medium text-[#096412] uppercase tracking-wider text-base">
                  Director of Agriculture & Rural Development
                </p>
              </div>
            </div>
          </div>

          {/* Left: Heading, text, button */}
          <div className="flex-1 flex flex-col justify-center gap-4 py-4">
            <p className="font-poppins font-medium text-[#096412] text-xl">
              Cultivating Growth:
            </p>
            <h3 className="poppins-font font-semibold text-[#1B2F7C] text-2xl">
              Leadership in Agriculture & Rural Development
            </h3>
            <p className="poppins-font text-[#101010] text-sm">
              Mrs. A. Poongodi serves as Secretary of Imagal Trust and plays a
              central role in coordinating the Trust&apos;s administrative
              operations, program documentation, and community outreach
              activities. She is a qualified social worker with additional
              specialisation in agri-business management.
            </p>
            <p className="poppins-font text-[#101010] text-sm">
              Mrs. A. Poongodi is particularly focused on women&apos;s participation
              in agricultural livelihoods, self-help group formation, and
              community-led development initiatives. Her leadership has been
              instrumental in expanding the Trust&apos;s reach among women
              farming communities.
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Qualification:
                </span>
                <span className="text-[#101010]">
                  M.S.W., PG Diploma in Agri Business Management
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Location:
                </span>
                <span className="text-[#101010]">
                  S.Uduppam, Namakkal District, Tamil Nadu
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-[#1B2F7C] min-w-[120px]">
                  Occupation:
                </span>
                <span className="text-[#101010]">Social Worker</span>
              </div>
            </div>
            {/* <button className="inline-flex items-center justify-center bg-[#1B2F7C] text-white font-poppins font-medium uppercase px-6 py-3 rounded-md shadow-sm hover:bg-[#164197] hover:scale-105 max-w-[170px] cursor-pointer">
              VIEW PROFILE
            </button> */}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 md:px-10">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-5 flex flex-col h-full shadow-sm rounded-lg border border-gray-100">
            <div className="relative aspect-[1/1] overflow-hidden rounded-md">
              <Image
                src="/assets/images/about/board-members/member_2.png"
                alt="A. Appachigounder"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5 space-y-3">
              <h4 className="poppins-font font-bold text-[#1B2F7C] text-lg">
                A. Appachigounder
              </h4>
              <p className="poppins-font font-medium text-gray-500 text-sm">
                Trustee
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="text-green-900 mt-1">
                    <IoLocationSharp size={16} />
                  </span>
                  <span>Alampalayam, Sirukalanji, Erode District</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="mt-1 text-green-900 text-xs">
                    <FaBriefcase size={14} />
                  </span>
                  <span>Social Worker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 flex flex-col h-full shadow-sm rounded-lg border border-gray-100">
            <div className="relative aspect-[1/1] overflow-hidden rounded-md">
              <Image
                src="/assets/images/about/board-members/member_4.png"
                alt="N. Senthikumar"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5 space-y-3">
              <h4 className="poppins-font font-bold text-[#1B2F7C] text-lg">
                N. Senthikumar, <span className="text-green-700">B.Com.</span>
              </h4>
              <p className="poppins-font font-medium text-gray-500 text-sm">
                Trustee
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="text-green-900 mt-1">
                    <IoLocationSharp size={16} />
                  </span>
                  <span>Kolathupalayam, S.Uduppam, Namakkal District</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="mt-1 text-green-900 text-xs">
                    <FaBriefcase size={14} />
                  </span>
                  <span>Social Worker</span>
                </div>
                {/* <div className="pt-2">
                  <span className="bg-[#E7F3E7] text-[#096412] font-bold px-3 py-1 rounded text-xs">
                    B.Com.
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 flex flex-col h-full shadow-sm rounded-lg border border-gray-100">
            <div className="relative aspect-[1/1] overflow-hidden rounded-md">
              <Image
                src="/assets/images/about/board-members/member_6.png"
                alt="P. Gowrishankar"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5 space-y-3">
              <h4 className="poppins-font font-bold text-[#1B2F7C] text-lg">
                P. Gowrishankar, <span className="text-green-700">M.Sc.</span>
              </h4>
              <p className="poppins-font font-medium text-gray-500 text-sm">
                Trustee
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="text-green-900 mt-1">
                    <IoLocationSharp size={16} />
                  </span>
                  <span>Jalakandapuram, Mettur, Salem District</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 text-xs">
                  <span className="mt-1 text-green-900 text-xs">
                    <FaBriefcase size={14} />
                  </span>
                  <span>Social Worker</span>
                </div>
                {/* <div className="pt-2">
                  <span className="bg-[#E7F3E7] text-[#096412] font-bold px-3 py-1 rounded text-xs">
                    M.Sc.
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
