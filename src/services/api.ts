import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import {
  CommentData,
  CreatePostData,
  LoginData,
  LoginResponse,
  PostCommentWithComments,
  recaptchaResponse,
  RegisterData,
  ResetPasswordData,
  UpdateComment,
  UpdateNewsPost,
  User,
  UsernameUpdate,
  UserPasswordUpdate,
} from '../types'

import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ApiErrorResponse {
  message: string
  errors?: Record<string, string>
}

type CustomAxiosError = AxiosError<ApiErrorResponse>
if (!API_URL) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_API_URL')
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: CustomAxiosError) => {
    const message = getErrorMessage(error)
    return Promise.reject(new Error(message))
  },
)
function getErrorMessage(error: CustomAxiosError): string {
  if (!error.response) {
    return error.message || 'Network error - please check your connection'
  }

  const responseData = error.response.data

  if (typeof responseData === 'object' && responseData !== null) {
    if (responseData.errors && typeof responseData.errors === 'object') {
      // Retorna apenas a primeira mensagem
      const firstMessage = Object.values(responseData.errors)[0]
      return firstMessage
    }

    if ('message' in responseData && typeof responseData.message === 'string') {
      return responseData.message
    }

    if ('error' in responseData && typeof responseData.error === 'string') {
      return responseData.error
    }
  }

  return `Unexpected error: ${error.response.status} ${error.response.statusText}`
}

type ApiResponse<T> = Promise<T>

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>,
): ApiResponse<T> => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const apiService = {
  fetchPosts: (): ApiResponse<PostCommentWithComments[]> =>
    handleRequest(apiClient.get('/posts/get-all-posts-with-comments')),

  createPost: (data: CreatePostData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/posts/create-post', {
        title: data.title,
        description: data.description,
        url: data.url,
      }),
    ),

  updatePost: (data: UpdateNewsPost): ApiResponse<void> =>
    handleRequest(
      apiClient.put('/posts/update-post', {
        description: data.description,
        url: data.url,
        id: data.post_id,
      }),
    ),

  deletePost: (postId: string): ApiResponse<void> =>
    handleRequest(apiClient.delete(`/posts/delete-post/${postId}`)),

  postComment: (data: CommentData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/posts/create-comment', {
        id: data.post_id,
        content: data.comment,
      }),
    ),

  updateComment: (data: UpdateComment): ApiResponse<void> =>
    handleRequest(
      apiClient.put('/posts/update-comment', {
        content: data.comment,
        id: data.commentId,
      }),
    ),

  deleteComment: (commentId: string): ApiResponse<void> =>
    handleRequest(apiClient.delete(`/posts/delete-comment/${commentId}`)),

  loginUser: (data: LoginData): ApiResponse<LoginResponse> =>
    handleRequest(apiClient.post('/auth/login', data)),
  registerUser: (data: RegisterData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/auth/register', {
        ...data,
        confirmPassword: data.confirmPassword,
      }),
    ),

  verifyEmail: (token: string): ApiResponse<void> =>
    handleRequest(apiClient.get(`/auth/verify-email?token=${token}`)),

  resetPassword: (data: ResetPasswordData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/auth/reset-password', {
        ...data,
      }),
    ),

  forgotPassword: (email: string): ApiResponse<void> =>
    handleRequest(apiClient.post('/auth/forgot-password', { email })),

  getMe: (): ApiResponse<User> => handleRequest(apiClient.get('/users/me')),

  deleteUser: (passowrd: string): ApiResponse<void> =>
    handleRequest(apiClient.post('/users/delete', passowrd)),

  deleteGoogleUser: (): ApiResponse<void> =>
    handleRequest(apiClient.delete('/users/google-user-delete')),

  updateUserPassword: (data: UserPasswordUpdate): ApiResponse<void> =>
    handleRequest(apiClient.put('/users/update-password', data)),

  updateUsername: (data: UsernameUpdate): ApiResponse<void> =>
    handleRequest(
      apiClient.put('/users/update-username', {
        name: data.name,
        password: data.password,
      }),
    ),
  verifyReCaptcha: (token: string): ApiResponse<recaptchaResponse> =>
    handleRequest(
      apiClient.post('/verify-captcha', {
        token: token,
      }),
    ),
}
