import Image from "next/image";
import React from "react";
import "./Timeline.css";
export default function Timeline() {
  return (
    <div className="p-5 my-5">
      <div
        className="timeline-container max-w-[1600px]  mx-auto
"
      >
        <div className="circle-img-up-container">
          <div className="circle-img-container">
            <div className="circle-img rounded-full p-4 shadow-lg">
              <div className="circle-img-circle">
                <Image
                  src="/assets/images/home/design/drop_16464689.png"
                  width={100}
                  height={100}
                  alt="WDF & Climate Proofing"
                  className="img"
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="round-dot"></div>
            <div className="circle-content">WDF & Climate Proofing</div>
          </div>
        </div>
        <div className="circle-img-up-container">
          <div className="circle-img-container">
            <div className="circle-img rounded-full p-4 shadow-lg">
              <div className="circle-img-circle">
                <Image
                  src="/assets/images/home/design/molecule_4260329.png"
                  width={100}
                  height={100}
                  alt="image"
                  className="img"
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="round-dot"></div>
            <div className="circle-content">Cluster Development</div>
          </div>
        </div>
        <div className="circle-img-up-container">
          <div className="circle-img-container">
            <div className="circle-img rounded-full p-4 shadow-lg">
              <div className="circle-img-circle">
                <Image
                  src="/assets/images/home/design/startup.png"
                  width={100}
                  height={100}
                  alt="image"
                  className="img"
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="round-dot"></div>
            <div className="circle-content">
              Farmer Producer Organizations (FPOs)
            </div>
          </div>
        </div>
        <div className="circle-img-up-container">
          <div className="circle-img-container">
            <div className="circle-img rounded-full p-4 shadow-lg">
              <div className="circle-img-circle">
                <Image
                  src="/assets/images/home/design/gardener.png"
                  width={100}
                  height={100}
                  alt="image"
                  className="img"
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="round-dot"></div>
            <div className="circle-content">Rural Development</div>
          </div>
        </div>
        <div className="circle-img-up-container">
          <div className="circle-img-container">
            <div className="circle-img rounded-full p-4 shadow-lg">
              <div className="circle-img-circle">
                <Image
                  src="/assets/images/home/design/agriculture.png"
                  width={100}
                  height={100}
                  alt="image"
                  className="img"
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="round-dot"></div>
            <div className="circle-content">Agri</div>
          </div>
        </div>
      </div>
    </div>
  );
}
