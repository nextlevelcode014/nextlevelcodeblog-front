import { SanityLive } from '@/sanity/lib/live'

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="bg-[#1a1a1a] min-h-screen">
      {children}
      <SanityLive />
    </section>
  )
}
