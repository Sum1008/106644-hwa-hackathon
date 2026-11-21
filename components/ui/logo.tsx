import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sniffari home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/images/sniffari-logo.png"
        alt="Sniffari"
        width={2172}
        height={724}
        priority={priority}
        className="h-8 w-auto transition-opacity hover:opacity-80 sm:h-9"
      />
    </Link>
  );
}
