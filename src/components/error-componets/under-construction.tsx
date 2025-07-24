import Link from 'next/link'
import { Wrench } from 'lucide-react'

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200 bg-[#1a1a1a]">
      <Wrench size={64} className="mb-4 text-yellow-500" />
      <h1 className="text-2xl font-bold mb-2">Page under development 🚧</h1>
      <p className="text-gray-400 mb-6">
        We're working to bring this content soon. Stay tuned.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        ⬅️ Back to home
      </Link>
    </div>
  )
}
