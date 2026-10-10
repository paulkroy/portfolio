import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

const shots = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.png', { eager: true });

/** Screenshot captured by scripts/screenshot.mjs, if one exists. */
export function getShot(slug: string, kind: 'desktop' | 'mobile'): ImageMetadata | undefined {
  return shots[`../assets/projects/${slug}-${kind}.png`]?.default;
}

export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}
