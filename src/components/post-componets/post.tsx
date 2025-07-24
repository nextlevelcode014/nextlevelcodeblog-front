import { PortableText } from 'next-sanity'
import { components } from '@/sanity/portableTextComponents'
import { POST_QUERYResult } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Categories } from './categories'
import { PublishedAt } from './published-at'
import { Author } from './author'

export function Post(props: NonNullable<POST_QUERYResult>) {
  const { title, author, mainImage, body, publishedAt, categories } = props

  return (
    <section
      className="max-w-full mx-auto px-6 py-12 bg-[#1a1a1a] shadow-lg border-gray-800
  [&>*]:relative [&>*]:z-10"
    >
      <header className="space-y-8 mb-12 border-b border-gray-800 pb-8">
        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href="/news/posts"
            className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm "
          >
            <ArrowLeft /> Back to posts
          </Link>
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent">
          {title}
        </h1>

        {author && (
          <div className="mt-6 flex items-center gap-4 bg-gray-800/40 p-3 rounded-lg">
            <Author author={author} />
          </div>
        )}
      </header>

      {mainImage && (
        <figure className="relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden border border-gray-800 mb-8 group transition-all duration-300 hover:border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
          <Image
            src={urlFor(mainImage).width(2000).url()}
            alt={mainImage.alt || title || ''}
            fill
            className="object-cover"
            style={{
              objectPosition: mainImage.hotspot
                ? `${(mainImage.hotspot.x ?? 0.5) * 100}% ${(mainImage.hotspot.y ?? 0.5) * 100}%`
                : 'center',
            }}
            sizes="(max-width: 768px) 100vw, 85vw"
          />
        </figure>
      )}

      {body && (
        <section
          className="prose prose-lg dark:prose-invert w-full max-w-none text-gray-200
      prose-pre:mt-1 prose-pre:mb-3"
        >
          {' '}
          <PortableText value={body} components={components} />
        </section>
      )}

      <footer className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {categories && <Categories categories={categories} />}
          <Link
            href="/news/posts"
            className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm "
          >
            <ArrowLeft /> Back to posts
          </Link>
        </div>
      </footer>
    </section>
  )
}
