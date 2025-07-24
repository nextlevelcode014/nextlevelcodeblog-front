export interface NewsPost {
  id: string
  title: string
  url: string
  description: string
  authorId: string
  createdAt: string
}

export interface UpdateNewsPost {
  post_id: string
  url: string
  description: string
}

export interface PostCommentWithComments {
  id: string
  url: string
  title: string
  description: string
  authorId: string
  authorName: string
  comments: PostCommentWithAuthor[]
  createdAt: string
}

export interface PostCommentWithAuthor {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
}

export interface PostCommentWithComment {
  post_id: string
  title: string
  url: string
  description: string
  post_created_at: string
  author_name: string
  comment_id: string
  comment_content: string
  comment_created_at: string
  commenter_name: string
}
export interface Author {
  id: string
  name: string
}

export interface CreatePostData {
  title: string
  url: string
  description: string
}

export interface CommentData {
  post_id: string
  comment: string
}

export interface UpdateComment {
  comment: string
  commentId: string
}

export interface LoginData {
  email: string
  password: string
  recaptchaToken: string
  authProvider: string
}

export interface LoginDataForm {
  email: string
  password: string
}
export interface LoginResponse {
  status: string
  token: string
}
export interface User {
  status: string
  data: {
    user: {
      id: string
      name: string
      email: string
      googleSub: string
      picture: string
      emailVerified: boolean
      authProvider: string
      updatedAt: string
      createdAt: string
    }
  }
}

export interface RegisterData {
  name: string
  email: string
  password?: string
  confirmPassword?: string
  recaptchaToken?: string
  googleSub?: string
  picture?: string
  emailVerified?: boolean
  authProvider: string
}

export interface RegisterDataForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
  confirmPassword: string
  recaptchaToken: String
}

export interface UserLoginResponse {
  status: string
  token: string
}

export interface UserPasswordUpdate {
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export interface UsernameUpdate {
  name: String
  password: String
}

export interface DeleteUser {
  password: string
}

export interface recaptchaResponse {
  success: boolean
  score: number
  action: string
  challenge_ts: string
  hostname: string
  'error-codes'?: string
}
