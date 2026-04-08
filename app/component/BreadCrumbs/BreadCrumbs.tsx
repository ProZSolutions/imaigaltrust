"use client";

import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface BreadCrumbsItem {
  id: string | number;
  name: string;
  link?: string;
}

interface BreadCrumbsProps {
  list: BreadCrumbsItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ list }) => {
  return (
    <div>
      <nav className="flex items-center space-x-2 text-gray-700">
        {React.cloneElement(
          <MdOutlineKeyboardArrowLeft />,{size:20})}

        {list.map((item, index) => (
          <div key={item?.id} className="flex items-center">
            {index==0 ?(
            <>
            {item?.link ? (
              <Link href={item.link} className="">{item?.name}</Link>
            ) : (
              <span>{item?.name}</span>
            )}
            </>

            ):(
                <>
                {list.length - 1 === index ? (
                  <>
                  <span className="primary-text me-3">/</span>
                  <span className="primary-text">{item?.name}</span>
                  </>
                ):(
                  <>
                  <span className="me-3">/</span>
                  <span className="">{item?.name}</span>
                  </>
                )}
                
                </>
            )
            }


          </div>
        ))}
      </nav>
    </div>
  );
};

export default BreadCrumbs;
