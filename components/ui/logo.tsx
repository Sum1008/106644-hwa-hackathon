import Image from "next/image";
import Link from "next/link";
import { Dog } from "lucide-react";
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
      className={cn(
        "relative inline-flex items-center overflow-hidden align-middle",
        className,
      )}
    >
      <Image
        src="/images/sniffari-logo.png"
        alt="Sniffari"
        width={2172}
        height={724}
        priority={priority}
        className="h-8 w-auto transition-opacity hover:opacity-80 sm:h-9"
      />
      <span
        className="logo-dog logo-dog-coral motion-reduce:hidden"
        aria-hidden="true"
      >
        <Dog className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
      <span
        className="logo-dog logo-dog-teal motion-reduce:hidden"
        aria-hidden="true"
      >
        <Dog className="h-3 w-3" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
