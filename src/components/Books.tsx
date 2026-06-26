import { useState } from "react";
import { Search } from "lucide-react";
import { FadeUp } from "./FadeUp";

interface Book {
  title: string;
  image: string;
  status: "reading" | "planning" | "finished";
}

const BOOKS_DATA: Book[] = [
  {
    title: "Recommender System Algorithms And Their Application",
    image: "/books/RecommenderSystemAlgorithmAndTheirApplication.jpg",
    status: "reading",
  },
  {
    title: "The Lean Startup",
    image: "/books/The-Lean-Startup.png",
    status: "planning",
  },
  {
    title: "Team of Teams",
    image: "/books/TeamOfTeam.jpg",
    status: "planning",
  },
  {
    title: "Code Complete",
    image: "/books/CodeComplete.jpg",
    status: "planning",
  },
  {
    title: "Designing Data Intensive Applications",
    image: "/books/DesigningData-IntensiveApplications.jpg",
    status: "planning",
  },
  {
    title: "War",
    image: "/books/war.jpeg",
    status: "planning",
  },
  {
    title: "Maybe You Should Talk To Someone",
    image: "/books/maybeYouShouldTalkToSomeone.jpg",
    status: "planning",
  },
  {
    title: "The 5 Levels Of Leadership",
    image: "/books/The5LevelsOfLeadership.jpg",
    status: "planning",
  },
  {
    title: "Eat That Frog!",
    image: "/books/EatThatFrog.jpg",
    status: "planning",
  },
  {
    title: "Seduction",
    image: "/books/robert-greene-art-of-seduction.jpg",
    status: "planning",
  },
  {
    title: "Rich Dad Poor Dad",
    image: "/books/richDadPoorDad.jpg",
    status: "finished",
  },
  {
    title: "The 5 Love Languages",
    image: "/books/The5LoveLanguages.jpg",
    status: "finished",
  },
  {
    title: "The 12 Week Year",
    image: "/books/The12WeekYear.jpg",
    status: "finished",
  },
  {
    title: "Surrounded By Idiots",
    image: "/books/SurroundedByIdiots.jpg",
    status: "finished",
  },
  {
    title: "The 7 Habits Of Highly Effective People",
    image: "/books/7Habits.jpg",
    status: "finished",
  },
  {
    title: "The Subtle Art Of Not Giving A F*ck",
    image: "/books/ArtOfNotGivingA.jpg",
    status: "finished",
  },
  {
    title: "Rich Dad's Cashflow Quadrant",
    image: "/books/CashFlowQuadrant.jpg",
    status: "finished",
  },
  {
    title: "Charlie Chaplin",
    image: "/books/CharlieChaplin.jpg",
    status: "finished",
  },
  {
    title: "Crime And Punishment",
    image: "/books/CrimeAndPunishment.jpg",
    status: "finished",
  },
  {
    title: "Forty",
    image: "/books/Forty.png",
    status: "finished",
  },
  {
    title: "Good To Great",
    image: "/books/GoodToGreat.jpg",
    status: "finished",
  },
  {
    title: "Ikigai",
    image: "/books/IKIGAI.jpg",
    status: "finished",
  },
  {
    title: "Jump",
    image: "/books/Jump.jpg",
    status: "finished",
  },
  {
    title: "Letting Go",
    image: "/books/LettingGo.jpg",
    status: "finished",
  },
  {
    title: "The 1-Page Marketing Plan",
    image: "/books/MarketingInOnePage.jpg",
    status: "finished",
  },
  {
    title: "Men Are From Mars, Women Are From Venus",
    image: "/books/MenMarsWomenVenus.jpg",
    status: "finished",
  },
  {
    title: "The Power Of Now",
    image: "/books/PowerOfNow.jpg",
    status: "finished",
  },
  {
    title: "The Psychology Of Money",
    image: "/books/PsychologicalOfMoney.jpg",
    status: "finished",
  },
  {
    title: "The Richest Man In Babylon",
    image: "/books/RichestManInBabylon.jpg",
    status: "finished",
  },
  {
    title: "Salt: A World History",
    image: "/books/SaltHistory.jpg",
    status: "finished",
  },
  {
    title: "Secrets Of The Millionaire Mind",
    image: "/books/SecretsMindMillionaire.jpg",
    status: "finished",
  },
  {
    title: "The Age Of Surveillance Capitalism",
    image: "/books/TheAgeOfSurveillanceCapitalism.jpg",
    status: "finished",
  },
  {
    title: "The Crowd",
    image: "/books/TheCrowd.jpg",
    status: "finished",
  },
  {
    title: "Dopamine Nation",
    image: "/books/TheDopamineNation.jpg",
    status: "finished",
  },
  {
    title: "The Invisible Gorilla",
    image: "/books/TheInvisibleGorilla.jpg",
    status: "finished",
  },
  {
    title: "The Power Of Habit",
    image: "/books/ThePowerOfHabit.jpg",
    status: "finished",
  },
  {
    title: "The Power Of Your Subconscious Mind",
    image: "/books/ThePowerOfTheSubconsciousMind.jpg",
    status: "finished",
  },
  {
    title: "Think Again",
    image: "/books/ThinkAgain.png",
    status: "finished",
  },
  {
    title: "Think And Grow Rich",
    image: "/books/ThinkAndGrowRich.jpg",
    status: "finished",
  },
  {
    title: "Who Moved My Cheese?",
    image: "/books/WhoMovedMyCheese.jpg",
    status: "finished",
  },
  {
    title: "Why We Sleep",
    image: "/books/WhyWeSleep.jpg",
    status: "finished",
  },
  {
    title: "Atomic Habits",
    image: "/books/atomicHabits.png",
    status: "finished",
  },
  {
    title: "Thinking, Fast And Slow",
    image: "/books/QuickThink.jpg",
    status: "finished",
  },
  {
    title: "Can't Hurt Me",
    image: "/books/YouCan'tHurtMe.jpg",
    status: "finished",
  },
];

