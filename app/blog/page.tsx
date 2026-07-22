"use client";

import React, { useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  createdAt: string;
}

const CATEGORIES = ["All", "Modeling", "Coordination", "OpenBIM", "Revit", "General"];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => setPosts(data.blogs || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(
    (post) => filter === "All" || post.category === filter
  );

  return (
    // Outer page container relative to host the page-wide grid
    <div className="bg-background text-on-background min-h-screen py-16 px-6 relative">

      {/* PAGE-WIDE ENGINEERING GRID PATTERN (Matching original 0.05 intensity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, #005ab3 1px, transparent 1px), linear-gradient(to bottom, #005ab3 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 0
        }}
      />

      {/* Main Content Layout Container */}
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 relative z-10">

        {/* Page Header */}
        <div className="flex flex-col items-start gap-4">
          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded">
            Resources &amp; Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
            Technical Engineering Blog
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Technical guides, engineering workflows, and system integration strategies for BIM professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${filter === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-surface-container/80 border-outline hover:bg-surface-container-high/95 text-secondary backdrop-blur-sm"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant text-sm">
            No published articles yet. Check back soon.
          </div>
        )}

        {/* Blog Post Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant hover:border-electric-blue transition-colors duration-300 rounded-lg p-6 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-electric-blue uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono text-secondary">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-on-surface hover:text-primary transition-colors cursor-pointer leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-outline-variant pt-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-secondary">BY {post.author.toUpperCase()}</span>
                  <span className="text-primary hover:text-electric-blue transition-colors cursor-pointer uppercase tracking-wider">
                    Read Article &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}