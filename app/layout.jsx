// app/layout.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import newrelic from "newrelic";
import Script from "next/script";

export const metadata = {
  title: "UniFlix",
  description: "Netflix but for unicorns",
};

export default async function RootLayout({ children }) {
  if (newrelic.agent.collector.isConnected() === false) {
    await new Promise((resolve) => {
      newrelic.agent.on("connected", resolve)
    })
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  })

  return (
    <html lang="en">
      <Script id="nr-browser-agent"
        dangerouslySetInnerHTML={{ __html: browserTimingHeader }} 
      />
      <body className="bg-black text-white">
        <Navbar />
        <main className="min-h-screen pt-16 pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
