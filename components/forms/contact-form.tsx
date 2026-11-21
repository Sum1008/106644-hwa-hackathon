"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { contactSchema, type ContactInput } from "@/lib/validation";

const inputClass =
  "mt-1.5 h-11 w-full rounded-2xl border border-sand-300 bg-cream-50 px-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-charcoal-600";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-medium text-coral-600" role="alert">
      {message}
    </p>
  );
}

const topics = [
  { value: "order", label: "Order help" },
  { value: "product", label: "Product question" },
  { value: "returns", label: "Returns & refunds" },
  { value: "other", label: "Something else" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "order" },
  });

  async function onSubmit(values: ContactInput) {
    setSubmitError(null);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: values.phone || undefined,
          orderId: values.orderId || undefined,
          website: "",
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        messageId?: string;
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.messageId) {
        setStatus("idle");
        setSubmitError(
          payload?.error?.message ??
            "We couldn’t send your message. Please try again.",
        );
        return;
      }

      setReference(payload.messageId);
      setStatus("sent");
      reset();
    } catch {
      setStatus("idle");
      setSubmitError(
        "We couldn’t reach the contact service. Please check your connection and try again.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-4xl border border-sand-200 bg-cream-50 p-8 text-center shadow-soft sm:p-12">
        <CheckCircle2
          className="mx-auto h-10 w-10 text-teal-700"
          aria-hidden="true"
        />
        <h2 className="mt-5 font-display text-2xl font-bold">
          Message received.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-600">
          Thanks for reaching out. We read every message and reply within one
          to two working days.
        </p>
        {reference ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal-400">
            Reference {reference}
          </p>
        ) : null}
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setReference(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-sand-200 bg-cream-50 p-5 shadow-soft sm:rounded-4xl sm:p-10"
    >
      <h2 className="font-display text-2xl font-bold">Send us a message</h2>
      <p className="mt-2 text-sm text-charcoal-600">
        Tell us what you need and we’ll get back to you within one to two
        working days.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Your name
          </label>
          <input
            id="contactName"
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="contactEmail" className={labelClass}>
            Email
          </label>
          <input
            id="contactEmail"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="contactPhone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="contactPhone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="contactTopic" className={labelClass}>
            What is it about?
          </label>
          <select
            id="contactTopic"
            className={cn(inputClass, "pr-9")}
            aria-invalid={Boolean(errors.topic)}
            {...register("topic")}
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.topic?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contactOrderId" className={labelClass}>
            Order ID (optional)
          </label>
          <input
            id="contactOrderId"
            placeholder="SNF-261121-ABCDE"
            className={inputClass}
            aria-invalid={Boolean(errors.orderId)}
            {...register("orderId")}
          />
          <FieldError message={errors.orderId?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contactMessage" className={labelClass}>
            Message
          </label>
          <textarea
            id="contactMessage"
            rows={6}
            placeholder="What can we help you with?"
            className={cn(inputClass, "h-auto py-3")}
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      {submitError ? (
        <p
          className="mt-5 rounded-2xl bg-coral-100 p-3 text-xs font-medium text-coral-600"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        disabled={isSubmitting || status === "sending"}
      >
        {isSubmitting || status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
