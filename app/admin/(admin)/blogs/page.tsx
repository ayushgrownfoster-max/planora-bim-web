"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  excerpt: string;
}

const categoryColors: Record<string, string> = {
  Modeling: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Coordination: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  OpenBIM: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Revit: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  General: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

export default function BlogsAdminPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !current }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b._id === id ? { ...b, published: !current } : b))
        );
      }
    } finally {
      setTogglingId(null);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) setBlogs((prev) => prev.filter((b) => b._id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-blue-300/60 text-sm mt-1">{blogs.length} posts total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          id="new-blog-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Blog Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-blue-400/40 mb-4">No blog posts yet</p>
            <Link href="/admin/blogs/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-800/30">
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden lg:table-cell">Author</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-6 py-3 text-right text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800/20">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm text-white line-clamp-1 max-w-[260px]">{blog.title}</div>
                      <div className="text-xs text-blue-300/40 mt-0.5 line-clamp-1 max-w-[260px]">{blog.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${categoryColors[blog.category] || categoryColors.General}`}>
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-200/60 hidden lg:table-cell">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(blog._id, blog.published)}
                        disabled={togglingId === blog._id}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase transition-all disabled:opacity-50 ${
                          blog.published
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30"
                        }`}
                        title={blog.published ? "Click to unpublish" : "Click to publish"}
                      >
                        {blog.published ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-blue-400/50 font-mono hidden sm:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/blogs/${blog._id}/edit`)}
                          className="p-1.5 text-blue-400/60 hover:text-blue-300 hover:bg-blue-800/40 rounded transition-colors"
                          title="Edit post"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          disabled={deletingId === blog._id}
                          className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors disabled:opacity-40"
                          title="Delete post"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
