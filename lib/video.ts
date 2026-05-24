export type VideoKind = 'youtube' | 'vimeo' | 'file' | 'unknown';

export interface ParsedVideo {
  kind: VideoKind;
  /** Embed URL (for iframes) or direct URL (for native <video>) */
  embedUrl: string;
  /** Thumbnail URL when available (YouTube only) */
  thumbnail?: string;
  /** Original URL */
  raw: string;
}

const YT_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/i,
  /youtube\.com\/.*[?&]v=([\w-]{11})/i,
];

const VIMEO_PATTERNS = [
  /vimeo\.com\/(?:video\/)?(\d+)/i,
  /player\.vimeo\.com\/video\/(\d+)/i,
];

const FILE_EXT = /\.(mp4|webm|ogg|mov)(\?|$)/i;

export function parseVideoUrl(url: string): ParsedVideo {
  const raw = url.trim();
  if (!raw) return { kind: 'unknown', embedUrl: raw, raw };

  for (const re of YT_PATTERNS) {
    const m = raw.match(re);
    if (m && m[1]) {
      const id = m[1];
      return {
        kind: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        raw,
      };
    }
  }

  for (const re of VIMEO_PATTERNS) {
    const m = raw.match(re);
    if (m && m[1]) {
      const id = m[1];
      return {
        kind: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`,
        raw,
      };
    }
  }

  if (FILE_EXT.test(raw) || raw.startsWith('/')) {
    return { kind: 'file', embedUrl: raw, raw };
  }

  return { kind: 'unknown', embedUrl: raw, raw };
}
