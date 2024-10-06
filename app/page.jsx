import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import Banner from '@/components/Banner'
import ContentRow from '@/components/ContentRow'

async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return res.json()
}

export default async function Home() {
  try {
    const homeData = await getHomeData()

    return (
      <div className="bg-black text-white">
        <Banner content={homeData.featured} />
        <div className="py-8">
          <ContentRow title="Popular Movies" items={homeData.popularMovies} />
          <ContentRow title="Popular TV Shows" items={homeData.popularTVShows} />
        </div>
      </div>
    )
  } catch (error) {
    return <ErrorDisplay message={error.message} />
  }
}

function ErrorDisplay({ message }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
