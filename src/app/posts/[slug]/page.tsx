import { sanityFetch } from '@/sanity/lib/live'
import { POST_QUERY } from '@/sanity/lib/queries'
import NotFound from '@/app/not-found'
import { Post } from '@/components/post-componets/post'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  })

  if (!post) {
    return <NotFound />
  }

  return (
    <main
      className="w-full max-w-[900px] mx-auto bg-[#1a1a1a] text-gray-100
  px-4 sm:px-6  // Padding lateral responsivo
  hyphens-auto  // Quebra de palavras
  [&>*]:mb-8  // Espaçamento entre elementos filhos
"
    >
      <Post {...post} />
    </main>
  )
}
