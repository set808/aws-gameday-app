import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { getS3ImageUrl } from '@/lib/s3'

// Page for the image optimization issue

async function getMovie(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch movie')
  }
  return res.json()
}

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id)
  const backdropUrl = await getS3ImageUrl(`backdrops/${movie.backdropPath}`);
  const posterUrl = await getS3ImageUrl(`posters/${movie.posterPath}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[40vh] mb-8">
        <img
          src={backdropUrl}
          alt={movie.title} 
          className="rounded-lg w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={posterUrl}
            alt={movie.title} 
            width={500} 
            height={750} 
            className="rounded-lg shadow-lg w-full"
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
