import { urlFor } from '@/sanity/lib/image'
import { POSTS_QUERYResult } from '@/sanity/types'
import Image from 'next/image'

export function Author({ author }: { author: POSTS_QUERYResult[0]['author'] }) {
  return (
    <div className="flex items-center gap-2 group">
      {author?.image && (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-600 group-hover:border-blue-500 transition-colors">
          <Image
            src={urlFor(author.image).width(48).url()}
            alt={author.name || 'NextLevelCode'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <span className="group-hover:text-gray-200 transition-colors">
        {author?.name || 'Noname'}
      </span>
    </div>
  )
}
