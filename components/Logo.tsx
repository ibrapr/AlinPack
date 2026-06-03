import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  dark?: boolean;
  priority?: boolean;
}

export default function Logo({ className, dark = false, priority = false }: LogoProps) {
  void priority;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 select-none',
        dark && '[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.35))]',
        className,
      )}
    >
      <span className="relative flex h-7 w-7 items-center justify-center" aria-hidden="true">
        <span className="absolute h-5 w-5 rotate-45 border-2 border-brand-red" />
        <span className="absolute h-2.5 w-2.5 rotate-45 bg-brand-red" />
      </span>
      <span
        className={cn(
          'text-2xl font-extrabold uppercase leading-none tracking-[0.14em]',
          dark ? 'text-white' : 'text-brand-black',
        )}
      >
        PACK LINE
      </span>
    </span>
  );
}
