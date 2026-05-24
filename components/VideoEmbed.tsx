import { Play } from 'lucide-react';
import { parseVideoUrl } from '@/lib/video';
import { cn } from '@/lib/utils';

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export default function VideoEmbed({ url, title, className }: VideoEmbedProps) {
  const parsed = parseVideoUrl(url);

  if (!parsed.embedUrl) {
    return (
      <div
        className={cn(
          'flex aspect-video items-center justify-center rounded-2xl bg-brand-gray-100 text-sm text-brand-gray-500',
          className,
        )}
      >
        No video.
      </div>
    );
  }

  if (parsed.kind === 'youtube' || parsed.kind === 'vimeo') {
    return (
      <div className={cn('relative aspect-video overflow-hidden rounded-2xl bg-brand-black shadow-card', className)}>
        <iframe
          src={parsed.embedUrl}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  if (parsed.kind === 'file') {
    return (
      <div className={cn('relative aspect-video overflow-hidden rounded-2xl bg-brand-black shadow-card', className)}>
        <video
          src={parsed.embedUrl}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <a
      href={parsed.embedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex aspect-video flex-col items-center justify-center rounded-2xl bg-brand-gray-900 text-white text-sm font-semibold gap-2',
        className,
      )}
    >
      <Play className="h-8 w-8 text-brand-red" />
      Watch video
    </a>
  );
}
