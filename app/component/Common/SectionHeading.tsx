import React from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-10 ${className}`}>
      
      {/* Left Line */}
      <div className="flex-1 h-[12px] bg-green-800 max-w-[1000px] border border-white rounded shadow-[0_0_12px_rgba(144,238,144,0.8)]">
</div>

      {/* Heading */}
      <h2 className="poppins-font font-semibold uppercase text-center text-lg sm:text-xl md:text-2xl lg:text-[2rem]">
  {title}
</h2>

      {/* Right Line */}
      <div className="flex-1 h-[12px] bg-green-800 max-w-[1000px] border border-white rounded shadow-[0_0_12px_rgba(144,238,144,0.8)]"></div>

    </div>
  );
};

export default SectionHeading;