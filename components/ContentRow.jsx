import Image from 'next/legacy/image'
import Link from 'next/link'
import { getS3PosterUrl } from '@/lib/s3'

export default function ContentRow({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <ContentItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

async function ContentItem({ item }) {
  let posterUrl
  try {
    posterUrl = await getS3PosterUrl(item.posterPath)
  } catch (error) {
    console.error('Failed to fetch poster URL:', error)
  }

const getContentLink = (item) => {
  if (item.contentType === 'MOVIE') {
    return `/movies/${item.id}`
  } else if (item.contentType === 'TVSHOW') {
    return `/shows/${item.id}`
  }
}

  return (
    <Link href={getContentLink(item)} className="flex-shrink-0">
      <div className="w-48 h-72 relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm">{item.title}</p>
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        <span>{item.voteAverage.toFixed(1)}</span>
      </div>
    </Link>
  )
}
