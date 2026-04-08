import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import "./FooterLinks.css";
interface FooterLinkListProps {
  content: string;
  link: string;
}

const FooterLinkList: React.FC<FooterLinkListProps> = ({ content, link }) => {
  return (
    <Link
      href={link}
      className="flex gap-2 items-center py-1 text-xs"
    >
      <span className="primary-text">
        <IoIosArrowForward />
      </span>
      <span className="secondary-text-900 transition-colors link-content text-sm" >{content}</span>
    </Link>
  );
};

export default FooterLinkList;