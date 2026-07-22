"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const BlogEditor = dynamic(() => import("../../_components/BlogEditor"), { ssr: false });

const CATEGORIES = ["Modeling", "Coordination", "OpenBIM", "Revit", "General"];

export default function NewBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "General",
    coverImage: "",
    published: false,
  });
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (publishOverride?: boolean) => {
    const shouldPublish = publishOverride ?? form.published;

    if (!form.title.trim() || !form.excerpt.trim() || !form.author.trim() || !content.trim()) {
      setError("Title, excerpt, author, and content are required.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, content, published: shouldPublish }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save post");
        return;
      }

      router.push("/admin/blogs");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 text-blue-400/60 hover:text-blue-300 hover:bg-blue-800/30 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">New Blog Post</h1>
            <p className="text-blue-300/60 text-sm mt-0.5">Write and publish a new article</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            id="save-draft-btn"
            className="px-4 py-2 text-sm font-medium text-blue-300 border border-blue-700/50 hover:bg-blue-800/30 rounded-lg transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            id="publish-btn"
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-900/20 border border-red-700/40 text-red-300 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main editor column */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="blog-title" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
              Post Title *
            </label>
            <input
              id="blog-title"
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Understanding LOD 500 in BIM Workflows"
              className="px-4 py-3 text-base rounded-xl bg-blue-950/50 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-semibold"
            />
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="blog-excerpt" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
              Excerpt / Summary *
            </label>
            <textarea
              id="blog-excerpt"
              rows={2}
              required
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="A brief summary shown on the blog listing page..."
              className="px-4 py-3 text-sm rounded-xl bg-blue-950/50 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
            />
          </div>

          {/* Tiptap Editor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
              Blog Content *
            </label>
            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Author */}
          <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Post Details</h3>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="blog-author" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
                Author *
              </label>
              <input
                id="blog-author"
                type="text"
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Elena Rostova"
                className="px-3 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="blog-category" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
                Category *
              </label>
              <select
                id="blog-category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="px-3 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="blog-cover" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">
                Cover Image URL
              </label>
              <input
                id="blog-cover"
                type="url"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="px-3 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
              {form.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden border border-blue-700/30 h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImage} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
          </div>

          {/* Publish status */}
          <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Publish</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-300/70">Status</span>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase ${form.published ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}`}>
                {form.published ? "Will publish" : "Draft"}
              </span>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50"
              >
                Publish Now
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full px-4 py-2.5 text-sm font-medium text-blue-300 border border-blue-700/50 hover:bg-blue-800/20 rounded-lg transition-all disabled:opacity-50"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
