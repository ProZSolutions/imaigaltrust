import React from "react";
import "./CircleDesign.css";
import Image from "next/image";
export default function CircleDesign() {
  return (
    <div className="my-10 w-full circle-design-container">
      <div className="circle-design web w-full">
        <div className="circle-design-inner mx-auto">
          <div className="circle-design-inner-bottom"></div>
          {/* 1 */}
          <div className="circle-img-container circle-img-con-1">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/drop_16464689.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">
              WDF & Climate <br />
              Proofing
            </span>
          </div>

          {/* 2 */}
          <div className="circle-img-container circle-img-con-2">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/molecule_4260329.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">
              Cluster
              <br />
              Development
            </span>
          </div>

          {/* 3 */}
          <div className="circle-img-container circle-img-con-3 flex-col">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/agriculture.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">Agri</span>
          </div>

          {/* 4 */}

          <div className="circle-img-container circle-img-con-4">
            <span className="circle-content">
              Rural <br /> Development
            </span>
            <div className="round-dot"></div>

            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/gardener.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
          </div>

          {/* 5 */}
          {/* <div className="circle-img-container circle-img-con-5">
            <span className="circle-content">
            Farmer Producer Organizations (FPOs)
            </span>
            <div className="round-dot"></div>

            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/startup.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
          </div> */}

          {/* seprate */}

          <div className="seprate-container">
            <div className="seprate-line"></div>
            <Image
              src="/assets/images/home/design/startup.png"
              width={100}
              height={100}
              alt="image"
              className="img mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="circle-design mobile w-full">
        <div className="circle-design-inner mx-auto">
          <div className="circle-design-inner-bottom"></div>
          {/* 1 */}
          <div className="circle-img-container circle-img-con-1">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/drop_16464689.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">WDF & Climate Proofing</span>
          </div>

          {/* 2 */}
          <div className="circle-img-container circle-img-con-2">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/molecule_4260329.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">Cluster Development</span>
          </div>

          {/* 3 */}
          <div className="circle-img-container circle-img-con-3 flex-col">
            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/agriculture.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <div className="round-dot"></div>
            <span className="circle-content">Agri</span>
          </div>

          {/* 4 */}

          <div className="circle-img-container circle-img-con-4">
            <div className="round-dot"></div>

            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/gardener.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <span className="circle-content">Rural Development</span>
          </div>

          {/* 5 */}
          <div className="circle-img-container circle-img-con-5">
            <div className="round-dot"></div>

            <div className="circle-img bg-amber-200 rounded-full p-4 shadow-lg">
              <Image
                src="/assets/images/home/design/startup.png"
                width={100}
                height={100}
                alt="image"
                className="img"
              />
            </div>
            <span className="circle-content">Farmer Producer Organizations (FPOs)</span>
          </div>

          {/* seprate */}

          <div className="seprate-container">
            <div className="seprate-line"></div>
            <Image
              src="/assets/images/home/design/startup.png"
              width={100}
              height={100}
              alt="image"
              className="img mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
