import React from "react";
import AdminSidebar from "./_components/AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Planora BIM",
  description: "Planora BIM Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#060e1c]" style={{ fontFamily: "var(--font-hanken-grotesk, Inter, sans-serif)" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto w-full">
        {children}
      </main>
    </div>
  );
}
