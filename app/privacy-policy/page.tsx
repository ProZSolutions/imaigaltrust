"use client";
import React from 'react';
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";

export default function PrivacyPolicy() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-white min-h-screen">
            <PageBanner
                title="Privacy Policy"
                list={[{ id: 1, name: "Privacy Policy", link: "/" }]}
            />

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-right text-gray-500 mb-8 inter-font text-xs">
                    Last Updated: {currentDate}
                </div>

                <section className="inter-font mb-12">
                    <p className="text-gray-700 text-base">
                        At <strong>Imaigal Trust</strong>, we respect the privacy of our website visitors, donors, and members. This policy explains how we collect, use, and protect your information when you interact with our website.
                    </p>
                </section>

                <section className="inter-font mb-12">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase border-b-2 border-primary pb-2 inline-block text-xl">
                        Information We Collect
                    </h2>
                    <p className="text-gray-700 mb-6">When you interact with our website, we may collect the following information:</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-secondary-50 p-6 rounded-lg">
                            <h3 className="josefin-font font-bold mb-4 primary-text flex items-center gap-2 text-base">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Personal Information
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center gap-2"><span>•</span> Name</li>
                                <li className="flex items-center gap-2"><span>•</span> Email address</li>
                                <li className="flex items-center gap-2"><span>•</span> Phone number</li>
                                <li className="flex items-center gap-2"><span>•</span> Address</li>
                                <li className="flex items-center gap-2"><span>•</span> Membership details</li>
                                <li className="flex items-center gap-2"><span>•</span> Donation details</li>
                            </ul>
                        </div>

                        <div className="bg-secondary-50 p-6 rounded-lg">
                            <h3 className="josefin-font font-bold mb-4 primary-text flex items-center gap-2 text-base">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Non-Personal Information
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center gap-2"><span>•</span> IP address</li>
                                <li className="flex items-center gap-2"><span>•</span> Browser type</li>
                                <li className="flex items-center gap-2"><span>•</span> Device information</li>
                                <li className="flex items-center gap-2"><span>•</span> Pages visited</li>
                            </ul>
                            <p className="mt-4 text-gray-500 italic text-xs">
                                This information helps us improve the performance and usability of the website.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="inter-font mb-12">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-xl">
                        Use of Information
                    </h2>
                    <p className="text-gray-700 mb-4">The information collected may be used for:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Processing donations</li>
                        <li>Managing membership registrations</li>
                        <li>Responding to inquiries</li>
                        <li>Sending updates about trust activities</li>
                        <li>Improving website services</li>
                    </ul>
                </section>

                <section className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="inter-font">
                        <h2 className="josefin-font font-bold primary-text mb-4 uppercase text-xl">
                            Data Protection
                        </h2>
                        <p className="text-gray-700">
                            We take reasonable security measures to protect personal information from unauthorized access, misuse, or disclosure.
                        </p>
                    </div>
                    <div className="inter-font">
                        <h2 className="josefin-font font-bold primary-text mb-4 uppercase text-xl">
                            Sharing of Information
                        </h2>
                        <p className="text-gray-700">
                            <strong>Imaigal Trust</strong> does not sell, rent, or trade personal information. Information may only be shared when required for payment processing or by law.
                        </p>
                    </div>
                </section>

                <section className="bg-primary/5 p-8 rounded-xl border border-primary/20 mb-16 inter-font">
                    <h2 className="josefin-font font-bold primary-text mb-4 uppercase text-xl">
                        Cookies
                    </h2>
                    <p className="text-gray-700">
                        Our website may use cookies to enhance user experience and analyze website usage. You can control cookie preferences through your browser settings.
                    </p>
                </section>

                <hr className="border-gray-100 mb-16" />

                {/* Donation Collection Section */}
                <section className="inter-font">
                    <div className="text-center mb-12">
                        <h2 className="josefin-font font-bold primary-text mb-4 uppercase tracking-tighter text-2xl">
                            Donation Collection
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Donations help support the charitable activities and community programs conducted by Imaigal Trust.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="josefin-font font-bold mb-4 secondary-text-900 uppercase text-lg">Purpose of Donations</h3>
                                <p className="text-gray-700 mb-4">Funds collected are used for various social and charitable initiatives including:</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "Educational assistance",
                                        "Medical support",
                                        "Community development",
                                        "Social welfare programs",
                                        "Charitable activities"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-700 text-xs">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="josefin-font font-bold mb-4 secondary-text-900 uppercase text-lg">Transparency & Receipts</h3>
                                <p className="text-gray-700 mb-4">
                                    The trust maintains transparency in the use of donated funds and ensures that donations are used for charitable purposes.
                                </p>
                                <p className="text-gray-700">
                                    Donors will receive a confirmation or receipt for their donation through email or official communication.
                                </p>
                            </div>
                        </div>

                        <div className="bg-accent-800 text-white p-6 rounded-xl shadow-lg h-fit">
                            <h3 className="josefin-font font-bold mb-6 text-center uppercase text-lg">Methods of Donation</h3>
                            <ul className="space-y-4 font-light text-xs">
                                <li className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">1</span>
                                    Online payment through website
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">2</span>
                                    Bank transfer
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">3</span>
                                    Cheque or direct contribution
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">4</span>
                                    Other approved methods
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-red-50 p-6 border-l-4 border-red-500 rounded">
                        <h3 className="josefin-font font-bold text-red-800 mb-2 uppercase text-base">Refund Policy</h3>
                        <p className="text-red-700 text-xs">
                            Donations are generally non-refundable. However, in case of a duplicate transaction or technical error, donors may contact the trust within <strong>7 days</strong> of the transaction.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
