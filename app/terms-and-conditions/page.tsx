"use client";
import React from 'react';
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";

export default function TermsAndConditions() {
    return (
        <div className="bg-white min-h-screen">
            <PageBanner
                title="Terms & Conditions"
                list={[{ id: 1, name: "Terms & Conditions", link: "/" }]}
            />

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
                <section className="inter-font">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase border-b-2 border-primary pb-2 inline-block text-xl">
                        Welcome to Imaigal Trust
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Welcome to <strong>Imaigal Trust</strong>. By accessing or using our website <a href="http://www.imaigaltrust.org" className="text-primary hover:underline font-semibold">www.imaigaltrust.org</a>, you agree to follow the terms and conditions described below. These terms govern the use of our website and the membership of individuals who wish to be part of the trust.
                    </p>
                </section>

                <section className="inter-font">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-xl">
                        Use of Website
                    </h2>
                    <p className="text-gray-700 mb-4">
                        The content provided on this website is intended to share information about the activities, initiatives, and programs of Imaigal Trust.
                    </p>
                    <p className="text-gray-700 mb-4">By using this website, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Use the website only for lawful purposes.</li>
                        <li>Not attempt to damage, hack, or misuse the website.</li>
                        <li>Not attempt to gain unauthorized access to any data or system.</li>
                        <li>Provide accurate information when submitting forms.</li>
                    </ul>
                    <p className="text-gray-700 mt-4 italic">
                        The trust reserves the right to restrict or terminate access if misuse of the website is detected.
                    </p>
                </section>

                <section className="inter-font">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-xl">
                        Intellectual Property
                    </h2>
                    <p className="text-gray-700 mb-4">
                        All content available on this website, including text, images, graphics, logos, and documents, is the property of <strong>Imaigal Trust</strong> unless otherwise stated.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Unauthorized copying, reproduction, or distribution of website content without permission is prohibited.
                    </p>
                </section>

                <section className="inter-font">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-xl">
                        Limitation of Liability
                    </h2>
                    <p className="text-gray-700 mb-4">
                        While we aim to keep the information on this website accurate and up to date, <strong>Imaigal Trust</strong> does not guarantee the completeness or accuracy of the information provided.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Users access the website at their own risk.
                    </p>
                </section>

                <section className="inter-font border-b-2 border-gray-100 pb-12">
                    <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-xl">
                        Changes to Terms
                    </h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Imaigal Trust</strong> reserves the right to update or modify these Terms and Conditions at any time. Any changes will be posted on this page.
                    </p>
                </section>

                {/* Membership Section */}
                <div className="bg-secondary-50 p-8 rounded-xl border-l-8 border-primary shadow-sm">
                    <section className="inter-font">
                        <h2 className="josefin-font font-bold primary-text mb-6 uppercase text-2xl">
                            Membership
                        </h2>
                        <p className="text-gray-700 mb-6">
                            <strong>Imaigal Trust</strong> encourages individuals who support our mission and objectives to become members and participate in our activities.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="josefin-font font-bold mb-3 primary-text text-lg">Eligibility</h3>
                                <p className="text-gray-700">
                                    Any individual who supports the objectives of the trust and agrees to follow the rules and policies of the trust may apply for membership.
                                </p>
                            </div>

                            <div>
                                <h3 className="josefin-font font-bold mb-3 primary-text text-lg">Membership Application</h3>
                                <p className="text-gray-700 mb-2">Individuals can apply for membership by:</p>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-xs">
                                    <li>
                                        <a href="/about/membership" className="text-primary hover:underline font-medium">Completing the membership application form</a> on the website
                                    </li>
                                    <li>Providing accurate personal details</li>
                                    <li>Submitting required information or documents</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="josefin-font font-bold mb-3 primary-text text-lg">Approval of Membership</h3>
                                <p className="text-gray-700">
                                    Membership applications will be reviewed and approved by the trust management or governing committee.
                                </p>
                            </div>

                            <div>
                                <h3 className="josefin-font font-bold mb-3 primary-text text-lg">Member Responsibilities</h3>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-xs">
                                    <li>Support the goals and objectives of the trust</li>
                                    <li>Follow the rules and regulations of the organization</li>
                                    <li>Participate in trust activities whenever possible</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="josefin-font font-bold mb-3 primary-text text-lg">Termination of Membership</h3>
                            <p className="text-gray-700">
                                The trust reserves the right to cancel or terminate membership if a member violates the trust policies or acts against the interests of the trust.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
