import { motion } from "framer-motion";
import {
  Brain, Code2, BarChart3, Cloud, Target, Shield,
  TrendingUp, Cpu, HeartPulse, Users,
  CheckCircle2, ArrowRight, Download, RotateCcw, Sparkles
} from "lucide-react";
import type { CareerMatch, UserProfile } from "@/lib/careerEngine";
import { generatePDF } from "@/lib/pdfExport";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code2, BarChart3, Cloud, Target, Shield, TrendingUp, Cpu, HeartPulse, Users,
};

interface Props {
  matches: CareerMatch[];
  profile: UserProfile;
  onReset: () => void;
}

function MatchCard({ match, index }: { match: CareerMatch; index: number }) {
  const Icon = ICON_MAP[match.icon] ?? Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {index === 0 && (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 uppercase tracking-wide">Top Pick</span>
              )}
            </div>
            <h3 className="text-base font-semibold text-slate-900 leading-tight mt-0.5">{match.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{match.domain}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-bold text-indigo-600">{match.matchScore}%</span>
          <p className="text-xs text-slate-400">match</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Match Score</span>
          <span>{match.matchScore}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${match.matchScore}%` }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.7, ease: "easeOut" }}
            className={`h-full rounded-full ${
              match.matchScore >= 75 ? "bg-indigo-500" : match.matchScore >= 55 ? "bg-blue-400" : "bg-slate-400"
            }`}
          />
        </div>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed">{match.description}</p>

      <div className="grid grid-cols-2 gap-4 pt-1">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-600">Your Strengths</span>
          </div>
          <div className="space-y-1.5">
            {match.matchedSkills.length > 0 ? match.matchedSkills.map(skill => (
              <div key={skill} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs text-slate-600">{skill}</span>
              </div>
            )) : (
              <span className="text-xs text-slate-400 italic">No direct matches</span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowRight className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-600">Skills to Acquire</span>
          </div>
          <div className="space-y-1.5">
            {match.gapSkills.length > 0 ? match.gapSkills.map(skill => (
              <div key={skill} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                <span className="text-xs text-slate-600">{skill}</span>
              </div>
            )) : (
              <span className="text-xs text-slate-400 italic">Great coverage!</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsDashboard({ matches, profile, onReset }: Props) {
  const topMatch = matches[0];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Analysis Complete
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Your Career Intelligence Report</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Based on your profile, here are your top 3 career matches ranked by compatibility.
        </p>
      </motion.div>

      {topMatch && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-5 text-white flex items-center justify-between"
        >
          <div>
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wide mb-1">Best Match</p>
            <h2 className="text-xl font-bold">{topMatch.title}</h2>
            <p className="text-indigo-200 text-sm mt-1">{topMatch.domain}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{topMatch.matchScore}%</div>
            <p className="text-indigo-200 text-xs">compatibility</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {matches.map((match, i) => (
          <MatchCard key={match.title} match={match} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
      >
        <button
          onClick={() => generatePDF(profile, matches)}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 border border-indigo-700 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download Career Roadmap (PDF)
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-center text-xs text-slate-400"
      >
        Powered by Aspira Rule-Based Engine · BITS Hyderabad Hackathon '25
      </motion.div>
    </div>
  );
}
