import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    {
      id: 2,
      name: "Rural Development",
    },
    {
      id: 3,
      name: "Transgend & Others",
    },
  ];

  return (
    <div>
      <PageBanner
        title="Empowering Marginalized Communities"
        list={breadrumbs}
      />
      {/* SECTION 1 */}
<section className="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">  {/* TEXT LEFT */}
  <div className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-6 md:gap-8 justify-center text-center md:text-left">
    <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[38px] md:leading-[44px] lg:leading-[48px] font-medium text-[#1B2F7C] font-poppins">
      Fostering Equality and Inclusion
    </h2>
    <p className="font-poppins font-normal text-[15px] sm:text-[16px] md:text-[17px] leading-[26px] sm:leading-[28px] md:leading-[32px] text-[#101010]">
      Imaigal Trust is dedicated to the upliftment of marginalized
      communities, including transgender individuals and other vulnerable
      groups in rural areas. Our initiatives focus on creating
      opportunities for social, economic, and personal growth through
      skill development, healthcare, and advocacy programs.
    </p>
  </div>

  {/* IMAGE RIGHT */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src="/assets/images/Transgend/Transgend.png"
      width={600}
      height={400}
      alt="Transgend"
      className="w-full max-w-[550px] md:max-w-full h-auto object-cover rounded-lg"
    />
  </div>
</section>

      <section className="pt-2 sm:pt-4 md:pt-6 pb-8 sm:pb-10 md:pb-12 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-10">
  {/* Centered Heading above content */}
  <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[38px] md:leading-[42px] lg:leading-[46px] font-medium text-[#101010] font-poppins text-center">
    Key Initiatives for Empowerment
  </h2>

  {/* Section Content (Text + Image) */}
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16 w-full">
    {/* TEXT LEFT */}
    <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 font-poppins text-[#101010] mt-4">
        <div className="space-y-2">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Social Inclusion & Rights Awareness
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Advocating for equal rights and opportunities for transgender individuals and marginalized groups.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Skill Development & Livelihood Programs
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Providing vocational training, entrepreneurship support, and job placement assistance.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Healthcare & Well-being
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Ensuring access to medical care, mental health support, and awareness programs tailored for their needs.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-[24px] leading-[30px]">
            Community Support & Empowerment
          </h3>
          <p className="font-normal text-[16px] leading-[24px]">
            Establishing self-help groups, mentorship programs, and safe spaces for community members.
          </p>
        </div>
      </div>
    </div>

    {/* IMAGE RIGHT */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image
        src="/assets/images/Transgend/Transgend2.png"
        width={565}
        height={374}
        alt="Transgend2"
        className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
</section>

    <section className="pt-2 sm:pt-4 md:pt-6 pb-10 sm:pb-12 md:pb-14 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-10">
  {/* Centered Heading */}
  <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[38px] md:leading-[42px] lg:leading-[46px] font-medium text-[#101010] font-poppins text-center">
    Transformative Impacts
  </h2>

  {/* CRT Container */}
  <div className="flex flex-col md:flex-row-reverse items-start md:items-center justify-center w-full gap-8 md:gap-10 lg:gap-16 max-w-[1600px] mx-auto p-10 md:p-5 rounded-lg ">
    {/* RIGHT: IMAGE */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
      <Image
        src="/assets/images/Transgend/Transgend3.png"
        width={565}
        height={374}
        alt="Transgend3"
        className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
      />
    </div>

    {/* LEFT: LIST */}
    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 mt-6 md:mt-0">
      <ul className="space-y-6">
        <li className="flex items-start gap-3">
          <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">&raquo;</span>
          <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
            Empowered [Number] transgender individuals through vocational training
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">&raquo;</span>
          <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
            Conducted health awareness programs focusing on mental and physical well-being.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">&raquo;</span>
          <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
            Assisted in employment and entrepreneurship opportunities.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="h-[24px] flex items-center text-green-600 text-[16px] leading-[24px]">&raquo;</span>
          <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
            Strengthened community networks and support systems.
          </p>
        </li>
      </ul>
    </div>
  </div>
</section>
    </div>
  );
}