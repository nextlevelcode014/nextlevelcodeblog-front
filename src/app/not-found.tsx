import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a]">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl text-gray-400 mb-8">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        Oops! It seems the page you are looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#1E90FF] text-white rounded-lg hover:bg-[#1C7ED6] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  )
}
