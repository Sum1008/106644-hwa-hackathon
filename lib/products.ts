import type { Product } from "@/types/commerce";

export const products: Product[] = [
  {
    id: "starter-kit",
    slug: "starter-kit",
    name: "Starter Kit",
    tagline: "The first trail, ready to run.",
    category: "kit",
    price: 8999,
    badge: "Start here",
    shortDescription: "1 hub + 3 pods + 3 food scent packs.",
    description: [
      "Sniffari Starter Kit is the simplest way to turn your home into a scent trail. One hub coordinates three pods, each with a soft nose pad and a treat reward.",
      "Place the pods in three rooms, choose a level, and let the hub lead the first hunt. The kit includes three food scents to get you started.",
    ],
    highlights: [
      "3 rooms, one trail",
      "3 food scents included",
      "Beginner and Tracker levels",
      "No app or subscription needed",
    ],
    inTheBox: [
      { label: "Sniffari hub", qty: 1 },
      { label: "Scent pods", qty: 3 },
      { label: "Magnetic wall plates", qty: 3 },
      { label: "Food scent vials", qty: 3 },
      { label: "USB-C charging cable", qty: 1 },
      { label: "Quick-start guide", qty: 1 },
    ],
    specs: [
      { label: "Hub size", value: "120 mm diameter · 32 mm height" },
      { label: "Pod size", value: "78 × 62 mm" },
      { label: "Connectivity", value: "2.4 GHz hub-to-pod network" },
      { label: "Power", value: "USB-C rechargeable" },
      { label: "Materials", value: "Recycled ABS and food-safe silicone" },
      { label: "Treat capacity", value: "Up to 40 small treats per pod" },
    ],
    images: [
      {
        src: "/images/hero.webp",
        alt: "Starter Kit hub with three scent pods and treats",
      },
      {
        src: "/images/in-the-box.webp",
        alt: "Sniffari kit arranged with the hub, pods, scent vials, and accessories",
      },
      {
        src: "/images/hub.webp",
        alt: "Sniffari hub with a teal light ring",
      },
      {
        src: "/images/pod.webp",
        alt: "Sniffari scent pod with a coral nose pad",
      },
      {
        src: "/images/home-map.webp",
        alt: "A scent trail moving through an apartment floor plan",
      },
    ],
    stock: "in_stock",
  },
  {
    id: "explore-kit",
    slug: "explore-kit",
    name: "Explore Kit",
    tagline: "A longer trail for the whole home.",
    category: "kit",
    price: 13999,
    badge: "Whole-home",
    shortDescription:
      "1 hub + 6 pods + 3 food scents + 1 detective pack.",
    description: [
      "The Explore Kit gives your dog six scent stations and the decoy scents for Detective level. More rooms mean more routes, more pauses, and more reasons to keep exploring.",
      "Start with a guided trail, then move the pods around to keep the game fresh. The detective pack introduces decoy scents for the hardest level.",
    ],
    highlights: [
      "6 pods across your home",
      "Detective scent pack included",
      "Beginner, Tracker, and Detective levels",
      "Room to grow with extra pods",
    ],
    inTheBox: [
      { label: "Sniffari hub", qty: 1 },
      { label: "Scent pods", qty: 6 },
      { label: "Magnetic wall plates", qty: 6 },
      { label: "Food scent vials", qty: 3 },
      { label: "Detective scent pack", qty: 1 },
      { label: "USB-C charging cable", qty: 1 },
      { label: "Quick-start guide", qty: 1 },
    ],
    specs: [
      { label: "Hub size", value: "120 mm diameter · 32 mm height" },
      { label: "Pod size", value: "78 × 62 mm" },
      { label: "Connectivity", value: "2.4 GHz hub-to-pod network" },
      { label: "Power", value: "USB-C rechargeable" },
      { label: "Materials", value: "Recycled ABS and food-safe silicone" },
      { label: "Treat capacity", value: "Up to 40 small treats per pod" },
    ],
    images: [
      {
        src: "/images/in-the-box.webp",
        alt: "Explore Kit with the hub, six scent pods, scent vials, and accessories",
      },
      {
        src: "/images/hero.webp",
        alt: "Sniffari hub and three pods with treats",
      },
      {
        src: "/images/home-map.webp",
        alt: "A multi-room scent trail on a floor plan",
      },
      {
        src: "/images/dog-hunt.webp",
        alt: "A beagle sniffing a wall-mounted Sniffari pod",
      },
    ],
    stock: "in_stock",
  },
  {
    id: "extra-pod",
    slug: "extra-pod",
    name: "Extra Pod",
    tagline: "Add another room to the hunt.",
    category: "addon",
    price: 2499,
    badge: "Expand",
    shortDescription: "1 pod + 1 magnetic wall plate.",
    description: [
      "Every extra pod adds another possible stop on the trail. Put one in the hallway, the bedroom, or the room your dog checks first when you leave.",
      "The pod pairs with your existing Sniffari hub and uses the same treat and scent system.",
    ],
    highlights: [
      "Adds one more scent station",
      "Magnetic wall plate included",
      "Works with every Sniffari kit",
      "Pairs with the hub automatically",
    ],
    inTheBox: [
      { label: "Scent pod", qty: 1 },
      { label: "Magnetic wall plate", qty: 1 },
      { label: "Starter scent vial", qty: 1 },
    ],
    specs: [
      { label: "Pod size", value: "78 × 62 mm" },
      { label: "Mounting", value: "Magnetic wall plate or weighted floor stand" },
      { label: "Treat capacity", value: "Up to 40 small treats" },
      { label: "Materials", value: "Recycled ABS and food-safe silicone" },
    ],
    images: [
      {
        src: "/images/pod.webp",
        alt: "A single Sniffari pod with a coral nose pad",
      },
      {
        src: "/images/dog-hunt.webp",
        alt: "A dog touching a wall-mounted Sniffari pod",
      },
      {
        src: "/images/nose-touch.webp",
        alt: "Close-up of a dog touching the soft nose pad",
      },
      {
        src: "/images/in-the-box.webp",
        alt: "Sniffari pods arranged in a kit box",
      },
    ],
    stock: "in_stock",
  },
  {
    id: "weighted-floor-stand",
    slug: "weighted-floor-stand",
    name: "Weighted Floor Stand",
    tagline: "Keep the pod steady on the floor.",
    category: "addon",
    price: 699,
    shortDescription: "1 weighted floor stand for any Sniffari pod.",
    description: [
      "Some rooms are better without wall mounts. The weighted floor stand gives any Sniffari pod a stable, low-profile base that stays put during an enthusiastic hunt.",
      "The non-slip base protects hard floors and keeps the nose pad at a comfortable height for small and medium dogs.",
    ],
    highlights: [
      "Fits every Sniffari pod",
      "Weighted, non-slip base",
      "No drilling or wall mounts",
      "Easy to move between rooms",
    ],
    inTheBox: [{ label: "Weighted floor stand", qty: 1 }],
    specs: [
      { label: "Base diameter", value: "180 mm" },
      { label: "Weight", value: "420 g" },
      { label: "Compatibility", value: "All Sniffari pods" },
      { label: "Base", value: "Non-slip silicone" },
    ],
    images: [
      {
        src: "/images/pod.webp",
        alt: "A Sniffari pod on a cream surface",
      },
      {
        src: "/images/hub.webp",
        alt: "Sniffari hub with a teal light ring",
      },
      {
        src: "/images/in-the-box.webp",
        alt: "Sniffari kit contents",
      },
      {
        src: "/images/home-map.webp",
        alt: "A scent trail through a home floor plan",
      },
    ],
    stock: "in_stock",
  },
  {
    id: "scent-refill-pack",
    slug: "scent-refill-pack",
    name: "Scent Refill Pack",
    tagline: "Keep the trail smelling new.",
    category: "scent",
    price: 499,
    shortDescription: "3 food scent vials. Choose your scent.",
    description: [
      "Scent is the part of the game that keeps changing. Each refill pack includes three vials of a single food scent, made for the Sniffari pod.",
      "Swap scents between rounds so your dog never gets used to the same trail.",
    ],
    highlights: [
      "3 vials per pack",
      "Pet-safe food scents",
      "Works with every pod",
      "Choose Chicken, Cheese, Pedigree, or Mixed",
    ],
    inTheBox: [{ label: "Food scent vials", qty: 3 }],
    specs: [
      { label: "Vials per pack", value: "3" },
      { label: "Sessions per vial", value: "Up to 30" },
      { label: "Scents", value: "Chicken, Cheese, Pedigree, Mixed" },
      { label: "Compatibility", value: "All Sniffari pods" },
    ],
    images: [
      {
        src: "/images/in-the-box.webp",
        alt: "Scent vials in a Sniffari kit box",
      },
      {
        src: "/images/nose-touch.webp",
        alt: "A dog sniffing the soft nose pad of a pod",
      },
      {
        src: "/images/dog-hunt.webp",
        alt: "A dog following a scent trail to a pod",
      },
      {
        src: "/images/hero.webp",
        alt: "Sniffari hub and pods with treats",
      },
    ],
    variants: [
      { id: "chicken", label: "Chicken" },
      { id: "cheese", label: "Cheese" },
      { id: "pedigree", label: "Pedigree" },
      { id: "mixed", label: "Mixed pack" },
    ],
    stock: "in_stock",
  },
  {
    id: "detective-scent-pack",
    slug: "detective-scent-pack",
    name: "Detective Scent Pack",
    tagline: "Decoys for the sharpest noses.",
    category: "scent",
    price: 599,
    badge: "Detective",
    shortDescription: "3 target + 3 decoy scent vials.",
    description: [
      "Detective level changes the game: every pod puffs a scent, but only the target scent unlocks a reward. This pack gives you three target scents and three decoys to mix into the hunt.",
      "Use it with any Sniffari kit to add scent discrimination to your dog’s routine.",
    ],
    highlights: [
      "3 target + 3 decoy vials",
      "Unlocks Detective-style hunts",
      "Works with every pod",
      "Swap target scents between rounds",
    ],
    inTheBox: [
      { label: "Target scent vials", qty: 3 },
      { label: "Decoy scent vials", qty: 3 },
    ],
    specs: [
      { label: "Vials per pack", value: "6 (3 target + 3 decoy)" },
      { label: "Sessions per vial", value: "Up to 30" },
      { label: "Compatibility", value: "All Sniffari pods" },
      { label: "Level", value: "Detective" },
    ],
    images: [
      {
        src: "/images/in-the-box.webp",
        alt: "Scent vials and pods in a Sniffari kit box",
      },
      {
        src: "/images/dog-hunt.webp",
        alt: "A dog sniffing a Sniffari pod on a wall",
      },
      {
        src: "/images/home-map.webp",
        alt: "A scent trail moving through multiple rooms",
      },
      {
        src: "/images/nose-touch.webp",
        alt: "Close-up of a dog’s nose on the pod",
      },
    ],
    stock: "in_stock",
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  kit: "Kit",
  addon: "Add-on",
  scent: "Scent",
};

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getVariant(product: Product, variantId?: string) {
  if (!product.variants?.length || !variantId) return undefined;
  return product.variants.find((variant) => variant.id === variantId);
}
