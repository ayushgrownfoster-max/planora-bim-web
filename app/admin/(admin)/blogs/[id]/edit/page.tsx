"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const BlogEditor = dynamic(() => import("../../../_components/BlogEditor"), { ssr: false });

const CATEGORIES = ["Modeling", "Coordination", "OpenBIM", "Revit", "General"];

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>("");

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "General",
    coverImage: "",
    published: false,
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/admin/blogs`)
        .then((r) => r.json())
        .then((data) => {
          const blog = (data.blogs || []).find((b: { _id: string }) => b._id === resolvedId);
          if (blog) {
            setForm({
              title: blog.title,
              excerpt: blog.excerpt,
              author: blog.author,
              category: blog.category,
              coverImage: blog.coverImage || "",
              published: blog.published,
            });
            setContent(blog.content || "");
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    });
  }, [params]);

  const handleSave = async (publishOverride?: boolean) => {
    const shouldPublish = publishOverride ?? form.published;

    if (!form.title.trim() || !form.excerpt.trim() || !form.author.trim() || !content.trim()) {
      setError("Title, excerpt, author, and content are required.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, content, published: shouldPublish }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update post");
        return;
      }

      router.push("/admin/blogs");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
            <p className="text-blue-300/60 text-sm mt-0.5 line-clamp-1 max-w-md">{form.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-blue-300 border border-blue-700/50 hover:bg-blue-800/30 rounded-lg transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
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
              form.published ? "Update & Publish" : "Publish Post"
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
        {/* Main editor */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-title" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Post Title *</label>
            <input
              id="edit-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-3 text-base rounded-xl bg-blue-950/50 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-excerpt" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Excerpt *</label>
            <textarea
              id="edit-excerpt"
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="px-4 py-3 text-sm rounded-xl bg-blue-950/50 border border-blue-700/40 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Blog Content *</label>
            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Post Details</h3>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-author" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Author *</label>
              <input
                id="edit-author"
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="px-3 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-category" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Category</label>
              <select
                id="edit-category"
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
              <label htmlFor="edit-cover" className="text-[10px] font-mono text-blue-300/60 uppercase tracking-widest">Cover Image URL</label>
              <input
                id="edit-cover"
                type="url"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="px-3 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/25 focus:outline-none focus:border-blue-500 transition-all"
              />
              {form.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden border border-blue-700/30 h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImage} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Publish</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-300/70">Current Status</span>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase ${form.published ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}`}>
                {form.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => handleSave(true)} disabled={saving} className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50">
                {form.published ? "Update & Keep Live" : "Publish Now"}
              </button>
              {form.published && (
                <button onClick={() => handleSave(false)} disabled={saving} className="w-full px-4 py-2.5 text-sm font-medium text-yellow-300/70 border border-yellow-700/30 hover:bg-yellow-900/10 rounded-lg transition-all disabled:opacity-50">
                  Revert to Draft
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
