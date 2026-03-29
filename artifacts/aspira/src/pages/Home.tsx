import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Zap, Compass } from "lucide-react";
import type { UserProfile } from "@/lib/careerEngine";
import { computeCareerMatches } from "@/lib/careerEngine";
import StepEducation from "@/components/wizard/StepEducation";
import StepTechStack from "@/components/wizard/StepTechStack";
import StepSoftSkills from "@/components/wizard/StepSoftSkills";
import StepInterests from "@/components/wizard/StepInterests";
import ResultsDashboard from "@/components/ResultsDashboard";
import type { CareerMatch } from "@/lib/careerEngine";

const STEPS = [
  { label: "Education", shortLabel: "Edu" },
  { label: "Tech Stack", shortLabel: "Tech" },
  { label: "Soft Skills", shortLabel: "Skills" },
  { label: "Interests", shortLabel: "Goals" },
];

const STORAGE_KEY = "aspira_profile";

const defaultProfile: UserProfile = {
  degree: "",
  specialization: "",
  cgpa: 7.5,
  techStack: [],
  softSkills: [],
  industryInterests: [],
};

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6 max-w-2xl">
        Map your skill set<br />
        <span className="text-indigo-600">to industry demand.</span>
      </h1>

      <p className="text-slate-500 text-lg max-w-md mb-12 leading-relaxed">
        Answer 4 quick questions. Our rule-based engine maps your profile to the highest-demand career paths in tech.
      </p>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0"
      >
        Start Assessment
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
        {[
          { label: "4 Questions", sub: "Quick and focused" },
          { label: "Rule-Based AI", sub: "Transparent matching" },
          { label: "PDF Export", sub: "Shareable roadmap" },
        ].map(item => (
          <div key={item.label} className="text-center">
            <p className="text-sm font-bold text-slate-900">{item.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [results, setResults] = useState<CareerMatch[] | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      const matches = computeCareerMatches(profile);
      setResults(matches);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else setShowHero(true);
  };

  const handleReset = () => {
    setResults(null);
    setStep(0);
    setProfile(defaultProfile);
    setShowHero(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isNextDisabled = () => {
    if (step === 0) return !profile.degree || !profile.specialization;
    if (step === 1) return profile.techStack.length === 0;
    return false;
  };

  if (showHero && !results) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <HeroSection onStart={() => setShowHero(false)} />
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-10">
          <ResultsDashboard matches={results} profile={profile} onReset={handleReset} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-xs font-semibold text-indigo-600">{STEPS[step].label}</span>
          </div>
          <div className="flex gap-1.5 mt-2">
            {STEPS.map((s, i) => (
              <div
                key={s.label}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-indigo-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {STEPS.map((s, i) => (
              <span key={s.label} className={`text-[10px] font-medium transition-colors ${i <= step ? "text-indigo-600" : "text-slate-300"}`}>
                {s.shortLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div key={step}>
              {step === 0 && (
                <StepEducation
                  values={{ degree: profile.degree, specialization: profile.specialization, cgpa: profile.cgpa }}
                  onChange={vals => setProfile(p => ({ ...p, ...vals }))}
                />
              )}
              {step === 1 && (
                <StepTechStack
                  selected={profile.techStack}
                  onChange={techStack => setProfile(p => ({ ...p, techStack }))}
                />
              )}
              {step === 2 && (
                <StepSoftSkills
                  selected={profile.softSkills}
                  onChange={softSkills => setProfile(p => ({ ...p, softSkills }))}
                />
              )}
              {step === 3 && (
                <StepInterests
                  selected={profile.industryInterests}
                  onChange={industryInterests => setProfile(p => ({ ...p, industryInterests }))}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {step < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
              >
                <Zap className="w-4 h-4" />
                Generate My Report
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-black tracking-tight text-slate-900 italic">Aspira</span>
        </div>
      </div>
    </nav>
  );
}
