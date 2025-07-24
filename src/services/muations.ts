import {
  QueryClient,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { apiService } from './api'
import { Post } from '@/sanity/types'
import { CreatePostData } from '@/types'

export function useLoginMutation() {
  return useMutation({
    mutationFn: apiService.loginUser,
  })
}
export function useRegisterMutation() {
  return useMutation({
    mutationFn: apiService.registerUser,
  })
}

export function useVerifyEmailMuation() {
  return useMutation({
    mutationFn: apiService.verifyEmail,
  })
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: apiService.deleteUser,
  })
}

export function useDeletegoogleUserMutation() {
  return useMutation({
    mutationFn: apiService.deleteGoogleUser,
  })
}

export function useUsernameMutation() {
  return useMutation({
    mutationFn: apiService.updateUsername,
  })
}

export function usePasswordMutation() {
  return useMutation({
    mutationFn: apiService.updateUserPassword,
  })
}

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: apiService.createPost,
  })
}
export function useUpdatePostMutation() {
  return useMutation({
    mutationFn: apiService.updatePost,
  })
}

export function useDeletePostMutation() {
  return useMutation({
    mutationFn: apiService.deletePost,
  })
}

export function useCreateCommentMutation() {
  return useMutation({
    mutationFn: apiService.postComment,
    onSuccess: () => {},
  })
}

export function useUpdateCommentMutation() {
  return useMutation({
    mutationFn: apiService.updateComment,
  })
}

export function useDeleteCommentMutation() {
  return useMutation({
    mutationFn: apiService.deleteComment,
  })
}
