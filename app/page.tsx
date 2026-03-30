"use client";
import { organizationImage, impactContent, eventContent } from "./content/Home";

import ImageWithContentSlider from "./component/Slider/ImageWithContentSlider/ImageWithContentSlider";
import Text from "./component/Heading/Text";
import "./home.css";
import StatCard from "./component/Home/StatCard/StatCard";
import EventCard from "./component/Home/EventCard/EventCard";
import HeroBanner from "./component/Home/HeroBanner/HeroBanner";
import { MdKeyboardArrowRight } from "react-icons/md";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Timeline from "./component/Home/Timeline/Timeline";
import SectionHeading from "./component/Common/SectionHeading";

export default function Home() {
  // const [imageContainer, setImageContainer] = useState<{ id: string; image: JSX.Element }[]>([]);
  // useEffect(() => {
  //   const data: { id: string; image: JSX.Element }[] = [];
  //   organizationImage.map((images) => {

  //     data.push({
  //       id: images.id,
  //       image:<div>
  //         <Image
  //           src={images.image}
  //           alt="image"
  //           width={100}
  //           height={100}
  //           className="w-20 h-20 rounded-full"
  //         />
  //         <p>{images.content}</p>
  //       </div>,
  //     }
  //       );
  //     });
  //     setImageContainer(data);

  // }, []);

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate content for seamless looping
    scroller.innerHTML += scroller.innerHTML;

    // Pause on hover for better UX
    const handleHover = () => {
      if (scroller.style.animationPlayState !== "paused") {
        scroller.style.animationPlayState = "paused";
      }
    };

    const handleHoverEnd = () => {
      if (scroller.style.animationPlayState !== "running") {
        scroller.style.animationPlayState = "running";
      }
    };

    scroller.addEventListener("mouseenter", handleHover);
    scroller.addEventListener("mouseleave", handleHoverEnd);

    return () => {
      scroller.removeEventListener("mouseenter", handleHover);
      scroller.removeEventListener("mouseleave", handleHoverEnd);
    };
  }, []);
  return (
    <>
      {/* <PageBanner title="Home" list={breadcrumbs} /> */}
      {/* HERO BANNER CONTAINER */}
      <div>
        <HeroBanner />
        <div className="flex bg-tint-400">
          <span className=" bg-accent-800 px-5 text-xs md:text-base py-1  2xl:py-2 md:px-10 md:py-2 flex items-center  font-700  text-white josefin-font uppercase rounded-br-4xl">
            <span>Latest News</span>
            <span>
              {React.cloneElement(<MdKeyboardArrowRight />, { size: 18 })}
            </span>
          </span>
          <span className=" flex-1   py-1  2xl:py-2 md:px-10 md:py-2 overflow-x-hidden">
            <div className="w-full overflow-hidden bg-gray-100 py-1">
              <div
                ref={scrollerRef}
                className="inline-flex items-center gap-6 whitespace-nowrap animate-infinite-scroll"
              >
                {/* Item 1 */}
                <Image
                  src="/assets/images/home/star.svg"
                  alt="Event"
                  width={24}
                  height={24}
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                <span className="text-sm font-medium text-gray-800 md:text-base">
                  Coir Cluster Development Workshop –
                </span>
                <span className="text-sm font-semibold italic accent-text-800 md:text-base">
                  FEB 20th 2025
                </span>

                {/* Item 2 */}
                <Image
                  src="/assets/images/home/star.svg"
                  alt="Event"
                  width={24}
                  height={24}
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                <span className="text-sm font-medium text-gray-800 md:text-base">
                  Women Entrepreneurship & Skill Development Program –
                </span>
                <span className="text-sm font-semibold italic accent-text-800  md:text-base">
                  March 10, 2025
                </span>
              </div>
            </div>
          </span>
        </div>
      </div>
      {/* VISION AND MISSION CONTAINER */}
      <div className="p-5 mx-auto max-w-[1600px] ">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-2 grid-rows-2  ">
            {/* <div className="flex flex-col justify-center items-center gap-2"> */}

            <Image
              src={"/assets/images/home/mission/woman-with-smile-her.png"}
              alt="women"
              width={100}
              height={100}
              className="w-full col-span-1  border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
            />

            <Image
              src={"/assets/images/home/mission/animal.png"}
              alt="women"  
              width={100}
              height={100}
              className="w-full col-span-1 row-start-2 h-full  border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
            />

            <Image
             src={"/assets/images/home/mission/women-doctor.png"}
             alt="women"
             width={100}
             height={100}
             className="w-full row-span-2 h-full  border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
            />
          </div>
          <div>
            <Text
              title="Welcome To Imaigal Trust"
              size="text-2xl"
              className="my-2 poppins-font primary-text"
            />
            <Text
              title="Transforming Lives, Empowering Communities"
              size="text-4xl"
              className="my-2  uppercase font-semibold accent-text-800"
            />
            <span className="poppins-font text-sm md:text-base my-5 block">
              Imaigal Trust is a non-profit organization working towards rural
              transformation through sustainable
              <span className="font-semibold">
                {" "}
                Agriculture, Women’s Empowerment, Rural Health, Environmental
                Sustainability, and Social Welfare.
              </span>
            </span>
            <div className="grid md:grid-cols-2 gap-2 items-center">
              <div className="ps-5 border-l-4 border-primary poppins-font">
                <span className="text-2xl accent-text-800  ">Our Vision</span>
                <p className="mt-4">
                  Empowering lives through education, equality, and sustainable development, while creating opportunities for every individual
                   to grow with dignity, confidence, and a better future in an inclusive and progressive society.
                </p>
              </div>
              <div className="ps-5 border-l-4 border-primary poppins-font">
                <span className="text-2xl accent-text-800  ">Our Mission</span>
                <p className="mt-4">
                 To uplift communities by providing education, healthcare, and livelihood opportunities, while fostering social welfare,
                  inclusive growth, and long-term development for a stronger and self-reliant society.
                </p>
              </div>
            </div>
            {/* <Button label="Read More " className="mt-5 blue__btn rounded-sm" /> */}
          </div>
        </div>
      </div>
      {/* CIRCLE DESIGN */}
      {/* <CircleDesign /> */}
      <Timeline />

      {/* SUCCESS STORIES CONTAINER */}
<div className=" py-1 max-w-[1600px] mx-auto">

  <div className="text-center mb-1">
    <SectionHeading title="Success Story" />
  </div>

  {/* Images Section */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-8">

    {/* Your images remain commented as you kept them */}

  </div>

</div>


{/* SUCCESS STORY */}
<div className="rounded-xl py-1 px-1 md:px-10 max-w-[1600px] mx-auto">

  <div className="flex flex-col lg:flex-row items-center gap-10">

    {/* LEFT CONTENT */}
    <div className="w-full lg:w-1/2 lg:ml-20">

      <h3 className="text-[20px] md:text-[24px] font-bold accent-text-800 mb-4">
        WHAT OUR BENEFICIARIES SAY
      </h3>

      <p className="leading-relaxed text-[15px] md:text-[16px] poppins-font">
        “With the support of Imaigal Trust, I was able to start my own organic
        farm, gain financial stability, and provide for my family. Their
        training programs, financial assistance, and guidance helped me adopt
        sustainable farming practices, increasing both my yield and income.
        Today, I am not only self-sufficient but also inspire others in my
        village to pursue organic farming for a better future.”
      </p>

      {/* <div className="mt-6">
        <p className="text-green-700 font-semibold text-[18px]">
          Suganth
        </p>
        <p className="text-[16px] poppins-font">
          Farmer & Entrepreneur
        </p>
      </div> */}

    </div>


    {/* RIGHT IMAGE */}
    <div className="w-full lg:w-1/2 flex justify-center lg:mr-20 lg:justify-end">

      <Image
        src="/assets/images/success/suc-1.png"
        alt="Suganth Farmer"
        width={700}
        height={500}
        className="object-cover w-[90%] md:w-[600px] lg:w-[700px] h-auto rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.7),0_0_5px_rgba(255,255,255,1)]"
      />

    </div>

  </div>

</div>
      {/* EVENT CONTAINER */}
      <div className="my-1 py-2  md:px-10 max-w-[1700px] mx-auto">
        <SectionHeading title="NEW & EVENTS" />
        <div className="grid  lg:grid-cols-2 gap-10 grid-cols-1 ">
          {eventContent.map((item) => (
            <div key={item?.id}>
              <EventCard
                img={item?.img}
                date={item?.date}
                title={item?.title}
                desc={item?.desc}
                link={item?.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* OUR IMPACT CONTAINER */}
      <div className="my-5  p-5 md:px-10 our-impact-container max-w-[1600px] mx-auto ">
        <div>
          <Text
            title="Our Impact (2020 - 2025)"
            size="text-3xl"
            className="my-5 text-center uppercase font-semibold z-20"
          />
          <div className="flex justify-center md:justify-between flex-wrap gap-5 flex-1 my-15">
            {impactContent.map((item) => (
              <div key={item?.id}>
                <StatCard
                  count={item?.count}
                  label={item?.content}
                  accentColor="green"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ASSOCIATED ORGANIZATIONS CONTAINER */}

      <div className="my-5 mx-auto p-5 md:px-10 max-w-[1700px] mx-auto">
        <SectionHeading title="Associated Organizations" />

        <ImageWithContentSlider images={organizationImage} />
      </div>
    </>
  );
}
