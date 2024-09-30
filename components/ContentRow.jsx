import Image from 'next/image'
import Link from 'next/link'

export default function ContentRow({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <Link key={item.id} href={`/${item.contentType.toLowerCase()}s/${item.id}`} className="flex-shrink-0">
            <div className="w-48 h-72 relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={``}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="mt-2 text-sm">{item.title}</p>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{item.voteAverage.toFixed(1)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
