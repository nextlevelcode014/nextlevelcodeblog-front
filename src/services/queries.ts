import { useQuery } from '@tanstack/react-query'
import { apiService } from './api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      let posts = apiService.fetchPosts()
      return posts
    },
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiService.getMe,

    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}
