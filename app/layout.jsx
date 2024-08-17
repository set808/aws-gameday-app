// app/layout.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Netflix Clone",
  description: "A Netflix clone built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="min-h-screen pt-16 pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
