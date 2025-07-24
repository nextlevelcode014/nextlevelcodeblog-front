import { POST_QUERYResult } from '@/sanity/types'
import dayjs from 'dayjs'

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>['publishedAt']
}

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className=" text-gray-400 text-sm flex items-center gap-2 ">
      {dayjs(publishedAt).format('D MMMM YYYY')}
    </p>
  ) : null
}
