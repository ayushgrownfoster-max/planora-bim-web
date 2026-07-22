"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Contact Leads",
    href: "/admin/contacts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Blog Posts",
    href: "/admin/blogs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: "New Blog Post",
    href: "/admin/blogs/new",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  const renderNavContent = (isMobile: boolean = false) => {
    return (
      <>
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-blue-900/40">
          {(!collapsed || isMobile) && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-wide">PLANORA</span>
                <span className="text-blue-400 text-[9px] font-mono tracking-widest uppercase">Admin</span>
              </div>
            </div>
          )}
          {!isMobile ? (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-7 h-7 flex items-center justify-center rounded text-blue-400 hover:text-white hover:bg-blue-800/40 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                )}
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setMobileOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded text-blue-400 hover:text-white hover:bg-blue-800/40 transition-colors"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                onClick={() => isMobile && setMobileOpen(false)}
                className={`flex items-center ${collapsed && !isMobile ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-blue-200/70 hover:bg-blue-800/40 hover:text-white"
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-blue-400 group-hover:text-white"} transition-colors`}>
                  {item.icon}
                </span>
                {(!collapsed || isMobile) && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer — View Site + Logout */}
        <div className="p-3 border-t border-blue-900/40 flex flex-col gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View Site"
            className={`flex items-center ${collapsed && !isMobile ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-lg text-sm text-blue-300/60 hover:text-blue-200 hover:bg-blue-800/30 transition-all`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {(!collapsed || isMobile) && <span>View Site</span>}
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Logout"
            className={`flex items-center ${collapsed && !isMobile ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-300 hover:bg-red-900/20 transition-all disabled:opacity-50`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {(!collapsed || isMobile) && <span>{loggingOut ? "Logging out..." : "Logout"}</span>}
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden w-full h-16 bg-[#0a1628] border-b border-blue-900/40 flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-sm tracking-wide">PLANORA</span>
            <span className="text-blue-400 text-[9px] font-mono tracking-widest uppercase">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-blue-400 hover:text-white hover:bg-blue-800/40 rounded transition-colors"
          aria-label="Open navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Backplane / Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0a1628] to-[#0d1f40] border-r border-blue-900/40 flex flex-col transform transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "var(--font-hanken-grotesk, sans-serif)" }}
      >
        {renderNavContent(true)}
      </aside>

      {/* Desktop Sidebar (Docked) */}
      <aside
        className={`hidden md:flex ${collapsed ? "w-16" : "w-64"} transition-all duration-300 flex-shrink-0 min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0d1f40] border-r border-blue-900/40 flex flex-col sticky top-0 max-h-screen`}
        style={{ fontFamily: "var(--font-hanken-grotesk, sans-serif)" }}
      >
        {renderNavContent(false)}
      </aside>
    </>
  );
}

