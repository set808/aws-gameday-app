import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ id, movieTitle, imageUrl }) {
  return (
    <Link href={`/movies/${id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={movieTitle}
          width={300}
          height={450}
          className="w-full"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-white">{movieTitle}</h2>
        </div>
      </div>
    </Link>
  );
}
