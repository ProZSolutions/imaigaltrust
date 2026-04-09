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
        </div>
      {/* TIMELINE */}
      <Timeline />

      {/* SUCCESS STORIES CONTAINER */}
      <div className="py-1 max-w-[1600px] mx-auto">

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