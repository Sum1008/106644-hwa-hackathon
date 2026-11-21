import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatINR } from "@/lib/pricing";
import type { Product } from "@/types/commerce";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  const isStudioImage = ["/images/pod.webp", "/images/hub.webp"].includes(
    product.images[0].src,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand-200/80 bg-cream-50 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-sand-300 hover:shadow-card">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.8),transparent_62%)]" />
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={
            isStudioImage
              ? "object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.05]"
              : "object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          }
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full border border-sand-200/70 bg-cream-50/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-800 shadow-sm backdrop-blur">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-cream-50/90 text-charcoal-900 opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-charcoal-900">
              <Link
                href={`/products/${product.slug}`}
                className="transition-colors hover:text-teal-700"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1.5 text-sm text-charcoal-600">{product.tagline}</p>
          </div>
          <p className="whitespace-nowrap font-display text-lg font-medium text-teal-800">
            {formatINR(product.price)}
          </p>
        </div>

        <p className="mt-4 text-sm leading-7 text-charcoal-600">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-sand-200/70 pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-bold uppercase tracking-[0.13em] text-teal-700 transition-colors hover:text-teal-800"
          >
            View details
          </Link>
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
