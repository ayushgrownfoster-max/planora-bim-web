"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  org: string;
  projectType: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const STATUS_OPTIONS = ["all", "new", "read", "replied"] as const;

const statusConfig = {
  new: { label: "New", classes: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  read: { label: "Read", classes: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  replied: { label: "Replied", classes: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
};

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => fetchContacts(), 300);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: status as Contact["status"] } : c))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact lead? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Leads</h1>
          <p className="text-blue-300/60 text-sm mt-1">{contacts.length} leads found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            id="contact-search"
            placeholder="Search name, email, org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-blue-950/60 border border-blue-700/40 text-white placeholder-blue-400/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all ${
                statusFilter === s
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-blue-950/40 border-blue-700/30 text-blue-300/60 hover:text-blue-200 hover:border-blue-600/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d1f40]/70 border border-blue-800/30 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-20 text-center text-blue-400/40">No contacts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-800/30">
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Name / Email</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden md:table-cell">Organization</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden lg:table-cell">Project Type</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono text-blue-400/60 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-6 py-3 text-right text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800/20">
                {contacts.map((contact) => (
                  <React.Fragment key={contact._id}>
                    <tr className="hover:bg-blue-900/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm text-white">{contact.name}</div>
                        <div className="text-xs text-blue-300/50">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-200/70 hidden md:table-cell">
                        {contact.org || <span className="text-blue-400/30 italic">—</span>}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs font-mono text-blue-300/60 bg-blue-900/30 px-2 py-0.5 rounded">
                          {contact.projectType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          disabled={updatingId === contact._id}
                          onChange={(e) => updateStatus(contact._id, e.target.value)}
                          className={`text-[10px] font-mono px-2 py-1 rounded-full border uppercase bg-transparent cursor-pointer focus:outline-none transition-all ${statusConfig[contact.status].classes}`}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-xs text-blue-400/50 font-mono hidden sm:table-cell">
                        {new Date(contact.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setExpandedId(expandedId === contact._id ? null : contact._id)}
                            className="p-1.5 text-blue-400/60 hover:text-blue-300 hover:bg-blue-800/40 rounded transition-colors"
                            title="View message"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteContact(contact._id)}
                            disabled={deletingId === contact._id}
                            className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors disabled:opacity-40"
                            title="Delete lead"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded message row */}
                    {expandedId === contact._id && (
                      <tr className="bg-blue-900/10">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="bg-[#060e1c]/60 border border-blue-800/30 rounded-lg p-4">
                            <div className="text-[10px] font-mono text-blue-400/50 uppercase tracking-wider mb-2">Project Scope / Message</div>
                            <p className="text-sm text-blue-100/80 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
