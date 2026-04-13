import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | Imaigal Trust",
  description:
    "Stay updated with the latest news, programs, workshops, and community events organized by Imaigal Trust. Join us in empowering rural communities and promoting sustainable development.",
  keywords: [
    "Imaigal Trust Events",
    "NGO Events",
    "Community Programs",
    "Workshops",
    "Rural Development Events",
    "Women Empowerment Programs",
  ],
  openGraph: {
    title: "News & Events | Imaigal Trust",
    description:
      "Discover upcoming and past events, programs, and workshops organized by Imaigal Trust.",
    url: "https://imaigaltrust.org/news-events",
    siteName: "Imaigal Trust",
    images: [
      {
        url: "/assets/images/home/mission/woman-with-smile-her.png",
        width: 1200,
        height: 630,
        alt: "Imaigal Trust Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function NewsEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}