import { PortableText } from 'next-sanity'
import { components } from '@/sanity/portableTextComponents'

export function PostContent({ body }: { body: any }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <PortableText value={body} components={components} />
    </div>
  )
}
