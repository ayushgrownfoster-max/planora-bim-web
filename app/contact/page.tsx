"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    projectType: "BIM Coordination",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-on-background min-h-screen py-16 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">

        {/* Page Header Layout with Image Placed on the Right Side */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-outline-variant/30 pb-8">

          {/* Header Left Content Panel */}
          <div className="flex flex-col items-start gap-4 flex-1">
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded">
              Connect With Us
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Initiate Coordination
            </h1>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Let's align your architectural designs with our precision modeling systems. Drop your details below to schedule an IFC/RVT file audit.
            </p>
          </div>

          {/* Header Right Placeholder Image Box */}
          <div className="w-full md:w-[480px] h-48 rounded-lg border border-outline-variant bg-surface-container overflow-hidden shrink-0 shadow-sm relative group flex items-center justify-center">
            {/* Standard structural placeholder image element */}
            <img
              src="/images/contact-page-image.webp"
              alt="Initiate Coordination Map View Blueprint Placeholder"
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none mix-blend-overlay" />
            <div className="absolute font-mono text-[9px] uppercase text-on-surface-variant tracking-wider pointer-events-none bg-surface-container-lowest/80 px-2 py-1 rounded border border-outline-variant/40">
              [ Find Us ]
            </div>
          </div>

        </div>

        {/* Contact Form & Contact Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Contact Form (Left Side) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-on-surface">Request Synchronized</h3>
                <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                  Your project data has been submitted. A coordination specialist will contact you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", org: "", projectType: "BIM Coordination", message: "" }); }}
                  className="mt-4 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-surface-container border border-outline text-secondary rounded hover:bg-surface-container-high transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-secondary uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="px-3 py-2 text-xs rounded border border-outline bg-surface-container-lowest text-on-surface focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/40 w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-secondary uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elena@planora.xyz"
                      className="px-3 py-2 text-xs rounded border border-outline bg-surface-container-lowest text-on-surface focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/40 w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-secondary uppercase tracking-wider">Organization / Firm</label>
                    <input
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      placeholder="e.g. Planora Architecture"
                      className="px-3 py-2 text-xs rounded border border-outline bg-surface-container-lowest text-on-surface focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/40 w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-secondary uppercase tracking-wider">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="px-2 py-2 text-xs rounded border border-outline bg-surface-container-lowest text-on-surface focus:outline-none focus:border-electric-blue w-full"
                    >
                      <option value="BIM Coordination">BIM Coordination</option>
                      <option value="LOD 500 Modeling">LOD 500 Modeling</option>
                      <option value="Digital Twin Setup">Digital Twin Setup</option>
                      <option value="Custom Revit API">Custom Revit API</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-secondary uppercase tracking-wider">Project Scope / Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your model formats, coordinate references, and delivery timeline..."
                    className="px-3 py-2 text-xs rounded border border-outline bg-surface-container-lowest text-on-surface focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/40 w-full"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-primary hover:bg-primary-container text-white rounded transition-colors w-full md:w-auto"
                  >
                    Submit Project Details
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Office Details (Right Side) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Info Box 1 */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col gap-4">
              <span className="text-[10px] font-mono text-electric-blue uppercase">Global Headquarters</span>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="font-bold text-on-surface">Planora BIM Tech LLC</div>
                <div className="text-on-surface-variant">1440 Grid Axis Boulevard, Suite 400</div>
                <div className="text-on-surface-variant">Architectural District, Tech City</div>
              </div>
            </div>

            {/* Info Box 2 */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col gap-4 font-mono text-[11px]">
              <span className="text-[10px] font-mono text-electric-blue uppercase">Coordinate Systems</span>
              <div className="flex justify-between">
                <span className="text-secondary font-bold">IFC VALIDATION:</span>
                <span>IFC2x3, IFC4, IFC4.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary font-bold">TOLERANCE:</span>
                <span>±0.001m (Engine Limit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary font-bold">GRID SNAPPING:</span>
                <span>4px / 0.25m Baseline</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}