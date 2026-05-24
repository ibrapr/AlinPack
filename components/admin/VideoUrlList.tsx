'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Youtube, Video as VideoIcon, ExternalLink, AlertCircle } from 'lucide-react';
import { parseVideoUrl } from '@/lib/video';
import { TextInput } from './fields';

interface VideoUrlListProps {
  values: string[];
  onChange: (next: string[]) => void;
}

export default function VideoUrlList({ values, onChange }: VideoUrlListProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const add = () => {
    const url = input.trim();
    if (!url) return;
    const parsed = parseVideoUrl(url);
    if (parsed.kind === 'unknown' && !url.startsWith('http')) {
      setError('Paste a YouTube, Vimeo, or direct video URL (must start with http).');
      return;
    }
    if (values.includes(url)) {
      setError('That URL is already added.');
      return;
    }
    onChange([...values, url]);
    setInput('');
    setError(null);
  };

  const remove = (i: number) => {
    onChange(values.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="space-y-3">
        {values.map((url, i) => {
          const parsed = parseVideoUrl(url);
          return (
            <div
              key={url + i}
              className="flex items-start gap-3 rounded-2xl border border-brand-gray-200 bg-white p-3"
            >
              <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-black text-white">
                {parsed.kind === 'youtube' && parsed.thumbnail ? (
                  <Image
                    src={parsed.thumbnail}
                    alt=""
                    width={96}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : parsed.kind === 'youtube' ? (
                  <Youtube className="h-6 w-6 text-red-500" />
                ) : (
                  <VideoIcon className="h-6 w-6" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gray-500">
                  {parsed.kind === 'youtube' ? 'YouTube' : parsed.kind === 'vimeo' ? 'Vimeo' : parsed.kind === 'file' ? 'Video file' : 'External'}
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 break-all text-sm font-medium text-brand-black hover:text-brand-red"
                >
                  <span className="truncate max-w-md">{url}</span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-gray-200 text-brand-gray-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove video"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <TextInput
          type="url"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1"
        />
        <button
          type="button"
          onClick={add}
          disabled={!input.trim()}
          className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {error && (
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      <p className="mt-3 text-xs text-brand-gray-500">
        Paste a YouTube or Vimeo URL — it will play embedded on the machine detail page. Direct{' '}
        <code className="font-mono">.mp4</code>/<code className="font-mono">.webm</code> URLs work too.
      </p>
    </div>
  );
}
