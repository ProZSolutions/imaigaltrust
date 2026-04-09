// components/ImageSlider.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import './ImageWithContentSlider.css'
interface ImageWithContentSliderProps {
  images: { id: number; image: string; content: string }[];
  slidesToShow?: number;
  autoplay?: boolean;
}

const ImageWithContentSlider: React.FC<ImageWithContentSliderProps> = ({
  images,
  slidesToShow = 3,
  autoplay = true,
}) => {
  

  return (
    <div className="slider-container w-full px-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={slidesToShow}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        breakpoints={{
          1024: { slidesPerView: 5 },
          900: { slidesPerView: 4 },
          // 668: { slidesPerView: 3 },
          400: { slidesPerView: 3 },
          300: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
      >
        {images.map((img,index) => (
          <SwiperSlide key={img?.id}>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-full border-gray-300">
                <Image
                  src={img.image}
                  alt={`slide-${index}`}              
                  className="w-full"
                  width={100}
                  height={100}
                  
                  
                />
              </div>
              <p className="mt-3 text-center text-gray-800 text-xs">{img.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageWithContentSlider;
