import MovieCard from '../../components/MovieCard'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

async function getMovies() {
  const res = await fetch('http://localhost:3000/api/movies', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch movies')
  }
  return res.json()
}

export default async function MoviesPage() {
  const movies = await getMovies()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} imageUrl={movie.imageUrl} />
        ))}
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
