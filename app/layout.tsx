"use client";

import React, { useState } from "react";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background font-sans">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between relative">

            {/* Logo Container */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/Planora-BIM-Logo.webp"
                  alt="Planora Logo Mark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center leading-none select-none">
                <span className="font-sans font-bold text-xl tracking-wide text-electric-blue uppercase">
                  Planora
                </span>
                <span className="font-sans font-extrabold text-[11px] tracking-[0.24em] text-on-surface-variant uppercase mt-0.5">
                  Bim Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
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

            {/* Mobile Menu Action Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors focus:outline-none"
              aria-label="Toggle navigation drawer menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            {/* Mobile Dropdown Menu Panel Overlay */}
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 w-full bg-surface-container-lowest border-b border-outline-variant px-6 py-6 flex flex-col gap-4 shadow-xl md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/"
                  className="text-sm font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue py-2 border-b border-outline-variant/30 transition-colors"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/services"
                  className="text-sm font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue py-2 border-b border-outline-variant/30 transition-colors"
                >
                  Services
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/blog"
                  className="text-sm font-mono uppercase tracking-wider text-on-surface-variant hover:text-electric-blue py-2 border-b border-outline-variant/30 transition-colors"
                >
                  Technical Blog
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/contact"
                  className="w-full text-center py-3 text-xs font-mono uppercase tracking-wider bg-primary hover:bg-primary-container text-white rounded transition-colors mt-2"
                >
                  Contact Us
                </Link>
              </div>
            )}

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
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface mb-6 font-sans leading-snug">
                Our teams stand ready to deploy end-to-end for scanning, modeling and strategic BIM consulting.
              </h2>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-outline text-xs font-mono uppercase tracking-wider text-on-surface bg-surface hover:bg-surface-container-high transition-colors rounded-none w-full sm:w-auto text-center"
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