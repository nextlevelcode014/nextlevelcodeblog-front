'use client'
import { useState } from 'react'

export const CommentBox = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (comment: string) => void
  isLoading: boolean
}) => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim())
      setComment('')
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all min-h-[100px]"
        />
        <div className="flex gap-3 mt-4 justify-end">
          <button
            onClick={() => setComment('')}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            Clean
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
