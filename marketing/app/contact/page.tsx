"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    painpoints: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.painpoints,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", painpoints: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send. Please try emailing us directly.");
    }
  }

  return (
    <section className="bg-background text-contrast max-w-3xl mx-auto py-6">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto card-surface-light p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-contrast">
            Book a Free Call
          </h1>

          {status === "success" && (
            <div
              className="mb-6 p-4 rounded-lg card-surface-light border-subtle border text-contrast text-center"
              role="status"
            >
              <p className="font-semibold">Message sent.</p>
              <p className="text-secondary text-sm mt-1">
                We&apos;ll be in touch soon.
              </p>
            </div>
          )}

          {status === "error" && errorMessage && (
            <div
              className="mb-6 p-4 rounded-lg border border-error bg-error text-error text-center"
              role="alert"
            >
              <p className="font-semibold">Couldn&apos;t send message</p>
              <p className="text-sm mt-1">{errorMessage}</p>
              <p className="text-sm mt-2">
                <a
                  href="mailto:jeff@adventureflow.ai"
                  className="underline hover:opacity-80 text-error"
                >
                  Email us directly
                </a>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-contrast mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 input-light rounded-md focus-ring-primary"
                placeholder="Enter your name"
                required
                maxLength={200}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-contrast mb-2 font-medium">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 input-light rounded-md focus-ring-primary"
                placeholder="Your phone number"
                maxLength={50}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-contrast mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 input-light rounded-md focus-ring-primary"
                placeholder="Enter your email"
                required
                maxLength={320}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="painpoints" className="block text-contrast mb-2 font-medium">
                What pain points should we focus on?
              </label>
              <textarea
                id="painpoints"
                name="painpoints"
                value={formData.painpoints}
                onChange={handleChange}
                className="w-full p-3 input-light rounded-md focus-ring-primary"
                rows={4}
                placeholder="Briefly describe your top 1–3 issues"
                required
                maxLength={5000}
                disabled={status === "sending"}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-accent text-contrast py-3 px-6 rounded-md shadow-md hover:opacity-90 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Book Call"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-secondary text-sm">
            Prefer email?{" "}
            <Link
              href="mailto:jeff@adventureflow.ai"
              className="text-contrast font-medium hover:underline"
            >
              jeff@adventureflow.ai
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
