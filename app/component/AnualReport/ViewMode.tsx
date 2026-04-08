"use client";

import React, { useEffect } from "react";
import Button from "../Button/Button";
import { TbDownload, TbFileTypePdf, TbFileTypeDoc, TbFileTypeXls } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";

interface ViewModeProps {
  data?: {
    title: string;
    document: {
      name: string;
      links: { name: string; link: string; type?: string }[];
    }[];
  }[];
  clickEvent?: (item: { name: string; links: { name: string }[] }) => void;
}

const ViewMode: React.FC<ViewModeProps> = ({ data, clickEvent }) => {
  const [datas, setDatas] = React.useState<
    { name: string; links: { name: string; link: string; type?: string }[] }[] | undefined
  >(undefined);

  useEffect(() => {
    setDatas(data?.map((item) => item.document).flat());
  }, [data]);

  const getIcon = (type?: string) => {
    if (type === "pdf") return <TbFileTypePdf />;
    if (type === "word") return <TbFileTypeDoc />;
    if (type === "excel") return <TbFileTypeXls />;
    return <TbDownload />;
  };

  return (
    <div className="max-w-[1600px] mx-auto my-10 px-4">

      
     <div className="flex items-center justify-between mb-6">


  <h2 className="text-start uppercase font-semibold text-black p-3 rounded w-full md:w-auto text-xl">
    {data?.map((item) => item.title).join(", ")}
  </h2>

  <button
  onClick={() => clickEvent && clickEvent({ name: "Example", links: [] })}
  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded text-sml font-medium"
>
  <IoArrowBack />
  Back
</button>

</div>

      <div>

        {/* Header */}
        <div className="hidden md:grid grid-cols-2 gap-2 bg-accent-800 text-white p-3 rounded-t mb-4">
          <span className="font-semibold">Chapter</span>
          <span className="text-right font-semibold">Download</span>

          {/* Hindi column (commented) */}
          {/* <span className="text-right font-semibold">Hindi</span> */}
        </div>

        {datas?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-2 gap-3 border-b pb-4 mb-4 items-start md:items-center"
          >

            {/* Chapter Name */}
            <span className="font-medium md:pl-5 text-gray-800 text-sm">
              {item?.name}
            </span>

            {/* English Button */}
            <div className="flex flex-col md:items-end gap-2 w-full pr-5">
  {item?.links?.map((link, linkIndex) => (
    <a key={linkIndex} href={link.link} download target="_blank">
      <Button
        label={
          <span className="flex font-normal gap-2 items-center">
            {getIcon(link?.type)}
            {link?.name}
          </span>
        }
        className="text-accent-700 capitalize bg-white blue__btn rounded px-4 py-2 text-xs"
      />
    </a>
  ))}
</div>

            {/* Hindi Button (commented) */}
            {/*
            <div className="flex md:justify-end w-full">
              {item?.links?.map((link, linkIndex) => (
                <span key={linkIndex}>
                  {link?.name === "Hindi" && (
                    <a href={link.link} download target="_blank">
                      <Button
                        label={
                          <span className="flex font-normal gap-2 items-center">
                            {getIcon(link?.type)}
                            {link?.type?.toUpperCase()}
                          </span>
                        }
                        className="text-accent-700 capitalize bg-white blue__btn rounded px-4 py-2 text-xs"
                      />
                    </a>
                  )}
                </span>
              ))}
            </div>
            */}

          </div>
        ))}

      </div>
    </div>
  );
};

export default ViewMode;