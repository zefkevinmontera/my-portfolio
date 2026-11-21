"use client";

import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Tome Book Discovery",
    role: "Full-Stack Web App",
    year: "2026",
    image: "/projects/tome.png",
    summary:
      "Full-stack book discovery and personal reading management platform. Users search millions of titles via the Google Books API, persist reading statuses and custom shelves in Supabase, and store private notes inside their personal 'Grimoire'.",
    architecture: "Next.js 16 App Router → Google Books REST API → Supabase Auth & Postgres (RLS).",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://tome-book-discovery.vercel.app/",
  },
  {
    id: "02",
    title: "World Explorer",
    role: "Frontend Web App",
    year: "2025",
    image: "/projects/world-explorer.png",
    summary:
      "Interactive travel and discovery web application showcasing iconic global landmarks including the Great Wall of China, Petra, and Machu Picchu. Engineered with zero-dependency semantic HTML5 and modern CSS for instant load times.",
    architecture: "Semantic HTML5 → Custom CSS Grid / Flex → Vercel Edge CDN.",
    stack: ["HTML5", "CSS3", "Responsive Grid"],
    liveUrl: "https://worldwonders-chi.vercel.app/",
  },
];

export function FeaturedProjects() {
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-20 sm:py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            02 / Selected Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Featured Projects
          </h2>
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          Click any project row to expand dossier
        </span>
      </div>

      <div className="divide-y border-y" style={{ borderColor: "var(--border)" }}>
        {PROJECTS.map((project) => {
          const isOpen = openId === project.id;

          return (
            <div key={project.id} style={{ borderColor: "var(--border)" }}>
              {/* Clickable Index Row */}
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : project.id)}
                className="group w-full py-5 px-3 flex items-center justify-between text-left
                           transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:bg-[var(--surface-hover)] cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {project.id}
                  </span>
                  <span className="text-base sm:text-lg font-medium tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                    {project.title}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className="hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded-full border"
                    style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                  >
                    {project.role}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {project.year}
                  </span>
                  <span
                    className={`font-mono text-base transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Smooth Accordion Drawer */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-sm"
                    style={{ backgroundColor: "var(--surface)" }}
                  >
                    {/* Preview Image */}
                    <div
                      className="lg:col-span-5 relative aspect-[16/10] rounded-xl border overflow-hidden"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                    >
                      {!brokenImages[project.id] ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          onError={() =>
                            setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-1">
                          <span className="font-mono text-xs font-medium">
                            Screenshot Slot
                          </span>
                          <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                            public{project.image}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description & Architecture */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
                          {project.summary}
                        </p>
                        <p
                          className="text-xs font-mono p-2.5 rounded-lg border"
                          style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--bg)",
                            color: "var(--fg)",
                          }}
                        >
                          Stack Flow: {project.architecture}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md border"
                              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-85"
                          style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}
                        >
                          Visit Live Site ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}