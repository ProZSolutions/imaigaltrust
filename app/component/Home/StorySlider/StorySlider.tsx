"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./StorySlider.css";
import { successStoriesContent } from "@/app/content/Home";
import Image from "next/image";

export default function StorySlider() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000, // 2 seconds
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {successStoriesContent.map((item) => (
        <div key={item?.id}>
          <div className="flex poppins-font items-center w-full gap-18">
            <div>
              <p className="primary-text my-2 text-lg">{item?.mTitle}</p>
              <p className="uppercase accent-text-800 font-semibold my-2 mb-8 text-xl">{item?.title}</p>
              <q className="text-justify leading-8">
                {item?.desc} 
              </q>

              <div className="flex flex-col justify-end gap-1 mt-5 items-end">
                <p className="primary-text text-xl">{item?.name}</p>
                <p >{item?.sign}</p>
              
            </div>
            </div>
            <div className="hidden md:block w-3/4">
              <Image
                src={item?.img}
                alt="image"
                width={200}
                height={100}
                className="w-3/4 rounded-full"
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
