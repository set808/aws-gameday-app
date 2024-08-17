import Image from 'next/image'
import Link from 'next/link'

// You'll need to create these components
import Banner from '@/components/Banner'
import ContentRow from '@/components/ContentRow'

async function getFeaturedContent() {
  // In a real app, this would fetch from your API
  return {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    imageUrl: '/api/placeholder/1200/800'
  }
}

async function getContentByCategory() {
  // In a real app, this would fetch from your API
  return [
    {
      category: 'Popular on Netflix',
      items: [
        { id: '1', title: 'Stranger Things', imageUrl: '/api/placeholder/300/450' },
        { id: '2', title: 'The Witcher', imageUrl: '/api/placeholder/300/450' },
        { id: '3', title: 'Bridgerton', imageUrl: '/api/placeholder/300/450' },
        { id: '4', title: 'Money Heist', imageUrl: '/api/placeholder/300/450' },
      ]
    },
    {
      category: 'Trending Now',
      items: [
        { id: '5', title: 'Queen\'s Gambit', imageUrl: '/api/placeholder/300/450' },
        { id: '6', title: 'The Crown', imageUrl: '/api/placeholder/300/450' },
        { id: '7', title: 'Ozark', imageUrl: '/api/placeholder/300/450' },
        { id: '8', title: 'Umbrella Academy', imageUrl: '/api/placeholder/300/450' },
      ]
    },
    // Add more categories as needed
  ]
}

export default async function Home() {
  const featuredContent = await getFeaturedContent()
  const contentByCategory = await getContentByCategory()

  return (
    <div className="bg-black text-white">
      <Banner content={featuredContent} />
      
      <div className="py-8">
        {contentByCategory.map((category, index) => (
          <ContentRow key={index} title={category.category} items={category.items} />
        ))}
      </div>
    </div>
  )
}
