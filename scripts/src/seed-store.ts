import { db, storeProductsTable } from "@workspace/db";

const products = [
  {
    name: "Legacy Journal",
    slug: "legacy-journal",
    tagline: "A guided journal for capturing a life's story.",
    description:
      "The Legacy Journal is a beautifully bound, guided writing journal designed to help individuals document their memories, values, and life experiences. With thoughtfully crafted prompts spanning childhood, relationships, milestones, and personal wisdom, it transforms blank pages into a lasting record that families will treasure for generations. Perfect as a milestone birthday or retirement gift.",
    priceKobo: 1500000,
    category: "journals",
    inStock: true,
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Memory Box",
    slug: "memory-box",
    tagline: "A keepsake collection for preserving life's most precious moments.",
    description:
      "The Memory Box is a curated archival keepsake set — a linen-lined box with acid-free envelopes, labelled dividers, and a short guide on organising and preserving photographs, letters, and mementos. It gives families a dignified home for the physical artefacts of a life: the wedding invitation, the handwritten letter, the childhood photo. An ideal companion to any Memoir.",
    priceKobo: 2500000,
    category: "keepsakes",
    inStock: true,
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Story Prompt Cards",
    slug: "story-prompt-cards",
    tagline: "Sixty questions that unlock a lifetime of stories.",
    description:
      "A deck of 60 beautifully designed prompt cards for interviewing the people you love. Questions span childhood memories, defining moments, lessons learned, hopes, and legacies. Pull a card at family dinners, holidays, or a dedicated storytelling session. Includes a short guide on how to record and preserve the answers. Compact, elegant, and endlessly reusable.",
    priceKobo: 750000,
    category: "gifts",
    inStock: true,
    featured: false,
    sortOrder: 3,
  },
  {
    name: "Legacy Letter Set",
    slug: "legacy-letter-set",
    tagline: "Premium stationery for letters written to outlive their author.",
    description:
      "Some words deserve better than a text message. The Legacy Letter Set is a premium stationery collection — heavyweight cotton-rag paper, envelopes, a wax seal kit, and a guide to writing letters meant to be opened years from now. For milestone birthdays, retirement, or simply the desire to leave something behind in your own handwriting.",
    priceKobo: 1200000,
    category: "stationery",
    inStock: true,
    featured: false,
    sortOrder: 4,
  },
];

async function seed() {
  console.log("Seeding store products…");

  for (const product of products) {
    await db
      .insert(storeProductsTable)
      .values(product)
      .onConflictDoNothing();
  }

  console.log(`Seeded ${products.length} store products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
