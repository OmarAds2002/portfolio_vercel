"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// EDIT YOUR INFO HERE
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Omar Ads",
  tagline: "M.Sc. Robotics @ Purdue — reinforcement learning & behavior systems for  robots",
  github: "https://github.com/OmarAds2002",
  linkedin: "https://www.linkedin.com/in/omar-ads-2aa465203/",  // ← update this
  email: "omarads2002@gmail.com",
};

// video: put mp4 files in the public/ folder, reference them as "/filename.mp4"
// set video to null if a project has no video yet
const PROJECTS = [
  {
    title: "TurtleBot3 Autonomous Patrol",
    status: "shipped",
    blurb:
      "A mission-level behavior tree orchestrating a full Nav2 stack. Custom C++ BT nodes handle patrol, reactive object detection that interrupts navigation mid-drive, battery monitoring, and recovery behaviors.",
    tech: ["ROS2 Jazzy", "BT.CPP v4", "Nav2", "Gazebo", "C++"],
    link: "https://github.com/OmarAds2002/turtlebot3-autonomous-patrol",
    video: "/patrol-demo.mp4",
  },
  {
    title: "MuJoCo Pick-and-Place (RL)",
    status: "shipped",
    blurb:
      "A 6-DOF torque-controlled pick-and-place environment trained with PPO and SAC. SAC reached a 1.0 success rate with domain randomization. Identified and fixed four distinct reward exploits.",
    tech: ["MuJoCo", "SB3", "PPO", "SAC", "Python"],
    link: "https://github.com/OmarAds2002/mujoco-pick-and-place",
    video: "/pickplace-demo.mp4",
  },
  {
    title: "Bimanual Handoff (In Progress)",
    status: "progress",
    blurb:
      "A two-arm manipulation task in Isaac Lab: coordinated cylinder handoff between arms, trained with a staged curriculum and domain randomization. Whole-body bimanual coordination for RL.",
    tech: ["Isaac Lab", "PPO", "Curriculum", "Domain Rand"],
    link: null,
    video: null,
  },
];
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    shipped: { label: "Shipped", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    research: { label: "Research", cls: "bg-violet-500/15 text-violet-400 border-violet-500/30" },
    progress: { label: "In Progress", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  };
  const s = map[status] ?? map.shipped;
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="fixed top-6 right-6 text-sm px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? "Light" : "Dark"}
        </button>

        {/* Hero */}
        <section className="mb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            {INFO.name}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            {INFO.tagline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={INFO.github} className="underline underline-offset-4 hover:text-violet-500 transition-colors">
              GitHub
            </a>
            <a href={INFO.linkedin} className="underline underline-offset-4 hover:text-violet-500 transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${INFO.email}`} className="underline underline-offset-4 hover:text-violet-500 transition-colors">
              Email
            </a>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-8">
            Projects
          </h2>
          <div className="space-y-12">
            {PROJECTS.map((p) => (
              <div key={p.title} className="group">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-medium">
                    {p.link ? (
                      <a href={p.link} className="hover:text-violet-500 transition-colors">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {p.blurb}
                </p>

                {/* Video demo */}
                {p.video && (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4"
                  />
                )}

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-8">
            About
          </h2>
          <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
            <p>
              I&apos;m an M.Sc. Interdisciplinary Robotics student at Purdue, focused on
              reinforcement learning and control for legged and humanoid robots. I work
              across the full stack: RL policy training in Isaac Lab and MuJoCo,
              sim-to-sim and sim-to-real transfer, behavior-tree-based decision systems,
              and the ROS2 / C++ infrastructure that ties it together.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-8">
            Contact
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Open to roles in RL, robot learning, and behavior/controls engineering.{" "}
            <a href={`mailto:${INFO.email}`} className="underline underline-offset-4 hover:text-violet-500 transition-colors">
              {INFO.email}
            </a>
          </p>
        </section>

      </div>
    </main>
  );
}