"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/api/placeholder/100/50"
                alt="Setflix"
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/movies"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Movies
                </Link>
                <Link
                  href="/shows"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  TV Shows
                </Link>
                <Link
                  href="/new"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  New & Popular
                </Link>
                <Link
                  href="/mylist"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My List
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="text-gray-300 hover:text-white p-1 rounded-full">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-300 hover:text-white p-1 rounded-full ml-4">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-300 hover:text-white p-1 rounded-full ml-4">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
