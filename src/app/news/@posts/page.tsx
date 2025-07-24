// app/blog/@posts/page.tsx
import { PostList } from '@/components/post-componets/posts-list'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'

export default async function PostsPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })
  return (
    <div>
      {posts?.length ? (
        <PostList posts={posts} />
      ) : (
        <p>Nenhum post encontrado.</p>
      )}
    </div>
  )
}
