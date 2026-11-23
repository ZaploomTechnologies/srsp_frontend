export const CONTACT = {
  address: {
    line1: "B-101, Bhatar Trade Center, Near Bhatar Char Rasta",
    line2: "Bhatar, Surat – 395017",
  },
  phone: "63557 74778",
  email: "SRSP@SRSPCO.COM",
  firmRegNo: "153921W",
  hours: [
    { day: "Monday - Saturday", time: "10:00 AM - 7:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

/** Phone in international format, e.g. "+916355774778" (used for tel: links and structured data). */
export const PHONE_E164 = `+91${CONTACT.phone.replace(/\D/g, "")}`;
/** Phone as shown to visitors, e.g. "+91 63557 74778". */
export const PHONE_DISPLAY = `+91 ${CONTACT.phone}`;
/** Digits-only number used by wa.me links, e.g. "916355774778". */
export const WA_NUMBER = PHONE_E164.slice(1);
/** Full postal address on one line. */
export const ADDRESS_FULL = `${CONTACT.address.line1}, ${CONTACT.address.line2}, Gujarat, India`;

/**
 * Opens a prefilled WhatsApp chat with the firm.
 * "noopener,noreferrer" stops the new tab from getting access to this page.
 */
export function openWhatsApp(lines: string[]) {
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
    "_blank",
    "noopener,noreferrer"
  );
}
