"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./NavBar.css";
import Image from "next/image";
import { TbHome } from "react-icons/tb";



// Rest of your Navbar code...
const Navbar = ({ hideNavItems = false }: { hideNavItems?: boolean }) => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

const toggleDropdown = (name: string) => {
  setOpenDropdown(openDropdown === name ? null : name);
};

  // Close hamburger menu on route change
  useEffect(() => {
    setNavOpen(false);
    const checkbox = document.getElementById("check") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }, [pathname]);

  const isParentPathActive = (prefix: string) => {
    return pathname.startsWith(prefix);
  };

  return (
    <div className="containers">
      {!hideNavItems && (
        <input
          type="checkbox"
          name=""
          id="check"
          checked={navOpen}
          onChange={() => setNavOpen(!navOpen)}
          suppressHydrationWarning
        />
      )}

      <div className="logo-container">
        <Link href="/">
          <Image
            src={"/assets/images/logo.png"}
            alt="Imaigal Trust logo"
            width={100}
            height={100}
            className="w-56 logo"
          />
        </Link>
      </div>

      {!hideNavItems && (
        <div className="nav-btn">
          <div className="nav-links">
            <ul>
              <li
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
                <Link href="/">
  <span className="text-white">
    <TbHome size={20} />
  </span>
</Link>
              </li>

              {/* About Us */}
              <li
                className={`nav-link ${isParentPathActive("/about") ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
              <span
  onClick={() => toggleDropdown("about")}
className="flex items-center gap-1 cursor-pointer text-white py-4 md:py-2 ml-8 md:ml-4">

  About Us <FaChevronDown />
</span>

                <div className={`dropdown ${openDropdown === "about" ? "show" : ""}`}>
                  <ul>
                    <li
                      className={`dropdown-link ${pathname === "/about/board-members" ? "active" : ""}`}
                    >
                      <Link href="/about/board-members">Board Members</Link>
                    </li>
                    <li
                      className={`dropdown-link ${pathname === "/about/associated" ? "active" : ""}`}
                    >
                      <Link href="/about/associated">
                        Associated Organizations
                      </Link>
                    </li>
                    <li
                      className={`dropdown-link ${pathname === "/about/membership" ? "active" : ""}`}
                    >
                      <Link href="/about/membership">Memberships</Link>
                    </li>
                    <li
                      className={`dropdown-link ${pathname === "/about/annual-report" ? "active" : ""}`}
                    >
                      <Link href="/about/annual-report">Annual Reports</Link>
                    </li>
                    <div className="arrow"></div>
                  </ul>
                </div>
              </li>

              {/* Programs */}
              <li
                className={`nav-link ${isParentPathActive("/programs") ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
           <span
  onClick={() => toggleDropdown("programs")}
className="flex items-center gap-1 cursor-pointer text-white py-4 md:py-2 ml-8 md:ml-4">
    Programs <FaChevronDown />
</span>


                <div className={`dropdown ${openDropdown === "programs" ? "show" : ""}`}>
                  <ul>
                    <li
                      className={`dropdown-link ${pathname === "/programs/agriculture" ? "active" : ""}`}
                    >
                      <Link href="/programs/agriculture">Agriculture</Link>
                    </li>

                    <li
                      className={`dropdown-link ${isParentPathActive("/programs/cluster") ? "active" : ""}`}
                    >
                      <Link href="#">
                        Cluster Development <FaChevronDown />
                      </Link>
                      <div className="dropdown second">
                        <ul>
                          {/* SFURTI */}
                          <li
                            className={`dropdown-link ${pathname === "/programs/cluster/sfurti" ? "active" : ""}`}
                          >
                            <Link href="/programs/cluster/sfurti">
                              SFURTI <FaChevronDown />
                            </Link>

                            {/* THIRD LEVEL */}
                            <div className="dropdown third">
                              <ul>
                                <li
                                  className={`dropdown-link ${pathname === "/programs/cluster/coir-cluster" ? "active" : ""}`}
                                >
                                  <Link href="/programs/cluster/coir-cluster">
                                    Erode Kongu Coir Cluster
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                        <div className="arrow"></div>
                      </div>
                    </li>

                    <li
                      className={`dropdown-link ${isParentPathActive("/programs/rural") ? "active" : ""}`}
                    >
                      <Link href="#">
                        Rural Development <FaChevronDown />
                      </Link>
                      <div className="dropdown second">
                        <ul>
                          <li
                            className={`dropdown-link ${pathname === "/programs/rural/women-development" ? "active" : ""}`}
                          >
                            <Link href="/programs/rural/women-development">
                              Women Development
                            </Link>
                          </li>
                          <li
                            className={`dropdown-link ${pathname === "/programs/rural/health" ? "active" : ""}`}
                          >
                            <Link href="/programs/rural/health">
                              Rural Health
                            </Link>
                          </li>
                          <li
                            className={`dropdown-link ${pathname === "/programs/rural/transgend" ? "active" : ""}`}
                          >
                            <Link href="/programs/rural/transgend">
                              Transgend & Others
                            </Link>
                          </li>
                        </ul>
                        <div className="arrow"></div>
                      </div>
                    </li>

                    <li
                      className={`dropdown-link ${pathname === "/programs/acabc" ? "active" : ""}`}
                    >
                      <Link href="/programs/acabc">
                        ACABC (Ongoing Program)
                      </Link>
                    </li>

                    <li
                      className={`dropdown-link ${isParentPathActive("/programs/nabard") ? "active" : ""}`}
                    >
                      <Link href="/programs/nabard">
                        NABARD Projects <FaChevronDown />
                      </Link>
                      <div className="dropdown second">
                        <ul>
                          <li
                            className={`dropdown-link ${pathname === "/programs/nabard/climate-proofing" ? "active" : ""}`}
                          >
                            <Link href="/programs/nabard/climate-proofing">
                              Climate Proofing
                            </Link>
                          </li>
                          <li
                            className={`dropdown-link ${pathname === "/programs/nabard/fpc" ? "active" : ""}`}
                          >
                            <Link href="/programs/nabard/fpc">
                              Farmer Producer Companies (FPC)
                            </Link>
                          </li>
                          <li
                            className={`dropdown-link ${pathname === "/programs/nabard/watershed" ? "active" : ""}`}
                          >
                            <Link href="/programs/nabard/watershed">
                              Watershed Development
                            </Link>
                          </li>
                          <li
                            className={`dropdown-link ${pathname === "/programs/nabard/edp-trainings" ? "active" : ""}`}
                          >
                            <Link href="/programs/nabard/edp-trainings">
                              EDP Trainings
                            </Link>
                          </li>
                        </ul>
                        <div className="arrow"></div>
                      </div>
                    </li>

                    <div className="arrow"></div>
                  </ul>
                </div>
              </li>

              <li
                className={`nav-link ${pathname === "/news-events" ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
                <Link href="/news-events" className="md:-ml-3">
  News & Events
</Link>
              </li>

              {/* Gallery */}
              <li
                className={`nav-link ${isParentPathActive("/gallery") ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
                <Link href="/gallery " className="md:-ml-3">
                  Gallery
                </Link>
              </li>

              <li
                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                style={{ "--i": ".6s" } as React.CSSProperties}
              >
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!hideNavItems && (
        <div
          className="hamburger-menu-container"
          onClick={() => setNavOpen(!navOpen)}
        >
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
