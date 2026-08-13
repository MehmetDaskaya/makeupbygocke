"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ContactClient({ dict }: { dict: any }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", date: "", message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      track("contact_form_submit", { service: form.service || "unspecified" });
    } catch {
      // Ignore if analytics fails
    }
    await new Promise(r => setTimeout(r, 1200));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="form-success">
        <div className="gold-line mb-lg" style={{ maxWidth: "6rem", margin: "0 auto 2rem" }} />
        <h2 className="display-md mb-md">{dict.contact.form.successTitle}</h2>
        <p className="body-text">{dict.contact.form.successText}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="name">{dict.contact.form.name} *</label>
          <input id="name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} required placeholder="Ada" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">{dict.contact.form.email} *</label>
          <input id="email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} required placeholder="ada@example.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">{dict.contact.form.phone}</label>
          <input id="phone" name="phone" type="tel" className="form-input" value={form.phone} onChange={handleChange} placeholder="+90 5XX XXX XX XX" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="date">{dict.contact.form.date}</label>
          <input id="date" name="date" type="date" className="form-input" value={form.date} onChange={handleChange} style={{ colorScheme: "dark" }} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="service">{dict.contact.form.service}</label>
        <select id="service" name="service" className="form-select" value={form.service} onChange={handleChange}>
          <option value="">{dict.contact.form.servicePlaceholder}</option>
          {dict.contact.form.serviceOptions.map((opt: string, i: number) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">{dict.contact.form.message}</label>
        <textarea id="message" name="message" className="form-textarea" value={form.message} onChange={handleChange} placeholder={dict.contact.form.messagePlaceholder} />
      </div>

      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "..." : dict.contact.form.submit}
      </button>
    </form>
  );
}
