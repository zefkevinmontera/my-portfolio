"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ScrollCogBar } from "@/components/ScrollCogBar";
import { Sidebar } from "@/components/Sidebar";
import { Technologies } from "@/components/Technologies";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { BlueprintLifeBg } from "@/components/BlueprintLifeBg";

type WorkflowStepId = "spec" | "scaffold" | "audit" | "ship";

interface GitHubActivity {
  repo: string;
  action: string;
  timeAgo: string;
  url: string;
}

interface WorkflowStep {
  id: WorkflowStepId;
  step: string;
  title: string;
  summary: string;
  humanRole: string;
  aiRole: string;
  tools: string[];
  realExample: string;
}

const ROLES = [
  "Web Developer",
  "AI-Assisted Full-Stack Builder",
  "BSIT Undergraduate",
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "spec",
    step: "01",
    title: "Architecture & Spec",
    summary: "I define the data model, routes, and constraints before writing a single prompt.",
    humanRole: "Decide database tables, auth rules, component hierarchy, and edge cases.",
    aiRole: "Stress test the plan and suggest simpler data structures or API patterns.",
    tools: ["Next.js App Router", "Supabase Schema", "Claude / Gemini"],
    realExample:
      "For Tome, I mapped out the Google Books API response shape and Supabase RLS policies first so AI-generated queries matched the real schema.",
  },
  {
    id: "scaffold",
    step: "02",
    title: "Prompt & Scaffold",
    summary: "Use AI to eliminate repetitive boilerplate and build working prototypes fast.",
    humanRole: "Write scoped, context rich prompts targeting one feature or component at a time.",
    aiRole: "Generate TypeScript interfaces, Tailwind layouts, and CRUD handlers rapidly.",
    tools: ["Gemini", "Claude", "ChatGPT", "VS Code"],
    realExample:
      "Accelerated building Tome's shelf-filtering UI and Framer Motion transitions in hours instead of days.",
  },
  {
    id: "audit",
    step: "03",
    title: "Audit, Debug & Refactor",
    summary: "AI writes fast, but I own the code quality—every line gets reviewed and tested.",
    humanRole: "Fix hydration/type errors, strip bloated CSS, check mobile breakpoints, and secure API keys.",
    aiRole: "Explain cryptic stack traces and propose cleaner refactors when logic gets tangled.",
    tools: ["TypeScript Compiler", "Chrome DevTools", "Git Diff"],
    realExample:
      "Removed unnecessary client-side state and tightened responsive grid breakpoints across both Tome and World Explorer.",
  },
  {
    id: "ship",
    step: "04",
    title: "Ship & Iterate",
    summary: "Deploy early to production, test on real devices, and ship clean commits.",
    humanRole: "Configure environment variables, verify live builds, and iterate based on real usage.",
    aiRole: "Help draft documentation, edge-case test checklists, and quick performance tweaks.",
    tools: ["Vercel", "GitHub"],
    realExample:
      "Both featured projects are live on Vercel with fast load times and continuous GitHub deployment.",
  },
];

const MOBILE_NAV = [
  { id: "home", label: "Overview" },
  { id: "techstack", label: "Technologies" },
  { id: "projects", label: "Featured Projects" },
  { id: "contributions", label: "GitHub" },
  { id: "workflow", label: "AI Workflow" },
  { id: "contact", label: "Contact" },
];

