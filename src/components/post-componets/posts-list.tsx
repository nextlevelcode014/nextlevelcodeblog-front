'use client'

import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/post-componets/published-at'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiTag, FiUser, FiArrowRight } from 'react-icons/fi'
import { useSearchParams } from 'next/navigation'
import { Author } from './author'
import SearchNotFound from '../search-not-found'

export function PostList({ posts }: { posts?: POSTS_QUERYResult }) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''

  const filteredPosts = posts?.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery),
  )

  return (
    <div className="space-y-8">
      {filteredPosts?.length ? (
        filteredPosts?.map((post) => <PostCard key={post._id} {...post} />)
      ) : (
        <SearchNotFound />
      )}
    </div>
  )
}

function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, slug } = props

  return (
    <article className="group bg-[#242424] rounded-xl border border-gray-700 hover:border-green-500/20 transition-all duration-300 hover:shadow-xl">
      <Link href={`/posts/${slug?.current}`} className="block p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 relative h-48 md:h-36 rounded-lg overflow-hidden border border-gray-700">
            {mainImage && (
              <>
                <Image
                  src={urlFor(mainImage).width(600).url()}
                  alt={mainImage.alt || title || 'Thumbnail do post'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category._id}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm text-green-500"
                  >
                    <FiTag className="w-4 h-4" />
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold  group-hover:text-blue-500 text-blue-300  transition-colors">
              {title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              {author && (
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <Author author={author} />
                </div>
              )}

              {publishedAt && (
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <PublishedAt publishedAt={publishedAt} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-blue-500 group-hover:text-blue-400 transition-colors mt-4">
              <span>Read post</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
