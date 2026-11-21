import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .pipe(
    z
      .string()
      .regex(
        /^(?:\+91)?[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number.",
      ),
  );

export const cartLineSchema = z.object({
  productId: z.string().trim().min(1).max(80),
  variantId: z.string().trim().max(80).optional(),
  quantity: z.number().int().min(1).max(10),
});

export const customerSchema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name.").max(60),
  lastName: z.string().trim().min(1, "Enter your last name.").max(60),
  email: z.email("Enter a valid email address.").max(160),
  phone: phoneSchema,
});

export const shippingSchema = z.object({
  addressLine1: z
    .string()
    .trim()
    .min(5, "Enter your street address.")
    .max(160),
  addressLine2: z.string().trim().max(160).optional(),
  city: z.string().trim().min(2, "Enter your city.").max(80),
  state: z.string().trim().min(2, "Enter your state.").max(80),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode."),
  country: z.literal("India"),
});

export const createOrderSchema = z.object({
  clientOrderId: z.uuid().optional(),
  items: z
    .array(cartLineSchema)
    .min(1, "Your cart is empty.")
    .max(20, "Too many items in one order."),
  customer: customerSchema,
  shipping: shippingSchema,
  paymentMethod: z.literal("cod"),
  notes: z.string().trim().max(500).optional(),
  website: z.string().max(0).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const checkoutFormSchema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name.").max(60),
  lastName: z.string().trim().min(1, "Enter your last name.").max(60),
  email: z.email("Enter a valid email address.").max(160),
  phone: phoneSchema,
  addressLine1: z
    .string()
    .trim()
    .min(5, "Enter your street address.")
    .max(160),
  addressLine2: z.string().trim().max(160).optional(),
  city: z.string().trim().min(2, "Enter your city.").max(80),
  state: z.string().trim().min(2, "Enter your state.").max(80),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode."),
  notes: z.string().trim().max(500).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.email("Enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^(?:\+91)?[6-9]\d{9}$/,
          "Enter a valid 10-digit Indian mobile number.",
        ),
    )
    .optional()
    .or(z.literal("")),
  topic: z.enum(["order", "product", "returns", "other"]),
  orderId: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more so we can help.")
    .max(1500),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
