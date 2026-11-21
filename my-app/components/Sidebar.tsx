"use client";

interface SidebarProps {
  activeSection: string;
  isDark: boolean;
  mounted: boolean;
  onToggleTheme: () => void;
  myTime: string;
}

const NAV_ITEMS = [
  { index: "00", label: "Overview", href: "#home", id: "home" },
  { index: "01", label: "Technologies", href: "#techstack", id: "techstack" },
  { index: "02", label: "Featured Projects", href: "#projects", id: "projects" },
  { index: "03", label: "GitHub", href: "#contributions", id: "contributions" },
  { index: "04", label: "AI Workflow", href: "#workflow", id: "workflow" },
  { index: "05", label: "Contact", href: "#contact", id: "contact" },
];

export function Sidebar({
  activeSection,
  isDark,
  mounted,
  onToggleTheme,
  myTime,
}: SidebarProps) {
  return (
    <aside
      className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col justify-between p-6 border-r z-40"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top: Identity & Status */}
      <div className="space-y-6">
        <div>
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 text-[11px] font-mono rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className="w-2 h-2 rounded-full bg-zinc-400 animate-soft-pulse" />
            Open for opportunities
          </div>
          <a href="#home" className="block text-lg font-semibold tracking-tight">
            Zef Kevin Montera
          </a>
          <p className="text-xs font-mono mt-1" style={{ color: "var(--muted)" }}>
            BSIT Undergraduate • Davao City
          </p>
        </div>

        {/* Numbered Navigation */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "translate-x-1" : "hover:translate-x-1"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--fg)" : "transparent",
                  color: isActive ? "var(--bg)" : "var(--muted)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] opacity-60">
                    {item.index}
                  </span>
                  <span className={!isActive ? "group-hover:text-[var(--fg)] transition-colors" : ""}>
                    {item.label}
                  </span>
                </span>
                <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[11px]">
                  →
                </span>
              </a>
            );
          })}
        </nav>


    

      </div>

      {/* Bottom: Theme Toggle, Resume & Links */}
      <div
        className="pt-4 border-t space-y-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex-1 h-8 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-[var(--surface-hover)] cursor-pointer"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
          >
            {mounted ? (isDark ? "☀ Light" : "☾ Dark") : "Theme"}
          </button>

          <a
            href="https://drive.google.com/file/d/1QvCRPBCa9x7Yk3hvffEJuPL9qyEV5gYE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-8 rounded-lg text-xs font-medium flex items-center justify-center gap-1 hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}
          >
            Resume ↗
          </a>
        </div>

        <div
          className="flex items-center justify-between text-[11px] font-mono px-1"
          style={{ color: "var(--muted)" }}
        >
          <a
            href="https://github.com/zefkevinmontera"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/zef-kevin-a-montera-04941914b/?isSelfProfile=true"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:plazajill0@gmail.com"
            className="hover:text-[var(--fg)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </aside>
  );
}