import type { Metadata } from "next";

import "./globals.css";
import NavigationLoader from "./component/NavigationLoader/NavigationLoader";
import LayoutWrapper from "./LayoutWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://imagialtrust.org"),
  title: "Imaigal Trust | Empowering Communities",
  description:
    "Imaigal Trust is a non-profit organization dedicated to rural development, women's empowerment, sustainable agriculture, healthcare, and social welfare.",
  keywords: [
    "Imaigal Trust",
    "NGO",
    "Women Empowerment",
    "Rural Development",
    "Organic Farming",
    "Social Welfare",
  ],
  authors: [{ name: "Imaigal Trust" }],
  creator: "Imaigal Trust",
  publisher: "Imaigal Trust",

  openGraph: {
    title: "Imaigal Trust | Transforming Lives",
    description:
      "Empowering rural communities through education, agriculture, healthcare and social welfare.",
    url: "https://imaigaltrust.org",
    siteName: "Imaigal Trust",
    images: [
      {
        url: "/assets/images/home/mission/woman-with-smile-her.png",
        width: 1200,
        height: 630,
        alt: "Imaigal Trust",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Navigation Loader */}
        <NavigationLoader />

        {/* Main Layout */}
        <LayoutWrapper>{children}</LayoutWrapper>

      
       <Toaster
  position="top-right"
  containerStyle={{
    zIndex: 9999999,
  }}
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "10px",
      background: "#1a4d2e",
      color: "#fff",
      fontWeight: "600",
    },
    success: {
      style: {
        background: "#1a4d2e",
      },
    },
    error: {
      style: {
        background: "#dc2626",
      },
    },
  }}
/>
        
      </body>
    </html>
  );
}