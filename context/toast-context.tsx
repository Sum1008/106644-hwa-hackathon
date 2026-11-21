"use client";

import Link from "next/link";
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
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4"
      >
        {current ? (
          <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/10 bg-ink px-5 py-3 text-sm text-cream shadow-xl">
            <span>{current.message}</span>
            {current.href && current.label ? (
              <Link
                href={current.href}
                onClick={() => setCurrent(null)}
                className="font-semibold text-cream underline decoration-coral decoration-2 underline-offset-4"
              >
                {current.label}
              </Link>
            ) : null}
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
