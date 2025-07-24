import { POST_QUERYResult } from '@/sanity/types'
import { FiTag } from 'react-icons/fi'

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>['categories']
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories?.map((category) => (
        <span
          key={category._id}
          className="px-3 py-1 bg-gray-800 rounded-full text-sm text-green-500 flex items-center gap-2"
        >
          <FiTag className="w-4 h-4" />
          {category.title}
        </span>
      ))}
    </div>
  )
}
