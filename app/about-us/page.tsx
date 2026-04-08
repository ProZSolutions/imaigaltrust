import React from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import { Compass } from "lucide-react";
import { Target } from "lucide-react";
import {
  Handshake,
  Scale,
  Sprout,
  HandHelping,
  Link,
  BarChart3,
} from "lucide-react";

import {
  Wheat,
  Building2,
  Droplets
} from "lucide-react";

import {
  Landmark,
  
  GraduationCap,
  Home
  
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">

      {/* Page Banner */}
      <PageBanner
        list={[
          { id: 1, name: "Home", link: "/" },
          { id: 2, name: "About Us" },
        ]}
        //subtitle="WHO WE ARE"
        title={`Rooted in the Soil.
Growing with the Community.`}
        description="For over a decade, Imagial Trust has been walking alongside farming families in Tamil Nadu — building resilience, enabling opportunity, and transforming rural lives from the ground up."
      />

      {/* WHO WE ARE SECTION */}
      <section className="py-20 px-4 md:px-10 bg-[#F9FBF8]">
        <div className="max-w-[1200px] mx-auto">

          {/* small label */}
          <span className="inline-block bg-[#E7F3EC] text-[#2D6A4F] font-semibold tracking-widest px-4 py-2 rounded mb-6 text-xs">
            WHO WE ARE
          </span>

          {/* heading */}
          <h2 className="font-serif font-bold text-[#1B3022] mb-6 text-3xl">
            A Grassroots Trust <br />
            Built on Community Trust
          </h2>

          {/* paragraph */}
          <p className="text-[#5E6E64] mb-6 text-sm">
            Imagial Trust is a registered charitable trust based in Tamil Nadu,
            India, dedicated to empowering rural communities through sustainable
            agriculture, livelihood development, and inclusive growth.
          </p>

          <p className="text-[#5E6E64] mb-6 text-sm">
            Founded by a group of development professionals, agricultural
            experts, and community leaders, the Trust was born from a simple
            recognition — smallholder farmers lacked access to timely advisory,
            institutional support, and market linkages that could transform
            their lives.
          </p>

          <p className="text-[#5E6E64] text-sm">
            Starting with a handful of villages, Imagial Trust has grown into a
            credible development organisation operating across multiple
            districts of Tamil Nadu, impacting thousands of farming households
            every year.
          </p>

        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-[#1F5D33] py-20 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Vision Card */}
          <div className="bg-[#23663A] rounded-xl border border-[#3B7D52] p-10 text-white">

            <div className="mb-4 text-2xl"><Compass size={24} /></div>

            <h3 className="font-semibold mb-4 text-[#7ED957] text-lg">
              Our Vision
            </h3>

            <p className="text-white/90 text-sm">
              &quot;A Tamil Nadu where every farming family lives with dignity,
              resilience, and prosperity — where no village is left behind.&quot;
            </p>

          </div>


          {/* Mission Card */}
          <div className="bg-[#23663A] rounded-xl border border-[#3B7D52] p-10 text-white">

            <div className="mb-4 text-2xl"><Target size={24} /></div>

            <h3 className="font-semibold mb-4 text-[#7ED957] text-lg">
              Our Mission
            </h3>

            <p className="text-white/90 text-sm">
              &quot;To transform the lives of smallholder farmers and rural communities
              through sustainable agricultural practices, collective empowerment,
              and inclusive development.&quot;
            </p>

          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 md:px-10 bg-[#F6FAF7]">
        <div className="max-w-[1200px] mx-auto">

          {/* Section Header */}
          <div className="mb-14">
            <span className="inline-block bg-[#E7F3EC] text-[#2D6A4F] font-semibold tracking-widest px-4 py-2 rounded mb-4 text-xs">
              CORE VALUES
            </span>

            <h2 className="font-serif font-bold text-[#1B3022] mb-3 text-3xl">
              What We Stand For
            </h2>

            <p className="text-[#5E6E64] max-w-[600px]">
              These principles guide every program we design and every community we serve.
            </p>
          </div>


          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                icon: <Handshake size={26} className="text-white" />,
                title: "Community First",
                desc: "Every decision is guided by the needs, voices, and aspirations of the communities we serve.",
              },
              {
                icon: <Scale size={26} className="text-white" />,
                title: "Integrity",
                desc: "We operate with full transparency and accountability — to our beneficiaries, partners, and donors.",
              },
              {
                icon: <Sprout size={26} className="text-white" />,
                title: "Sustainability",
                desc: "We build solutions that last — ecologically sound, economically viable, and socially rooted.",
              },
              {
                icon: <HandHelping size={26} className="text-white" />,
                title: "Inclusion",
                desc: "We prioritise the most marginalised — women farmers, landless labourers, and SC/ST communities.",
              },
              {
                icon: <Link size={26} className="text-white" />,
                title: "Collaboration",
                desc: "We work with NABARD, government bodies, NGOs, and research institutions to amplify impact.",
              },
              {
                icon: <BarChart3 size={26} className="text-white" />,
                title: "Accountability",
                desc: "We publish annual reports, audited financials, and outcome reports — every rupee is accounted for.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E3ECE6] p-8 hover:shadow-lg transition-all duration-300"
              >

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#2D6A4F] text-white mb-5 text-lg">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#1B3022] mb-3 text-base">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#5E6E64] text-sm">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 md:px-10 bg-[#EAF4ED]">
        <div className="max-w-[1200px] mx-auto">

          {/* Section Header */}
          <div className="mb-14">
            <span className="inline-block text-[#2D6A4F] font-semibold tracking-widest mb-3 text-xs">
              WHAT WE DO
            </span>

            <h2 className="font-serif font-bold text-[#1B3022] mb-3 text-3xl">
              Four Areas of Intervention
            </h2>

            <p className="text-[#5E6E64]">
              Our work spans agriculture, institutions, natural resources, and capacity building.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {[
              {
                icon: <Wheat size={26} className="text-black" />,
                title: "Sustainable Agriculture",
                desc: "Promoting climate-resilient farming, soil health management, water conservation, and natural farming to reduce risk and increase farmer income across rain-fed landscapes.",
              },
              {
                icon: <Building2 size={26} className="text-black" />,
                title: "Farmer Institutions",
                desc: "Building Farmer Producer Companies (FPCs), Self Help Groups (SHGs), and community-based organisations so farmers can act collectively and access markets and institutional credit.",
              },
              {
                icon: <Droplets size={26} className="text-black" />,
                title: "Natural Resource Management",
                desc: "Restoring degraded lands and watersheds through participatory community action — improving groundwater, reducing erosion, and reviving seasonal streams.",
              },
              {
                icon: <BarChart3 size={26} className="text-black" />,
                title: "Capacity Building & Advisory",
                desc: "Operating Agri-Clinics and Agri-Business Centres (ACABC) that deliver technical guidance, government scheme linkages, and extension services directly to farmers.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#E3ECE6] rounded-xl p-8 flex gap-6 hover:shadow-md transition"
              >

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F3F7F4] text-lg">
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-[#1B3022] mb-2 text-base">
                    {item.title}
                  </h3>

                  <p className="text-[#5E6E64] text-sm">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Partners & Funders Section */}
      <section className="py-20 px-4 md:px-10 bg-[#1F5D33] text-white">
        <div className="max-w-[1200px] mx-auto">

          {/* Section Header */}
          <div className="mb-14">
            <span className="inline-block bg-[#2D6A4F] text-[#A5D6A7] font-semibold tracking-widest px-4 py-2 rounded mb-4 text-xs">
              PARTNERS & FUNDERS
            </span>

            <h2 className="font-serif font-bold mb-3 text-3xl">
              Who We Work With
            </h2>

            <p className="text-white/80 max-w-[650px]">
              We collaborate with government agencies, financial institutions,
              and civil society organisations to maximise impact.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                icon: <Landmark size={26} className="text-white" />,
                title: "NABARD",
                desc: "National Bank for Agriculture and Rural Development",
              },
              {
                icon: <Landmark size={26} className="text-white" />,
                title: "Govt. of Tamil Nadu",
                desc: "Dept. of Agriculture & Allied Departments",
              },
              {
                icon: <Wheat size={26} className="text-white" />,
                title: "ATMA",
                desc: "Agricultural Technology Management Agency",
              },
              {
                icon: <GraduationCap size={26} className="text-white" />,
                title: "MANAGE",
                desc: "National Institute of Agricultural Extension Management",
              },
              {
                icon: <Home size={26} className="text-white" />,
                title: "Panchayati Raj Institutions",
                desc: "Local village councils and gram sabhas",
              },
              {
                icon: <Handshake size={26} className="text-white" />,
                title: "CSR Partners",
                desc: "Corporate social responsibility contributors",
              },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-[#23663A] border border-[#3B7D52] rounded-xl p-6 flex gap-4 items-start hover:shadow-md transition"
              >

                {/* Icon */}
                <div className="text-xl">{partner.icon}</div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-1 text-base">
                    {partner.title}
                  </h3>

                  <p className="text-white/80 text-xs">
                    {partner.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}