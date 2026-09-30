"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { readVisitSource } from "@/lib/visit-source";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const visit = readVisitSource();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "3832175e-255f-4f9c-9406-1a460eebe07a",
          subject: `New Inquiry from ${firstName} ${lastName} — Tovy Photography`,
          from_name: "Tovy Photography Website",
          name: `${firstName} ${lastName}`,
          email: formData.get("email"),
          phone: formData.get("phone") || "Not provided",
          session_type: formData.get("sessionType") || "Not specified",
          message: formData.get("message"),
          "How they found the site": visit.source,
          "First page they saw": visit.landing.startsWith("/")
            ? `https://tovyphotography.com${visit.landing}`
            : visit.landing,
          "Page right before Contact": visit.before.startsWith("/")
            ? `https://tovyphotography.com${visit.before}`
            : visit.before,
          "First visit": visit.firstVisit,
        }),
      });
      const result = await res.json();
      if (result.success) {
        try {
          track("Inquiry", {
            source: visit.source,
            landing: visit.landing.split("?")[0],
            before: visit.before.split("?")[0],
            sessionType: String(formData.get("sessionType") || "not specified"),
          });
        } catch {
          /* analytics is best effort */
        }
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <h3 className="font-[family-name:var(--font-cormorant)] text-3xl mb-4 text-charcoal">
          Thank you!
        </h3>
        <p className="text-charcoal-light">
          Your message has been sent. I&apos;ll get back to you within 24-48
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="Your last name"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="sessionType"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Session Type
        </label>
        <select
          id="sessionType"
          name="sessionType"
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        >
          <option value="">Select a session type...</option>
          <option value="family">Family Session</option>
          <option value="newborn">Newborn Session</option>
          <option value="milestone">Milestone Session</option>
          <option value="event">Event Session</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage resize-vertical"
          placeholder="Tell me about your family and what you're looking for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or email me directly at{" "}
          <a href="mailto:tovypics@gmail.com" className="underline">
            tovypics@gmail.com
          </a>
        </p>
      )}
    </form>
  );
}
