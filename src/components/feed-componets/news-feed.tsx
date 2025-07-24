'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreatePostData } from '@/types'
import { usePosts } from '@/services/queries'
import { useAuth } from '@/context/auth-context'
import Loading from '../loading'
import { PostItem } from './post-item'
import {
  useCreateCommentMutation,
  useCreatePostMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useUpdateCommentMutation,
  useUpdatePostMutation,
} from '@/services/muations'
import { useQueryClient } from '@tanstack/react-query'

export function NewsFeed() {
  const { data: posts, isLoading, error } = usePosts()
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const { query } = useAuth()
  const currentUserId = query.data?.data.user.id || ''
  const queryClient = useQueryClient()

  console.log(posts)

  const { register, handleSubmit, reset } = useForm<CreatePostData>()

  const createPostMutation = useCreatePostMutation()

  const updatePostMutation = useUpdatePostMutation()

  const deletePostMutation = useDeletePostMutation()

  const postCommentMutation = useCreateCommentMutation()

  const updateCommentMutation = useUpdateCommentMutation()

  const deleteCommentMutation = useDeleteCommentMutation()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }, [
    createPostMutation.isSuccess,
    updatePostMutation.isSuccess,
    deletePostMutation.isSuccess,
    postCommentMutation.isSuccess,
    updateCommentMutation.isSuccess,
    deleteCommentMutation.isSuccess,
  ])

  useEffect(() => {
    setActiveCommentId(null)
  }, [postCommentMutation.isSuccess])

  const handleSubmitCreate = (data: CreatePostData) => {
    createPostMutation.mutate({
      title: data.title,
      url: data.url,
      description: data.description,
    })
    reset()
  }

  const handleCommentSubmit = (postId: string, comment: string) => {
    console.log(postId)
    postCommentMutation.mutate({
      post_id: postId,
      comment,
    })
  }

  const handleEditComment = (commentId: string, newContent: string) => {
    updateCommentMutation.mutate({ commentId, comment: newContent })
  }

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId)
  }

  const handleEditPost = (
    postId: string,
    newDescription: string,
    url: string,
  ) => {
    updatePostMutation.mutate({
      post_id: postId,
      description: newDescription,
      url,
    })
  }

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId)
  }

  if (isLoading) return <Loading />
  if (error) return <div>Service unavailable.</div>

  return (
    <section className="max-w-full mx-auto px-6 py-12 bg-[#1a1a1a] shadow-lg border-gray-800">
      <div className="mb-8 border-b border-gray-800 pb-8">
        <form onSubmit={handleSubmit(handleSubmitCreate)} className="space-y-4">
          <div className="space-y-4">
            <input
              {...register('title', { required: true })}
              placeholder="News Post Title"
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
            />
            <input
              {...register('url', { required: true })}
              placeholder="Paste the news link here"
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
            />
            <textarea
              {...register('description', { required: true })}
              placeholder="Add a description or comment about the news"
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            disabled={createPostMutation.isPending}
          >
            {createPostMutation.isPending ? 'Publishing...' : 'Share news'}
          </button>
        </form>
      </div>

      <div className="space-y-8">
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            activeCommentId={activeCommentId}
            onCommentToggle={setActiveCommentId}
            onCommentSubmit={handleCommentSubmit}
            isCommenting={postCommentMutation.isPending}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </section>
  )
}
