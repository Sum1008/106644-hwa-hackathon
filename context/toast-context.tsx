"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ToastOptions {
  message: string;
  image?: string;
  href?: string;
  label?: string;
}

interface ToastState extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ToastState | null>(null);

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now();
    setCurrent({ ...options, id });
    window.setTimeout(() => {
      setCurrent((value) => (value?.id === id ? null : value));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4 sm:bottom-7 sm:justify-end sm:px-6"
      >
        {current ? (
          <div className="toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-sand-200 bg-cream-50 p-3 shadow-[0_24px_70px_-18px_rgba(36,36,36,0.4)] sm:w-auto sm:min-w-[360px]">
            {current.image ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                <Image
                  src={current.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-cream-50">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                Added to cart
              </div>
              <p className="mt-1 truncate text-sm font-semibold text-charcoal-900">
                {current.message}
              </p>
            </div>
            {current.href && current.label ? (
              <Link
                href={current.href}
                onClick={() => setCurrent(null)}
                className="shrink-0 rounded-full bg-charcoal-900 px-4 py-2 text-xs font-bold text-cream-50 transition-colors hover:bg-teal-800"
              >
                {current.label}
              </Link>
            ) : null}
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setCurrent(null)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-charcoal-400 transition-colors hover:bg-charcoal-900/5 hover:text-charcoal-900"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
