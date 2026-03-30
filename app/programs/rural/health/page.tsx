import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramHealthcare() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Rural Development / Rural Health" },
  ];

  return (
    <div>
      <PageBanner
        title="Ensuring Better Healthcare for Communities"
        list={breadrumbs}
      />

      {/* SECTION 1 */}
<section className="py-10 px-4 md:px-10 max-w-[1600px] mx-auto  p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
  {/* TEXT LEFT */}
  <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center">
    <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[38px] md:leading-[42px] lg:leading-[46px] font-medium text-[#1B2F7C] font-poppins">
      Strengthening Healthcare Access in Rural Areas
    </h2>
    <p className="font-poppins font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#101010]">
      At Imaigal Trust, we believe that access to quality healthcare is a
      fundamental right. Our Rural Health initiatives focus on improving
      healthcare facilities, increasing awareness, and providing medical
      support to underserved rural populations. Through medical camps,
      health awareness programs, and collaborations with healthcare
      professionals, we strive to create a healthier future for rural
      communities.
    </p>
  </div>

  {/* IMAGE RIGHT */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src="/assets/images/health/RuralHealth1.png"
      width={565}
      height={374}
      alt="RuralHealth"
      className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
    />
  </div>
</section>

      {/* SECTION 2 */}
      <section className="pt-12 pb-7 px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
          {/* Centered Heading */}
          <h2 className="font-poppins font-medium text-[36px] leading-[46px] text-[#101010] text-center">
            Primary Healthcare Initiatives
          </h2>

          {/* Two-Column Content */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* TEXT LEFT */}
            <div className="w-full md:w-1/2 flex flex-col mt-6 font-poppins text-[#101010] gap-8">
              <div className="space-y-4">
                <h3 className="font-medium text-[24px] leading-[30px]">
                  Medical Camps & Free Health Check-ups
                </h3>
                <p className="font-normal text-[16px] leading-[24px]">
                  Organizing periodic health camps to provide medical
                  consultations and treatments.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-[24px] leading-[30px]">
                  Education & Financial Literacy
                </h3>
                <p className="font-normal text-[16px] leading-[24px]">
                  Ensuring safe pregnancies, proper nutrition, and immunization
                  for children.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-[24px] leading-[30px]">
                  Awareness on Preventive Healthcare
                </h3>
                <p className="font-normal text-[16px] leading-[24px]">
                  Educating communities about hygiene, sanitation, and common
                  diseases.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-[24px] leading-[30px]">
                  Mental Health & Well-being
                </h3>
                <p className="font-normal text-[16px] leading-[24px]">
                  Offering counseling services and mental health support for
                  rural individuals.
                </p>
              </div>
            </div>

            {/* IMAGE RIGHT */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/assets/images/health/RuralHealth2.png"
                width={565}
                height={374}
                alt="RuralHealth2"
                className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-10 px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
          {/* Centered Heading */}
          <h2 className="font-poppins font-medium text-[36px] leading-[46px] text-[#101010] text-center">
            Healthcare Impacts
          </h2>

          {/* Two-Column Content */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* IMAGE LEFT */}
            <div className="w-full md:w-1/2 flex justify-center order-1 md:order-1">
              <Image
                src="/assets/images/health/RuralHealth3.png"
                width={565}
                height={374}
                alt="RuralHealth3"
                className="w-full max-w-[500px] md:max-w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* TEXT RIGHT */}
            <div className="w-full md:w-1/2 flex flex-col mt-6 font-poppins text-[#101010] gap-6 md:gap-8 order-2 md:order-2">
              <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
                    Conducted [Number] health camps benefiting thousands of rural residents.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
                    Improved maternal and child healthcare access in multiple villages.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
                    Enhanced awareness about preventive healthcare and hygiene.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-[16px] mt-1">&raquo;</span>
                  <p className="font-poppins text-[16px] leading-[24px] text-[#101010]">
                    Strengthened partnerships with local hospitals and medical professionals.
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