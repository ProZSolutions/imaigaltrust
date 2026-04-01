"use client";
import React from "react";
import "./PageBanner.css";
import Text from "../../Heading/Text";

interface PageBannerProps {
  list?: { id: number; name: string; link?: string }[];
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
}

const PageBanner: React.FC<PageBannerProps> = ({
  list = [],
  title,
  subtitle,
  description,
  tags = [],
}) => {
  return (
    <div className="page-banner p-5 poppins-font">

      
      <ul className="flex items-center gap-1 sm:gap-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]  text-gray-500 mb-4 px-4 md:px-10">
        {list.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1 sm:gap-2">
            
            {item.link ? (
              <a
                href={item.link}
                className="hover:text-green-700 transition"
              >
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}

            {index !== list.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </li>
        ))}
      </ul>

      {/* CONTENT */}
      <div className="max-w-[800px] w-full flex flex-col items-start justify-center px-4 md:px-10 text-banner">

        {/* Subtitle */}
        {subtitle && (
          <span className="border border-gray-300 px-4 py-2 rounded-md text-[13px] sm:text-[13px] tracking-widest mb-4 text-green-700">
            {subtitle}
          </span>
        )}

        {/* Title */}
       <Text
  title={title}
  size="text-sm md:text-xl"
  className="text-left uppercase font-semibold accent-text-800 w-full"
/>

        {/* Description */}
        {description && (
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-[600px]">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
  <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 mt-4">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-1 sm:px-3 py-1 text-[8px] sm:text-xs md:text-xs rounded-full border border-gray-300 text-gray-700"
      >
        {tag}
      </span>
    ))}
  </div>
)}

      </div>
    </div>
  );
};

export default PageBanner;