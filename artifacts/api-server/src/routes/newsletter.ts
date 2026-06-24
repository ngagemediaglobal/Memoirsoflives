import { Router } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  const body = SubscribeNewsletterBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  const { email, name } = body.data;

  const [existing] = await db
    .select()
    .from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.email, email.toLowerCase().trim()));

  if (existing) {
    res.status(200).json({ message: "You are already subscribed. Thank you!" });
    return;
  }

  await db.insert(newsletterSubscribersTable).values({
    email: email.toLowerCase().trim(),
    name: name ?? null,
  });

  res.status(201).json({ message: "You're subscribed. Welcome to Memoirs." });
});

export default router;
