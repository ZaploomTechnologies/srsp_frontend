import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutBanner from "@/components/sections/about/AboutBanner";
import About from "@/components/sections/About";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutStrategic from "@/components/sections/about/AboutStrategic";
import AboutStats from "@/components/sections/about/AboutStats";
import AboutTeam from "@/components/sections/about/AboutTeam";
export const metadata: Metadata = pageMetadata({
  title: "About Us — Chartered Accountants in Surat",
  description:
    "About S R S P & Co, a Chartered Accountants firm in Surat — our story, partners and team, and our commitment to accuracy and integrity.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about/" }])} />
      <Header />
      <main id="main-content">
        <AboutBanner />
        <AboutStory bg="bg-white" />
        <About />
        <AboutTeam />
        <AboutStrategic />
        <AboutStats />
      </main>
      <Footer />
    </>
  );
}
