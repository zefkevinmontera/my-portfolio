"use client";

import { useState } from "react";

type SkillCategory = "All" | "Languages" | "Tools" | "Cloud";

const SKILLS = [
  { name: "TypeScript", category: "Languages", tag: "Type-Safe JS", pairsWith: ["Next.js", "Tailwind CSS", "Supabase", "VS Code"] },
  { name: "JavaScript (ES6+)", category: "Languages", tag: "Core Web", pairsWith: ["HTML5 & CSS3", "Next.js", "Firebase", "Netlify"] },
  { name: "Next.js", category: "Languages", tag: "Full-Stack React", pairsWith: ["TypeScript", "Tailwind CSS", "Supabase", "Vercel"] },
  { name: "Tailwind CSS", category: "Languages", tag: "Utility CSS", pairsWith: ["Next.js", "TypeScript", "Figma", "HTML5 & CSS3"] },
  { name: "HTML5 & CSS3", category: "Languages", tag: "Semantic Web", pairsWith: ["JavaScript (ES6+)", "Tailwind CSS", "Figma", "Netlify"] },
  { name: "Java", category: "Languages", tag: "OOP / Backend", pairsWith: ["Kotlin", "Android Studio", "Git & GitHub"] },
  { name: "Kotlin", category: "Languages", tag: "Android", pairsWith: ["Java", "Android Studio", "Firebase"] },
  { name: "Gemini / Claude / ChatGPT", category: "Tools", tag: "AI Dev Workflow", pairsWith: ["VS Code", "Next.js", "TypeScript", "Supabase"] },
  { name: "Git & GitHub", category: "Tools", tag: "Version Control", pairsWith: ["Vercel", "Netlify", "VS Code", "Next.js"] },
  { name: "VS Code", category: "Tools", tag: "Editor", pairsWith: ["TypeScript", "Git & GitHub", "Gemini / Claude / ChatGPT"] },
  { name: "Android Studio", category: "Tools", tag: "Mobile SDK", pairsWith: ["Kotlin", "Java", "Firebase"] },
  { name: "Figma", category: "Tools", tag: "Prototyping", pairsWith: ["Tailwind CSS", "HTML5 & CSS3", "Next.js"] },
  { name: "Supabase", category: "Cloud", tag: "Postgres & Auth", pairsWith: ["Next.js", "TypeScript", "Vercel"] },
  { name: "Firebase", category: "Cloud", tag: "Realtime BaaS", pairsWith: ["Kotlin", "Android Studio", "JavaScript (ES6+)"] },
  { name: "Vercel", category: "Cloud", tag: "Edge Hosting", pairsWith: ["Next.js", "Git & GitHub", "Supabase"] },
  { name: "Netlify", category: "Cloud", tag: "CI/CD Deploy", pairsWith: ["HTML5 & CSS3", "JavaScript (ES6+)", "Git & GitHub"] },
] as const;

export function Technologies() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const hoveredObj = SKILLS.find((s) => s.name === hoveredSkill);

  return (
    <section
      id="techstack"
      className="scroll-mt-20 py-20 sm:py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            01 / Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Tech Stack & Tools
          </h2>
        </div>

        <div
          className="inline-flex flex-wrap gap-1 p-1 rounded-xl border"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          {(["All", "Languages", "Tools", "Cloud"] as SkillCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: activeCategory === cat ? "var(--fg)" : "transparent",
                color: activeCategory === cat ? "var(--bg)" : "var(--muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="h-6 mb-6 text-xs font-mono" style={{ color: "var(--muted)" }}>
        {hoveredObj ? (
          <>
            <span style={{ color: "var(--fg)" }} className="font-semibold">
              {hoveredObj.name}
            </span>{" "}
            pairs with: {hoveredObj.pairsWith.join(" • ")}
          </>
        ) : (
          "Hover any technology to highlight its connected production tools."
        )}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((skill) => {
          const isSelf = hoveredSkill === skill.name;
          const isPaired = hoveredObj?.pairsWith.includes(skill.name as never) ?? false;
          const isDimmed = Boolean(hoveredSkill) && !isSelf && !isPaired;

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`group relative overflow-hidden rounded-xl border p-4 cursor-default will-change-transform
                         transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                         ${isSelf ? "-translate-y-1.5 scale-[1.02] shadow-md" : isPaired ? "-translate-y-1" : isDimmed ? "opacity-40" : "hover:-translate-y-1"}`}
              style={{
                backgroundColor: isSelf ? "var(--surface-hover)" : "var(--surface)",
                borderColor: isSelf || isPaired ? "var(--fg)" : "var(--border)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  {skill.name}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: isSelf || isPaired ? "var(--fg)" : "var(--border-strong)" }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono" style={{ color: "var(--muted)" }}>
                  {skill.tag}
                </span>
                {isPaired && (
                  <span
                    className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border"
                    style={{ borderColor: "var(--border-strong)", color: "var(--fg)" }}
                  >
                    Paired
                  </span>
                )}
              </div>

              {/* Smooth bottom glide bar */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0
                           transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                           group-hover:scale-x-100"
                style={{ backgroundColor: "var(--fg)" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}