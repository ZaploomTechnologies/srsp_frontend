import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactBanner from "@/components/sections/contact/ContactBanner";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactMap from "@/components/sections/contact/ContactMap";
export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Chartered Accountants, Surat",
  description:
    "Contact S R S P & Co at Bhatar Trade Center, Surat. Call +91 63557 74778 or email SRSP@SRSPCO.COM. Open Monday to Saturday, 10 AM to 7 PM.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact/" }])} />
      <Header />
      <main id="main-content">
        <ContactBanner />
        <ContactInfo />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
