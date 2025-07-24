'use client'

import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from 'react'
import SearchBar from './search-bar'
import PostNotFound from './search-not-found'
import UnderConstruction from './error-componets/under-construction'

export default function ActiveSegment({ posts }: { posts: ReactNode }) {
  const activeSegmentSearch = useSelectedLayoutSegment()
  const activeSegment = activeSegmentSearch?.replace('search', '')
  const router = usePathname()
  const isHome = router === '/'

  const isValidRoute =
    isHome || ['posts', 'videos'].includes(activeSegment || '')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex justify-center gap-4 border-b-2 border-gray-700 pb-2 mb-6">
        <Link
          href="/news/posts"
          className={`px-4 py-2 rounded-lg text-gray-400 transition-colors ${
            activeSegment === 'posts'
              ? 'bg-gray-800 text-blue-500'
              : 'hover:bg-gray-800 hover:text-blue-400'
          }`}
        >
          Articles 📝
        </Link>
        <Link
          href="/news/videos"
          className={`px-4 py-2 rounded-lg text-gray-400 transition-colors ${
            activeSegment === 'videos'
              ? 'bg-gray-800 text-blue-500'
              : 'hover:bg-gray-800 hover:text-blue-400'
          }`}
        >
          Videos 🎥
        </Link>
      </nav>

      <SearchBar />

      {isValidRoute ? (
        <div className="mt-8">
          {activeSegment === 'posts' && posts}
          {activeSegment === 'videos' && <UnderConstruction />}
          {isHome && (
            <div className="text-center text-gray-400">
              Select a category above
            </div>
          )}
        </div>
      ) : (
        <PostNotFound />
      )}
    </div>
  )
}
