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
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
  })
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiService.getMe,

    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
  })
}
