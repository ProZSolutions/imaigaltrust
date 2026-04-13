import type { Metadata } from "next";
import AnnualReport from "@/app/component/AnualReport/AnnualReport";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import React from "react";

export const metadata: Metadata = {
  title: "Annual Reports | Imaigal Trust",
  description:
    "View the annual reports of Imaigal Trust highlighting our achievements, community programs, rural development initiatives, and financial transparency.",
  keywords: [
    "Imaigal Trust Annual Report",
    "NGO Annual Reports",
    "Rural Development Reports",
    "Imaigal Trust Activities",
    "NGO Transparency India",
  ],
  openGraph: {
    title: "Annual Reports | Imaigal Trust",
    description:
      "Explore the annual reports of Imaigal Trust showcasing our impact, programs, and development initiatives.",
    url: "https://imaigaltrust.org/about/annual-reports",
    siteName: "Imaigal Trust",
    type: "website",
  },
};

export default function page() {
  const breadrumbs = [
    { id: 1, name: "About us", link: "/" },
    { id: 2, name: "Annual Reports" },
  ];

  return (
    <>
      <PageBanner title="Annual Reports" list={breadrumbs} />
      <AnnualReport />
    </>
  );
}