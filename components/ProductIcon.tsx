import {
  Milk,
  Coffee,
  Leaf,
  Apple,
  Fish,
  Beef,
  Salad,
  Droplet,
  Sparkles,
  SprayCan,
  Package,
  PawPrint,
  Box,
  ChefHat,
  CupSoda,
  Wine,
  Container,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const map: Record<string, React.ComponentType<{ className?: string }>> = {
  milk: Milk,
  bottle: Wine,
  honey: Droplet,
  coffee: Coffee,
  tea: Coffee,
  powder: Layers,
  droplet: Droplet,
  sparkles: Sparkles,
  spray: SprayCan,
  apple: Apple,
  leaf: Leaf,
  beef: Beef,
  fish: Fish,
  paw: PawPrint,
  salad: Salad,
  meal: ChefHat,
  tahini: Droplet,
  jar: Container,
  cup: CupSoda,
  container: Container,
  bucket: Container,
  pouch: Package,
  box: Box,
};

export default function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] || Box;
  return <Icon className={cn('h-6 w-6', className)} />;
}
