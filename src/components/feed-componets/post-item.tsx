'use client'
import { PostCommentWithComments } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import { CommentBox } from './comment-box'
import { CommentItem } from './comment-item'
import { ArrowLeft } from 'lucide-react'
import Linkify from 'react-linkify'

const linkifyOptions = {
  target: '_blank',
  className:
    'text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors break-all',
}

export const PostItem = ({
  post,
  activeCommentId,
  onCommentToggle,
  onCommentSubmit,
  isCommenting,
  onEditPost,
  onDeletePost,
  onEditComment,
  onDeleteComment,
  currentUserId,
}: {
  post: PostCommentWithComments
  activeCommentId: string | null
  onCommentToggle: (id: string | null) => void
  onCommentSubmit: (postId: string, comment: string) => void
  isCommenting: boolean
  onEditPost: (
    postId: string,
    newTitle: string,
    newDescription: string,
    newUrl: string,
  ) => void
  onDeletePost: (postId: string) => void
  onEditComment: (commentId: string, newContent: string) => void
  onDeleteComment: (commentId: string) => void
  currentUserId: string | undefined
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(post.title)
  const [editedUrl, setEditedUrl] = useState(post.url)
  const [editedDescription, setEditedDescription] = useState(post.description)

  const handleEdit = () => {
    if (editedDescription.trim()) {
      onEditPost(
        post.id,
        editedTitle.trim(),
        editedDescription.trim(),
        editedUrl.trim(),
      )
      setIsEditing(false)
    }
  }

  return (
    <article className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-4 justify-between">
        <div className="flex-1">
          <div className="mb-4 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  required
                  placeholder="Enter the post title"
                  className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
                />
                <input
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                  required
                  placeholder="Past the news link here!"
                  className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700/20 text-gray-400 rounded-lg hover:bg-gray-700/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white mb-1 break-words">
                  {post.title}
                </h2>
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a
                      href={decoratedHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkifyOptions.className}
                      key={key}
                    >
                      {decoratedText}
                    </a>
                  )}
                >
                  {post.url}
                </Linkify>
                <p className="text-gray-300">{post.description}</p>
              </>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Posted by {post.authorName} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              {currentUserId === post.authorId && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() =>
                onCommentToggle(post.id === activeCommentId ? null : post.id)
              }
              className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <span>💬</span>
              {post.id === activeCommentId ? 'Close comments' : 'See comments'}
            </button>

            {post.id === activeCommentId && (
              <CommentBox
                onSubmit={(comment) => onCommentSubmit(post.id, comment)}
                isLoading={isCommenting}
              />
            )}

            {post.comments?.length > 0 && activeCommentId === post.id && (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onEdit={onEditComment}
                    onDelete={onDeleteComment}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 h-fit"
        >
          <span>
            <ArrowLeft />
          </span>
          See news
        </Link>
      </div>
    </article>
  )
}
