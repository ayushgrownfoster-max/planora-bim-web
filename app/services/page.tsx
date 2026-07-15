"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "BIM-01",
    title: "BIM Modeling & Coordination",
    category: "Modeling",
    description: "Architectural, structural, and mechanical models developed up to LOD 500 standards, integrated into automated spatial interference workflows to eliminate coordination overlaps before fabrication.",
    features: ["Component parameters mapping", "Geometry optimization", "Revit & IFC native files export", "Cross-trade clearance validation"]
  },
  {
    id: "S2B-02",
    title: "Scan to BIM",
    category: "Coordination",
    description: "Transformation of terrestrial laser scan raw point cloud data into structured, highly accurate intelligent BIM elements matching exact field as-built coordinate dimensions.",
    features: ["Point cloud feature extraction", "Millimeter-accuracy alignment", "As-built structural validation", "Deformation analysis overlays"]
  },
  {
    id: "VIS-03",
    title: "3D Visualization & Walkthroughs",
    category: "Visualization",
    description: "Immersive architectural viewports and photorealistic rendered walkthroughs designed to communicate project scaling, sequencing, and multi-tiered systems configurations.",
    features: ["Cinematic spatial fly-throughs", "High-fidelity engine rendering", "Interactive component overlays", "WebGL & SVG viewport rendering"]
  },
  {
    id: "TWN-04",
    title: "Digital Twins",
    category: "Advanced Technology",
    description: "Web-based interactive twins mapped directly to operational site sensor feeds. View structural assets, live parameter streams, and maintenance databases on a single dashboard canvas.",
    features: ["Real-time coordinate tracking", "BIM parameter synchronizers", "Live sensor tool integrations", "Asset properties panel"]
  },
  {
    id: "DOC-05",
    title: "Construction Documentation",
    category: "Engineering",
    description: "Extraction of precise, error-free field-ready shop drawings, structural calculations, material schedules, and isometric assemblies explicitly aligned with coordinated master files.",
    features: ["Automated coordinate auditing", "Custom dashboard tools", "Parametric quantity take-offs", "Sheet layout automated scripting"]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(servicesList[0]);

  return (
    // Outer page wrapper is set to relative to allow perfect positioning of the background lines
    <div className="bg-background text-on-background min-h-screen py-16 px-6 relative">

      {/* PAGE-WIDE ENGINEERING GRID PATTERN */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, #005ab3 1px, transparent 1px), linear-gradient(to bottom, #005ab3 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 0
        }}
      />

      {/* Main Content Layout Container */}
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 relative z-10">

        {/* Page Header Layout - Enforces identical height alignment on desktop viewports */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 border-b border-outline-variant/30 pb-8">

          {/* Header Left Content Panel - flex/h-full live directly on the stretched flex item */}
          <div className="flex-1 shrink-0 flex flex-col gap-6 h-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded">
                Our Offerings
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
                Our Specialized & <span className="text-electric-blue text-4xl sm:text-[45px]">BIM Services</span>
              </h1>
            </div>

            {/* Pushed to the bottom via mt-auto so it aligns flush with the image panel's bottom edge; gap-6 above guarantees a minimum gap from the heading */}
            <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed mt-auto">
              We deliver advanced digital solutions for complex architectural challenges. From high-fidelity modeling to integrated digital twins, our services ensure technical rigor and construction accuracy at every stage.
            </p>
          </div>

          {/* Header Right Image Box - Unaltered size dimensions preserved */}
          <div className="w-full md:w-[640px] h-80 sm:h-[352px] rounded-lg border border-outline-variant bg-surface-container overflow-hidden shrink-0 shadow-sm relative group">
            <img
              src="images/planora-bim-services-image.webp"
              alt="BIM Engineering Architecture"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay bg-gradient-to-tr from-primary to-transparent" />
          </div>

        </div>

        {/* Services Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Services Cards List (Left Side) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {servicesList.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-6 rounded border cursor-pointer transition-all duration-200 flex flex-col gap-3 ${isSelected
                    ? "border-electric-blue bg-surface-container-lowest/90 backdrop-blur-sm"
                    : "border-outline-variant bg-surface-container/80 hover:bg-surface-container-high/90 backdrop-blur-sm"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-wider bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/60">
                      {service.category}
                    </span>
                    <span className="text-[10px] font-mono text-secondary">{service.id}</span>
                  </div>
                  <h3 className={`text-base font-semibold ${isSelected ? "text-primary" : "text-on-surface"}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Viewport Inspector (Right Side) */}
          <div className="lg:col-span-5 bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant rounded-lg p-6 sticky top-24 flex flex-col gap-6">
            <div className="border-b border-outline-variant pb-4 flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-electric-blue uppercase">Service Specs</span>
              <h2 className="text-lg font-bold text-on-surface leading-snug">{selectedService.title}</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-secondary uppercase">Overview</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-secondary uppercase">Capabilities Included</span>
                <ul className="flex flex-col gap-2">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-on-surface">
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
              <span className="text-[10px] font-mono text-secondary">Ready to initiate?</span>
              <Link
                href="/contact"
                className="px-4 py-2 text-[11px] font-mono uppercase tracking-wider bg-primary hover:bg-primary-container text-white rounded transition-colors"
              >
                Inquire Service
              </Link>
            </div>
          </div>

        </div>

        {/* --- SECTION: Project Impact & Methodology Document Sheet --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-outline-variant/30 pt-12">

          {/* Left Side: Project Impact Overview */}
          <div className="lg:col-span-7 flex flex-col gap-6 pr-0 lg:pr-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-electric-blue uppercase tracking-wider">Case Dynamics</span>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">Project Impact</h2>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our Modeling approach systematically vectors field reliability down to geometry elements by identifying precise mechanical interferences during the pre-construction phase. By delivering a "Digital Twin" raw asset, systems management teams obtain actionable metrics operationalized at initial launch.
            </p>

            <ul className="flex flex-col gap-3 font-mono text-xs text-on-surface-variant border-l-2 border-outline-variant pl-4 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">01.</span>
                <span>Provisional variations tracked down to millimeter variations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">02.</span>
                <span>Seamless integration with modern schedules via automated updates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">03.</span>
                <span>Highly dynamic computational layout parameters built for speed.</span>
              </li>
            </ul>

            <blockquote className="border-t border-b border-outline-variant/50 py-4 my-2 italic text-xs text-on-surface-variant/80">
              "Planora BIM parameters cleared our multi-tiered installation pipelines with zero baseline interferences across five distinct phases of layout."
              <span className="block mt-1 font-mono text-[10px] uppercase tracking-wider text-secondary not-italic">— Lead Engineer, Global International Group</span>
            </blockquote>
          </div>

          {/* Right Side: Methodology Blueprint Block */}
          <div className="lg:col-span-5 bg-[#0D1117] text-slate-200 border border-slate-800 rounded-lg p-6 flex flex-col gap-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest">Workflow Matrix</span>
              <h3 className="text-base font-bold text-white tracking-tight">Methodology</h3>
            </div>

            <div className="flex flex-col gap-5">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-slate-800 text-electric-blue font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                  01
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-slate-100 font-sans">Audit Initiation</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Verification of IFC coordinates structures against baseline field dimensions.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-slate-800 text-electric-blue font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                  02
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-slate-100 font-sans">Core Modeling</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Elements mapped parameterization using automated high-fidelity scripts.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-slate-800 text-electric-blue font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                  03
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-slate-100 font-sans">BIM Coordination</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Rigorously deploying checking cycles to clear mechanical spatial overlap.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-slate-800 text-electric-blue font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                  04
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-slate-100 font-sans">Final Extract</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Export of optimized information packages to all team stakeholders.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}