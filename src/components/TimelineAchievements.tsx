import { Trophy, Award, Calendar, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { FadeUp } from "./FadeUp";

export function TimelineAchievements() {
  const timelineItems = [
    {
      year: "2025 - Present",
      title: "GandI Open World Game (Sole Developer)",
      icon: <Briefcase size={16} className="text-primary" />,
      desc: "Designed and engineered an open world game in 3 months. Attracted 1,200+ players; partnered with Kinetic Hosting for publishing and global distribution.",
    },
    {
      year: "2024",
      title: "Android Malware Detection (Leader & Developer)",
      icon: <Cpu size={16} className="text-primary" />,
      desc: "Led development of a system at Prince Sattam Bin Abdulaziz University using static code analysis and ML, achieving 99.4% (Dataset 2) and 96.25% (Dataset 1) accuracy.",
    },
    {
      year: "2024",
      title: "IT Support Specialist (Internship)",
      icon: <Briefcase size={16} className="text-primary" />,
      desc: "Diagnosed and resolved hardware/software incidents at Artar, improving internal system stability and workflow uptime.",
    },
    {
      year: "Education",
      title: "B.S. in Computer Science",
      icon: <GraduationCap size={16} className="text-primary" />,
      desc: "Prince Sattam Bin Abdulaziz University (Al-Kharj, Saudi Arabia). Specialized in programming, algorithms, and machine learning methodologies.",
    },
  ];

  const achievements = [
    {
      icon: <Trophy className="text-primary w-6 h-6" />,
      title: "5th Place Nationwide",
      subtitle: "Al-Khwarizmi Programming Contest",
      desc: "Ranked 5th in the Saudi Arabia National Java Programming Contest, solving advanced algorithmic challenges under high time pressure.",
    },
    {
      icon: <Trophy className="text-primary w-6 h-6" />,
      title: "5th Place in KSA",
      subtitle: "ACM Certification Exam",
      desc: "Ranked 5th nationwide on the ACM Certification Exam, demonstrating top-tier expertise in computer science and programming fundamentals.",
    },
    {
      icon: <Award className="text-primary w-6 h-6" />,
      title: "30+ Professional Certificates",
      subtitle: "Great Learning (2025 - 2026)",
      desc: "Granted over 30 specialized certificates in Machine Learning and Data Science, covering advanced algorithms, neural networks, and EDA.",
    },
    {
      icon: <Award className="text-primary w-6 h-6" />,
      title: "Software Engineering Club Award",
      subtitle: "University contribution",
      desc: "Recognized for contributions and excellence in software development practices, student mentorship, and workshop leadership (2022).",
    },
  ];

  return (
    <section className="py-24 border-t border-border/30">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Work Through Timeline */}
          <div className="lg:col-span-6 text-center flex flex-col items-center">
            <FadeUp as="div" delay={0}>
              <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
                TIMELINE
              </span>
            </FadeUp>
            <FadeUp as="h2" delay={0.08} className="text-3xl font-medium mb-10 tracking-tightish text-center">
              Career <span className="serif">Timeline</span>
            </FadeUp>

            <div className="space-y-10 w-full max-w-md">
              {timelineItems.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.1} className="flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border/40 flex items-center justify-center mb-3 shadow-sm text-primary">
                    {item.icon}
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1.5 justify-center">
                      <Calendar size={12} />
                      {item.year}
                    </span>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-6 text-center flex flex-col items-center">
            <FadeUp as="div" delay={0.1}>
              <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
                HONORS
              </span>
            </FadeUp>
            <FadeUp as="h2" delay={0.18} className="text-3xl font-medium mb-10 tracking-tightish text-center">
              Key <span className="serif">Achievements</span>
            </FadeUp>

            <div className="space-y-6 w-full max-w-md">
              {achievements.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.12}>
                  <div className="liquid-glass p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:border-foreground/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 border border-border/30">
                      {item.icon}
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <span className="text-[11px] font-medium text-primary tracking-wide block mb-2 uppercase">
                        {item.subtitle}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


