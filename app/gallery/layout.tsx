import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Imaigal Trust",
  description:
    "Explore Imaigal Trust gallery showcasing rural development programs, women empowerment initiatives, community events and environmental activities.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}