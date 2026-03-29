import { motion } from "framer-motion";
import { Code2, X } from "lucide-react";

interface Props {
  selected: string[];
  onChange: (val: string[]) => void;
}

const TECH_CATEGORIES = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "C", "Go", "Rust", "R", "MATLAB"],
  },
  {
    label: "Frontend",
    items: ["React", "Vue.js", "Angular", "HTML/CSS", "Next.js", "Tailwind CSS", "Figma"],
  },
  {
    label: "Backend & DB",
    items: ["Node.js", "Django", "FastAPI", "Spring Boot", "SQL", "MongoDB", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    label: "AI / Data",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Spark", "Tableau", "Power BI"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Linux", "Terraform", "Jenkins"],
  },
  {
    label: "Tools",
    items: ["Git", "JIRA", "Excel", "Postman", "Wireshark"],
  },
];

export default function StepTechStack({ selected, onChange }: Props) {
  const toggle = (tech: string) => {
    if (selected.includes(tech)) {
      onChange(selected.filter(t => t !== tech));
    } else {
      onChange([...selected, tech]);
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
          <Code2 className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Technical Stack</h2>
          <p className="text-sm text-slate-500">Select all technologies you are proficient in.</p>
        </div>
        {selected.length > 0 && (
          <span className="ml-auto text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
            {selected.length} selected
          </span>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          {selected.map(tech => (
            <span key={tech} className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-2.5 py-1">
              {tech}
              <button onClick={() => toggle(tech)} className="ml-0.5 text-indigo-400 hover:text-indigo-700 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {TECH_CATEGORIES.map(cat => (
          <div key={cat.label}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map(tech => {
                const active = selected.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggle(tech)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
