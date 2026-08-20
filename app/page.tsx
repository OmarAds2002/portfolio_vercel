"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy-load the canvas hero animation — keeps it out of the initial bundle
// so it never blocks first paint / LCP. Renders only on the client.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

// ─────────────────────────────────────────────────────────────
// EDIT YOUR INFO HERE
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Omar Ads",
  tagline:
    "Robotics SW · RL · ROS2 — training manipulation & locomotion policies in Isaac Lab and MuJoCo. Targeting behavior / controls roles.",
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
    post: "turtlebot3-autonomous-patrol",
    video: "/patrol-demo.mp4",
  },
  {
    title: "MuJoCo Pick-and-Place",
    status: "shipped",
    blurb:
      "A 6-DOF torque-controlled pick-and-place environment trained with PPO and SAC. SAC reached a 1.0 success rate with domain randomization. Identified and fixed four distinct reward exploits.",
    tech: ["MuJoCo", "SB3", "PPO", "SAC", "Python"],
    link: "https://github.com/OmarAds2002/mujoco-pick-and-place",
    post: "mujoco-pick-and-place",
    video: "/pickplace-demo.mp4",
  },
  {
    title: "Bimanual UR10 Handoff",
    status: "shipped",
    blurb:
      "Two UR10 arms trained to hand off a cylinder in Isaac Lab with PPO. 84% success rate, zero drops, 1024 parallel environments on a single GPU. Debugged a weld-geometry collision that caused persistent policy plateaus, then solved a hold-and-wait exploit with a mutual-grasp constraint.",
    tech: ["Isaac Lab", "PPO", "RSL-RL", "USD", "Domain Rand"],
    link: "https://github.com/OmarAds2002/bimanual-rl",
    post: "bimanual-ur10-handoff",
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

// Role tracks a skill maps to. Hover a skill to see which apply.
const JOBS: Record<string, { label: string; cls: string }> = {
  A: { label: "RL / Robot Learning", cls: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  B: { label: "Behavior & Controls", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  C: { label: "Robotics Software", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
};

// current / target on a 0–100 scale; jobs = which role tracks it serves
// Proficiency tiers, low → high. level/target are 1-based indices into this.
const TIERS = ["Foundational", "Proficient", "Advanced"] as const;

// level = where you are now; target = where you're headed (ghost segment)
const SKILLS = [
  { name: "Reinforcement Learning (PPO/SAC)", level: 2, target: 3, jobs: ["A", "B"] },
  { name: "MuJoCo", level: 2, target: 3, jobs: ["A"] },
  { name: "Behavior Trees (BT.CPP v4)", level: 2, target: 3, jobs: ["C", "B"] },
  { name: "Python / PyTorch", level: 2, target: 3, jobs: ["A", "C"] },
  { name: "Isaac Lab / Isaac Sim", level: 2, target: 3, jobs: ["A", "B"] },
  { name: "ROS2 / Nav2", level: 2, target: 3, jobs: ["C", "B"] },
  { name: "C++", level: 2, target: 3, jobs: ["C", "B"] },
  { name: "Sim-to-Real Transfer", level: 2, target: 3, jobs: ["A", "B"] },
  { name: "Domain Randomization", level: 2, target: 2, jobs: ["A"] },
  { name: "Optimal Control / LQR", level: 1, target: 3, jobs: ["B"] },
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
    <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-8">
      {children}
    </h2>
  );
}

function JobBadge({ id }: { id: string }) {
  const j = JOBS[id];
  if (!j) return null;
  return (
    <span
      title={j.label}
      className={`text-[10px] leading-none px-1.5 py-1 rounded border font-medium ${j.cls}`}
    >
      {id}
    </span>
  );
}

function SkillBar({
  name,
  level,
  target,
  jobs,
}: {
  name: string;
  level: number;
  target: number;
  jobs: string[];
}) {
  return (
    <div className="group py-2.5">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm text-neutral-200 truncate">{name}</span>
          <span className="flex gap-1 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity duration-200">
            {jobs.map((j) => (
              <JobBadge key={j} id={j} />
            ))}
          </span>
        </div>
        <span className="text-xs text-neutral-400 shrink-0">
          {TIERS[level - 1]}
          {target > level && (
            <span className="text-neutral-600"> → {TIERS[target - 1]}</span>
          )}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((seg) => {
          const filled = seg <= level;
          const isTarget = seg > level && seg <= target;
          return (
            <motion.div
              key={seg}
              className={`h-2 flex-1 rounded-full ${
                filled
                  ? "bg-violet-500"
                  : isTarget
                  ? "bg-violet-500/20"
                  : "bg-neutral-800"
              }`}
              initial={{ opacity: 0, scaleX: 0.4 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: (seg - 1) * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Scroll reveal: fade + slide up, plays once when the element enters view
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-[1800px] mx-auto px-8 py-16 sm:py-24">

        {/* Hero */}
        <section className="relative mb-20 min-h-[360px] flex items-center overflow-hidden">
          <HeroScene />
          <div className="relative max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
              {INFO.name}
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              {INFO.tagline}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href={INFO.github} className="underline underline-offset-4 hover:text-violet-400 transition-colors">
                GitHub
              </a>
              <a href={INFO.linkedin} className="underline underline-offset-4 hover:text-violet-400 transition-colors">
                LinkedIn
              </a>
              <a href={`mailto:${INFO.email}`} className="underline underline-offset-4 hover:text-violet-400 transition-colors">
                Email
              </a>
              <a href="/blog" className="underline underline-offset-4 hover:text-violet-400 transition-colors">
                Writing
              </a>
            </div>
          </div>
        </section>

        {/* Projects — 2 per row, bigger cards + videos */}
        <section className="mb-20">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 2) * 0.1}
                className="flex flex-col rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50 h-full"
              >
                {/* Video (or placeholder) */}
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover bg-neutral-800"
                  />
                ) : (
                  <div className="w-full aspect-video bg-neutral-800 flex items-center justify-center text-sm text-neutral-600">
                    Coming soon
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-medium leading-snug">{p.title}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
                    {p.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline underline-offset-4 hover:text-violet-400 transition-colors"
                      >
                        View on GitHub →
                      </a>
                    )}
                    {p.post && (
                      <a
                        href={`/blog/${p.post}`}
                        className="text-sm underline underline-offset-4 hover:text-violet-400 transition-colors"
                      >
                        Read the writeup →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <SectionTitle>Skills</SectionTitle>
          <div className="max-w-4xl">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="inline-block w-5 h-2 rounded-full bg-violet-500" />
                Current level
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-5 h-2 rounded-full bg-violet-500/20" />
                Targeting
              </div>
              <span className="text-neutral-700">·</span>
              <span>Foundational → Proficient → Advanced</span>
              <span className="text-neutral-700 hidden sm:inline">·</span>
              {Object.keys(JOBS).map((id) => (
                <span key={id} className="flex items-center gap-1.5">
                  <JobBadge id={id} />
                  <span>{JOBS[id].label}</span>
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
              {SKILLS.map((s) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  target={s.target}
                  jobs={s.jobs}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Experience</SectionTitle>
            {EXPERIENCE.map((e) => (
              <Reveal key={e.role} className="mb-6">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-lg font-medium">
                    {e.role} · {e.org}
                  </h3>
                  <span className="text-sm text-neutral-500 whitespace-nowrap">
                    {e.period}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1 text-neutral-400 leading-relaxed">
                  {e.points.map((pt, i) => (
                    <li key={i} className="text-sm">{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
            </div>
        </section>

        {/* Publication */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Publication</SectionTitle>
            <Reveal>
              <h3 className="text-lg font-medium leading-snug mb-1">{PUBLICATION.title}</h3>
              <p className="text-sm text-neutral-500 mb-2">{PUBLICATION.venue}</p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {PUBLICATION.detail}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Education</SectionTitle>
            {EDUCATION.map((ed) => (
              <Reveal key={ed.school} className="mb-6">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-lg font-medium">{ed.school}</h3>
                  <span className="text-sm text-neutral-500 whitespace-nowrap">
                    {ed.period}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mb-1">{ed.degree}</p>
                <p className="text-sm text-neutral-400">{ed.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>About</SectionTitle>
            <Reveal>
              <p className="text-neutral-400 leading-relaxed mb-4">
                I spent a year and a half as an AI/ML engineer before committing
                fully to robotics — the field I&apos;d wanted to be in all along.
                That work grounded me in the machine learning side (LLMs, RAG,
                real-time perception, production data workflows), and robotics is
                where I put it to use: reinforcement learning and control for
                legged and humanoid systems, where the learning and the physics
                have to work together.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Today I work across the full stack: RL policy training in Isaac
                Lab and MuJoCo, sim-to-sim and sim-to-real transfer,
                behavior-tree decision systems, and the ROS2 / C++ infrastructure
                that ties it together. I&apos;m building toward behavior and
                controls engineering for the teams shipping real manipulation and
                locomotion — and closing the classical-control side of that gap
                deliberately as I go.
              </p>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <SectionTitle>Contact</SectionTitle>
            <Reveal>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Open to roles in RL, robot learning, and behavior / controls
                engineering. The fastest way to reach me is email — I read
                everything.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${INFO.email}`}
                  className="text-sm px-4 py-2 rounded-lg border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 transition-colors"
                >
                  Email me
                </a>
                <a
                  href={INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="/omar-ads-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  Download résumé (PDF)
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </main>
  );
}