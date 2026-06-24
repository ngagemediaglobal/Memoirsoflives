import { Router } from "express";
import { db, memoirRequestsTable } from "@workspace/db";
import { CreateMemoirRequestBody } from "@workspace/api-zod";

const router = Router();

router.post("/memoir-requests", async (req, res) => {
  const body = CreateMemoirRequestBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request data.", details: body.error.flatten() });
    return;
  }

  const data = body.data;

  const [row] = await db
    .insert(memoirRequestsTable)
    .values({
      subjectName: data.subjectName,
      subjectAge: data.subjectAge ?? null,
      milestone: data.milestone ?? null,
      relationship: data.relationship,
      storyNotes: data.storyNotes,
      package: data.package,
      requesterName: data.requesterName,
      requesterEmail: data.requesterEmail,
      requesterPhone: data.requesterPhone ?? null,
    })
    .returning({ id: memoirRequestsTable.id });

  res.status(201).json({
    id: row.id,
    message: "Your Memoir request has been received. We will be in touch shortly.",
  });
});

export default router;
