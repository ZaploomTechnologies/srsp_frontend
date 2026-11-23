import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BlogBanner() {
  return (
    <section className="relative h-72 md:h-96 flex flex-col justify-center items-center overflow-hidden bg-heading">
      <img
        src="/images/banner-team.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-heading/80" />

      <div className="relative z-10 text-center px-4">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Blog
        </h1>
        <nav
          className="flex items-center justify-center gap-1.5 text-white/60 text-sm"
          style={{ fontFamily: "var(--font-dm)" }}
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary-light transition-colors duration-200">
            Home
          </Link>
          <ChevronRight size={14} className="opacity-60" />
          <span className="text-white">Blog</span>
        </nav>
      </div>
    </section>
  );
}
