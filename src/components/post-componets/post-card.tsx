import { Author } from '@/components/post-componets/author'
import { Categories } from '@/components/post-componets/categories'
import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/post-componets/published-at'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, slug } = props

  return (
    <Link
      className="group relative block overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 "
      href={`/posts/${slug!.current}`}
    >
      <article className="flex flex-col gap-6 p-6 md:grid md:grid-cols-12 md:items-start md:gap-8 md:p-8 bg-white dark:bg-slate-900">
        <div className="md:col-span-3 space-y-4">
          <Categories categories={categories} />
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>

        <div className="md:col-span-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 transition-colors">
            <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
              {title}
            </span>
          </h2>
        </div>

        <div className="md:col-span-3 relative w-full h-48 md:h-36 rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(600).height(400).url()}
              alt={mainImage.alt || title || 'Post thumbnail'}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={urlFor(mainImage).width(20).url()}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-700" />
          )}
        </div>
      </article>

      <div className="absolute inset-0 border border-pink-100 dark:border-slate-700 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  )
}
