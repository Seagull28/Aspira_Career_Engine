import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  selected: string[];
  onChange: (val: string[]) => void;
}

const SOFT_SKILLS = [
  { label: "Leadership", desc: "Guide and motivate teams to achieve goals" },
  { label: "Communication", desc: "Articulate ideas clearly in written and verbal form" },
  { label: "Strategic Planning", desc: "Think long-term and align actions with goals" },
  { label: "Problem Solving", desc: "Break down complex problems and find creative solutions" },
  { label: "Analytical Thinking", desc: "Interpret data and draw evidence-based conclusions" },
  { label: "Collaboration", desc: "Work effectively in cross-functional team settings" },
  { label: "Public Speaking", desc: "Present confidently to diverse audiences" },
  { label: "Research", desc: "Conduct thorough investigation and synthesize findings" },
  { label: "Attention to Detail", desc: "Identify and prevent errors with precision" },
  { label: "Adaptability", desc: "Thrive in fast-changing environments" },
  { label: "Time Management", desc: "Prioritize tasks and meet deadlines consistently" },
  { label: "Critical Thinking", desc: "Evaluate information objectively and make sound judgments" },
];

export default function StepSoftSkills({ selected, onChange }: Props) {
  const toggle = (skill: string) => {
    if (selected.includes(skill)) {
      onChange(selected.filter(s => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Power Skills</h2>
          <p className="text-sm text-slate-500">Select your strongest interpersonal and professional skills.</p>
        </div>
        {selected.length > 0 && (
          <span className="ml-auto text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
            {selected.length} selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
        {SOFT_SKILLS.map(skill => {
          const active = selected.includes(skill.label);
          return (
            <button
              key={skill.label}
              onClick={() => toggle(skill.label)}
              className={`flex items-start gap-3 text-left w-full p-3 rounded-lg border transition-all ${
                active
                  ? "bg-indigo-50 border-indigo-300 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                active ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
              }`}>
                {active && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${active ? "text-indigo-700" : "text-slate-700"}`}>{skill.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{skill.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
