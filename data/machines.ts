import type { Machine } from './types';
import machinesJson from './content/machines.json';

export const machines: Machine[] = machinesJson as Machine[];

export function getMachineBySlug(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}

export function getMachinesByProduct(productSlug: string): Machine[] {
  return machines.filter((m) => m.compatibleProductSlugs.includes(productSlug));
}

export function getRelatedMachines(machine: Machine, limit = 3): Machine[] {
  const productSet = new Set(machine.compatibleProductSlugs);
  return machines
    .filter((m) => m.slug !== machine.slug)
    .map((m) => ({
      machine: m,
      score: m.compatibleProductSlugs.filter((s) => productSet.has(s)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.machine);
}

export function getFeaturedMachines(): Machine[] {
  return machines.filter((m) => m.featured);
}

export function getMachineCategories(): Machine['category'][] {
  return Array.from(new Set(machines.map((m) => m.category)));
}
