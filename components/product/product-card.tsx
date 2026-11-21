import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/pricing";
import type { Product } from "@/types/commerce";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-sand-200 bg-cream-50 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-100"
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-800 backdrop-blur">
            {product.badge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal-900">
              <Link
                href={`/products/${product.slug}`}
                className="hover:text-teal-700"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-charcoal-600">{product.tagline}</p>
          </div>
          <p className="whitespace-nowrap font-display text-lg font-bold text-teal-800">
            {formatINR(product.price)}
          </p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
          >
            View details
          </Link>
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