function formatRelativeTime(isoDate: string): string {
  const diffSec = Math.max(
    1,
    Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
  );
  if (diffSec < 60) return "just now";
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeStepId, setActiveStepId] = useState<WorkflowStepId>("spec");
  const [toast, setToast] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const [timeInfo, setTimeInfo] = useState({
    myTime: "--:-- --",
    visitorLabel: "Detecting timezone...",
  });

  const [ghActivity, setGhActivity] = useState<GitHubActivity>({
    repo: "zefkevinmontera",
    action: "Active on GitHub",
    timeAgo: "live",
    url: "https://github.com/zefkevinmontera",
  });

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Dual timezone clock: Davao City, PH (PHT) + Visitor's detected local time
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const myTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const visitorTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
        hour12: true,
      }).format(now);

      const visitorLabel =
        visitorTz === "Asia/Manila"
          ? "Same timezone as you"
          : `Your time: ${visitorTime}`;

      setTimeInfo({ myTime, visitorLabel });
    };

    updateClocks();
    const id = setInterval(updateClocks, 30000);
    return () => clearInterval(id);
  }, []);

  // Fetch latest public GitHub activity
  useEffect(() => {
    fetch("https://api.github.com/users/zefkevinmontera/events/public?per_page=10")
      .then((res) => (res.ok ? res.json() : null))
      .then((events) => {
        if (!Array.isArray(events) || events.length === 0) return;
        const latest =
          events.find((e) => e.type === "PushEvent" || e.type === "CreateEvent") ||
          events[0];
        if (!latest?.repo?.name) return;
        const shortRepo = latest.repo.name.split("/")[1] || latest.repo.name;
        const commitMsg = latest.payload?.commits?.[0]?.message;
        setGhActivity({
          repo: shortRepo,
          action: commitMsg
            ? `git commit: "${commitMsg.slice(0, 44)}${commitMsg.length > 44 ? "…" : ""}"`
            : `Updated repository ${shortRepo}`,
          timeAgo: formatRelativeTime(latest.created_at),
          url: `https://github.com/${latest.repo.name}`,
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const item of [...MOBILE_NAV].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2400);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    showToast(next ? "Dark mode enabled" : "Light mode enabled");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("plazajill0@gmail.com");
      showToast("Email copied to clipboard");
    } catch {
      window.location.href = "mailto:plazajill0@gmail.com";
    }
  };

  const handleSpotlight = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const activeStep =
    WORKFLOW_STEPS.find((s) => s.id === activeStepId) || WORKFLOW_STEPS[0];

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Top Rotating Cog Scroll Indicator */}
      <ScrollCogBar />

      {/* Architectural Blueprint Grid Background */}
      <BlueprintLifeBg />

      {/* Mobile Header (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold text-sm tracking-tight">
            Zef Kevin Montera
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark and light mode"
              className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
            >
              {mounted ? (isDark ? "☀" : "☾") : ""}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
            >
              <span className="text-sm">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 space-y-1.5 animate-scale-in">
            {MOBILE_NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeSection === item.id
                    ? "bg-[var(--fg)] text-[var(--bg)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Desktop Left Sidebar (>= lg) */}
      <Sidebar
        activeSection={activeSection}
        isDark={isDark}
        mounted={mounted}
        onToggleTheme={toggleTheme}
        myTime={timeInfo.myTime}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8">
          {/* ---------- HERO SECTION ---------- */}
          <section
            id="home"
            className="scroll-mt-24 py-16 sm:py-24 border-b border-[var(--border)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <div
                  className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--muted)]"
                  style={{ animationDelay: "50ms" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-soft-pulse" />
                  <span>Open to web dev internships & freelance builds</span>
                </div>

                <div
                  className="animate-fade-up space-y-3"
                  style={{ animationDelay: "120ms" }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]">
                    Zef Kevin A. Montera
                  </h1>
                  <p className="text-lg sm:text-xl text-[var(--accent)] font-mono font-medium h-7">
                    {ROLES[roleIndex]}
                  </p>
                </div>

                <p
                  className="animate-fade-up text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl"
                  style={{ animationDelay: "190ms" }}
                >
                  Building fast, production ready websites with Next.js,
                  TypeScript, and Supabase. I pair solid web fundamentals 
                  with modern AI tooling to ship cleaner websites, faster.
                </p>

                <div
                  className="animate-fade-up flex flex-wrap items-center gap-3 pt-1"
                  style={{ animationDelay: "260ms" }}
                >
                  <a
                    href="#projects"
                    className="px-5 py-2.5 rounded-xl bg-[var(--fg)] text-[var(--bg)] text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    View Projects
                  </a>
                  <a
                    href="#workflow"
                    className="px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] text-sm font-medium active:scale-[0.98] transition-all"
                  >
                    How I Build
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors cursor-pointer"
                  >
                    Copy Email
                  </button>
                </div>
              </div>

              <div
                className="md:col-span-5 flex justify-center md:justify-end animate-fade-up"
                style={{ animationDelay: "220ms" }}
              >
                <div
                  onMouseMove={handleSpotlight}
                  className="spotlight-card w-full max-w-[320px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm hover:border-[var(--border-strong)] transition-all duration-300"
                >
                  <div className="relative aspect-[4/4.3] rounded-xl overflow-hidden bg-[var(--surface-hover)]">
                    <img
                      src="/profile.jpg"
                      alt="Zef Kevin A. Montera"
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3 px-1 flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                    <span>BSIT Undergraduate</span>
                    <span>Davao City, PH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live GitHub Activity + Dual Timezone Strip */}
            <div
              className="animate-fade-up mt-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs font-mono"
              style={{ animationDelay: "320ms" }}
            >
              <div className="flex flex-wrap items-center gap-2 text-[var(--muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--fg)] font-medium">
                  Davao City, PH
                </span>
                <span>{timeInfo.myTime} PHT</span>
                <span>•</span>
                <span className="text-[var(--fg)]">{timeInfo.visitorLabel}</span>
              </div>

              <a
                href={ghActivity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors truncate"
              >
                <span className="px-1.5 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px]">
                  GIT
                </span>
                <span className="truncate">{ghActivity.action}</span>
                <span className="text-[var(--accent)] shrink-0">
                  ({ghActivity.timeAgo}) ↗
                </span>
              </a>
            </div>
          </section>

          {/* ---------- TECHNOLOGIES SECTION ---------- */}
          <Technologies />

          {/* ---------- FEATURED PROJECTS SECTION ---------- */}
          <FeaturedProjects />

          {/* ---------- GITHUB CONTRIBUTION CHART ---------- */}
          <section
            id="contributions"
            className="scroll-mt-20 py-20 sm:py-24 border-b border-[var(--border)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  03 / Open Source & Activity
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  GitHub Contributions
                </h2>
              </div>
              <a
                href="https://github.com/zefkevinmontera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                @zefkevinmontera ↗
              </a>
            </div>

            <div className="reveal rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 overflow-hidden">
              <div className="overflow-x-auto pb-2">
                <img
                  src="https://ghchart.rshah.org/71717a/zefkevinmontera"
                  alt="Zef Kevin Montera GitHub Contribution Chart"
                  className={`min-w-[640px] w-full h-auto transition-all duration-300 ${
                    isDark ? "invert-[0.88] hue-rotate-180 contrast-110" : ""
                  }`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                <span>Live commit graph synced from GitHub</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-200 dark:bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-400 dark:bg-zinc-600" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-600 dark:bg-zinc-400" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-800 dark:bg-zinc-200" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- AI-ASSISTED DEV WORKFLOW ---------- */}
          <section
            id="workflow"
            className="scroll-mt-20 py-20 sm:py-24 border-b border-[var(--border)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  04 / How I Build
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  AI-Assisted Development Workflow
                </h2>
              </div>
              <p className="text-xs font-mono text-[var(--muted)]">
                AI accelerates the code. I own the architecture & quality.
              </p>
            </div>

            <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="md:col-span-5 flex flex-col gap-2">
                {WORKFLOW_STEPS.map((item) => {
                  const isActive = item.id === activeStepId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveStepId(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? "border-[var(--fg)] bg-[var(--bg)]"
                          : "border-[var(--border)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono text-xs font-semibold ${
                            isActive
                              ? "text-[var(--fg)]"
                              : "text-[var(--muted)]"
                          }`}
                        >
                          {item.step}
                        </span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="md:col-span-7 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--accent)]">
                      STAGE {activeStep.step}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight mt-0.5">
                      {activeStep.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      {activeStep.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3.5 space-y-1">
                      <p className="font-mono text-[11px] uppercase text-[var(--fg)] font-medium">
                        My Role (Human)
                      </p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">
                        {activeStep.humanRole}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3.5 space-y-1">
                      <p className="font-mono text-[11px] uppercase text-[var(--accent)] font-medium">
                        AI's Role (Tool)
                      </p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">
                        {activeStep.aiRole}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-[var(--border-strong)] p-3.5">
                    <p className="font-mono text-[10px] uppercase text-[var(--muted)] mb-1">
                      In Practice
                    </p>
                    <p className="text-xs text-[var(--fg)] leading-relaxed">
                      {activeStep.realExample}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                  {activeStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-[11px] text-[var(--muted)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- CONTACT SECTION ---------- */}
          <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
            <div
              onMouseMove={handleSpotlight}
              className="spotlight-card reveal rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12"
            >
              <div className="relative z-10 max-w-2xl space-y-4 mb-8">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  05 / Contact
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Let's build something together.
                </h2>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  Open to web development internships, freelance builds, and
                  collaborative software projects.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <a
                  href="https://github.com/zefkevinmontera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 text-sm font-medium text-center transition-all"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/zef-kevin-a-montera-04941914b/?isSelfProfile=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 text-sm font-medium text-center transition-all"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.facebook.com/Soy.kappa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 text-sm font-medium text-center transition-all"
                >
                  Facebook ↗
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-4 py-3 rounded-xl bg-[var(--fg)] text-[var(--bg)] hover:opacity-90 hover:-translate-y-0.5 text-sm font-medium text-center transition-all cursor-pointer"
                >
                  Copy Email
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-[var(--border)] pb-6">
              <div>
                <p className="font-mono text-[var(--fg)] font-medium mb-1">
                  Stack
                </p>
                <p className="text-[var(--muted)]">
                  Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.
                  Deployed on Vercel.
                </p>
              </div>
              <div>
                <p className="font-mono text-[var(--fg)] font-medium mb-1">
                  Live Integrations
                </p>
                <p className="text-[var(--muted)]">
                  Real-time GitHub Events REST API, live contribution graph,
                  & automatic visitor timezone detection.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
              <p>© 2026 Zef Kevin A. Montera.</p>
              <a
                href="#home"
                className="font-mono hover:text-[var(--fg)] transition-colors"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in px-4 py-2.5 rounded-xl bg-[var(--fg)] text-[var(--bg)] text-xs font-medium shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}