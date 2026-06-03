import { PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /**
 * Hint that the logo is being shown over a dark background.
   */
  dark?: boolean;
  priority?: boolean;
}

export default function Logo({ className, dark = false, priority = false }: LogoProps) {
  void priority;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 select-none',
        dark && '[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.35))]',
        className,
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-white shadow-soft">
        <PackageCheck className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('text-xl font-extrabold tracking-wide', dark ? 'text-white' : 'text-brand-black')}>
          ALIN PACK
        </span>
        <span className={cn('mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]', dark ? 'text-white/80' : 'text-brand-red')}>
          Packaging Systems
        </span>
      </span>
    </span>
  );
}
