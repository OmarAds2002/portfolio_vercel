"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// EDIT YOUR INFO HERE
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Omar Ads",
  tagline: "M.Sc. Robotics @ Purdue — reinforcement learning & behavior systems for robots",
  github: "https://github.com/OmarAds2002",
  linkedin: "https://www.linkedin.com/in/omar-ads-2aa465203/",
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
    title: "MuJoCo Pick-and-Place",
    status: "shipped",
    blurb:
      "A 6-DOF torque-controlled pick-and-place environment trained with PPO and SAC. SAC reached a 1.0 success rate with domain randomization. Identified and fixed four distinct reward exploits.",
    tech: ["MuJoCo", "SB3", "PPO", "SAC", "Python"],
    link: "https://github.com/OmarAds2002/mujoco-pick-and-place",
    video: "/pickplace-demo.mp4",
  },
  {
    title: "Bimanual UR10 Handoff",
    status: "shipped",
    blurb:
      "Two UR10 arms trained to hand off a cylinder in Isaac Lab with PPO. 84% success rate, zero drops, 1024 parallel environments on a single GPU. Debugged a weld-geometry collision that caused persistent policy plateaus, then solved a hold-and-wait exploit with a mutual-grasp constraint.",
    tech: ["Isaac Lab", "PPO", "RSL-RL", "USD", "Domain Rand"],
    link: "https://github.com/OmarAds2002/bimanual-rl",
    video: "/handoff _075x_smooth.mp4",
  },
];

const EXPERIENCE = [
  {
    role: "AI/ML Engineer",
    org: "Dar El Handasah",
    period: "Apr 2024 – Present",
    points: [
      "Applied AI/ML to real-time perception, multi-agent coordination, and simulation data processing.",
      "Built enterprise AI tools using LLMs, RAG pipelines, and data workflows for engineering decision-making.",
    ],
  },
];

const PUBLICATION = {
  title: "Evaluation of Six Local Climate Zones Mapping Methods for UHI Studies",
  venue: "Transactions in GIS (Wiley, Open Access), 2026",
  detail:
    "Co-authored research on GeoAI and urban sustainability. Achieved 95% classification accuracy using CNN-based models on Landsat 8 data.",
};

const EDUCATION = [
  {
    school: "Purdue University",
    degree: "M.Sc. Interdisciplinary Robotics",
    period: "Jan 2026 – Present",
    detail: "Optimization Methods for Systems and Control, Intro to Robotics, Multi-Agent Systems",
  },
  {
    school: "Monash University",
    degree: "B.Eng. Electrical & Computer Systems Engineering (CGPA 3.6)",
    period: "Feb 2020 – Dec 2023",
    detail: "Minor in Artificial Intelligence in Engineering",
  },
];

const CERTS = [
  "Azure AI Engineer Associate (AI-102)",
  "AWS Certified AI Practitioner",
  "Azure AI Fundamentals (AI-900)",
  "AWS Cloud Practitioner",
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-8">
      {children}
    </h2>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="w-full max-w-[1800px] mx-auto px-8 py-16 sm:py-24">

        {/* Hero */}
        <section className="relative mb-20 max-w-3xl">
          {/* Animated gradient orbs */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-[drift_12s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -top-10 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px] animate-[drift_16s_ease-in-out_infinite_reverse]" />
          <div className="pointer-events-none absolute top-10 -left-10 w-[350px] h-[350px] rounded-full bg-fuchsia-500/6 blur-[100px] animate-[drift_20s_ease-in-out_infinite]" />

          <h1 className="relative text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            {INFO.name}
          </h1>
          <p className="relative text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            {INFO.tagline}
          </p>
          <div className="relative flex flex-wrap gap-4 text-sm">
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

        {/* Projects — 2 per row, bigger cards + videos */}
        <section className="mb-20">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50"
              >
                {/* Video (or placeholder) */}
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover bg-neutral-200 dark:bg-neutral-800"
                  />
                ) : (
                  <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">
                    Coming soon
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-medium leading-snug">{p.title}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-1">
                    {p.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      className="text-sm underline underline-offset-4 hover:text-violet-500 transition-colors"
                    >
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Experience</SectionTitle>
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="mb-6">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-lg font-medium">
                    {e.role} · {e.org}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                    {e.period}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {e.points.map((pt, i) => (
                    <li key={i} className="text-sm">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
        </section>

        {/* Publication */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Publication</SectionTitle>
            <h3 className="text-lg font-medium leading-snug mb-1">{PUBLICATION.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">{PUBLICATION.venue}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {PUBLICATION.detail}
            </p> 
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Education</SectionTitle>
            {EDUCATION.map((ed) => (
              <div key={ed.school} className="mb-6">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-lg font-medium">{ed.school}</h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                    {ed.period}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">{ed.degree}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{ed.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>About</SectionTitle>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              I&apos;m an M.Sc. Interdisciplinary Robotics student at Purdue, focused on
              reinforcement learning and control for legged and humanoid robots. I work
              across the full stack: RL policy training in Isaac Lab and MuJoCo,
              sim-to-sim and sim-to-real transfer, behavior-tree-based decision systems,
              and the ROS2 / C++ infrastructure that ties it together.
            </p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Contact</SectionTitle>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Open to roles in RL, robot learning, and behavior/controls engineering.{" "}
              <a href={`mailto:${INFO.email}`} className="underline underline-offset-4 hover:text-violet-500 transition-colors">
                {INFO.email}
              </a>
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}