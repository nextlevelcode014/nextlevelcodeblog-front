'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export function PostImage({ image, alt }: { image: any; alt: string }) {
  return (
    <div className="relative w-full aspect-video bg-gray-900/20 rounded-lg overflow-hidden">
      <Image
        src={urlFor(image).url()}
        alt={alt}
        fill
        className="object-contain p-4"
        sizes="(max-width: 768px) 100vw, 85vw"
      />
      {!image?.asset && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Imagem not available
        </div>
      )}
    </div>
  )
}
