"use client";
import { organizationImage, impactContent, eventContent } from "./content/Home";

import ImageWithContentSlider from "./component/Slider/ImageWithContentSlider/ImageWithContentSlider";
import Text from "./component/Heading/Text";
import "./home.css";
import StatCard from "./component/Home/StatCard/StatCard";
import EventCard from "./component/Home/EventCard/EventCard";
import HeroBanner from "./component/Home/HeroBanner/HeroBanner";
import { MdKeyboardArrowRight } from "react-icons/md";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Timeline from "./component/Home/Timeline/Timeline";
import SectionHeading from "./component/Common/SectionHeading";

export default function Home() {

  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        // filter ongoing events only
        const ongoingEvents = data.events.filter(
          (event: any) => event.status === "ongoing"
        );
        setEvents(ongoingEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.innerHTML += scroller.innerHTML;

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

  const ongoingEvents = events
    .filter((e: any) => e.status === "ongoing")
    .sort(
      (a: any, b: any) =>
        new Date(b.start_date).getTime() -
        new Date(a.start_date).getTime()
    );

  return (
    <>
      {/* <PageBanner title="Home" list={breadcrumbs} /> */}
      {/* HERO BANNER CONTAINER */}
      <div>
        <HeroBanner />

        {Array.isArray(ongoingEvents) && ongoingEvents.length > 0 && (
  <div className="flex bg-tint-400">
    <span className="bg-accent-800 px-5 py-1 2xl:py-2 md:px-10 md:py-2 flex items-center font-700 text-white josefin-font uppercase rounded-br-4xl text-sm">
      <span>Latest News</span>
      <span>
        {React.cloneElement(<MdKeyboardArrowRight />, { size: 18 })}
      </span>
    </span>

    <span className="flex-1 py-1 2xl:py-2 md:px-10 md:py-2 overflow-x-hidden">
      <div className="w-full overflow-hidden bg-gray-100 py-1">
        <div
          ref={scrollerRef}
          className="inline-flex items-center gap-6 whitespace-nowrap animate-infinite-scroll"
        >
          {ongoingEvents.map((event: any) => (
            <div key={event.id} className="flex items-center gap-2">
              <Image
                src="/assets/images/home/star.svg"
                alt="Event"
                width={24}
                height={24}
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />

              <span className="font-medium text-gray-800 text-sm">
                {event.title} –
              </span>

              <span className="font-semibold italic accent-text-800 text-sm">
                {event.start_date_formatted}
              </span>
            </div>
          ))}
        </div>
      </div>
    </span>
  </div>
)}
      

       {/* VISION AND MISSION CONTAINER */}
<div className="p-5 mt-5 mx-auto max-w-[1600px] ">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    
    <div className="grid grid-cols-2 gap-2 grid-rows-2">

      <Image
        src={"/assets/images/home/mission/woman-with-smile-her.png"}
        alt="women"
        width={100}
        height={100}
        className="w-full h-full object-cover col-span-1 border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
      />

      <Image
        src={"/assets/images/home/mission/animal.png"}
        alt="women"
        width={100}
        height={100}
        className="w-full h-full object-cover col-span-1 row-start-2 border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
      />

      <Image
        src={"/assets/images/home/mission/women-doctor.png"}
        alt="women"
        width={100}
        height={100}
        className="w-full h-full object-cover row-span-2 border-blue-900 rounded shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"
      />

    </div>

    <div>
      <Text
  title="Welcome To Imaigal Trust"
  size="text-sml md:text-xl"
  className="my-2 poppins-font primary-text"
/>

      <Text
  title="Transforming Lives, Empowering Communities"
  size="text-base sm:text-lg md:text-xl lg:text-2xl"
  className="my-2 leading-[1.2] uppercase font-semibold accent-text-800"
/>

      <span className="poppins-font text-sm  my-5 block">
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
          <span className="text-sml sm:text-base md:text-lg lg:text-xl accent-text-800">
  Our Vision
</span>
          <p className="mt-4 text-sm">
            Empowering lives through education, equality, and sustainable development, 
            while creating opportunities for every individual to grow with dignity, 
            confidence, and a better future in an inclusive and progressive society.
          </p>
        </div>

        <div className="ps-5 border-l-4 border-primary poppins-font">
          <span className="text-sml sm:text-base md:text-lg lg:text-xl accent-text-800">Our Mission</span>
          <p className="mt-4 text-sm">
            To uplift communities by providing education, healthcare, and livelihood 
            opportunities, while fostering social welfare, inclusive growth, and 
            long-term development for a stronger and self-reliant society.
          </p>
        </div>
      </div>

      {/* <Button label="Read More " className="mt-5 blue__btn rounded-sm" /> */}

    </div>
  </div>
</div>
{/* TIMELINE */}
      <Timeline />
</div>


{/* SUCCESS STORY */}
      <div className="rounded-xl py-1 px-1 md:px-10 max-w-[1700px] mx-auto">
       <div className="text-center mb-1">
  <SectionHeading
    title="Success Story"
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
  />
</div>
        <div className="flex flex-col lg:flex-row items-center gap-10">

    {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 lg:ml-20">

            <h3 className="font-bold accent-text-800 mb-4 text-xl">
              WHAT OUR BENEFICIARIES SAY
            </h3>

      <p className="poppins-font text-sm">
              “With the support of Imaigal Trust, I was able to start my own organic
        farm, gain financial stability, and provide for my family. Their
        training programs, financial assistance, and guidance helped me adopt
        sustainable farming practices, increasing both my yield and income.
        Today, I am not only self-sufficient but also inspire others in my
        village to pursue organic farming for a better future.”
            </p>

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

      {/* EVENTS */}
      <div className="my-1 py-2 md:px-10 max-w-[1700px] mx-auto">

        <SectionHeading title="NEW & EVENTS" />

        <div className="grid lg:grid-cols-2 gap-10 grid-cols-1">

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
      <div className="my-5 p-5 md:px-10 our-impact-container max-w-[1620px] mx-auto">
        <div>
        <Text
          title="Our Impact (2020 - 2025)"
          size="text-xl"
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