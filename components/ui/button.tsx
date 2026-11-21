import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "coral";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-700 text-cream-50 shadow-soft hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lift",
  secondary:
    "border border-charcoal-900/15 bg-cream-50 text-charcoal-900 hover:-translate-y-0.5 hover:border-teal-700/40 hover:bg-teal-50 hover:shadow-soft",
  ghost: "text-charcoal-900 hover:bg-charcoal-900/5",
  coral:
    "bg-coral-500 text-charcoal-900 shadow-soft hover:-translate-y-0.5 hover:bg-coral-400 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
