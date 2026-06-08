'use client';

import { useState } from 'react';

interface ClientLogoImgProps {
  path: string;
  name: string;
  className: string;
}

export default function ClientLogoImg({ path, name, className }: ClientLogoImgProps) {
  const [src, setSrc] = useState(`${path}.png`);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => {
        if (src.endsWith('.png')) {
          setSrc(`${path}.jpg`);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
