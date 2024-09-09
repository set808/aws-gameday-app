import Image from 'next/image'
import Link from 'next/link'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

async function getShows() {
  const res = await fetch('http://localhost:3000/api/shows', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch shows')
  }
  return res.json()
}

export default async function ShowsPage() {
  const shows = await getShows()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <Link key={show.id} href={`/shows/${show.id}`} className="block">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.posterPath}`}
                alt={show.title}
                width={500}
                height={750}
                className="w-full"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">{show.title}</h2>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{show.voteAverage.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
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
