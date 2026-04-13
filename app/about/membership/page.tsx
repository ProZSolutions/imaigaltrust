import type { Metadata } from "next";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import "./page.css";
import MembershipForm from "./MembershipForm";

export const metadata: Metadata = {
  title: "Membership | Imaigal Trust",
  description:
    "Join Imaigal Trust as a member and support rural development, sustainable agriculture, women empowerment, and community welfare initiatives.",
};

export default function Membership() {
  return (
    <div>
      <PageBanner
        title="Membership"
        list={[{ id: 1, name: "Membership", link: "/" }]}
      />

      <div className="membership-content">
        <MembershipForm />
      </div>
    </div>
  );
}