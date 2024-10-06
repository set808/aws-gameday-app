import Image from 'next/legacy/image'
import Link from 'next/link'
import { getS3BackdropUrl } from '@/lib/s3'

async function getBackdropUrl(backdropPath) {
  if (!backdropPath) return null
  try {
    return await getS3BackdropUrl(backdropPath)
  } catch (error) {
    console.error('Failed to fetch backdrop URL:', error)
    return null
  }
}

const getContentLink = (item) => {
  if (item.contentType === 'MOVIE') {
    return `/movies/${item.id}`
  } else if (item.contentType === 'TVSHOW') {
    return `/shows/${item.id}`
  }
}

export default async function Banner({ content }) {
  if (!content) return null

  const backdropUrl = await getBackdropUrl(content.backdropPath)

  return (
    <div className="relative h-[80vh]">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={content.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
        <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg mb-6">{content.overview}</p>
        <Link href={getContentLink(content)} className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition inline-block">
          Watch Now
        </Link>
      </div>
    </div>
  )
}
