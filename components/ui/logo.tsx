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
        "relative inline-flex items-center overflow-visible align-middle",
        className,
      )}
    >
      <Image
        src="/images/sniffari-logo.png"
        alt="Sniffari"
        width={2172}
        height={724}
        priority={priority}
        className="h-9 w-auto transition-opacity hover:opacity-80 sm:h-10"
      />
      <span
        className="logo-dog logo-dog-coral motion-reduce:hidden"
        aria-hidden="true"
      >
        <Dog className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <span
        className="logo-dog logo-dog-teal motion-reduce:hidden"
        aria-hidden="true"
      >
        <Dog className="h-[1.15rem] w-[1.15rem]" strokeWidth={2.4} />
      </span>
    </Link>
  );
}
