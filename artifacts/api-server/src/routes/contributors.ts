import { Router } from "express";
import { db, contributorsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateContributorBody,
  GetContributorParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/contributors", async (_req, res) => {
  const contributors = await db
    .select()
    .from(contributorsTable)
    .orderBy(contributorsTable.name);
  res.json(contributors.map(formatContributor));
});

router.post("/contributors", async (req, res) => {
  const body = CreateContributorBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const [contributor] = await db
    .insert(contributorsTable)
    .values(body.data)
    .returning();

  res.status(201).json(formatContributor(contributor));
});

router.get("/contributors/:id", async (req, res) => {
  const params = GetContributorParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [contributor] = await db
    .select()
    .from(contributorsTable)
    .where(eq(contributorsTable.id, params.data.id));

  if (!contributor) {
    res.status(404).json({ error: "Contributor not found" });
    return;
  }

  res.json(formatContributor(contributor));
});

function formatContributor(c: typeof contributorsTable.$inferSelect) {
  return {
    ...c,
    createdAt: c.createdAt.toISOString(),
  };
}

export default router;
