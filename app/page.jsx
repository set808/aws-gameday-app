'use client';

import { useState, useEffect } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'

export default function Home() {
  const [homeData, setHomeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('/api/home')
        if (!res.ok) {
          throw new Error('Failed to fetch home page data')
        }
        const data = await res.json()
        setHomeData(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <ErrorDisplay message={error} />

  return (
    <div className="bg-black text-white">
      {homeData && (
        <>
          <Banner content={homeData.featured} />
          <div className="py-8">
            <ContentRow title="Popular Movies" items={homeData.popularMovies} />
            <ContentRow title="Popular TV Shows" items={homeData.popularTVShows} />
          </div>
        </>
      )}
    </div>
  )
}

function ErrorDisplay({ message }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
