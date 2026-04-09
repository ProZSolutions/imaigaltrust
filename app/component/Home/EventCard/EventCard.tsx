import Image from "next/image";
import React from "react";
import "./EventCard.css";
interface EventCardProps {
  img: string;
  date: string;
  title: string;
  desc: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  img,
  date,
  title,
  desc,
  // link,
}) => {
  return (
    <div className="event-card border-b-4 md:border-r-4 md:border-b-0 poppins-font rounded-xl shadow flex md:flex-row flex-col">
      <Image
        src={img}
        alt="Event Image"
        width={280}
        height={250}
        className="rounded-t-xl md:rounded-tl-xl w-full md:w-auto md:max-w-52"
      />
      <div className="p-4">
        <p className="primary-text my-2">{date}</p>
        <p className="accent-text-800 font-semibold my-2">{title}</p>
        <p className="my-2">{desc}</p>
        {/* <Button label={"View More"} className="blue__btn rounded-lg" /> */}
      </div>
    </div>
  );
};

export default EventCard;
