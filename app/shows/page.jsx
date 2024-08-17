import ShowCard from '../../components/ShowCard'
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.map((show) => (
          <ShowCard key={show.id} id={show.id} title={show.title} imageUrl={show.imageUrl} />
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
