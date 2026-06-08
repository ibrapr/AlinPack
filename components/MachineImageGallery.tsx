'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MachineCategory } from '@/data/types';
import MachineThumb from './MachineThumb';

interface MachineImageGalleryProps {
  category: MachineCategory;
  image?: string;
  gallery?: string[];
  alt: string;
}

export default function MachineImageGallery({ category, image, gallery, alt }: MachineImageGalleryProps) {
  const images = [image, ...(gallery ?? [])].filter((s): s is string => !!s);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-gray-200 bg-white shadow-card">
        {images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={images[current]}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <MachineThumb category={category} alt={alt} />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-brand-black" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5 text-brand-black" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setCurrent(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === current
                  ? 'border-brand-red'
                  : 'border-brand-gray-200 opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
