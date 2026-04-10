"use client";
import React from 'react';
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Link from 'next/link';

export default function NabardProjects() {
    return (
<div className="bg-white">
                <PageBanner
                title="NABARD Projects"
                list={[
                    { id: 1, name: "Programs", link: "/programs" },
                    { id: 2, name: "NABARD Projects", link: "/programs/nabard" }
                ]}
            />

            {/* CRT-Style Container */}
<section className="pt-4 sm:pt-5 md:pt-6 pb-7 max-w-[1800px] mx-auto px-0 sm:px-1 md:px-2 flex flex-col gap-6">
<div className="max-w-[1600px] mx-auto p-4 md:p-5 bg-gray-100 rounded-lg flex flex-col gap-6">                    {/* Section Heading */}
                    <h2 className="josefin-font font-bold text-[#1B2F7C] uppercase text-center text-lg sm:text-xl md:text-xl lg:text-2xl">
  NABARD Supported Projects
</h2>
                    <p className="inter-font text-gray-700 text-center">
                        Imaigal Trust partners with NABARD to implement various sustainable development projects. Explore our ongoing initiatives below:
                    </p>

                    {/* Project Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/programs/nabard/climate-proofing" className="group p-8 border border-gray-100 bg-white rounded-xl hover:shadow-lg transition-all border-l-4 hover:border-l-primary">
                            <h3 className="josefin-font font-bold mb-2 group-hover:primary-text text-lg">
                                Climate Proofing
                            </h3>
                            <p className="text-xs">
                                Strategic initiatives to build climate resilience in agricultural communities.
                            </p>
                        </Link>

                        <Link href="/programs/nabard/fpc" className="group p-8 border border-gray-100 bg-white rounded-xl hover:shadow-lg transition-all border-l-4 hover:border-l-primary">
                            <h3 className="josefin-font font-bold mb-2 group-hover:primary-text text-lg">
                                Farmer Producer Companies (FPC)
                            </h3>
                            <p className="text-xs">
                                Empowering farmers through collective action and resource sharing.
                            </p>
                        </Link>

                        <Link href="/programs/nabard/watershed" className="group p-8 border border-gray-100 bg-white rounded-xl hover:shadow-lg transition-all border-l-4 hover:border-l-primary">
                            <h3 className="josefin-font font-bold mb-2 group-hover:primary-text text-lg">
                                Watershed Development
                            </h3>
                            <p className="text-xs">
                                Comprehensive land and water management for sustainable rural growth.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}