import Image from "next/image";
import Link from "next/link";

export default function ShowCard({ id, title, imageUrl }) {
  return (
    <Link href={`/shows/${id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={450}
          className="w-full"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
