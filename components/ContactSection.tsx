"use client";

import { FormEvent, useState } from "react";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type ContactSectionProps = {
  lang: "it" | "en";
};

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const content = {
  it: itMessages.contactSection,
  en: enMessages.contactSection,
} as const;

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection({ lang }: ContactSectionProps) {
  const current = content[lang];
  const [form, setForm] = useState<ContactFormState>(initialState);
  const missingFields: string[] = [];

  if (!form.name.trim()) {
    missingFields.push(current.fields.name);
  }

  if (!form.email.trim()) {
    missingFields.push(current.fields.email);
  }

  if (!form.subject.trim()) {
    missingFields.push(current.fields.subject);
  }

  if (!form.message.trim()) {
    missingFields.push(current.fields.message);
  }

  const emailIsValid =
    !form.email.trim() || emailPattern.test(form.email.trim());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const canSubmit = missingFields.length === 0 && emailIsValid && !isSubmitting;
  const statusMessages: string[] = [];

  if (submitState !== "success") {
    if (missingFields.length > 0) {
      statusMessages.push(`${current.missingFieldsPrefix} ${missingFields.join(", ")}.`);
    }

    if (form.email.trim() && !emailIsValid) {
      statusMessages.push(current.invalidEmailError);
    }

    if (statusMessages.length === 0) {
      statusMessages.push(current.readyToSend);
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage(current.sendingMessage);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(current.submitError);
        return;
      }

      setSubmitState("success");
      setSubmitMessage(current.submitSuccess);
      setForm(initialState);
    } catch {
      setSubmitState("error");
      setSubmitMessage(current.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative -mt-px overflow-hidden bg-linear-to-b from-[color:var(--color-trapsarent)] via-[color:var(--color-secondary)]/8 to-secondary/24 px-4 py-14 sm:px-5 md:px-8 md:py-18 xl:px-14 xl:py-22"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[color:var(--color-trapsarent)] via-[color:var(--color-secondary)]/8 to-secondary/24" />

      <div className="relative mx-auto max-w-7xl">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="max-w-6xl pb-7 xl:max-w-[82%]">
            <div>
              <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {current.eyebrow}
              </p>
              <h2 className="font-change-serif-bold max-w-[15ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] text-primary sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[19ch] md:text-[3.5rem] xl:max-w-[21ch] xl:text-[4.2rem]">
                {current.title}
              </h2>
              <p className="mt-7 max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
                {current.lead}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)]">
                {current.fields.name}
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => {
                  setSubmitState("idle");
                  setSubmitMessage("");
                  setForm((currentForm) => ({ ...currentForm, name: event.target.value }));
                }}
                required
                className="mt-2 w-full border-b border-[color:var(--color-secondary)] bg-transparent px-4 py-3 text-[14px] text-primary outline-none transition-colors placeholder:text-[color:var(--color-secondary)]/35 focus:border-[color:var(--color-thirdary)]"
                placeholder={current.placeholders.name}
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)]">
                {current.fields.email}
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => {
                  setSubmitState("idle");
                  setSubmitMessage("");
                  setForm((currentForm) => ({ ...currentForm, email: event.target.value }));
                }}
                required
                className="mt-2 w-full border-b border-[color:var(--color-secondary)] bg-transparent px-4 py-3 text-[14px] text-primary outline-none transition-colors placeholder:text-[color:var(--color-secondary)]/35 focus:border-[color:var(--color-thirdary)]"
                placeholder={current.placeholders.email}
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)]">
              {current.fields.subject}
            </span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={(event) => {
                setSubmitState("idle");
                setSubmitMessage("");
                setForm((currentForm) => ({ ...currentForm, subject: event.target.value }));
              }}
              required
              className="mt-2 w-full border-b border-[color:var(--color-secondary)] bg-transparent px-4 py-3 text-[14px] text-primary outline-none transition-colors placeholder:text-[color:var(--color-secondary)]/35 focus:border-[color:var(--color-thirdary)]"
              placeholder={current.placeholders.subject}
            />
          </label>

          <label className="mt-5 block">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)]">
              {current.fields.message}
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={(event) => {
                setSubmitState("idle");
                setSubmitMessage("");
                setForm((currentForm) => ({ ...currentForm, message: event.target.value }));
              }}
              required
              rows={7}
              className="mt-2 min-h-[10.5rem] w-full resize-y border-b border-[color:var(--color-secondary)] bg-transparent px-4 py-3 text-[14px] text-primary outline-none transition-colors placeholder:text-[color:var(--color-secondary)]/35 focus:border-[color:var(--color-thirdary)]"
              placeholder={current.placeholders.message}
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:items-start md:items-end">
            <div
              role="status"
              className={`max-w-xl space-y-1 text-[12px] leading-6 sm:text-[13px] ${
                submitState === "success"
                  ? "text-[color:var(--color-secondary)]"
                  : "text-[color:var(--color-thirdary)]"
              }`}
            >
              {statusMessages.map((message) => (
                <p key={message}>{message}</p>
              ))}
              {submitMessage ? <p>{submitMessage}</p> : null}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              className="inline-flex min-h-12 w-full items-center justify-center bg-[color:var(--color-primary)] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? current.sendingCta : current.cta}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
