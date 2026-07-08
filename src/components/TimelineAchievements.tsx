import { Trophy, Award, Calendar, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { FadeUp } from "./FadeUp";
import { useLanguage } from "../hooks/useLanguage";

export function TimelineAchievements() {
  const { t } = useLanguage();

  const timelineItems = [
    {
      ...t.timelineAchievements.timelineItems[0],
      icon: <Briefcase size={16} className="text-primary" />,
    },
    {
      ...t.timelineAchievements.timelineItems[1],
      icon: <Cpu size={16} className="text-primary" />,
    },
    {
      ...t.timelineAchievements.timelineItems[2],
      icon: <Briefcase size={16} className="text-primary" />,
    },
    {
      ...t.timelineAchievements.timelineItems[3],
      icon: <GraduationCap size={16} className="text-primary" />,
    },
  ];

  const achievements = [
    {
      ...t.timelineAchievements.achievements[0],
      icon: <Trophy className="text-primary w-6 h-6" />,
    },
    {
      ...t.timelineAchievements.achievements[1],
      icon: <Trophy className="text-primary w-6 h-6" />,
    },
    {
      ...t.timelineAchievements.achievements[2],
      icon: <Award className="text-primary w-6 h-6" />,
    },
    {
      ...t.timelineAchievements.achievements[3],
      icon: <Award className="text-primary w-6 h-6" />,
    },
  ];

  const heading1Parts = t.timelineAchievements.heading.split(t.timelineAchievements.headingSerifWord);
  const heading1Before = heading1Parts[0] ?? "";
  const heading1After = heading1Parts.slice(1).join(t.timelineAchievements.headingSerifWord) ?? "";

  const heading2Parts = t.timelineAchievements.heading2.split(t.timelineAchievements.heading2SerifWord);
  const heading2Before = heading2Parts[0] ?? "";
  const heading2After = heading2Parts.slice(1).join(t.timelineAchievements.heading2SerifWord) ?? "";

  return (
    <section className="py-24 border-t border-border/30">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Work Through Timeline */}
          <div className="lg:col-span-6 text-center flex flex-col items-center">
            <FadeUp as="div" delay={0}>
              <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
                {t.timelineAchievements.tag}
              </span>
            </FadeUp>
            <FadeUp as="h2" delay={0.08} className="text-3xl font-medium mb-10 tracking-tightish text-center">
              {heading1Before}<span className="serif">{t.timelineAchievements.headingSerifWord}</span>{heading1After}
            </FadeUp>

            <div className="space-y-10 w-full max-w-md">
              {timelineItems.map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.1} className="flex flex-col items-center text-center">
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
                {t.timelineAchievements.tag2}
              </span>
            </FadeUp>
            <FadeUp as="h2" delay={0.18} className="text-3xl font-medium mb-10 tracking-tightish text-center">
              {heading2Before}<span className="serif">{t.timelineAchievements.heading2SerifWord}</span>{heading2After}
            </FadeUp>

            <div className="space-y-6 w-full max-w-md">
              {achievements.map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.12}>
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