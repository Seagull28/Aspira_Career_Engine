import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Props {
  selected: string[];
  onChange: (val: string[]) => void;
}

const INDUSTRIES = [
  { label: "FinTech", emoji: "💳", desc: "Payments, banking, trading, insurance" },
  { label: "AI Research", emoji: "🧠", desc: "LLMs, computer vision, robotics, NLP" },
  { label: "HealthTech", emoji: "🏥", desc: "Medical devices, EHR, diagnostics, biotech" },
  { label: "SaaS", emoji: "☁️", desc: "B2B software products and platforms" },
  { label: "E-Commerce", emoji: "🛒", desc: "Online marketplaces and retail tech" },
  { label: "Cybersecurity", emoji: "🔒", desc: "Threat intelligence, zero trust, compliance" },
  { label: "EdTech", emoji: "📚", desc: "Learning platforms, adaptive education" },
  { label: "Defense", emoji: "🛡️", desc: "Aerospace, surveillance, government tech" },
  { label: "Telecom", emoji: "📡", desc: "5G, network infrastructure, IoT" },
  { label: "Consulting", emoji: "📊", desc: "Strategy, management, digital transformation" },
  { label: "Retail", emoji: "🏪", desc: "Supply chain, inventory, consumer goods" },
  { label: "Gaming", emoji: "🎮", desc: "Game development, AR/VR, interactive media" },
];

export default function StepInterests({ selected, onChange }: Props) {
  const toggle = (industry: string) => {
    if (selected.includes(industry)) {
      onChange(selected.filter(s => s !== industry));
    } else if (selected.length < 4) {
      onChange([...selected, industry]);
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
          <Briefcase className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Industry Interests</h2>
          <p className="text-sm text-slate-500">Pick up to 4 industries you want to work in.</p>
        </div>
        <span className={`ml-auto text-xs font-semibold rounded-full px-3 py-1 border ${
          selected.length === 4
            ? "text-amber-600 bg-amber-50 border-amber-100"
            : "text-indigo-600 bg-indigo-50 border-indigo-100"
        }`}>
          {selected.length} / 4
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {INDUSTRIES.map(ind => {
          const active = selected.includes(ind.label);
          const disabled = !active && selected.length >= 4;
          return (
            <button
              key={ind.label}
              onClick={() => toggle(ind.label)}
              disabled={disabled}
              className={`flex items-start gap-3 text-left p-3 rounded-lg border transition-all ${
                active
                  ? "bg-indigo-50 border-indigo-300 shadow-sm"
                  : disabled
                  ? "bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="text-xl leading-none mt-0.5">{ind.emoji}</span>
              <div>
                <p className={`text-sm font-medium leading-tight ${active ? "text-indigo-700" : "text-slate-700"}`}>{ind.label}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">{ind.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
