import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import Footer from "./components/footer/footer";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Planora BIM Tech - Blueprint Precision Reimagined",
  description: "High-density collaborative digital twin and BIM modeling suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background font-sans">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">

            {/* Logo Container */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Increased Logo Icon Mark Dimensions */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/Planora-BIM-Logo.webp"
                  alt="Planora Logo Mark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Scaled Branding Typography to match the new image size */}
              <div className="flex flex-col justify-center leading-none select-none">
                <span className="font-sans font-bold text-xl tracking-wide text-electric-blue uppercase">
                  Planora
                </span>
                <span className="font-sans font-extrabold text-[11px] tracking-[0.24em] text-on-surface-variant uppercase mt-0.5">
                  Bimtech
                </span>
              </div>
            </Link>

            {/* Menu Links */}
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-xs font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-xs font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue transition-colors">
                Services
              </Link>
              <Link href="/blog" className="text-xs font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue transition-colors">
                Technical Blog
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-primary hover:bg-primary-container text-white rounded transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Schedule a Demo Banner */}
        <section className="w-full bg-surface-container-low border-t border-outline-variant py-16 px-6">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface mb-6 font-sans">
                Our teams stand ready to deploy end-to-end for scanning, modeling and strategic BIM consulting.
              </h2>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-outline text-xs font-mono uppercase tracking-wider text-on-surface bg-surface hover:bg-surface-container-high transition-colors rounded-none"
              >
                Schedule a Demo Call
              </Link>
            </div>
          </div>
        </section>

        {/* External Footer Component */}
        <Footer />
      </body>
    </html>
  );
}