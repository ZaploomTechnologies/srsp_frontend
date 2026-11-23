import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTACT, PHONE_E164, PHONE_DISPLAY } from "@/lib/contact";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactInfo() {
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — contact details */}
          <div>
            <SectionLabel text="Contact Us" />
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-heading mt-5 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Have questions? Get in touch!
            </h2>
            <p
              className="text-body leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Contact us for professional services in taxation, audit,
              accounting, compliance, and advisory.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <h3
                    className="font-bold text-heading text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Office Location
                  </h3>
                </div>
                <p
                  className="text-body text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  {CONTACT.address.line1},<br />
                  {CONTACT.address.line2}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-primary shrink-0" />
                  <h3
                    className="font-bold text-heading text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Phone Number
                  </h3>
                </div>
                <p
                  className="text-body text-sm"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  <a href={`tel:${PHONE_E164}`} className="inline-block py-1 hover:text-primary">{PHONE_DISPLAY}</a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-primary shrink-0" />
                  <h3
                    className="font-bold text-heading text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Email Address
                  </h3>
                </div>
                <p
                  className="text-body text-sm"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  <a href={`mailto:${CONTACT.email}`} className="inline-block py-1 hover:text-primary">{CONTACT.email}</a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-primary shrink-0" />
                  <h3
                    className="font-bold text-heading text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Office Time
                  </h3>
                </div>
                {CONTACT.hours.map((h) => (
                  <p
                    key={h.day}
                    className="text-body text-sm"
                    style={{ fontFamily: "var(--font-dm)" }}
                  >
                    {h.day} : {h.time}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Right — send message card */}
          <div className="bg-heading rounded-3xl p-8 shadow-xl">
            <h3
              className="text-2xl font-extrabold text-white mb-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Send Message
            </h3>
            <p
              className="text-white/80 text-sm mb-7 leading-relaxed"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Please fill out the form below with your details and message, and our
              team will get back to you as soon as possible.
            </p>

            <ContactForm variant="dark" />
          </div>

        </div>
      </div>
    </section>
  );
}
