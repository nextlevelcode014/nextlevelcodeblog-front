export default function NoPostsFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <svg
        className="w-16 h-16 text-blue-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-3-3v6m-7 9a9 9 0 1118 0H5z"
        ></path>
      </svg>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Nenhum post encontrado
      </h2>
      <p className="text-gray-500 mb-6">
        Parece que não conseguimos encontrar o que você está procurando.
      </p>
    </div>
  )
}
