import Link from 'next/link'
import { AlertCircle, ArrowLeft, Search } from 'lucide-react'

export default function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
      <AlertCircle size={48} className="mb-4 text-red-600" />
      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Search size={24} /> No results :(
      </h1>
      <p className="text-gray-500 mb-8">
        The page you tried to access doesn't exist or no post matches your
        search.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <ArrowLeft /> Back to home
      </Link>
    </div>
  )
}
