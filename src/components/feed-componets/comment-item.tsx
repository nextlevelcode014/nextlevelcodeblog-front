'use client'
import { PostCommentWithAuthor } from '@/types'
import { useState } from 'react'

export const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  currentUserId,
}: {
  comment: PostCommentWithAuthor
  onEdit: (commentId: string, newContent: string) => void
  onDelete: (commentId: string) => void
  currentUserId: string | undefined
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const handleEdit = () => {
    if (editedContent.trim()) {
      onEdit(comment.id, editedContent.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
      <div className="flex items-center gap-3 mb-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">{comment.authorName}</span>
            <span className="text-xs text-gray-500 ml-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {currentUserId === comment.authorId && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
          />
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors w-full"
          >
            Save changes
          </button>
        </div>
      ) : (
        <p className="text-gray-300">{comment.content}</p>
      )}
    </div>
  )
}
