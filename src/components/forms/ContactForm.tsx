"use client";

import { useState } from "react";
import { openWhatsApp } from "@/lib/contact";

type Form = { name: string; phone: string; email: string; message: string };
type Errors = { name: string; phone: string; email: string };
type Variant = "light" | "dark";

const EMPTY_ERRORS: Errors = { name: "", phone: "", email: "" };

function validate(form: Form): Errors {
  const errors = { ...EMPTY_ERRORS };
  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }
  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(digits)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

/** Visual differences between the light (home page) and dark (contact page) cards. */
const THEME: Record<
  Variant,
  { row: string; focus: string; error: string; textarea: string; button: string; note: string }
> = {
  light: {
    row: "grid grid-cols-2 gap-4",
    focus: "focus:border-primary focus:ring-primary-light/40",
    error: "text-red-500",
    textarea: "resize-y",
    button: "bg-primary text-white text-sm shadow-md shadow-primary/20 hover:bg-[#174f41]",
    note: "text-body",
  },
  dark: {
    row: "grid sm:grid-cols-2 gap-4",
    focus: "focus:border-primary-light focus:ring-primary-light/30",
    error: "text-red-400",
    textarea: "resize-none",
    button: "bg-primary-light text-heading hover:bg-[#b8f09a]",
    note: "text-white/90",
  },
};

export default function ContactForm({ variant = "light" }: { variant?: Variant }) {
  const t = THEME[variant];
  const [form, setForm] = useState<Form>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>(EMPTY_ERRORS);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});

  const change = (field: keyof Form, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const blur = (field: keyof Form) => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    const errs = validate(form);
    setErrors(errs);
    if (errs.name || errs.phone || errs.email) return;

    const lines = [
      "*New Consultation Request — S R S P & Co.*",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
    ];
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
    openWhatsApp(lines);
  };

  const inputClass = (err: string) =>
    `w-full bg-white text-heading placeholder-gray-400 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all duration-200 ${
      err ? "border-red-400 focus:border-red-400 focus:ring-red-100" : `border-gray-200 ${t.focus}`
    }`;

  const fieldError = (msg: string, id: string) =>
    msg ? (
      <p id={id} className={`${t.error} text-xs mt-1 ml-1`} style={{ fontFamily: "var(--font-dm)" }}>
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={t.row}>
        <div>
          <input
            type="text"
            placeholder="First Name *"
            aria-label="First name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            autoComplete="given-name"
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            onBlur={() => blur("name")}
            className={inputClass(errors.name)}
            style={{ fontFamily: "var(--font-dm)" }}
          />
          {fieldError(errors.name, "cf-name-error")}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone *"
            aria-label="Phone number"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => change("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={inputClass(errors.phone)}
            style={{ fontFamily: "var(--font-dm)" }}
          />
          {fieldError(errors.phone, "cf-phone-error")}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email (optional)"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          autoComplete="email"
          value={form.email}
          onChange={(e) => change("email", e.target.value)}
          onBlur={() => blur("email")}
          className={inputClass(errors.email)}
          style={{ fontFamily: "var(--font-dm)" }}
        />
        {fieldError(errors.email, "cf-email-error")}
      </div>

      <textarea
        rows={5}
        placeholder="Write Message (optional)"
        aria-label="Message"
        value={form.message}
        onChange={(e) => change("message", e.target.value)}
        className={`w-full bg-white text-heading placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all duration-200 ${t.focus} ${t.textarea}`}
        style={{ fontFamily: "var(--font-dm)" }}
      />

      <div>
        <button
          type="submit"
          className={`${t.button} font-semibold px-8 py-3 rounded-full transition-colors duration-200`}
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Send Message
        </button>
      </div>

      <p className={`${t.note} text-xs leading-relaxed`} style={{ fontFamily: "var(--font-dm)" }}>
        Submitting this form does not create a client&ndash;professional relationship.
        Professional services commence only after a formal engagement letter is signed.
      </p>
    </form>
  );
}
