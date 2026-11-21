import Image from "next/image";
import {
  ArrowRight,
  Check,
  Home,
  PawPrint,
  Sparkles,
  VolumeX,
} from "lucide-react";
import { DayWithSniffari } from "@/components/home/day-with-sniffari";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/products";

const trust = [
  { icon: Home, label: "Made for apartment living" },
  { icon: VolumeX, label: "Screen-free enrichment" },
  { icon: PawPrint, label: "Progressive scent levels" },
  { icon: Sparkles, label: "A reward at every find" },
];

const problemPoints = [
  "The same toy, in the same spot, asking the same trick.",
  "Energy with nowhere to go by the afternoon.",
  "A long workday and a dog with nothing new to discover.",
];

const steps = [
  {
    number: "01",
    title: "Place the pods",
    description:
      "Set three or more pods around the rooms your dog already loves. Wall plates and weighted floor stands keep them steady.",
  },
  {
    number: "02",
    title: "The hub picks a pod",
    description:
      "It releases a small puff of scent and, at Beginner level, a gentle sound cue. The trail starts somewhere new.",
  },
  {
    number: "03",
    title: "Your dog finds the reward",
    description:
      "A nose-pad boop releases a treat. New pod, new route, every round — so the game stays worth playing.",
  },
];

const levels = [
  {
    number: "01",
    name: "Beginner",
    tag: "Sound + scent",
    description:
      "The hub plays a cue and releases scent from one pod. Your dog follows both to the soft nose pad and earns a treat.",
    note: "Best for first hunts and confident starters.",
  },
  {
    number: "02",
    name: "Tracker",
    tag: "Scent only",
    description:
      "The sound fades. The nose leads. Your dog follows the scent trail from room to room to find the target pod.",
    note: "Best for dogs who already know the game.",
  },
  {
    number: "03",
    name: "Detective",
    tag: "Decoy scents",
    description:
      "Every pod puffs a scent, but only the target scent pays. Your dog has to sniff out the real one from the decoys.",
    note: "The hardest level. A true nose-work challenge.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-sand-200/70">
        <div className="pointer-events-none absolute -left-40 -top-48 h-[38rem] w-[38rem] rounded-full bg-teal-100/55 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-coral-100/60 blur-3xl" />

        <Container className="relative grid gap-14 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20 lg:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-700/15 bg-cream-50/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-800 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500 shadow-[0_0_0_4px_rgba(239,128,100,0.14)]" />
              Scent-powered play for solo hours
            </span>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-charcoal-400">
              A treasure hunt, made for home
            </p>
            <h1 className="mt-4 max-w-2xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-charcoal-900 sm:text-6xl lg:text-[5.2rem]">
              Turn your home into a{" "}
              <span className="italic text-teal-700">treasure hunt.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-charcoal-600 sm:text-lg">
              Sniffari is a hub-and-pod scent hunt for dogs. It hides scents
              around your home, guides your dog from room to room, and rewards
              every find — so the hours alone feel like an adventure.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop kits
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                See how it works
              </ButtonLink>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 border-y border-sand-200/80 py-5">
              <div className="border-r border-sand-200/80 pr-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                  Setup
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">No app needed</dd>
              </div>
              <div className="border-r border-sand-200/80 px-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                  Levels
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">3 scent games</dd>
              </div>
              <div className="pl-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                  Rooms
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">3+ pods</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={140} className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 -z-10 rounded-[3rem] border border-sand-200/70" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-sand-200 bg-cream-100 shadow-card">
              <Image
                src="/images/hero.webp"
                alt="Sniffari hub and three scent pods with treats"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal-900/25 to-transparent" />
            </div>
            <div className="float-soft absolute -bottom-7 left-5 right-5 rounded-2xl border border-sand-200 bg-cream-50/95 p-4 shadow-card backdrop-blur sm:left-8 sm:right-auto sm:min-w-[250px]">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
                <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
                Scent trail active
              </p>
              <p className="mt-1.5 text-sm text-charcoal-600">
                3 rooms · 3 pods · 1 happy nose
              </p>
            </div>
            <div className="absolute -right-3 top-8 hidden rounded-full border border-sand-200 bg-cream-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal-600 shadow-soft sm:block">
              Made for curious noses
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-sand-200/70 bg-charcoal-900 text-cream-50">
        <Container className="grid grid-cols-2 gap-y-7 py-8 sm:grid-cols-4">
          {trust.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 70}
              className="flex items-center gap-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-50/15 text-teal-100">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-cream-50/75 sm:text-sm">
                {item.label}
              </span>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-b border-sand-200/70">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
          <Reveal className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-tl-3xl border-l border-t border-teal-700/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream-100 shadow-card">
              <Image
                src="/images/relaxed-dog.webp"
                alt="A golden retriever resting beside a Sniffari pod"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="absolute -bottom-5 right-5 rounded-full border border-sand-200 bg-cream-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-600 shadow-soft">
              Rest easy. Play often.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
              The alone-time problem
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
              A bored nose has nothing to do.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-charcoal-600">
              Dogs explore the world nose-first. Most toys ask the same trick,
              in the same spot, until the novelty wears off. A long workday
              deserves more than a basket of ignored squeakers.
            </p>

            <ul className="mt-9 space-y-4 border-t border-sand-200 pt-7">
              {problemPoints.map((point) => (
                <li key={point} className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal-700/20 bg-teal-50 text-teal-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-7 text-charcoal-600">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <DayWithSniffari />

      <section
        id="how-it-works"
        className="scroll-mt-24 border-b border-sand-200/70 bg-cream-100/50"
      >
        <Container className="py-20 lg:py-32">
          <Reveal className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
              How Sniffari works
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
              One hub. A house full of clues.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal-600">
              The hub coordinates every pod and picks the next scent target.
              Your dog does the rest — following a fresh trail through the rooms
              they already know.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <Reveal delay={100}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand-200 bg-cream-50 shadow-card">
                <Image
                  src="/images/home-map.webp"
                  alt="A floor plan showing a scent trail moving between rooms"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <ol className="space-y-4">
              {steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 100}>
                  <div className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft transition-colors duration-300 hover:border-teal-700/25 sm:p-7">
                    <div className="flex items-start gap-5">
                      <span className="font-display text-2xl italic text-teal-700/60">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="text-xl font-medium">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-charcoal-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="border-b border-sand-200/70 bg-cream-50">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:py-32">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
              Designed around the nose
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
              A simple reward. A deeply satisfying game.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-charcoal-600">
              The soft nose pad gives a clear, satisfying signal. Press it and
              the treat is yours — a small reward that turns following a scent
              into a game worth repeating.
            </p>
            <ButtonLink
              href="/products/extra-pod"
              variant="secondary"
              className="mt-8"
            >
              Explore the details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-cream-100 shadow-card">
              <Image
                src="/images/nose-touch.webp"
                alt="A dog gently pressing the soft nose pad on a Sniffari pod"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-cream-100 shadow-card">
              <Image
                src="/images/dog-hunt.webp"
                alt="A dog following a scent to a wall-mounted Sniffari pod"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="levels" className="scroll-mt-24 bg-charcoal-900 text-cream-50">
        <Container className="py-20 lg:py-32">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-100">
                Three levels of nose work
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-cream-50 sm:text-5xl">
                Start easy. Finish brilliant.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-cream-50/70">
                Every dog starts with a sound cue and a clear trail. As they get
                sharper, the cues fall away and the puzzles get harder.
              </p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-2 text-xs font-semibold text-teal-100">
              Detective mode uses decoy scents
            </span>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {levels.map((level, index) => (
              <Reveal
                as="article"
                key={level.name}
                delay={index * 100}
                className="rounded-[1.75rem] border border-cream-50/10 bg-cream-50/5 p-7 transition-colors duration-300 hover:border-teal-100/25 hover:bg-cream-50/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-100">
                    {level.tag}
                  </span>
                  <span className="font-display text-3xl italic text-cream-50/25">
                    {level.number}
                  </span>
                </div>
                <h3 className="mt-9 text-2xl font-medium text-cream-50">
                  {level.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-cream-50/70">
                  {level.description}
                </p>
                <p className="mt-6 border-t border-cream-50/10 pt-4 text-xs font-medium text-teal-100">
                  {level.note}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="products" className="scroll-mt-24">
        <Container className="py-20 lg:py-32">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
                The range
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Pick your starting trail.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-charcoal-600">
                Begin with a kit, then add pods, scents, and floor stands as your
                dog gets faster. Every piece works together.
              </p>
            </div>
            <ButtonLink href="/shop" variant="secondary">
              View all products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((product, index) => (
              <Reveal key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <p className="mt-9 text-sm text-charcoal-400">
            All prices include taxes. Free shipping across India.
          </p>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-800 px-6 py-16 text-cream-50 shadow-card sm:px-12 lg:px-16 lg:py-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-coral-500/20 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-100">
                  A happier home alone
                </p>
                <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-cream-50 sm:text-5xl">
                  Turn home alone into a hunt.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-cream-50/75">
                  Give your dog a reason to get up, follow a trail, and come back
                  to a reward — even when you are not there.
                </p>
                <ButtonLink
                  href="/shop"
                  variant="coral"
                  size="lg"
                  className="mt-9"
                >
                  Explore the range
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
