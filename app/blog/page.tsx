"use client";

import React, { useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: "Modeling" | "Coordination" | "OpenBIM" | "Revit";
  date: string;
  author: string;
}

const postsList: Post[] = [
  {
    id: "POST-01",
    title: "Understanding LOD 500: The Highest Precision Level in BIM",
    excerpt: "What does Level of Development 500 imply? In this deep-dive, we analyze coordinate tolerances, layout validation, and standard asset parameters.",
    category: "Modeling",
    date: "2026-07-10",
    author: "Elena Rostova (BIM Principal)"
  },
  {
    id: "POST-02",
    title: "How We Optimized Collision Matrix Checks on a 20-Story Twin",
    excerpt: "Learn how real-time intersection calculations cut clash resolution duration by 42% on our latest mixed-use structural model project.",
    category: "Coordination",
    date: "2026-06-28",
    author: "Marcello V. (Lead Engineer)"
  },
  {
    id: "POST-03",
    title: "Transitioning from Revit to OpenBIM IFC: Standards & Best Practices",
    excerpt: "An in-depth workflow detailing export coordinate matching, structural parameter map mapping, and schema checks using IFC 4.3.",
    category: "OpenBIM",
    date: "2026-06-15",
    author: "Siddharth Nair (Systems Architect)"
  },
  {
    id: "POST-04",
    title: "Custom Revit API Add-Ins: Automating Grid Alignments",
    excerpt: "Building custom C# macros to snap grid nodes to a 4px baseline. Read this step-by-step developer tutorial with code snippets.",
    category: "Revit",
    date: "2026-05-30",
    author: "Elena Rostova (BIM Principal)"
  }
];

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredPosts = postsList.filter(
    (post) => filter === "All" || post.category === filter
  );

  return (
    <div className="bg-background text-on-background min-h-screen py-16 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        
        {/* Page Header */}
        <div className="flex flex-col items-start gap-4">
          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded">
            Resources & Insights
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
          {["All", "Modeling", "Coordination", "OpenBIM", "Revit"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                filter === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-surface-container border-outline hover:bg-surface-container-high text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-surface-container-lowest border border-outline-variant hover:border-electric-blue transition-colors duration-300 rounded-lg p-6 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-electric-blue uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-mono text-secondary">{post.date}</span>
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

      </div>
    </div>
  );
}
