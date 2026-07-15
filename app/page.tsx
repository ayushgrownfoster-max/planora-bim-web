"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Hanken_Grotesk, JetBrains_Mono, Great_Vibes } from "next/font/google";

// Initialize the cursive font
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

interface BIMPhaseNode {
  id: string;
  phaseName: string;
  milestone: string;
  progress: number; // 0 to 100
  clashesDetected: number;
  costEfficiency: number; // Percentage index
  x: number; // SVG coordinate percent
  y: number; // SVG coordinate percent
}

export default function Home() {
  // Live simulated values
  const [liveSyncRate, setLiveSyncRate] = useState<number>(98.4);
  const [liveLatency, setLiveLatency] = useState<number>(120);
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Business and domain-oriented workflow milestones for Planora BIM
  const [nodes, setNodes] = useState<BIMPhaseNode[]>([
    { id: "P1", phaseName: "Concept & Modeling", milestone: "LOD 300 Schema", progress: 95, clashesDetected: 142, costEfficiency: 88, x: 15, y: 70 },
    { id: "P2", phaseName: "Clash Resolution", milestone: "MEP/Structural Audit", progress: 82, clashesDetected: 4, costEfficiency: 94, x: 38, y: 35 },
    { id: "P3", phaseName: "Cost & 5D Estimation", milestone: "Material Takeoffs QTO", progress: 60, clashesDetected: 0, costEfficiency: 97, x: 62, y: 55 },
    { id: "P4", phaseName: "Site Twin Delivery", milestone: "As-Built Handover", progress: 40, clashesDetected: 0, costEfficiency: 99, x: 85, y: 20 },
  ]);

  const [selectedNode, setSelectedNode] = useState<BIMPhaseNode>(nodes[1]); // Default to Clash Resolution

  // Auto-cycle nodes dynamically to keep the hero section lively
  const resetAutoCycleTimer = () => {
    if (autoCycleTimerRef.current) {
      clearInterval(autoCycleTimerRef.current);
    }
    autoCycleTimerRef.current = setInterval(() => {
      setSelectedNode(prev => {
        const currentIndex = nodes.findIndex(node => node.id === prev.id);
        const nextIndex = (currentIndex + 1) % nodes.length;
        return nodes[nextIndex];
      });
    }, 5000);
  };

  // Run on mount
  useEffect(() => {
    resetAutoCycleTimer();
    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
    };
  }, [nodes]);

  // Simulate real-time fluctuating telemetry data 
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate sync rate slightly
      setLiveSyncRate(prev => {
        const next = prev + (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.min(100, Math.max(95, next)).toFixed(2));
      });

      // Fluctuate processing latency
      setLiveLatency(prev => {
        const delta = Math.floor((Math.random() - 0.5) * 15);
        return Math.min(250, Math.max(80, prev + delta));
      });

      // Fluctuate progress/clashes dynamically for the active node
      setNodes(prevNodes =>
        prevNodes.map(node => {
          if (node.id === "P2") {
            const dynamicClashes = Math.max(0, node.clashesDetected + (Math.random() > 0.85 ? -1 : Math.random() > 0.9 ? 1 : 0));
            return { ...node, clashesDetected: dynamicClashes };
          }
          return node;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node: BIMPhaseNode) => {
    setSelectedNode(node);
    resetAutoCycleTimer();
  };

  return (
    <div className="bg-background text-on-background min-h-screen w-full">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-outline-variant py-24 px-6 w-full">
        {/* Clean Static Engineering Grid Pattern (Removed layout-breaking custom style tags) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to right, #005ab3 1px, transparent 1px), linear-gradient(to bottom, #005ab3 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            zIndex: 1
          }}
        />

        {/* Diagonal Soft Glow Radial Accent */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Outer Layout Container */}
        <div
          className="max-w-[1440px] mx-auto relative w-full flex flex-row flex-wrap gap-10 items-center justify-between"
          style={{ zIndex: 10 }}
        >

          {/* Hero Content Panel */}
          <div className="flex-1 flex flex-col gap-6 min-w-[320px] max-w-[600px] break-words">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/25 rounded-full flex items-center gap-1.5 self-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                High-Precision BIM Digital Twins
              </span>
              <span className="text-[10px] font-mono text-secondary uppercase tracking-wider opacity-60">
                v2.4 Core Engine Active
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.12] font-sans">
              Precision, <br />
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                BIM & Digital Twin.
              </span>
              <span className="block font-light italic text-on-surface-variant font-sans mt-3 text-3xl sm:text-4xl">
                Architectural Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-[540px]">
              Planora is an engineering-grade digital twin showcase platform. We render architectural layouts, detect structural collisions in real time, and snap coordinates directly to a 4px structural baseline grid.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/services"
                className="px-6 py-3 text-xs font-mono uppercase tracking-wider bg-primary hover:bg-opacity-90 text-white rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-primary/10"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 text-xs font-mono uppercase tracking-wider border border-outline hover:bg-surface-container text-on-surface rounded transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>

          {/* Interactive BIM Engine Canvas Widget */}
          <div className="flex-1 min-w-[320px] max-w-[550px] bg-surface-container rounded-lg border border-outline-variant p-6 transition-all duration-300 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-secondary uppercase tracking-wider">Planora BIM Engine</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-secondary">
                <span>SYNC: <strong className="text-emerald-400">{liveSyncRate}%</strong></span>
                <span>LATENCY: <strong className="text-blue-400">{liveLatency}ms</strong></span>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="h-56 bg-[#10141d] rounded border border-outline-variant relative overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(to right, #4a88ff 1px, transparent 1px), linear-gradient(to bottom, #4a88ff 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />

              <svg className="w-full h-full overflow-visible p-4">
                {/* Connection paths mapping development progression */}
                {nodes.map((node, i) => {
                  if (i === nodes.length - 1) return null;
                  const nextNode = nodes[i + 1];
                  const isTransitionActive = selectedNode.id === node.id || selectedNode.id === nextNode.id;
                  return (
                    <g key={`line-group-${node.id}`}>
                      {/* Glow effect for line */}
                      {isTransitionActive && (
                        <line
                          x1={`${node.x}%`}
                          y1={`${node.y}%`}
                          x2={`${nextNode.x}%`}
                          y2={`${nextNode.y}%`}
                          stroke="#0a84ff"
                          strokeWidth={4}
                          strokeLinecap="round"
                          className="opacity-40 blur-sm transition-all duration-500"
                        />
                      )}
                      <line
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${nextNode.x}%`}
                        y2={`${nextNode.y}%`}
                        stroke={isTransitionActive ? "#0a84ff" : "#2d3748"}
                        strokeWidth={isTransitionActive ? 2 : 1.5}
                        strokeDasharray={isTransitionActive ? "0" : "4 4"}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Nodes representing specific lifecycles */}
                {nodes.map(node => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <g key={node.id} className="cursor-pointer" onClick={() => handleNodeClick(node)}>
                      {/* Active outer pulse ring */}
                      {isSelected && (
                        <circle
                          cx={`${node.x}%`}
                          cy={`${node.y}%`}
                          r={14}
                          fill="none"
                          stroke="#0a84ff"
                          strokeWidth={1.5}
                          className="animate-ping opacity-25"
                        />
                      )}

                      {/* Selection highlight ring */}
                      <circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={isSelected ? 9 : 6}
                        fill={isSelected ? "#0a84ff" : "#10141d"}
                        stroke={isSelected ? "#ffffff" : "#475569"}
                        strokeWidth={2}
                        className="transition-all duration-300 hover:scale-125"
                      />

                      {/* Floating Phase ID labels inside the SVG graph */}
                      <text
                        x={`${node.x}%`}
                        y={`${node.y - 14}%`}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#64748b"}
                        className="font-mono text-[9px] font-bold select-none transition-colors duration-300"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* BIM Phase Inspector Card */}
            <div className="bg-surface-container-low p-4 rounded border border-outline-variant flex flex-col gap-2 font-mono text-[11px] transition-all duration-300">
              <div className="flex justify-between items-center border-b border-outline-variant/40 pb-1.5 mb-1">
                <span className="text-secondary text-[10px] uppercase">LIFECYCLE FOCUS:</span>
                <span className="font-bold text-blue-400 text-[12px] animate-pulse">{selectedNode.phaseName} ({selectedNode.id})</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex flex-col">
                  <span className="text-secondary text-[9px]">TARGET MILESTONE:</span>
                  <span className="text-on-surface font-semibold">{selectedNode.milestone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary text-[9px]">ENGINE PROGRESS:</span>
                  <span className="text-on-surface font-semibold">{selectedNode.progress}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary text-[9px]">SYSTEM UNRESOLVED CLASHES:</span>
                  <span className={`font-semibold ${selectedNode.clashesDetected > 0 ? "text-red-400" : "text-emerald-400"}`}>
                    {selectedNode.clashesDetected} Detected
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary text-[9px]">COST EFFICIENCY RATIO:</span>
                  <span className="text-emerald-400 font-semibold">{selectedNode.costEfficiency}% Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Values Section */}
      <section className="py-20 px-6 max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded px-2.5 py-0.5">
            Engine Capabilities
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">
            Designed for Architectural Structural Rigor
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Our technology aligns seamlessly to industry standards, optimizing CAD layouts to accelerate delivery and prevent build site clashes.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* Card 1 (Spreads horizontally, spans 2 grid columns on desktop) */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant hover:border-primary transition-colors duration-300 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Left Side: Icon */}
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25Z" />
                </svg>
              </div>
              {/* Right Side: Text layout spread horizontally */}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">4px Baseline Grid Snapping</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Every structural layout is snapped directly to an exact baseline grid. No alignment errors or floating components during rendering. This alignment mechanism guarantees spatial precision and streamlines translation from blueprint layouts to real-time structural pipelines.
                </p>
              </div>
            </div>

            {/* Bottom Footer Section with Priority Label & Learn More */}
            <div className="border-t border-outline-variant pt-4 mt-6 flex items-center justify-between">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest">System Engine Priority</span>
              <Link
                href="/baseline-grid"
                className="text-xs font-semibold text-primary hover:text-blue-500 transition-colors flex items-center gap-1"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column (Cards 2 & 3 - Spaced vertically to match Card 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant hover:border-primary transition-colors duration-300 flex flex-col justify-between gap-6">
              <div>
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-on-surface mb-2">Clash Detection Matrix</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Real-time clash detection engine highlights overlap matrices between structural, mechanical, plumbing and architectural models.
                </p>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/clash-detection"
                  className="text-xs font-semibold text-primary hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant hover:border-primary transition-colors duration-300 flex flex-col justify-between gap-6">
              <div>
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H9.75m0 18.75h-2t-2-2v-9a2 2 0 0 1 2-2h2m0-3h-2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-on-surface mb-2">Universal IFC & RVT Files</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Native integration imports and processes Revit (.rvt), Industry Foundation Classes (.ifc), and AutoCAD files without metadata loss.
                </p>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/file-integration"
                  className="text-xs font-semibold text-primary hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trusted by Industry Leaders Section */}
      <section className="py-20 px-6 max-w-[1440px] mx-auto border-t border-outline-variant">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface text-center mb-12">
          Trusted by Industry Leaders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant flex flex-col gap-6 relative">
            <span className="text-5xl font-serif text-primary/20 absolute top-4 left-6 pointer-events-none">“</span>
            <p className="text-sm text-on-surface-variant leading-relaxed relative z-10 pt-4">
              "Planora's attention to detail can record 50,000 sq ft with 100-mm accuracy. Their OpenBIM baseline features prevented weeks of manual server syncs and architectural crash clashes."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/60">
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
                  alt="Daniel Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-on-surface">Daniel Chen</h4>
                <p className="text-xs text-on-surface-variant">Lead Architect, GRID Group</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant flex flex-col gap-6 relative">
            <span className="text-5xl font-serif text-primary/20 absolute top-4 left-6 pointer-events-none">“</span>
            <p className="text-sm text-on-surface-variant leading-relaxed relative z-10 pt-4">
              "The digital twins we developed for our global headquarters allowed contractors to tackle operations problems. It's a living tool for sustainability."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/60">
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
                  alt="Sarah Jowling"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-on-surface">Sarah Jowling</h4>
                <p className="text-xs text-on-surface-variant">Director of Operations, Build Corp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Banner */}
      <section className="bg-surface-container py-16 px-6 border-t border-b border-outline-variant">
        <div
          className="max-w-[1440px] mx-auto flex flex-wrap gap-8 justify-around text-center"
        >
          <div className="flex flex-col gap-1 transition-transform duration-300 hover:scale-105 flex-[1_1_180px]">
            <div className="text-3xl font-extrabold text-primary font-sans">99.9%</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-secondary">Clashes Resolved</div>
          </div>
          <div className="flex flex-col gap-1 transition-transform duration-300 hover:scale-105 flex-[1_1_180px]">
            <div className="text-3xl font-extrabold text-primary font-sans">4.5s</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-secondary">Engine Render Speed</div>
          </div>
          <div className="flex flex-col gap-1 transition-transform duration-300 hover:scale-105 flex-[1_1_180px]">
            <div className="text-3xl font-extrabold text-primary font-sans">15,000+</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-secondary">Active Digital Twins</div>
          </div>
          <div className="flex flex-col gap-1 transition-transform duration-300 hover:scale-105 flex-[1_1_180px]">
            <div className="text-3xl font-extrabold text-primary font-sans">100%</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-secondary">OpenBIM Standard Compliant</div>
          </div>
        </div>
      </section>

    </div>
  );
}