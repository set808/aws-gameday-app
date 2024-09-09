import Image from 'next/image'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

async function getMovie(id) {
  const res = await fetch(`http://localhost:3000/api/movies/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch movie')
  }
  return res.json()
}

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[40vh] mb-8">
        <Image 
          src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`} 
          alt={movie.title} 
          layout="fill" 
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image 
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
            alt={movie.title} 
            width={500} 
            height={750} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 mb-4">Released: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p className="text-lg mb-6">{movie.overview}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">★</span>
            <span>{movie.voteAverage.toFixed(1)} ({movie.voteCount} votes)</span>
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
