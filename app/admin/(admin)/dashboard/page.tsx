import React from "react";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import Blog from "@/lib/models/Blog";
import Link from "next/link";

interface StatCard {
  label: string;
  value: number;
  sub?: string;
  color: string;
  icon: React.ReactNode;
}

async function getStats() {
  await connectDB();

  const [totalContacts, newContacts, totalBlogs, publishedBlogs] = await Promise.all([
    Contact.countDocuments(),
    Contact.countDocuments({ status: "new" }),
    Blog.countDocuments(),
    Blog.countDocuments({ published: true }),
  ]);

  const recentContacts = await Contact.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const recentBlogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return { totalContacts, newContacts, totalBlogs, publishedBlogs, recentContacts, recentBlogs };
}

export default async function DashboardPage() {
  const { totalContacts, newContacts, totalBlogs, publishedBlogs, recentContacts, recentBlogs } =
    await getStats();

  const stats: StatCard[] = [
    {
      label: "Total Leads",
      value: totalContacts,
      sub: `${newContacts} new`,
      color: "from-blue-600 to-blue-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "New Leads",
      value: newContacts,
      sub: "Awaiting review",
      color: "from-emerald-600 to-emerald-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Blog Posts",
      value: totalBlogs,
      sub: `${totalBlogs - publishedBlogs} drafts`,
      color: "from-violet-600 to-violet-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      label: "Published",
      value: publishedBlogs,
      sub: "Live on site",
      color: "from-sky-600 to-sky-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.96 8.96 0 013 12c0-1.636.437-3.17 1.201-4.5" />
        </svg>
      ),
    },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    read: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    replied: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  return (
    <div className="p-6 lg:p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-blue-300/60 text-sm mt-1">Welcome to the Planora BIM Admin Console</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl p-5 flex items-center gap-4 hover:border-blue-700/50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-blue-300/70 font-medium">{stat.label}</div>
              {stat.sub && (
                <div className="text-[10px] text-blue-400/50 font-mono mt-0.5">{stat.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Contacts */}
        <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-800/30 flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">Recent Contact Leads</h2>
            <Link href="/admin/contacts" className="text-xs text-blue-400 hover:text-blue-300 font-mono uppercase tracking-wider transition-colors">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-blue-800/20">
            {recentContacts.length === 0 ? (
              <div className="px-6 py-8 text-center text-blue-400/40 text-sm">No contacts yet</div>
            ) : (
              recentContacts.map((c) => (
                <div key={String(c._id)} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-blue-900/10 transition-colors">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">{c.name}</div>
                    <div className="text-xs text-blue-300/50 truncate">{c.email}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-800/30 flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">Recent Blog Posts</h2>
            <Link href="/admin/blogs" className="text-xs text-blue-400 hover:text-blue-300 font-mono uppercase tracking-wider transition-colors">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-blue-800/20">
            {recentBlogs.length === 0 ? (
              <div className="px-6 py-8 text-center text-blue-400/40 text-sm">
                No blog posts yet.{" "}
                <Link href="/admin/blogs/new" className="text-blue-400 hover:text-blue-300 underline">
                  Create one
                </Link>
              </div>
            ) : (
              recentBlogs.map((b) => (
                <div key={String(b._id)} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-blue-900/10 transition-colors">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">{b.title}</div>
                    <div className="text-xs text-blue-300/50 font-mono">{b.category} · {b.author}</div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0 uppercase ${b.published ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}`}>
                    {b.published ? "Live" : "Draft"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
