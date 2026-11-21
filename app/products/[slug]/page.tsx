import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  categoryLabels,
  getProductBySlug,
  products,
} from "@/lib/products";
import { formatINR } from "@/lib/pricing";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

const trust = [
  { icon: Truck, label: "Free delivery across India" },
  { icon: ShieldCheck, label: "Pay on Delivery" },
  { icon: RotateCcw, label: "30-day returns" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 3);

  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-charcoal-400">
            <li>
              <Link href="/" className="hover:text-teal-700">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li>
              <Link href="/shop" className="hover:text-teal-700">
                Shop
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li aria-current="page" className="text-charcoal-600">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <section className="py-8 sm:py-12">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-sand-200 bg-cream-100 shadow-card">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.8),transparent_62%)]" />
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={
                  ["/images/pod.webp", "/images/hub.webp"].includes(
                    product.images[0].src,
                  )
                    ? "object-contain p-10 mix-blend-multiply"
                    : "object-cover"
                }
              />
              {product.badge ? (
                <span className="absolute left-5 top-5 rounded-full border border-sand-200/70 bg-cream-50/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-800 shadow-sm backdrop-blur">
                  {product.badge}
                </span>
              ) : null}
            </div>

            {product.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((image) => (
                  <div
                    key={image.src}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-sand-200 bg-cream-100 transition-colors hover:border-teal-700/30"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="160px"
                      className={
                        ["/images/pod.webp", "/images/hub.webp"].includes(
                          image.src,
                        )
                          ? "object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                          : "object-cover transition-transform duration-500 group-hover:scale-105"
                      }
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
              {categoryLabels[product.category]}
            </p>
            <h1 className="mt-3 font-display text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-charcoal-600">
              {product.tagline}
            </p>

            <div className="mt-6 flex items-baseline gap-3 border-y border-sand-200 py-4">
              <p className="font-display text-3xl font-medium text-teal-800">
                {formatINR(product.price)}
              </p>
              <p className="text-xs text-charcoal-400">
                incl. taxes · free delivery
              </p>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-charcoal-600">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-charcoal-700"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <ul className="mt-8 grid gap-3 border-t border-sand-200 pt-6 sm:grid-cols-3">
              {trust.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-xs font-medium text-charcoal-600"
                >
                  <item.icon
                    className="h-4 w-4 text-teal-700"
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-sand-200 bg-cream-100/50">
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">In the box</h2>
            <ul className="mt-5 space-y-3">
              {product.inTheBox.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-sand-200 pb-3 text-sm text-charcoal-700"
                >
                  <span>{item.label}</span>
                  <span className="font-semibold text-charcoal-900">
                    × {item.qty}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-3xl font-medium tracking-[-0.025em]">
              Details
            </h2>
            <dl className="mt-5 space-y-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 border-b border-sand-200 pb-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <dt className="text-charcoal-400">{spec.label}</dt>
                  <dd className="font-medium text-charcoal-700">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="py-16 sm:py-24">
          <Container>
            <Reveal>
              <h2 className="font-display text-4xl font-medium tracking-[-0.03em]">
                You might also like
              </h2>
            </Reveal>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 90}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
