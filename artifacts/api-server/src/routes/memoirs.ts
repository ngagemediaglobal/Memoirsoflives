import { Router } from "express";
import { db } from "@workspace/db";
import { memoirsTable } from "@workspace/db";
import { eq, desc, and } from "drizzle-orm";
import {
  ListMemoirsQueryParams,
  CreateMemoirBody,
  GetMemoirParams,
  UpdateMemoirParams,
  UpdateMemoirBody,
  DeleteMemoirParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/memoirs", async (req, res) => {
  const query = ListMemoirsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  const { category, featured, limit = 20, offset = 0 } = query.data;

  const conditions = [];
  if (category) conditions.push(eq(memoirsTable.category, category));
  if (featured !== undefined) conditions.push(eq(memoirsTable.featured, featured));

  const memoirs = await db
    .select()
    .from(memoirsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(memoirsTable.createdAt))
    .limit(limit)
    .offset(offset);

  res.json(memoirs.map(formatMemoir));
});

router.post("/memoirs", async (req, res) => {
  const body = CreateMemoirBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { title, excerpt, fullStory } = body.data;
  const words = fullStory.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

  const [memoir] = await db
    .insert(memoirsTable)
    .values({ ...body.data, readTimeMinutes, featured: body.data.featured ?? false })
    .returning();

  res.status(201).json(formatMemoir(memoir));
});

router.get("/memoirs/featured", async (req, res) => {
  const memoirs = await db
    .select()
    .from(memoirsTable)
    .where(eq(memoirsTable.featured, true))
    .orderBy(desc(memoirsTable.createdAt))
    .limit(6);
  res.json(memoirs.map(formatMemoir));
});

router.get("/memoirs/recent", async (req, res) => {
  const memoirs = await db
    .select()
    .from(memoirsTable)
    .orderBy(desc(memoirsTable.createdAt))
    .limit(8);
  res.json(memoirs.map(formatMemoir));
});

router.get("/memoirs/stats", async (req, res) => {
  const { categoriesTable } = await import("@workspace/db");
  const { contributorsTable } = await import("@workspace/db");
  const { count } = await import("drizzle-orm");

  const [memoirStats] = await db
    .select({ total: count() })
    .from(memoirsTable);

  const [featuredStats] = await db
    .select({ total: count() })
    .from(memoirsTable)
    .where(eq(memoirsTable.featured, true));

  const [contribStats] = await db
    .select({ total: count() })
    .from(contributorsTable);

  const [catStats] = await db
    .select({ total: count() })
    .from(categoriesTable);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { gte } = await import("drizzle-orm");
  const [recentStats] = await db
    .select({ total: count() })
    .from(memoirsTable)
    .where(gte(memoirsTable.createdAt, sevenDaysAgo));

  res.json({
    totalMemoirs: memoirStats?.total ?? 0,
    totalContributors: contribStats?.total ?? 0,
    totalCategories: catStats?.total ?? 0,
    featuredCount: featuredStats?.total ?? 0,
    recentCount: recentStats?.total ?? 0,
  });
});

router.get("/memoirs/:id", async (req, res) => {
  const params = GetMemoirParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [memoir] = await db
    .select()
    .from(memoirsTable)
    .where(eq(memoirsTable.id, params.data.id));

  if (!memoir) {
    res.status(404).json({ error: "Memoir not found" });
    return;
  }

  res.json(formatMemoir(memoir));
});

router.patch("/memoirs/:id", async (req, res) => {
  const params = UpdateMemoirParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateMemoirBody.safeParse(req.body);

  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const updates: Record<string, unknown> = { ...body.data, updatedAt: new Date() };
  if (body.data.fullStory) {
    const words = body.data.fullStory.split(/\s+/).length;
    updates.readTimeMinutes = Math.max(1, Math.ceil(words / 200));
  }

  const [memoir] = await db
    .update(memoirsTable)
    .set(updates)
    .where(eq(memoirsTable.id, params.data.id))
    .returning();

  if (!memoir) {
    res.status(404).json({ error: "Memoir not found" });
    return;
  }

  res.json(formatMemoir(memoir));
});

router.delete("/memoirs/:id", async (req, res) => {
  const params = DeleteMemoirParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  await db.delete(memoirsTable).where(eq(memoirsTable.id, params.data.id));
  res.status(204).send();
});

function formatMemoir(m: typeof memoirsTable.$inferSelect) {
  return {
    ...m,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
  };
}

export default router;
