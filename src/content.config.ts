import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    url: z.url(),
    industry: z.string(),
    location: z.string(),
    coords: z.tuple([z.number(), z.number()]),
    summary: z.string(),
    stack: z.array(z.string()),
    services: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects };
