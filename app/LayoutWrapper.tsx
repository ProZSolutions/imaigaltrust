"use client";

import { usePathname } from "next/navigation";
import Footer from "./component/Footer/Footer";
import SecondaryFooter from "./component/SecondaryFooter/SecondaryFooter";
import Header from "./component/Header/Header";
import SubHeader from "./component/SubHeader/SubHeader";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/login");

  if (isAdminPage) {
    return (
      <div>
        <div className="secondary-header">
          <SubHeader />
        </div>
        {/* <Header /> */}
        {children}
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div>
        <div className="secondary-header">
          <SubHeader />
        </div>
        {/* <Header /> */}
        {children}
        <SecondaryFooter />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="secondary-header">
        <SubHeader />
      </div>
      <Header />
      {children}
      <SecondaryFooter />
      <Footer />
    </div>
  );
}
