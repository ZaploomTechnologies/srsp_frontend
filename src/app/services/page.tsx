import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesBanner from "@/components/sections/services/ServicesBanner";
import ServicesDetail from "@/components/sections/services/ServicesDetail";
import ServicesMarquee from "@/components/sections/services/ServicesMarquee";
import StrategicPlanning from "@/components/sections/StrategicPlanning";
export const metadata: Metadata = pageMetadata({
  title: "Tax, Audit & Advisory Services in Surat",
  description:
    "Income tax, GST litigation, audit, company law, book keeping, start-up and finance services from Chartered Accountants in Surat.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }])} />
      <Header />
      <main id="main-content">
        <ServicesBanner />
        <ServicesDetail />
        <StrategicPlanning />
        <ServicesMarquee />
      </main>
      <Footer />
    </>
  );
}
