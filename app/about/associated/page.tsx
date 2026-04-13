import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import React from "react";
import { Factory } from "lucide-react"; 
import { Sprout } from "lucide-react";
import { Briefcase, Rocket, Scissors, Leaf } from "lucide-react";
// import { Landmark } from "lucide-react";

import {
  Landmark,
  FlaskConical,
  ClipboardList,
  Droplets,
  Siren,
  Truck,
  Building,
  Dna,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Associated Organizations | Imaigal Trust",
  description:
    "Explore the partner organizations, government collaborations, training programmes, and advisory committees associated with Imaigal Trust.",
};

export default function ProgramAgriculture() {
  const breadcrumbs = [
    { id: 1, name: "About us", link: "/" },
    { id: 2, name: "Associated Organizations" },
  ];

  return (
    <div>
      <PageBanner
        list={breadcrumbs}
        title="Associated Organizations"
        //subtitle="PARTNERSHIPS & COLLABORATIONS"
        description="Building stronger communities through strategic partnerships with government bodies, financial institutions, and development agencies across Tamil Nadu."
        tags={["NABARD", "SFURTI", "Coir Board", "Govt. of India", "NABCONS"]}
      />

      {/*** Section 1 ***/}
      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
           <h2 className="font-serif font-bold leading-[1.1] text-[#1B3022] text-xl sm:text-2xl md:text-3xl lg:text-4xl">
  Building Stronger Communities <br />
  <span className="text-green-700">Through Collaboration</span>
</h2>
            <div className="space-y-6 max-w-[620px]">
              <p className="font-sans leading-[1.7] text-[#4A4A4A] text-base">
                At Imaigal Trust, we believe that collaboration is the
                foundation of impactful social change. Our work in rural
                development, sustainable agriculture, women empowerment, and
                social welfare is strengthened through partnerships with
                government agencies, financial institutions, NGOs, and corporate
                entities.
              </p>
              <p className="font-sans leading-[1.7] text-[#4A4A4A] text-base">
                These collaborations help us deliver resources, knowledge, and
                opportunities to marginalized communities, ensuring long-term
                sustainability and progress.
              </p>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              { label: "Partner Organizations", value: "15+" },
              { label: "Training Programmes", value: "21" },
              { label: "Committees & Boards", value: "9" },
              { label: "Districts Covered", value: "12+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-[#F4F9F6] p-10 rounded-xl border-l-[6px] border-green-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="font-bold text-[#1B3022] mb-3 font-serif text-3xl">
                  {stat.value}
                </div>
                <div className="text-[#3A5A40] font-semibold text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*** Section 2: Key Partner Organizations ***/}
      <section
        id="partners-section"
        className="py-2 px-4 md:px-10 bg-[#F4F9F6]/30"
      >
        <div className="max-w-[1350px] mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <span className="text-green-700 font-bold tracking-[3px] uppercase block mb-3 text-xs">
              Our Network
            </span>
            <h2 className="font-serif font-bold text-[#1B3022] mb-6 text-xl sm:text-2xl md:text-3xl">
  Key Partner Organizations
</h2>
            <p className="text-[#666666] max-w-[750px] mx-auto mb-8 text-base">
              Imaigal Trust collaborates with premier national bodies to amplify
              impact across agriculture, rural enterprise, and community
              development.
            </p>
            <div className="w-16 h-1.5 bg-green-700 mx-auto rounded-full"></div>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {[
              {
                title: "SFURTI",
                subtitle:
                  "Scheme of Fund for Regeneration of Traditional Industries",
                icon: Factory,
                points: [
                  "Helps develop rural clusters for traditional industries like coir, handicrafts, and agro-processing.",
                  "Supports rural entrepreneurs with funding, training, and market access.",
                  "Strengthens cooperative businesses and self-help groups (SHGs).",
                ],
              },
              {
                title: "NABARD",
                subtitle: "National Bank for Agriculture and Rural Development",
                icon: Sprout,
                points: [
                  "Establish Farmer Producer Organizations (FPOs) for better market access.",
                  "Promote climate-smart agriculture and eco-friendly farming techniques.",
                  "Provide financial literacy programs and loans for small-scale farmers.",
                ],
              },
              {
                title: "NABCONS",
                subtitle: "NABARD Consultancy Services",
                icon: Briefcase,
                points: [
                  "Provides expert consultation for rural development projects.",
                  "Supports rural entrepreneurs with funding, training, and market access.",
                  "Assists in designing financially sustainable rural business models.",
                ],
              },
              {
                title: "NABIF",
                subtitle: "NABARD Innovation Fund",
                icon: Rocket,
                points: [
                  "Funds innovative agricultural solutions and technology-driven farming.",
                  "Helps in creating farmer-friendly financial schemes.",
                  "Promotes eco-friendly and climate-smart agriculture practices.",
                ],
              },
              {
                title: "VIA",
                subtitle: "Village Industries Association",
                icon: Scissors,
                points: [
                  "Supports rural artisans and small-scale industries.",
                  "Promotes eco-friendly businesses and sustainable rural enterprises.",
                  "Provides skill development, financial assistance, and market linkage.",
                ],
              },
              {
                title: "Coir Board",
                subtitle: "Ministry of MSME, Govt. of India",
                icon: Leaf,
                points: [
                  "Implementing Agency for Sri Kongu Coir Cluster, Erode.",
                  "Soft Intervention Activities including skill training and capacity building.",
                  "Empaneled Organisation for Tribal Development Activities.",
                ],
              },
            ].map((org, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-[#E8EEEB] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="bg-green-900 p-8 flex items-start gap-6">
                 <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/20 text-xl">
  <org.icon className="w-7 h-7 text-white" />
</div>
                  <div>
                    <h3 className="text-white font-bold font-serif mb-1 transition-colors text-xl">
                      {org.title}
                    </h3>
                    <p className="text-white/70 text-xs">
                      {org.subtitle}
                    </p>
                  </div>
                </div>
                {/* Card Body */}
                <div className="p-8">
                  <ul className="space-y-4">
                    {org.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-4">
                        <span className="text-[#89C541] mt-1 shrink-0 font-bold">
                          ››
                        </span>
                        <p className="text-[#555555] italic text-sm">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Government Bodies Wide Card */}
          <div className="mt-12 bg-white rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[#E8EEEB] grid grid-cols-1 lg:grid-cols-[400px_1fr] group">
            <div className="bg-green-900 p-10 flex flex-col justify-center gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
  <Landmark className="w-8 h-8 text-white" />
</div>
              <div>
                <h3 className="text-white font-bold font-serif mb-2 text-xl">
                  Government & Local <br /> Administrative Bodies
                </h3>
                <p className="text-white/70 text-sm">
                  Central & State Government Departments
                </p>
              </div>
            </div>
            <div className="p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 items-center">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    Collaborate in healthcare, education, women empowerment, and
                    poverty alleviation.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    Help implement policies and schemes for rural welfare.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    Department of Horticulture, Erode
                  </p>
                </li>
              </ul>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    Support climate-proofing and sustainability projects in
                    rural areas.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    ATMA, Department of Agriculture, Govt. of Tamil Nadu
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#89C541] font-bold">››</span>
                  <p className="text-[#555555] italic text-sm">
                    NSDC – Ministry of Skill Development, Govt. of India
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Section 3 : Training Programmes & Associations */}
      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-[1350px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="text-green-700 font-bold tracking-[3px] uppercase block mb-3 text-xs">
              Programme History
            </span>

            <h2 className="font-serif font-bold text-[#1B3022] mb-6 text-xl sm:text-2xl md:text-3xl">
  Training Programmes & Associations
</h2>

            <p className="text-[#666666] max-w-[720px] mx-auto mb-6 text-base">
              Key training initiatives delivered by Imaigal Trust in
              collaboration with partner organizations across Tamil Nadu.
            </p>

            <div className="w-16 h-1.5 bg-green-700 mx-auto rounded-full"></div>
          </div>

          {/* Table */}
       {/* Section 3 Table */}
<div className="max-w-[1350px] mx-auto">

{/* DESKTOP TABLE */}
<div className="hidden lg:block overflow-x-auto rounded-xl border border-[#E6ECE8]">
  <table className="w-full min-w-[700px] text-left">
    
    <thead className="bg-green-900 text-white">
      <tr>
        <th className="px-6 py-4 font-semibold text-sm">
          Programme Name
        </th>
        <th className="px-6 py-4 font-semibold text-sm">
          Associated Organization
        </th>
        <th className="px-6 py-4 font-semibold text-sm">
          Category
        </th>
      </tr>
    </thead>

    <tbody className="text-[#444] text-sm">
      {[
        {
          name: "EDP in Medicinal Plant Cultivation, Harvest, Grading & Marketing",
          org: "Department of Horticulture",
          category: "Agriculture",
        },
        {
          name: "Mobile Soil Testing Laboratory Visit",
          org: "Department of Horticulture",
          category: "Agriculture",
        },
        {
          name: "EDP & Skill Development / Farmers Club Programme",
          org: "Department of Agriculture",
          category: "Skill Dev",
        },
        {
          name: "Capacity Building – Exposure Visit / District Level Collective Farming",
          org: "Department of Agriculture",
          category: "Capacity",
        },
        {
          name: "NSDC-ASCI Organic Grower Certification",
          org: "Ministry of Skill Development, Govt. of India",
          category: "Certification",
        },
        {
          name: "Micro Irrigation Technician Training",
          org: "Ministry of Skill Development, Govt. of India",
          category: "Technical",
        },
        {
          name: "Quality Improvement Training Programme (QITP)",
          org: "	Spices Board, SDA – Ministry of Commerce",
          category: "Quality",
        },
        {
          name: "Micro Enterprise Development Programme (MEDP) – Coir Value Added Products",
          org: "Coir Board, Min of MSME, Govt. of India",
          category: "Enterprise",
        },
        {
          name: "Handicrafts Programmes",
          org: "Ministry of Textiles",
          category: "Handicrafts",
        },
        {
          name: "Capacity Building, Skill Training, EDP & Exposure Visit, FIG Formation",
          org: "ATMA, Dept. of Agriculture, Govt. of Tamil Nadu",
          category: "Capacity",
        },
        {
          name: "DPR Preparations, Ammapet",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Planning",
        },
        {
          name: "Baseline Survey, PRA & DPR – Perundurai, Chennimalai, Erode",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Survey",
        },
        {
          name: "Collective Farming Training – Capacity Building & Skill Dev (15 Nos)",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "	Farming",
        },
        {
          name: "MSDA Palmyra – Collection & Plantation",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Plantation",
        },
        {
          name: "Watershed Development Fund (WDF) – Mayilrangam, Vellakoil, Tirupur",
          org: "NABARD, Tirupur",
          category: "Watershed",
        },
        {
          name: "Horticulture Farmers Extension & Marketing Support (COVID-19)",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Welfare",
        },
        {
          name: "LEDP – Coir Value Added Products, Tirupur",
          org: "Coir Board, Govt. of India",
          category: "Livelihood",
        },
        {
          name: "MEDP – Aari Embroidery Works, Erode",
          org: "Coir Board / NABARD",
          category: "Enterprise",
        },
        {
          name: "MEDP – Paper Bags & Cloth Bags Manufacturing, Namakkal",
          org: "Coir Board / NABARD",
          category: "Livelihood",
        },
        {
          name: "Skill Development Programme (SDP), Karur",
          org: "NABARD / NABCONS",
          category: "Skill Dev",
        },
        {
          name: "CAT – Mushroom & Value Addition, Erode",
          org: "NABARD",
          category: "Technology",
        },
      ].map((item, index) => (
        <tr
          key={index}
          className="border-t border-[#E6ECE8] hover:bg-[#F8FBF9]"
        >
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.org}</td>
          <td className="px-6 py-4">
            <span className="bg-[#E6F4EC] text-[#2D6A4F] px-3 py-1 rounded-md font-semibold text-xs">
              {item.category}
            </span>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>


{/* MOBILE + TABLET CARD VIEW */}
<div className="lg:hidden space-y-6">

{[
   {
          name: "EDP in Medicinal Plant Cultivation, Harvest, Grading & Marketing",
          org: "Department of Horticulture",
          category: "Agriculture",
        },
        {
          name: "Mobile Soil Testing Laboratory Visit",
          org: "Department of Horticulture",
          category: "Agriculture",
        },
        {
          name: "EDP & Skill Development / Farmers Club Programme",
          org: "Department of Agriculture",
          category: "Skill Dev",
        },
        {
          name: "Capacity Building – Exposure Visit / District Level Collective Farming",
          org: "Department of Agriculture",
          category: "Capacity",
        },
        {
          name: "NSDC-ASCI Organic Grower Certification",
          org: "Ministry of Skill Development, Govt. of India",
          category: "Certification",
        },
        {
          name: "Micro Irrigation Technician Training",
          org: "Ministry of Skill Development, Govt. of India",
          category: "Technical",
        },
        {
          name: "Quality Improvement Training Programme (QITP)",
          org: "	Spices Board, SDA – Ministry of Commerce",
          category: "Quality",
        },
        {
          name: "Micro Enterprise Development Programme (MEDP) – Coir Value Added Products",
          org: "Coir Board, Min of MSME, Govt. of India",
          category: "Enterprise",
        },
        {
          name: "Handicrafts Programmes",
          org: "Ministry of Textiles",
          category: "Handicrafts",
        },
        {
          name: "Capacity Building, Skill Training, EDP & Exposure Visit, FIG Formation",
          org: "ATMA, Dept. of Agriculture, Govt. of Tamil Nadu",
          category: "Capacity",
        },
        {
          name: "DPR Preparations, Ammapet",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Planning",
        },
        {
          name: "Baseline Survey, PRA & DPR – Perundurai, Chennimalai, Erode",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Survey",
        },
        {
          name: "Collective Farming Training – Capacity Building & Skill Dev (15 Nos)",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "	Farming",
        },
        {
          name: "MSDA Palmyra – Collection & Plantation",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Plantation",
        },
        {
          name: "Watershed Development Fund (WDF) – Mayilrangam, Vellakoil, Tirupur",
          org: "NABARD, Tirupur",
          category: "Watershed",
        },
        {
          name: "Horticulture Farmers Extension & Marketing Support (COVID-19)",
          org: "Department of Agriculture, Govt. of Tamil Nadu",
          category: "Welfare",
        },
        {
          name: "LEDP – Coir Value Added Products, Tirupur",
          org: "Coir Board, Govt. of India",
          category: "Livelihood",
        },
        {
          name: "MEDP – Aari Embroidery Works, Erode",
          org: "Coir Board / NABARD",
          category: "Enterprise",
        },
        {
          name: "MEDP – Paper Bags & Cloth Bags Manufacturing, Namakkal",
          org: "Coir Board / NABARD",
          category: "Livelihood",
        },
        {
          name: "Skill Development Programme (SDP), Karur",
          org: "NABARD / NABCONS",
          category: "Skill Dev",
        },
        {
          name: "CAT – Mushroom & Value Addition, Erode",
          org: "NABARD",
          category: "Technology",
        },
].map((item, index) => (

  <div
    key={index}
    className="relative bg-[#F4F8F5] border border-[#DCE7DF] rounded-2xl p-5 shadow-sm"
  >

    {/* green side bar */}
    <div className="absolute left-0 top-4 bottom-4 w-[5px] bg-green-900 rounded-r"></div>

    {/* title + badge */}
    <div className="flex justify-between items-start gap-4">
      <h3 className="font-semibold text-[#1F2D26] text-base">
        {item.name}
      </h3>

      <span className="border border-green-700 text-green-700 px-4 py-1 rounded-full font-semibold whitespace-nowrap text-xs">
        {item.category}
      </span>
    </div>

    {/* organization */}
    <div className="flex items-center gap-2 mt-3 text-[#5A7B67] text-xs">
      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
      {item.org}
    </div>

  </div>

))}

</div>

</div>
</div>
      </section>
      {/* Section 4 : Committees & Advisory Bodies */}
      <section className="py-10 px-4 md:px-10 bg-[#F4F9F6]/40">
        <div className="max-w-[1350px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="text-green-700 font-bold tracking-[3px] uppercase block mb-3 text-xs">
              Governance & Membership
            </span>

           <h2 className="font-serif font-bold text-[#1B3022] mb-6 text-xl sm:text-2xl md:text-3xl">
  Committees & Advisory Bodies
</h2>

            <p className="text-[#666666] max-w-[720px] mx-auto mb-6 text-base">
              Imaigal Trust is represented in key district and national-level
              committees, ensuring community voice in policy decisions.
            </p>

            <div className="w-16 h-1.5 bg-green-700 mx-auto rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Landmark,
                title: "NABARD Rural Haat Management Committee, Tirupur",
                desc: "Active member coordinating rural market infrastructure and farmer outreach in Tirupur district.",
              },
              {
                icon: FlaskConical,
                title:
                  "Scientific Advisory Committee – Veterinary University, Tirupur",
                desc: "Contributing expertise to animal husbandry research and training for rural farming communities.",
              },
              {
                icon: ClipboardList,
                title: "District Level ATMA Governing Board, Namakkal",
                desc: "Supporting agricultural technology management and farmer education at the district level.",
              },
              {
                icon: Droplets,
                title:
                  "Village Watershed Committee – Mulanur & Mayilrangam, Tirupur",
                desc: "Driving sustainable water resource management through community participation and NGO collaboration.",
              },
              {
                icon: Siren,
                title: "Disaster Committee, Namakkal",
                desc: "Core member supporting rapid relief and community resilience for the district disaster management committee.",
              },
              {
                icon: Truck,
                title:
                  "Working Committee – SFURTI, Sri Kongu Coir Cluster, Erode",
                desc: "Coordinating with Coir Board & Canara Bank for cluster development and artisan support.",
              },
              {
                icon: Building,
                title: "MOU – Common Facility Centre, Sri Kongu Coir Cluster",
                desc: "Signed MOU with RR Thulasi Builders, Erode for construction of the Common Facility Centre.",
              },
              {
                icon: Dna,
                title: "TREC-STEP Incubation Centre – NIT Trichy",
                desc: "Resource agency promoting Farmer Producer Organizations through technology business incubation.",
              },
              {
                icon: TrendingUp,
                title: "Nodal Training Institute – AC & ABC Scheme",
                desc: "Recognized nodal training institute for the Agri-Clinic and Agri-Business Centre capacity building scheme.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-[#E8EEEB] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Border */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-green-700"></div>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F4F9F6] mb-4">
  <item.icon className="w-6 h-6 text-green-700" />
</div>

                {/* Title */}
                <h3 className="font-semibold text-[#1B3022] mb-2 text-base">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#666] text-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
