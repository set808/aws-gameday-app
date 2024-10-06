import Image from 'next/legacy/image'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { getS3PosterUrl, getS3BackdropUrl } from '@/lib/s3'

async function getShow(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shows/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch show')
  };
  return res.json()
}

export default async function ShowPage({ params }) {
  const show = await getShow(params.id)
  const backdropUrl = await getS3BackdropUrl(show.backdropPath)
  const posterUrl = await getS3PosterUrl(show.posterPath)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[40vh] mb-8">
          <Image 
            src={backdropUrl}
            alt={show.title} 
            layout="fill" 
            objectFit="cover"
            className="rounded-lg"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
            <Image 
              src={posterUrl}
              alt={show.title} 
              width={500} 
              height={750} 
              className="rounded-lg shadow-lg"
            />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
          <p className="text-gray-400 mb-4">First Air Date: {new Date(show.releaseDate).toLocaleDateString()}</p>
          <p className="text-lg mb-6">{show.overview}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">★</span>
            <span>{show.voteAverage.toFixed(1)} ({show.voteCount} votes)</span>
          </div>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || 'An unexpected error occurred.'}
      </AlertDescription>
    </Alert>
  )
}
