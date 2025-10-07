"use client";
import React from 'react';
import Image from 'next/image';

interface CardProps {
  image: string;
  alt: string;
}

export function Card({ image, alt }: CardProps) {
  return (
    <div
      className="
        w-full max-w-[80%] aspect-[4/1.5]
        relative flex items-center justify-center
        rounded-[32px] overflow-hidden shadow-md
		hover:scale-102 transition-all duration-500 ease-in-out lg:opacity-75 hover:opacity-100
      "
    >
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-[32px]"
        sizes="(max-width: 768px) 100vw, 900px"
        priority
      />
    </div>
  );
}
