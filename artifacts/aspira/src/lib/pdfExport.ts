import jsPDF from "jspdf";
import type { CareerMatch, UserProfile } from "./careerEngine";

export function generatePDF(profile: UserProfile, matches: CareerMatch[]) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };

  const checkY = (needed: number) => {
    if (y + needed > 270) addPage();
  };

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageW, 50, "F");

  doc.setTextColor(248, 250, 252);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("Aspira", margin, 22);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("AI-Driven Career Intelligence Engine", margin, 31);
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text("Career Roadmap Report  ·  BITS Hyderabad Hackathon '25", margin, 41);

  y = 65;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Your Profile", margin, y);
  y += 2;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentW, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const profileData = [
    ["Degree", `${profile.degree} · ${profile.specialization}`],
    ["CGPA", profile.cgpa.toFixed(1)],
    ["Tech Stack", profile.techStack.join(", ") || "—"],
    ["Soft Skills", profile.softSkills.join(", ") || "—"],
    ["Industry Interests", profile.industryInterests.join(", ") || "—"],
  ];

  profileData.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(label + ":", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const lines = doc.splitTextToSize(value, contentW - 45);
    doc.text(lines, margin + 45, y);
    y += lines.length * 5 + 3;
  });

  y += 8;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Top Career Matches", margin, y);
  y += 2;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentW, y);
  y += 10;

  matches.forEach((match, i) => {
    checkY(60);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 58, 2, 2, "FD");

    doc.setFillColor(59, 130, 246);
    doc.roundedRect(margin, y, 5, 58, 2, 0, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text(`${i + 1}. ${match.title}`, margin + 10, y + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(match.domain, margin + 10, y + 19);

    const matchPct = `${match.matchScore}% Match`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(59, 130, 246);
    const pctW = doc.getTextWidth(matchPct);
    doc.text(matchPct, margin + contentW - pctW - 5, y + 12);

    const barY = y + 23;
    doc.setFillColor(226, 232, 240);
    doc.rect(margin + 10, barY, contentW - 20, 3, "F");
    doc.setFillColor(59, 130, 246);
    doc.rect(margin + 10, barY, (contentW - 20) * (match.matchScore / 100), 3, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(match.description, contentW - 20);
    doc.text(descLines.slice(0, 2), margin + 10, y + 33);

    const col1X = margin + 10;
    const col2X = margin + contentW / 2;
    const rowY = y + 46;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(34, 197, 94);
    doc.text("Your Strengths:", col1X, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(match.matchedSkills.slice(0, 3).join("  ·  "), col1X, rowY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(249, 115, 22);
    doc.text("Skills to Acquire:", col2X, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(match.gapSkills.slice(0, 2).join("  ·  "), col2X, rowY + 6);

    y += 68;
  });

  checkY(30);
  y += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentW, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text("Next Steps", margin + 8, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `1. Focus on closing the gap skills for "${matches[0]?.title}".  2. Build 1-2 portfolio projects in the ${matches[0]?.domain} domain.`,
    margin + 8,
    y + 15
  );

  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated by Aspira · BITS Hyderabad '25 Hackathon`, margin, 290);
    doc.text(`Page ${p} of ${totalPages}`, pageW - margin - 15, 290);
  }

  doc.save("aspira-career-roadmap.pdf");
}
