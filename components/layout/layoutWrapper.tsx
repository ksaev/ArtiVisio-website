"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Tu peux utiliser startsWith pour gérer les sous-routes
  const hidePaths = ["/presentation", "/admin"];
  const showHeaderFooter = !hidePaths.some(path => pathname.startsWith(path));

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
