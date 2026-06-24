import { Router } from "express";
import { db, storeProductsTable, storeOrdersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateStoreOrderBody } from "@workspace/api-zod";

const router = Router();

router.get("/store/products", async (_req, res) => {
  const products = await db
    .select()
    .from(storeProductsTable)
    .where(eq(storeProductsTable.inStock, true))
    .orderBy(storeProductsTable.sortOrder);
  res.json(products);
});

router.get("/store/products/:slug", async (req, res) => {
  const [product] = await db
    .select()
    .from(storeProductsTable)
    .where(eq(storeProductsTable.slug, req.params.slug));

  if (!product) {
    res.status(404).json({ error: "Product not found." });
    return;
  }
  res.json(product);
});

router.post("/store/orders", async (req, res) => {
  const body = CreateStoreOrderBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid order data.", details: body.error.flatten() });
    return;
  }

  const d = body.data;

  const [row] = await db
    .insert(storeOrdersTable)
    .values({
      productId: d.productId,
      productName: d.productName,
      quantity: d.quantity,
      customerName: d.customerName,
      customerEmail: d.customerEmail,
      customerPhone: d.customerPhone ?? null,
      deliveryAddress: d.deliveryAddress,
      notes: d.notes ?? null,
    })
    .returning({ id: storeOrdersTable.id });

  res.status(201).json({
    id: row.id,
    message: "Your order has been received. We will confirm and arrange delivery within 2–3 business days.",
  });
});

export default router;
