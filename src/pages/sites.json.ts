// Build-time list of monitored sites. The Worker reads this from the asset
// binding, so the markdown in src/content/projects stays the single source of truth.
import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const sites = projects.map((p) => ({ slug: p.id, name: p.data.name, url: p.data.url }));
  return new Response(JSON.stringify(sites), { headers: { 'Content-Type': 'application/json' } });
};
