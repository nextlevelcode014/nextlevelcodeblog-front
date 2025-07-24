'use client'
export default function CodeBlock({
  language,
  code,
}: {
  language: string
  code: string
}) {
  return (
    <div className="code-block relative">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-sm rounded hover:bg-gray-700 transition"
        onClick={(e) => {
          navigator.clipboard.writeText(code)
          const button = e.currentTarget
          button.innerText = 'Copiado!'
          setTimeout(() => (button.innerText = 'Copiar'), 1500)
        }}
      >
        Copiar
      </button>
    </div>
  )
}
