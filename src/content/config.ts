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
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    bgColor: z.string().default('#06535e'),
    textColor: z.string().default('#ffffff'),
    description: z.string().optional(),
    fields: z.array(z.string()).default([]),
    category: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),

    // ============================
    // V2 — card display (home + archive)
    // ============================
    wide: z.boolean().default(false),        // true = card large (655px)
    cardImage: z.string().optional(),         // image affichée sur la card (peut différer du projet)
    cardDescription: z.string().optional(),   // texte sur la card (peut différer de description)

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