export function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBooks = BOOKS_DATA.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusPill = (status: "reading" | "planning" | "finished") => {
    switch (status) {
      case "reading":
        return (
          <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400">
            Reading
          </span>
        );
      case "planning":
        return (
          <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Planning
          </span>
        );
      case "finished":
        return (
          <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            Finished
          </span>
        );
    }
  };

  return (
    <section className="pt-28 pb-20 container max-w-6xl">
      {/* Title */}
      <div className="text-center mb-12">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
            JOURNEY
          </span>
        </FadeUp>
        <FadeUp as="h1" delay={0.08}>
          <span className="block text-5xl md:text-6xl font-medium tracking-tightish">
            Reading <span className="serif">List</span>
          </span>
        </FadeUp>
        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-base max-w-xl mx-auto mt-4 leading-relaxed">
            A curated log of books I am reading, planning to read, or have completed.
          </span>
        </FadeUp>
      </div>

      {/* Search & Filters */}
      <FadeUp delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-3xl mx-auto mb-16">
        <div className="relative w-full sm:w-80 flex items-center">
          <Search size={16} className="absolute left-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-foreground/5 border border-border/40 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none text-foreground focus:border-primary/80"
          />
        </div>

        <div className="flex gap-2">
          {["all", "reading", "planning", "finished"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                filterStatus === status
                  ? "bg-foreground text-background border-foreground"
                  : "bg-foreground/5 border-border/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book, idx) => (
          <FadeUp key={book.title} delay={(idx % 8) * 0.05}>
            <div className="liquid-glass p-5 rounded-2xl flex flex-col items-center text-center group hover:border-foreground/35 transition-all duration-300 h-full">
              {/* Cover Art */}
              <div className="w-36 h-52 rounded-lg overflow-hidden shadow-xl border border-zinc-800 flex items-center justify-center bg-zinc-950 group-hover:scale-[1.03] transition-transform duration-300">
                <img
                  src={book.image}
                  alt={`${book.title} Cover`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to text representation if image fails to load
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold tracking-wide leading-snug mt-6 mb-4 line-clamp-2 min-h-[40px]">
                {book.title}
              </h3>

              {/* Status */}
              <div className="mt-auto">{getStatusPill(book.status)}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <FadeUp delay={0}>
          <div className="text-center py-20 text-muted-foreground">No books match your criteria.</div>
        </FadeUp>
      )}
    </section>
  );
}
