import { defineCollection, z } from 'astro:content';

/**
 * Projects collection — the "CPT" for your portfolio projects.
 *
 * Each project lives in src/content/projets/<slug>.md
 * The frontmatter (between ---) is validated against the schema below.
 *
 * To create a new project: duplicate any .md file, rename it,
 * update its frontmatter. That's it — the new page appears at /projets/<slug>
 */
const projetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // ============================
    // CARD info (home + archive)
    // ============================
    title: z.string(),
    cover: z.string().optional(),              // path to cover image (used on home + archive cards)
    coverAlt: z.string().optional(),
    bgColor: z.string().default('#06535e'),    // damier block bg (home)
    textColor: z.string().default('#ffffff'),  // damier block text color
    description: z.string().optional(),        // shown on home damier + single sidebar
    fields: z.array(z.string()).default([]),   // ex: ["UI Design", "UX Design"]
    category: z.string().optional(),           // primary category for archive filter
    order: z.number().default(99),
    draft: z.boolean().default(false),

    // ============================
    // SINGLE PAGE — sticky sidebar
    // ============================

    // Optional external link ("Voir le site" button)
    liveUrl: z.string().url().optional(),

    // Meta items (lines with a separator). Add or remove freely.
    // Example: [{label: "Année", value: "2025"}, {label: "Secteurs", value: "B2B, Defense"}]
    metaItems: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .default([]),

    // Show the bottom stats block ("7 ans / +50 clients / +120 heures")
    // Set to false on a project where you don't want them
    showStats: z.boolean().default(true),

    // ============================
    // SINGLE PAGE — dynamic blocs
    // Reorder, add or remove freely.
    // ============================
    blocs: z
      .array(
        z.discriminatedUnion('type', [
          z.object({
            type: z.literal('text'),
            contenu: z.string(),
          }),
          z.object({
            type: z.literal('image'),
            src: z.string(),
            alt: z.string().optional(),
            legende: z.string().optional(),
          }),
          z.object({
            type: z.literal('video'),
            src: z.string(),
            poster: z.string().optional(),
            autoplay: z.boolean().default(true),
            loop: z.boolean().default(true),
            muted: z.boolean().default(true),
          }),
          z.object({
            type: z.literal('gif'),
            src: z.string(),
            alt: z.string().optional(),
          }),
          z.object({
            type: z.literal('galerie'),
            images: z.array(
              z.object({
                src: z.string(),
                alt: z.string().optional(),
              })
            ),
            colonnes: z.number().min(1).max(4).default(2),
          }),
        ])
      )
      .default([]),
  }),
});

export const collections = {
  projets: projetsCollection,
};
