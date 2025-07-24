import Image from 'next/image'
import { PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import CodeBlock from '@/components/post-componets/code-block'
import YoutubeEmbed from '@/components/post-componets/youtube-embed'

export const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div
        className="relative my-2 [&+*]:mt-4"
        style={{
          width: 'fit-content',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Image
          src={urlFor(value).url()}
          alt={value?.alt || ''}
          width={value.asset?.metadata?.dimensions?.width || 1200}
          height={value.asset?.metadata?.dimensions?.height || 800}
          className="rounded-lg border border-gray-800"
          style={{
            backgroundColor: value.asset?.metadata?.isOpaque
              ? 'transparent'
              : '#1a1a1a',
            objectFit: 'contain',
          }}
          sizes="(max-width: 768px) 90vw, 75vw"
        />

        {value?.caption && (
          <figcaption className="mt-1 text-center text-sm text-gray-400">
            {value.caption}
          </figcaption>
        )}
      </div>
    ),
    codeBlock: ({ value }) => (
      <>
        <CodeBlock code={value.code} language={value.language} />
      </>
    ),
    youtube: ({ value }) => {
      return <YoutubeEmbed url={value.url} />
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line break-word ">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-gray-100">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-5 mt-7 text-gray-100">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-4 mt-6 text-gray-100">{children}</h3>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-400 underline transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-100">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-300">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
}
