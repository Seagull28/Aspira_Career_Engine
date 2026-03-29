import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface Props {
  values: {
    degree: string;
    specialization: string;
    cgpa: number;
  };
  onChange: (vals: { degree: string; specialization: string; cgpa: number }) => void;
}

const DEGREES = ["B.E.", "B.Tech", "M.Tech", "M.E.", "MCA", "BCA", "BSc", "MSc"];
const SPECIALIZATIONS = ["AIML", "CSE", "ECE", "IT", "EEE", "Mechanical", "Civil", "Biomedical", "Data Science", "Networks", "MBA"];

export default function StepEducation({ values, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Academic Background</h2>
          <p className="text-sm text-slate-500">Tell us about your degree and academic performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Degree</label>
          <select
            value={values.degree}
            onChange={e => onChange({ ...values, degree: e.target.value })}
            className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
          >
            <option value="">Select degree</option>
            {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Specialization</label>
          <select
            value={values.specialization}
            onChange={e => onChange({ ...values, specialization: e.target.value })}
            className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
          >
            <option value="">Select specialization</option>
            {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">CGPA</label>
          <span className="text-2xl font-bold text-indigo-600">{values.cgpa.toFixed(1)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={4}
            max={10}
            step={0.1}
            value={values.cgpa}
            onChange={e => onChange({ ...values, cgpa: parseFloat(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full bg-slate-200 cursor-pointer accent-indigo-600"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((values.cgpa - 4) / 6) * 100}%, #e2e8f0 ${((values.cgpa - 4) / 6) * 100}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-400">4.0</span>
            <span className="text-xs text-slate-400">7.0</span>
            <span className="text-xs text-slate-400">10.0</span>
          </div>
        </div>
        <div className="flex gap-2 mt-1">
          {[
            { label: "Average", range: "4.0–6.4", color: "text-amber-600 bg-amber-50 border-amber-100" },
            { label: "Good", range: "6.5–7.9", color: "text-blue-600 bg-blue-50 border-blue-100" },
            { label: "Excellent", range: "8.0–10.0", color: "text-green-600 bg-green-50 border-green-100" },
          ].map(tier => (
            <div key={tier.label} className={`flex-1 text-center py-1.5 px-2 rounded-md border text-xs font-medium ${tier.color} ${values.cgpa >= parseFloat(tier.range.split("–")[0]) && values.cgpa <= parseFloat(tier.range.split("–")[1]) ? "ring-2 ring-offset-1 ring-indigo-400" : ""}`}>
              {tier.label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
