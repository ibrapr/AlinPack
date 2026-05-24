'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImagePlus, Loader2, AlertCircle, Link as LinkIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SingleImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  slug: string;
  folder?: string;
  className?: string;
}

async function uploadFile(file: File, slug: string, folder = 'machines'): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  form.append('slug', slug || 'machine');
  form.append('folder', folder);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Upload failed');
  return data.url as string;
}

export function ImageUpload({
  value,
  onChange,
  slug,
  folder = 'machines',
  className,
}: SingleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      try {
        const url = await uploadFile(file, slug, folder);
        onChange(url);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [slug, folder, onChange],
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ''; // allow re-uploading the same file
  };

  if (value) {
    return (
      <div className={cn('group relative inline-block', className)}>
        <div className="relative aspect-[5/4] w-full max-w-sm overflow-hidden rounded-2xl border border-brand-gray-200 bg-brand-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Machine"
            className="h-full w-full object-cover"
            onError={() => setError('Image failed to load.')}
          />
          <button
            type="button"
            onClick={() => {
              onChange(undefined);
              setError(null);
            }}
            className="absolute top-2 end-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity hover:bg-black group-hover:opacity-100"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 truncate text-xs text-brand-gray-500" title={value}>
          {value}
        </p>
        {error && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {!urlMode ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInput.current?.click()}
          className={cn(
            'flex aspect-[5/4] max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-brand-gray-50 p-6 text-center transition-colors',
            dragOver
              ? 'border-brand-red bg-brand-red/5'
              : 'border-brand-gray-300 hover:border-brand-red hover:bg-brand-red/5',
            uploading && 'pointer-events-none opacity-70',
          )}
        >
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            className="hidden"
          />
          {uploading ? (
            <>
              <Loader2 className="h-7 w-7 animate-spin text-brand-red" />
              <p className="text-sm font-semibold text-brand-gray-700">Uploading…</p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <ImagePlus className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-brand-black">
                Drop image here or click to upload
              </p>
              <p className="text-xs text-brand-gray-500">JPG, PNG, WebP up to 4MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="max-w-sm space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 rounded-xl border border-brand-gray-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
            <button
              type="button"
              onClick={() => {
                if (urlInput.trim()) {
                  onChange(urlInput.trim());
                  setUrlInput('');
                  setUrlMode(false);
                }
              }}
              className="btn-primary text-xs px-4 py-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Use URL
            </button>
          </div>
        </div>
      )}

      <div className="mt-2 flex items-center gap-3 text-xs">
        <button
          type="button"
          onClick={() => setUrlMode(!urlMode)}
          className="inline-flex items-center gap-1 font-semibold text-brand-gray-600 hover:text-brand-red"
        >
          {urlMode ? (
            <>
              <Upload className="h-3.5 w-3.5" />
              Upload file instead
            </>
          ) : (
            <>
              <LinkIcon className="h-3.5 w-3.5" />
              Paste URL instead
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------- Gallery ----------------

interface GalleryUploadProps {
  values: string[];
  onChange: (next: string[]) => void;
  slug: string;
  folder?: string;
}

export function ImageGalleryUpload({ values, onChange, slug, folder = 'machines' }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file, slug, folder);
        uploaded.push(url);
      }
      onChange([...values, ...uploaded]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const remove = (i: number) => {
    onChange(values.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {values.map((url, i) => (
          <div key={url + i} className="group relative">
            <div className="h-24 w-24 overflow-hidden rounded-xl border border-brand-gray-200 bg-brand-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute -top-1.5 -end-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-black text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-50 text-brand-gray-500 transition-colors hover:border-brand-red hover:text-brand-red disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span className="text-[11px] font-semibold">Add</span>
            </>
          )}
        </button>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />
      {error && (
        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
