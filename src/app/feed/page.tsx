import { NewsFeed } from '@/components/feed-componets/news-feed'
import ProtectedRoute from '@/components/protected-route'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function FeedPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#1a1a1a] p-4">
        <section className="max-w-full mx-auto px-6 py-12 bg-[#1a1a1a] shadow-lg border-gray-800">
          <header className="space-y-8 mb-12 border-b border-gray-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent">
              News Feed
            </h1>

            <div className="flex items-center gap-4 text-gray-400">
              <p className="text-lg">
                Share and discuss the latest communinty news
              </p>

              <Link
                href="/news/posts"
                className="ml-auto text-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
              >
                <ArrowLeft /> News
              </Link>
            </div>
          </header>

          <NewsFeed />

          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center text-gray-500">
              <p>The news shared is the responsibility of its authors.</p>
              <div className="mt-2 flex gap-4 justify-center">
                <Link
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  Guidelines
                </Link>
                <span>•</span>
                <Link
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  Help
                </Link>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </ProtectedRoute>
  )
}
