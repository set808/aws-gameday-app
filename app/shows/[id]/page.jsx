import Image from 'next/image'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

async function getShow(id) {
  const res = await fetch(`http://localhost:3000/api/shows/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch show')
  }
  return res.json()
}

export default async function ShowPage({ params }) {
  const show = await getShow(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image src={show.imageUrl} alt={show.title} width={600} height={900} className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
          <p className="text-gray-400 mb-4">{show.releaseYear} | {show.seasons} Seasons | {show.genre}</p>
          <p className="text-lg mb-6">{show.description}</p>
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
