import { Router } from "express";
import { db, categoriesTable } from "@workspace/db";
import { CreateCategoryBody } from "@workspace/api-zod";

const router = Router();

router.get("/categories", async (_req, res) => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(categoriesTable.name);
  res.json(categories);
});

router.post("/categories", async (req, res) => {
  const body = CreateCategoryBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const [category] = await db
    .insert(categoriesTable)
    .values(body.data)
    .returning();

  res.status(201).json(category);
});

export default router;
