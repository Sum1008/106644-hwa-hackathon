# Sniffari

**Turn your home into a treasure hunt for your dog.**

Sniffari is a hub-and-pod scent-hunt enrichment system designed for dogs that spend time alone at home. A small hub coordinates scent pods placed around the house, guiding a dog through a changing trail and rewarding every find with a treat.

The repository contains the complete Sniffari storefront: product discovery, a responsive shopping experience, cart and checkout, Pay on Delivery ordering, order confirmation, tracking, customer support, and private server-side order storage.

**Live website:** [https://106644-hwa-hackathon.vercel.app](https://106644-hwa-hackathon.vercel.app)

---

## Table of contents

- [What is Sniffari?](#what-is-sniffari)
- [The problem Sniffari solves](#the-problem-sniffari-solves)
- [How it works](#how-it-works)
- [Features](#features)
- [Products](#products)
- [Tech stack](#tech-stack)
- [Folder structure](#folder-structure)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [API endpoints](#api-endpoints)
- [Shop and order flow](#shop-and-order-flow)
- [Data storage](#data-storage)
- [Customer policies](#customer-policies)
- [Available scripts](#available-scripts)
- [Deployment](#deployment)

---

## What is Sniffari?

Sniffari is a screen-free dog enrichment product for apartments and family homes. It uses scent, sound, and food rewards to create a repeatable treasure-hunt game without requiring an app, account, or subscription.

The system has three main physical components:

- **Hub:** A USB-C rechargeable device that coordinates the hunt and selects the next scent target.
- **Scent pods:** Wall-mounted or floor-standing stations with a soft nose pad. Pressing the nose pad releases a treat.
- **Scent vials:** Food-based scents used to create and change the trail. Refills and decoy scents are available separately.

A typical round works like this:

1. The owner places at least three scent pods around the home.
2. The hub releases a scent from one pod and can provide a gentle sound cue at Beginner level.
3. The dog follows the scent trail and presses the target pod's nose pad.
4. The nose pad releases a treat and the game begins again with a new route.

Sniffari offers three difficulty levels:

| Level | Play style | Best for |
| --- | --- | --- |
| Beginner | Sound cue and scent | First-time players and confident starters |
| Tracker | Scent only | Dogs that already understand the game |
| Detective | Target scent mixed with decoy scents | Advanced nose-work and scent discrimination |

---

## The problem Sniffari solves

Dogs left alone at home are often placed in situations that provide little mental stimulation. Repeatedly offering the same toy in the same place quickly loses its appeal, while long periods without a task can lead to boredom, restlessness, or destructive behavior.

Sniffari addresses that gap by creating structured, self-directed enrichment:

- **Novelty:** Pods can be moved and fresh scents can be selected between rounds.
- **Mental engagement:** The dog must search, follow a scent, and discriminate between target and decoy scents.
- **Physical exploration:** A scent trail encourages the dog to move through different rooms rather than remain in one spot.
- **Reward-based learning:** A treat at the nose pad makes success clear and repeatable.
- **No screen dependency:** The game works without a phone, tablet, or app-based setup.
- **Designed for homes:** Wall plates and a weighted floor stand make the system practical in apartments.

Sniffari is enrichment rather than a replacement for exercise, training, companionship, or veterinary care.

---

## How it works

1. **Place the pods:** Set at least three scent stations in rooms the dog already enjoys.
2. **Choose the level:** Start with sound and scent, then progress to scent-only and Detective modes.
3. **The hub chooses a target:** It releases a small puff of scent from one pod and starts the trail.
4. **The dog hunts:** The dog follows the scent through the home.
5. **The dog earns the reward:** Pressing the target nose pad releases a treat.
6. **Repeat with a new trail:** Move the pods or change the scent to keep the game fresh.

---

## Features

### Storefront

- Responsive, mobile-first product catalog
- Six-product catalog with product badges and INR pricing
- Product detail pages with galleries, specifications, box contents, and related products
- Scent selection for refill packs
- Client-side cart with quantity controls
- Cart persistence through browser `localStorage`
- Responsive checkout with client and server-side validation
- Pay on Delivery checkout
- Order confirmation and printable receipt
- Order tracking using order ID and checkout email
- Contact form with topic and order-reference fields
- FAQ, privacy, terms, and shipping/returns policy pages
- Interactive “A day with Sniffari” home-page timeline
- Scroll-reveal, toast, logo, and timeline animations with reduced-motion support
- SEO metadata, Open Graph metadata, and a branded 404 page

### Commerce and API

- Server-calculated prices and totals
- Server-side product and variant availability checks
- Zod request validation with field-level errors
- Idempotent order creation using a client order ID
- Order IDs in the format `SNF-YYMMDD-XXXXX`
- Tracking IDs in the format `TRK-XXXXXX`
- Private Vercel Blob persistence for orders, idempotency records, and contact messages
- In-memory fallback when Blob is not configured
- Per-route rate limiting
- Honeypot field for basic spam protection
- CORS and `OPTIONS` handling
- Security headers for content sniffing, framing, referrers, and browser permissions
- Health endpoint for service and storage status

---

## Products

All prices are in Indian rupees and include applicable taxes. Delivery is free across India.

| Product | Category | Price | What it includes |
| --- | --- | ---: | --- |
| **Starter Kit** | Kit | ₹8,999 | 1 hub, 3 pods, 3 magnetic wall plates, 3 food scent vials, charging cable, and guide |
| **Explorer Kit** | Kit | ₹13,999 | 1 hub, 6 pods, 6 magnetic wall plates, 3 food scent vials, Detective scent pack, charging cable, and guide |
| **Extra Pod** | Add-on | ₹2,499 | 1 scent pod, 1 magnetic wall plate, and 1 starter scent vial |
| **Weighted Floor Stand** | Add-on | ₹699 | 1 weighted, non-slip floor stand compatible with every pod |
| **Scent Refill Pack** | Scent | ₹499 | 3 food scent vials; available in Chicken, Cheese, or Peanut |
| **Detective Scent Pack** | Scent | ₹599 | 3 target scent vials and 3 decoy scent vials |

Product data is defined in [`lib/products.ts`](lib/products.ts).

---

## Tech stack

| Technology | Version | Purpose |
| --- | ---: | --- |
| Next.js | 15.5.29 | App Router, React rendering, API routes, and production builds |
| React | 19.2.9 | UI components and client state |
| React DOM | 19.2.9 | Browser rendering |
| TypeScript | 5.9.3 | Strict application and API types |
| Tailwind CSS | 4.3.5 | CSS-first utility styling and design tokens |
| React Hook Form | 7.92.0 | Contact and checkout form management |
| Zod | 4.6.7 | Shared client/server validation schemas |
| `@hookform/resolvers` | 7.0.8 | Zod integration for React Hook Form |
| Vercel Blob | 2.9.0 | Private JSON persistence for orders and messages |
| Lucide React | 1.77.0 | Interface icons |
| `clsx` + `tailwind-merge` | 2.1.1 / 3.7.1 | Conditional and conflict-aware class names |
| ESLint | 9.39.5 | Code-quality and Next.js checks |
| Vitest | 5.1.1 | Test runner script; no test files are currently included |

---

## Folder structure

```text
.
├── app/
│   ├── api/
│   │   ├── contact/route.ts       # Customer support endpoint
│   │   ├── health/route.ts        # Service and storage health endpoint
│   │   ├── orders/route.ts        # Order creation endpoint
│   │   ├── orders/[id]/route.ts   # Authenticated order lookup endpoint
│   │   └── products/route.ts      # Product catalog endpoint
│   ├── cart/page.tsx              # Cart page
│   ├── checkout/page.tsx          # Checkout page
│   ├── contact/page.tsx           # Contact page
│   ├── faq/page.tsx               # Frequently asked questions
│   ├── order/[id]/page.tsx        # Server-rendered order confirmation
│   ├── privacy/page.tsx           # Privacy policy
│   ├── products/[slug]/page.tsx   # Product detail page
│   ├── shipping-policy/page.tsx   # Shipping and returns policy
│   ├── shop/page.tsx              # Complete product catalog
│   ├── terms/page.tsx             # Terms and conditions
│   ├── track/page.tsx             # Order tracking page
│   ├── globals.css                # Tailwind theme, global styles, animations
│   ├── layout.tsx                 # Root layout, metadata, providers, header/footer
│   ├── not-found.tsx              # Branded 404 page
│   └── page.tsx                   # Home page
├── components/
│   ├── cart/                      # Cart line and summary UI
│   ├── checkout/                  # Checkout form and order summary
│   ├── forms/                     # Contact and tracking forms
│   ├── home/                      # Interactive day-in-the-life timeline
│   ├── layout/                    # Header, footer, page hero, cart button
│   ├── order/                     # Printable receipt control
│   ├── product/                   # Product cards and add-to-cart controls
│   └── ui/                        # Buttons, container, logo, scroll reveal
├── context/
│   ├── cart-context.tsx           # Cart state and localStorage persistence
│   └── toast-context.tsx          # Add-to-cart notifications
├── lib/
│   ├── api.ts                     # API response and CORS helpers
│   ├── messages.ts                # Contact-message persistence
│   ├── order-id.ts                # Order and tracking ID generation
│   ├── orders.ts                  # Order persistence and retrieval
│   ├── pricing.ts                 # Catalog resolution and price calculations
│   ├── products.ts                # Static product catalog
│   ├── rate-limit.ts              # In-memory rate limiting
│   ├── storage.ts                 # Blob configuration and detection
│   └── validation.ts              # Zod checkout/contact schemas
├── public/images/                 # Runtime storefront image assets
├── types/                         # Shared commerce and order interfaces
├── day_sniffari_images/           # Source assets for the day timeline
├── sniffari-images/               # Primary source image collection
├── sniffari-images-2/             # Additional source image collection
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js and security-header configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # Tailwind/PostCSS integration
└── tsconfig.json                  # Strict TypeScript configuration
```

---

## Run locally

### Prerequisites

- Node.js 20 or later
- npm
- A Vercel account and Blob store if you want durable local order/message storage

### Install and start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app works without environment variables, but orders and contact messages will use process-local in-memory storage. That data is temporary and may be lost when the server restarts or when requests are handled by another instance.

### Production build locally

```bash
npm run build
npm start
```

### Validate the project

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Environment variables

No environment variables are required for local development. Configure Vercel Blob to persist orders and contact messages durably.

| Variable | Required | Description |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | One storage option | Read/write token for a Vercel Blob store |
| `BLOB_STORE_ID` | OIDC storage option | Blob store identifier when using Vercel OIDC |
| `VERCEL_OIDC_TOKEN` | OIDC storage option | OIDC credential used with `BLOB_STORE_ID` |

Blob storage is considered configured when either:

- `BLOB_READ_WRITE_TOKEN` is present, or
- both `BLOB_STORE_ID` and `VERCEL_OIDC_TOKEN` are present.

Do not commit `.env.local` or any credentials. Environment files are already excluded by `.gitignore`.

---

## API endpoints

All API routes support `OPTIONS`, return CORS headers, and use this error shape:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "customer.email": "Enter a valid email address."
    }
  }
}
```

The `fields` object is included only when field-level validation errors are available.

### `GET /api/health`

Returns service health, active storage mode, product count, and server time.

```bash
curl http://localhost:3000/api/health
```

Example response:

```json
{
  "ok": true,
  "service": "sniffari",
  "storage": "blob",
  "products": 6,
  "time": "2026-11-23T12:34:56.789Z"
}
```

`storage` is `blob` when Blob is configured and `memory` when the in-memory fallback is active.

### `GET /api/products`

Returns the complete static catalog.

```bash
curl http://localhost:3000/api/products
```

Example response:

```json
{
  "products": [
    {
      "id": "starter-kit",
      "slug": "starter-kit",
      "name": "Starter Kit",
      "price": 8999,
      "stock": "in_stock"
    }
  ],
  "count": 6
}
```

### `POST /api/orders`

Creates an order from catalog products. Prices and totals are always rebuilt on the server; client-provided prices are ignored.

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "clientOrderId": "8c9fa3ec-57f2-4ef4-9840-4d67d3fb121b",
    "items": [
      {
        "productId": "starter-kit",
        "quantity": 1
      }
    ],
    "customer": {
      "firstName": "Asha",
      "lastName": "Sharma",
      "email": "asha@example.com",
      "phone": "9876543210"
    },
    "shipping": {
      "addressLine1": "12 Example Road",
      "addressLine2": "Apartment 4B",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560001",
      "country": "India"
    },
    "paymentMethod": "cod",
    "notes": "Please call before delivery.",
    "website": ""
  }'
```

Key request rules:

- `clientOrderId` is an optional UUID used for idempotency.
- An order can contain 1–20 items.
- Quantity must be an integer from 1–10 per line.
- Phone must be a valid Indian mobile number.
- PIN code must contain exactly six digits.
- `country` must be `India`.
- `paymentMethod` must be `cod`.
- `website` is a hidden honeypot and must be empty.

A successful request returns HTTP `201`:

```json
{
  "order": {
    "id": "SNF-261123-ABCDE",
    "trackingId": "TRK-ABC234",
    "status": "confirmed",
    "subtotal": 8999,
    "shippingFee": 0,
    "discount": 0,
    "total": 8999,
    "currency": "INR",
    "payment": {
      "method": "cod",
      "status": "pending"
    },
    "tracking": []
  }
}
```

Repeating a request with the same `clientOrderId` returns the existing order with HTTP `200` and `idempotent: true`.

Common errors:

| Status | Code | Meaning |
| ---: | --- | --- |
| 400 | `invalid_json` | Malformed JSON or body over 100 KB |
| 400 | `spam_detected` | Honeypot field was populated |
| 400 | `order_failed` | Product, variant, availability, or persistence failure |
| 422 | `validation_failed` | Request failed field-level validation |
| 429 | `rate_limited` | More than 30 order attempts from the IP in one minute |

### `GET /api/orders/:id`

Retrieves an order for tracking. The checkout email must match the email stored with the order.

```bash
curl "http://localhost:3000/api/orders/SNF-261123-ABCDE?email=asha@example.com"
```

Example response:

```json
{
  "order": {
    "id": "SNF-261123-ABCDE",
    "trackingId": "TRK-ABC234",
    "status": "confirmed"
  }
}
```

Common errors:

| Status | Code | Meaning |
| ---: | --- | --- |
| 400 | `email_required` | Email query parameter is missing |
| 404 | `not_found` | Order does not exist or email does not match |
| 429 | `rate_limited` | More than 60 lookups from the IP in one minute |

### `POST /api/contact`

Stores a customer support message.

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Asha Sharma",
    "email": "asha@example.com",
    "phone": "9876543210",
    "topic": "order",
    "orderId": "SNF-261123-ABCDE",
    "message": "I need help with my order.",
    "website": ""
  }'
```

Allowed topics are `order`, `product`, `returns`, and `other`. A successful request returns HTTP `201`:

```json
{
  "ok": true,
  "messageId": "MSG-MABC1234-XYZ9",
  "receivedAt": "2026-11-23T12:34:56.789Z"
}
```

Common errors include `invalid_json`, `spam_detected`, `validation_failed`, and `rate_limited`. The route allows 15 submissions per IP per minute.

---

## Shop and order flow

### Customer journey

1. **Browse:** The customer explores the home page, shop catalog, and product detail pages.
2. **Select a product:** The customer chooses a scent where required and adjusts quantity.
3. **Add to cart:** The cart context updates in memory and saves the cart to `localStorage` under `sniffari_cart_v1`.
4. **Review cart:** The cart resolves products against the current catalog, calculates the subtotal, and shows free delivery.
5. **Checkout:** React Hook Form and Zod validate contact details, the Indian delivery address, payment method, and optional notes.
6. **Place order:** Checkout sends the cart lines and customer data to `POST /api/orders` with a stable `clientOrderId` and `paymentMethod: "cod"`.
7. **Server validation:** The API validates the payload, rate limit, product availability, variants, and quantities, then rebuilds all prices from the catalog.
8. **Persist order:** The API creates the order ID and tracking ID and stores the order in private Vercel Blob storage.
9. **Confirmation:** Checkout clears the cart and redirects to `/order/:id?placed=1`. The server-rendered confirmation page displays the order, total, COD status, tracking ID, estimated delivery, and a printable receipt.
10. **Track order:** The customer opens `/track`, enters the order ID and checkout email, and sees the stored order and tracking history.

### Cart persistence

The browser stores a normalized array under `sniffari_cart_v1`:

```json
[
  {
    "productId": "starter-kit",
    "variantId": "mixed",
    "quantity": 2
  }
]
```

When the cart is loaded, unavailable products, invalid variants, and malformed entries are removed. Quantities are clamped to 1–10. The same product and variant share one cart line.

### Idempotency

Checkout creates one UUID for the mounted checkout session. If the same order submission is retried after a transient failure, the server returns the existing order instead of creating a duplicate. A full page reload creates a new UUID and may create a new order.

### Server-side trust boundary

The browser never controls the final price. The order API:

- looks up every product in the static catalog,
- validates the selected variant,
- enforces the maximum quantity,
- calculates unit price and line total,
- applies free delivery and zero discount,
- stores INR as the order currency.

### Order and tracking IDs

- **Order ID:** `SNF-YYMMDD-XXXXX`
- **Tracking ID:** `TRK-XXXXXX`
- **Client order ID:** UUID generated by `crypto.randomUUID()`
- **Estimated delivery:** generated by the server as a date value

---

## Data storage

The application does not use a relational database.

### Vercel Blob

When Blob is configured, the following private JSON objects are written:

```text
orders/<order-id>.json
idempotency/<client-order-id>.json
messages/<message-id>.json
```

Blob objects use `application/json`, private access, and a 60-second cache-control maximum age.

### Memory fallback

If Blob is unavailable, the application falls back to process-local maps or arrays for orders, idempotency records, and contact messages. This fallback is useful for local development but is ephemeral and may be inconsistent across serverless instances.

### Browser storage

Only the cart is currently persisted in the browser under `sniffari_cart_v1`.

### Rate limiting

Rate-limit counters are process-local in-memory buckets. They are not durable or globally coordinated across multiple instances.

---

## Customer policies

- **Payment:** Pay on Delivery only; cash or UPI at the door.
- **Shipping:** Free across India to serviceable PIN codes.
- **Dispatch:** Within 2–3 working days.
- **Delivery estimate:** 3–7 working days after dispatch.
- **Returns:** Unused items in original packaging can be returned within 30 days of delivery.
- **Refunds:** Usually completed within 7–10 working days after inspection.
- **Damage or missing items:** Report within 48 hours of delivery with the order ID and a photo.
- **Cancellations:** Request cancellation through the contact page before dispatch.
- **Support:** Replies are generally sent within one to two working days.
- **Accounts:** No customer account, app, or subscription is required.

Opened scent vials and pods that have been used with treats cannot be returned because they cannot be safely resold.

---

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint across the repository |
| `npm run typecheck` | Run strict TypeScript checks without emitting files |
| `npm test` | Run Vitest once; no test files are currently included |

---

## Deployment

The project is linked to the Vercel project `106644-hwa-hackathon` and deployed from the `main` branch.

```bash
git push origin main
vercel --prod
```

Production URL:

[https://106644-hwa-hackathon.vercel.app](https://106644-hwa-hackathon.vercel.app)

Before deploying, configure the Blob environment variables in the Vercel project so orders and customer messages remain durable across restarts and serverless instances.
