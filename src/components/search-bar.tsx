'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function SearchBar() {
  const { register, handleSubmit } = useForm<{ search: string }>()
  const router = useRouter()
  const pathname = usePathname()

  const getSearchType = () => {
    const validTypes = ['posts', 'feed', 'videos']
    const currentType = pathname.split('/').pop() || 'posts'
    return validTypes.includes(currentType) ? currentType : 'posts'
  }

  const onSubmit = (data: { search: string }) => {
    const searchType = getSearchType()
    router.push(`/news/${searchType}?search=${encodeURIComponent(data.search)}`)
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <input
          type="text"
          {...register('search')}
          placeholder="Content..."
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  margin: '2rem 0',
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  width: '100%',
  maxWidth: '600px',
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px 20px',
  borderRadius: '30px',
  border: '2px solid #2DD4BF',
  backgroundColor: '#0f0f0f',
  color: '#fff',
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.3s ease',
}

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  borderRadius: '30px',
  backgroundColor: '#2DD4BF',
  color: '#0f172a',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px',
  transition: 'all 0.3s ease',
}
