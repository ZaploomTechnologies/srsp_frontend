import { Phone, Mail, MapPin, Send } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTACT } from "@/lib/contact";
import ContactForm from "@/components/forms/ContactForm";

const contactItems = [
  { icon: MapPin, label: "Office Address", value: `${CONTACT.address.line1}\n${CONTACT.address.line2}` },
  { icon: Phone, label: "Phone", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
];

export default function Consultation() {
  return (
    <section id="contact" className="py-12 lg:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionLabel text="Get In Touch" />
            <p
              className="text-body leading-relaxed mb-8 mt-5"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Contact our office for queries regarding our professional services.
              Our team will respond to your enquiry at the earliest.
            </p>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p
                      className="text-heading font-bold text-sm mb-0.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {label}
                    </p>
                    {value.split("\n").map((line) => (
                      <p
                        key={line}
                        className="text-primary text-sm"
                        style={{ fontFamily: "var(--font-dm)" }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p
                className="text-heading font-bold text-sm mb-3"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Office Hours
              </p>
              <div className="space-y-1.5">
                {CONTACT.hours.map(({ day, time }) => (
                  <p
                    key={day}
                    className="text-primary text-sm"
                    style={{ fontFamily: "var(--font-dm)" }}
                  >
                    <span className="text-heading font-medium">{day}:</span>{" "}
                    {time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-primary-light/30 rounded-3xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Send size={20} className="text-primary" />
              <h3
                className="font-bold text-heading text-lg"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Send Us a Message
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p
                className="text-body text-sm leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                Please fill out the form below with your details and message,
                and our team will get back to you as soon as possible.
              </p>

              <ContactForm variant="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
