import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /**
   * Hint that the logo is being shown over a dark background.
   * Kept for API compatibility — the real logo works on both light and dark
   * backgrounds, so this currently only adjusts a small drop-shadow for
   * legibility over the dark hero.
   */
  dark?: boolean;
  priority?: boolean;
}

export default function Logo({ className, dark = false, priority = false }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center select-none',
        dark && '[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.35))]',
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Alin Pack"
        width={598}
        height={158}
        priority={priority}
        className="h-9 sm:h-10 w-auto"
      />
    </span>
  );
}
