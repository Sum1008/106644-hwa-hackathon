import Image from "next/image";
import {
  ArrowRight,
  Check,
  Home,
  PawPrint,
  Sparkles,
  VolumeX,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

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
    title: "Place the pods",
    description:
      "Set three or more pods around the rooms your dog already loves. Wall plates and weighted floor stands keep them steady.",
  },
  {
    title: "The hub picks a pod",
    description:
      "It releases a small puff of scent and, at Beginner level, a gentle sound cue. The trail starts somewhere new.",
  },
  {
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

const products = [
  {
    name: "Starter Kit",
    contents: "1 hub + 3 pods + 3 food scent packs",
    price: "₹8,999",
    image: "/images/in-the-box.webp",
    alt: "Starter Kit box with hub, pods, wall plates, and scent vials",
    badge: "Start here",
  },
  {
    name: "Explore Kit",
    contents: "1 hub + 6 pods + 3 food scents + detective pack",
    price: "₹13,999",
    image: "/images/hero.webp",
    alt: "Sniffari hub and three pods with treats",
    badge: "Whole-home",
  },
  {
    name: "Scents & add-ons",
    contents: "Refills, detective scents, pods, and floor stands",
    price: "From ₹499",
    image: "/images/pod.webp",
    alt: "A single Sniffari pod with a coral nose pad",
    badge: "Expand",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-32 h-[26rem] w-[26rem] rounded-full bg-coral-100/70 blur-3xl" />

        <Container className="relative grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-700/15 bg-teal-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
              Scent-powered play for solo hours
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Turn your home into a{" "}
              <span className="text-teal-700">treasure hunt</span>.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-charcoal-600">
              Sniffari is a hub-and-pod scent hunt for dogs. It hides scents
              around your home, guides your dog from room to room, and rewards
              every find — so the hours alone feel like an adventure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#products" size="lg">
                Shop kits
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                See how it works
              </ButtonLink>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-sand-200 pt-6">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                  Setup
                </dt>
                <dd className="mt-1 text-sm font-semibold">No app needed</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                  Levels
                </dt>
                <dd className="mt-1 text-sm font-semibold">3 scent games</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                  Rooms
                </dt>
                <dd className="mt-1 text-sm font-semibold">3+ pods</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-sand-200 bg-cream-100 shadow-soft">
              <Image
                src="/images/hero.webp"
                alt="Sniffari hub and three scent pods with treats"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-sand-200 bg-cream-50/95 px-4 py-3 shadow-soft backdrop-blur sm:left-8 sm:right-auto">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
                <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
                Scent trail active
              </p>
              <p className="mt-1 text-sm text-charcoal-600">
                3 rooms · 6 pods · 1 happy nose
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-y border-sand-200/70 bg-cream-100/50">
        <Container className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          {trust.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-charcoal-600">
                {item.label}
              </span>
            </div>
          ))}
        </Container>
      </div>

      <section className="border-b border-sand-200/70">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-sand-200 bg-cream-100 shadow-soft">
            <Image
              src="/images/relaxed-dog.webp"
              alt="A golden retriever resting beside a Sniffari pod"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
              The alone-time problem
            </p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
              A bored nose has nothing to do.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-600">
              Dogs explore the world nose-first. Most toys ask the same trick,
              in the same spot, until the novelty wears off. A long workday
              deserves more than a basket of ignored squeakers.
            </p>

            <ul className="mt-8 space-y-4">
              {problemPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal-600">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-b border-sand-200/70 bg-cream-100/50"
      >
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
              How Sniffari works
            </p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
              One hub. A house full of clues.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-600">
              The hub coordinates every pod and picks the next scent target.
              Your dog does the rest — following a fresh trail through the rooms
              they already know.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand-200 bg-cream-50 shadow-soft">
              <Image
                src="/images/home-map.webp"
                alt="A floor plan showing a scent trail moving between rooms"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>

            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 font-display text-lg font-bold text-cream-50">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="levels" className="scroll-mt-24 bg-charcoal-900 text-cream-50">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-100">
                Three levels of nose work
              </p>
              <h2 className="mt-4 text-4xl leading-tight text-cream-50 sm:text-5xl">
                Start easy. Finish brilliant.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream-50/70">
                Every dog starts with a sound cue and a clear trail. As they get
                sharper, the cues fall away and the puzzles get harder.
              </p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-2 text-xs font-semibold text-teal-100">
              Detective mode uses decoy scents
            </span>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {levels.map((level) => (
              <article
                key={level.name}
                className="rounded-[1.75rem] border border-cream-50/10 bg-cream-50/5 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-100">
                    {level.tag}
                  </span>
                  <span className="font-display text-3xl text-cream-50/20">
                    {level.number}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl text-cream-50">{level.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-50/70">
                  {level.description}
                </p>
                <p className="mt-6 border-t border-cream-50/10 pt-4 text-xs font-medium text-teal-100">
                  {level.note}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="products" className="scroll-mt-24">
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
              The range
            </p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
              Pick your starting trail.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-600">
              Begin with a kit, then add pods, scents, and floor stands as your
              dog gets faster. Every piece works together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-[1.75rem] border border-sand-200 bg-cream-50 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-coral-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-charcoal-900">
                    {product.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                    {product.contents}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                        From
                      </p>
                      <p className="font-display text-2xl font-bold text-teal-700">
                        {product.price}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-teal-700">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-charcoal-400">
            All prices include taxes. Free shipping across India.
          </p>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-800 px-6 py-16 text-cream-50 sm:px-12 lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-coral-500/20 blur-3xl" />

            <div className="relative max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-100">
                A happier home alone
              </p>
              <h2 className="mt-4 text-4xl leading-tight text-cream-50 sm:text-5xl">
                Turn home alone into a hunt.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream-50/75">
                Give your dog a reason to get up, follow a trail, and come back
                to a reward — even when you are not there.
              </p>
              <ButtonLink
                href="#products"
                variant="coral"
                size="lg"
                className="mt-8"
              >
                Explore the range
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
