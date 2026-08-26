import { PortfolioHeader } from "@/components/PortfolioHeader";
import { getAllProjects } from "@/lib/contentful";
import Image from "next/image";

export const revalidate = 60;

const BG = "#042F2E";
const ORANGE = "#E86C3D";
const WHITE = "rgb(245,245,220)";

const M = "var(--font-mulish), Mulish, sans-serif";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: M,
        fontWeight: 700,
        fontSize: "26px",
        lineHeight: "31px",
        color: ORANGE,
        marginBottom: "1.2rem",
        marginTop: "2.4rem",
      }}
    >
      {children}
    </h2>
  );
}

function EntryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: M,
        fontWeight: 700,
        fontSize: "15px",
        lineHeight: "18px",
        color: WHITE,
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </h3>
  );
}

function Para({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: M,
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "18px",
        color: WHITE,
        marginBottom: "0.75rem",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const experiences = [
  {
    heading: "Software Developer @ KIFWA",
    duration: "Dec 2024 — Present",
    href: "https://www.linkedin.com/company/kifwa/",
    body: "At KIFWA I am building a multi-tenant platform serving clearing agents, insurers, and freight service providers. The system handles bond purchases, renewals, and indemnity verification for over 2,000 clearing agents and integrates across multiple stakeholder types under one roof. The work involves optimised APIs and architecture decisions I have refined through time spent directly with the operations team understanding what they actually needed. Working on a system this operationally critical has sharpened how I approach reliability and scale. Part of the small team building the logistics engine for clearing and forwarding operations for the region.",
  },
  {
    heading: "Co-founder & Full Stack Engineer @ Origin HQ",
    duration: "July 2025 — Present",
    href: "https://www.origin.co.ke",
    body: [
      "I co-founded Origin in late 2025 alongside a small team, with the goal of building software products that create real value for businesses across Kenya. In the early stages, I conducted market research and spoke directly with businesses in Nakuru and surrounding areas, identifying problems worth solving and understanding what those businesses actually needed from technology. From those conversations I moved into building: I created tools tailored to their workflows, led content creation for our public presence including the website, and explored design as part of shipping products people could actually use. These experiences taught me as much about listening and iterating as they did about engineering, and they continue to shape how I build at Origin today.",
      "In 2026, our team entered the E4C AI Pilot Competition, competing against 33 teams from around the world. We built E4CInsights, an AI pipeline synthesising policy briefs from World Bank, WHO, and E4C datasets to surface actionable insights for global development practitioners. We placed first overall and won a $2,500 prize. The win was meaningful, but the more lasting lesson was what you can build when you start with a clear problem and a focused team.",
    ],
  },
  {
    heading: "Fellow @ Open Hands Initiative",
    duration: "2026 (ended Jul 2026)",
    href: "https://openhandsinitiative.org/programs/virtual.html",
    body: "I was a fellow with the Open Hands Initiative, a global programme connecting young leaders across cultures for structured dialogue on pressing global issues. My cohort worked through a six-week curriculum on AI ethics, examining how artificial intelligence is reshaping society and what responsible development looks like when you have people from ten different countries in the same conversation. The programme sharpened how I think about technology's role in society and introduced me to peers whose perspectives I would not have encountered otherwise.",
  },
  {
    heading: "Frontend Developer @ Pacaya",
    duration: "March 2025 — June 2025",
    href: "https://www.pacaya.com/",
    body: "Three months at Pacaya building and optimizing frontend features in a Next.js application serving over 3,000 monthly users. The work was component architecture, UI performance, and improving the overall reliability of the frontend experience. Good, focused engineering work.",
  },
  {
    heading: "Software Developer Intern @ Furaha Ventures",
    duration: "May 2023 — Oct 2024",
    href: null,
    body: "Built an IoT-connected application consuming hundreds of daily sensor events for real-time monitoring. I delivered responsive UI components that reduced dashboard navigation time by 30% and integrated backend APIs resulting in 20% fewer data syncing failures across IoT devices. Working with live sensor data gave me a strong appreciation for how much engineering precision matters when hardware and software have to agree in real time.",
  },
  {
    heading: "Avionics Intern @ The Nakuja Project — JICA & JKUAT",
    duration: "Sep 2023 — Jan 2024",
    href: "https://nakujaproject.com/",
    body: "Contributed to the avionics systems of the N-3 rocket as part of the Nakuja Project, a collaboration between JICA and JKUAT. The work covered PCB fabrication, parachute ejection mechanism development, and iterative recovery subsystem testing. The rocket achieved successful subscale system tests. Contributing to a rocketry project as a software person taught me to think carefully about what failure means when the stakes are physical.",
  },
  {
    heading: "Freelance Web Developer @ Infiscope Enterprise",
    duration: "Oct 2023 — Nov 2023",
    href: null,
    body: "Improved website performance and SEO for Infiscope, increasing organic traffic by 40% in one month and boosting on-site engagement by 25% through UI enhancements and better product presentation.",
  },
  {
    heading: "ICT Attache @ Nyandarua County Assembly",
    duration: "May 2023 — Aug 2023",
    href: "https://nyandaruaassembly.go.ke/",
    body: "Supported an HR system used by over 100 staff members and built a library management system with book reservation, borrowing, and automated return-notification features that cut manual tracking work by 60%. I also maintained the live-streaming infrastructure for parliamentary proceedings, keeping session uptime at 99%. Working inside a government institution for the first time showed me how much operational reliability matters in environments where there is no fallback.",
  },
];

const awards = [
  {
    title: "AI Ethics Certificate",
    issuer: "Open Hands Initiative · 2026",
    certHref: "/Open-Hands-AI-Ethics-Certificate.pdf",
    body: "Awarded on completing a six-week fellowship curriculum on AI ethics with the Open Hands Initiative, examining how artificial intelligence is reshaping society alongside young leaders from ten different countries.",
  },
  {
    title: "Best Overall — E4C AI Pilot Competition 2026",
    issuer: "Engineering for Change (Global · 33 teams)",
    certHref: null,
    body: "Competing against 33 teams from around the world, our team built E4CInsights, an AI pipeline synthesising policy briefs from World Bank, WHO, and E4C datasets to surface actionable insights for global development practitioners. We placed first overall and were awarded a $2,500 prize. This competition showed me what is possible when you build with a clear mission and a tight team.",
  },
  {
    title: "Innovation Finalist",
    issuer: "KamiLimu · 2024",
    certHref: "/KamiLimu-Innovation-Finalist.pdf",
    body: "At the close of the KamiLimu cohort programme, I was recognised as an Innovation Finalist for the project and presentation my team delivered. Being selected as a finalist from a cohort of driven engineers and designers was a meaningful acknowledgement of the thinking and effort we put into the work.",
  },
  {
    title: "Certificate of Completion",
    issuer: "KamiLimu · 2024",
    certHref: "/KamiLimu-CoC.pdf",
    body: "Awarded upon completing the 8-month KamiLimu mentorship programme, which included over 100 hours of training across technical skills, professional development, and public speaking. One of the few programmes that takes the whole person seriously.",
  },
  {
    title: "Cybersecurity Certificate",
    issuer: "CyberTalents · 2024",
    certHref: "/Cybersec-Cert.pdf",
    body: "Completed a structured cybersecurity training programme through CyberTalents, covering foundational security concepts, threat analysis, and practical defence techniques.",
  },
  {
    title: "Data Science Certificate",
    issuer: "Lux Academy & DSE Africa · 2023",
    certHref: "/DataScience-Cert.pdf",
    body: "Completed a data science programme in collaboration with Lux Academy and DSE Africa, building skills in data analysis, machine learning fundamentals, and the application of data-driven thinking to real-world problems.",
  },
];

const skills = [
  "TypeScript", "React", "Next.js", "Node.js", "Nest.js", "PostgreSQL",
  "Angular", "Ionic", "Firebase", "Tailwind CSS", "Embedded Systems",
];

const PROJECT_PRIORITY = [
  "Bechfam LLC",
  "Kenya Int'l Freights & Warehousing",
  "Origin HQ",
  "KayaSend",
  "Roam Adventures",
  "Primesoc",
  "Movvapp",
  "Joyful Bakery",
  "Pacaya",
  "Prime Voice Media",
  "Mannabay Campaign",
  "Nakuja Project Internship",
  "Nyandarua County Assembly ICT Attachment",
];

export default async function Home() {
  const allProjects = (await getAllProjects()).sort((a, b) => {
    const ai = PROJECT_PRIORITY.indexOf(a.title);
    const bi = PROJECT_PRIORITY.indexOf(b.title);
    return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
  });

  return (
    <div className="relative" style={{ background: BG }}>
      <style>{`
        :root { --page-bg: ${BG}; }
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
        }
        .port a { transition: color 0.15s; }
        .port a:hover { color: ${ORANGE} !important; border-color: rgba(232,108,61,0.40) !important; }
        .exp-block + .exp-block { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(245,245,220,0.08); }
        .award-block + .award-block { margin-top: 1.8rem; padding-top: 1.8rem; border-top: 1px solid rgba(245,245,220,0.08); }
      `}</style>

      <div className="grain" />
      <PortfolioHeader />

      <main className="port relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-32">

        {/* ── Document header ── */}
        <div className="mb-2 pb-6" style={{ borderBottom: "1px solid rgba(245,245,220,0.12)" }}>
          <h1
            style={{
              fontFamily: M,
              fontWeight: 700,
              fontSize: "26px",
              lineHeight: "31px",
              color: WHITE,
              marginBottom: "0.3rem",
            }}
          >
            Steve Muiga
          </h1>
          <p
            style={{
              fontFamily: M,
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "18px",
              color: "rgba(245,245,220,0.55)",
              marginBottom: "1rem",
            }}
          >
            Full-Stack Developer · Nairobi, Kenya
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
            {[
              { label: "muigastephen14@gmail.com", href: "mailto:muigastephen14@gmail.com" },
              { label: "linkedin.com/in/stevemuiga", href: "https://linkedin.com/in/stevemuiga" },
              { label: "github.com/emuiga", href: "https://github.com/emuiga" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{
                  fontFamily: M,
                  fontSize: "15px",
                  lineHeight: "18px",
                  color: WHITE,
                  textDecoration: "underline",
                  textDecorationColor: "rgba(245,245,220,0.25)",
                  textUnderlineOffset: "3px",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="/Stephen-Muiga-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: M,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: ORANGE,
              background: "rgba(232,108,61,0.08)",
              border: "1px solid rgba(232,108,61,0.22)",
              borderRadius: "9999px",
              padding: "5px 16px",
              textDecoration: "none",
            }}
          >
            Download Resume
          </a>
        </div>

        {/* ── My Story ── */}
        <SectionHeading>My Story</SectionHeading>
        <Para>
          I am a person with a resilient, versatile, empathetic, and curious nature, excelling at building relationships
          and adapting to challenging situations by constantly learning and acquiring new skills. I am a
          software engineer based in Nairobi, Kenya, and my work sits at the intersection of software
          engineering, product development, and real-world impact. I studied Pure Mathematics at JKUAT,
          minored in Computer Science, and have been building on the web ever since.
        </Para>
        <Para>
          I have a deep interest in how technology can reshape industries, particularly in fintech, AI,
          and systems that improve access and efficiency for everyday people. I have explored my leadership
          potential through the{" "}
          <a href="https://kamilimu.org" target="_blank" rel="noopener noreferrer"
            style={{ color: WHITE, textDecoration: "underline", textDecorationColor: "rgba(245,245,220,0.25)", textUnderlineOffset: "3px" }}>
            KamiLimu
          </a>{" "}
          mentorship programme, the{" "}
          <a href="https://openhandsinitiative.org/programs/virtual.html" target="_blank" rel="noopener noreferrer"
            style={{ color: WHITE, textDecoration: "underline", textDecorationColor: "rgba(245,245,220,0.25)", textUnderlineOffset: "3px" }}>
            Open Hands Initiative
          </a>{" "}
          fellowship, and the experience of co-founding a software company from the ground up. I care about
          quality, honest communication, and building things that actually work for the people who use them.
          In life, I want to keep building, keep exploring, and keep doing things that scare me a little.
        </Para>

        {/* ── Job Experience ── */}
        <SectionHeading>Job Experience</SectionHeading>
        <div>
          {experiences.map((exp) => (
            <div key={exp.heading} className="exp-block">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                <EntryHeading>
                  {exp.href ? (
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: WHITE, textDecoration: "none" }}
                    >
                      {exp.heading}
                    </a>
                  ) : exp.heading}
                </EntryHeading>
                <span
                  style={{
                    fontFamily: M,
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "18px",
                    color: ORANGE,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {exp.duration}
                </span>
              </div>
              {Array.isArray(exp.body)
                ? exp.body.map((p, i) => <Para key={i}>{p}</Para>)
                : <Para>{exp.body}</Para>}
            </div>
          ))}
        </div>

        {/* ── KamiLimu Experience ── */}
        <SectionHeading>KamiLimu Experience</SectionHeading>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(200px, 35vw, 380px)",
            overflow: "hidden",
            marginBottom: "1.2rem",
            borderRadius: "4px",
          }}
        >
          <Image
            src="/DSC_3173.jpg"
            alt="KamiLimu cohort"
            fill
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(1.2)" }}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <Para>
          During my time at KamiLimu, I was one of 38 participants selected for an 8-month structured
          mentorship programme built for Kenyan students in technology. The programme brought together
          engineers, designers, and builders under the mentorship of senior professionals across the
          industry, and my role went far beyond attending sessions.
        </Para>
        <Para>
          I delivered multiple technical and innovation presentations to audiences of over 50 peers,
          completed 100 hours of training across technical, professional, and public speaking tracks,
          and was recognised as an Innovation Finalist at the close of the cohort. Collaborating with
          people who were as serious about their craft as I was pushed me to refine how I communicate,
          how I think under pressure, and how I approach problems that do not have a clear answer.
        </Para>
        <Para>
          Beyond the skills and the certifications, KamiLimu gave me a network of sharp, driven people
          whose thinking continues to shape how I approach my own work. Pictured above is the cohort.
          I am glad I applied. If you are a student and eligible,{" "}
          <a href="https://kamilimu.org" target="_blank" rel="noopener noreferrer"
            style={{ color: WHITE, textDecoration: "underline", textDecorationColor: "rgba(245,245,220,0.25)", textUnderlineOffset: "3px" }}>
            apply
          </a>.
        </Para>

        {/* ── Selected Work ── */}
        <SectionHeading>Selected Work</SectionHeading>
        {allProjects.length > 0 ? (
          <div className="space-y-5">
            {allProjects.map((p) => (
              <div key={p.title}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: M, fontWeight: 700, fontSize: "15px", lineHeight: "18px", color: WHITE,
                      textDecoration: "underline", textDecorationColor: "rgba(245,245,220,0.25)", textUnderlineOffset: "3px",
                      display: "block", marginBottom: "0.3rem" }}>
                    {p.title}
                  </a>
                ) : (
                  <span style={{ fontFamily: M, fontWeight: 700, fontSize: "15px", lineHeight: "18px",
                    color: WHITE, display: "block", marginBottom: "0.3rem" }}>
                    {p.title}
                  </span>
                )}
                {p.year && (
                  <p style={{ fontFamily: M, fontSize: "13px", color: ORANGE, marginBottom: "0.25rem" }}>
                    {p.year}
                  </p>
                )}
                <Para>{p.description}</Para>
              </div>
            ))}
          </div>
        ) : (
          <Para>Projects coming soon.</Para>
        )}

        {/* ── Education ── */}
        <SectionHeading>Education</SectionHeading>
        <EntryHeading>BSc. Mathematics &amp; Computer Science</EntryHeading>
        <Para>Jomo Kenyatta University of Agriculture &amp; Technology (JKUAT)</Para>

        {/* ── Awards & Certificates ── */}
        <SectionHeading>Awards &amp; Certificates</SectionHeading>
        <div>
          {awards.map((a) => (
            <div key={a.title} className="award-block">
              <EntryHeading>{a.title}</EntryHeading>
              <p style={{ fontFamily: M, fontWeight: 700, fontSize: "15px", lineHeight: "18px",
                color: ORANGE, marginBottom: "0.4rem" }}>
                {a.issuer}
              </p>
              <Para>{a.body}</Para>
              {a.certHref && (
                <a
                  href={a.certHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: M,
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: WHITE,
                    background: "rgba(245,245,220,0.06)",
                    border: "1px solid rgba(245,245,220,0.12)",
                    borderRadius: "9999px",
                    padding: "4px 12px",
                    textDecoration: "none",
                    marginTop: "0.3rem",
                  }}
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <SectionHeading>Skills</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} style={{
              fontFamily: M,
              fontWeight: 400,
              fontSize: "13px",
              padding: "3px 12px",
              background: "rgba(245,245,220,0.06)",
              color: WHITE,
              borderRadius: "9999px",
              border: "1px solid rgba(245,245,220,0.12)",
            }}>
              {s}
            </span>
          ))}
        </div>

      </main>
    </div>
  );
}
