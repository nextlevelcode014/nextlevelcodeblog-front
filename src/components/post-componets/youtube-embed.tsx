'use client'
import YouTubePlayer from 'react-player/youtube'

export default function YoutubeEmbed({ url }: { url: string }) {
  return (
    <div className="video-container">
      <YouTubePlayer url={url} width="100%" height="400px" controls />
    </div>
  )
}
