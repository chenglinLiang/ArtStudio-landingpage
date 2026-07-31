"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/constants";
import { Reveal } from "./primitives/Reveal";
import { Button } from "./primitives/Button";

type Status = "idle" | "loading" | "success" | "error";

const STORAGE_KEY = "artstudio:early-access";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApiError =
  | "invalid_email"
  | "invalid_body"
  | "server_not_configured"
  | "server_error";

function messageFor(error: string | undefined): string {
  switch (error as ApiError) {
    case "invalid_email":
    case "invalid_body":
      return "Please enter a valid email address.";
    case "server_not_configured":
      return "Subscriptions aren’t configured yet — please try again later.";
    case "server_error":
      return "Something went wrong on our end. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Restore any previously submitted email from local storage.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEmail(saved);
      setSubmitted(saved);
      setStatus("success");
    }
  }, []);

  function fail(message: string) {
    setErrorMessage(message);
    setStatus("error");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      fail(messageFor("invalid_email"));
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        fail(messageFor(data.error));
        return;
      }
      localStorage.setItem(STORAGE_KEY, email.trim());
      setSubmitted(email.trim());
      setStatus("success");
    } catch {
      fail(messageFor(undefined));
    }
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    setEmail("");
    setSubmitted(null);
    setErrorMessage("");
    setStatus("idle");
  }

  const isDone = status === "success" && submitted;

  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="py-32"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            {site.launchNote}
          </p>
          <h2
            id="early-access-title"
            className="mx-auto mt-5 max-w-xl font-serif text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.93] tracking-[-0.045em] text-ink"
          >
            Join the first artists building their digital galleries.
          </h2>

          {isDone ? (
            <div className="mx-auto mt-10 max-w-md">
              <p className="font-sans text-base text-ink-soft">
                You&apos;re on the list. We&apos;ll write to{" "}
                <span className="text-ink">{submitted}</span> when ArtStudio is
                ready.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-10 max-w-md"
            >
              <label htmlFor="ea-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="ea-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="you@studio.com"
                  required
                  aria-invalid={status === "error"}
                  aria-describedby="ea-status"
                  className="w-full flex-1 rounded-full border border-line bg-paper px-5 py-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus:border-ink/40"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Notify me"}
                </Button>
              </div>
              <p
                id="ea-status"
                aria-live="polite"
                role={status === "error" ? "alert" : undefined}
                className={
                  "mt-4 min-h-[1.25rem] font-sans text-xs " +
                  (status === "error" ? "text-wood" : "text-ink-muted")
                }
              >
                {status === "error"
                  ? errorMessage
                  : "No spam. Just one note when it’s ready."}
              </p>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
