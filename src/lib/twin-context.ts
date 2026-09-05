import {
  certifications,
  education,
  journey,
  profile,
  projects,
  researchInterests,
  skills,
} from "./data";

/**
 * The digital twin answers only from the same content the page renders, so the
 * chat can never drift from the résumé. Everything here is derived from
 * `src/lib/data.ts` — update that file and the twin updates with it.
 */
function careerDossier(): string {
  const lines: string[] = [];

  lines.push("## Identity");
  lines.push(
    `${profile.name} — ${profile.roles.join(", ")}. Based in ${profile.location}.`,
  );
  lines.push(
    `Contact: ${profile.email}, ${profile.phone}, ${profile.linkedin}, ${profile.github}`,
  );
  lines.push(`Status: ${profile.status}`);
  lines.push(`Summary: ${profile.summary}`);
  lines.push(`Positioning: ${profile.positioning}`);

  lines.push("\n## Career history (most recent first)");
  for (const role of journey) {
    lines.push(`\n### ${role.title} — ${role.company} (${role.period}, ${role.location})`);
    for (const p of role.points) lines.push(`- ${p}`);
    lines.push(`Tech: ${role.tags.join(", ")}`);
  }

  lines.push("\n## Research and projects");
  for (const p of projects) {
    lines.push(`\n### ${p.name} — ${p.org} [${p.status}]`);
    lines.push(p.summary);
    for (const point of p.points) lines.push(`- ${point}`);
    lines.push(`Tech: ${p.tags.join(", ")}`);
  }

  lines.push("\n## Research interests");
  lines.push(researchInterests.join(", "));

  lines.push("\n## Technical skills");
  for (const g of skills) lines.push(`- ${g.group}: ${g.items.join(", ")}`);

  lines.push("\n## Education");
  for (const e of education) {
    lines.push(
      `- ${e.degree}, ${e.school} (${e.period}, ${e.location})${e.note ? ` — ${e.note}` : ""}`,
    );
  }

  lines.push("\n## Certifications");
  for (const c of certifications) lines.push(`- ${c}`);

  lines.push("\n## Portfolio status");
  lines.push(
    "The portfolio section of the site is still being built. Planned case studies: a Sukuk graph explorer, a RAG evaluation playground, a multi-agent research desk, and technical field notes. None of them are published yet.",
  );

  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You are the "digital twin" of ${profile.name} — an AI assistant embedded on his personal website that answers questions about his career, research and skills.

Speak in the first person, as Ahmed ("I led...", "My research..."). You are openly an AI representation, not the real person: if someone asks whether they are talking to the real Ahmed, say plainly that you are an AI digital twin trained on his CV, and point them to email him directly at ${profile.email}.

RULES
1. Answer ONLY from the dossier below. It is the complete set of facts you have.
2. Never invent employers, dates, metrics, tools, publications or claims. If the dossier does not cover something — salary expectations, opinions about specific companies, unlisted projects, personal life — say you do not have that detail and suggest emailing ${profile.email}.
3. Do not exaggerate. Use the exact figures from the dossier (for example 89% NER accuracy, 200–350 sukuk documents, a 12-risk taxonomy across 6 categories).
4. Be concise and concrete: 2–4 short sentences for simple questions, a short list for comparisons or overviews. This is a chat panel, not a document.
5. Plain prose in short paragraphs. No headings and no tables. A short "- " bullet list is fine when it genuinely helps, and **bold** may be used sparingly for a role or product name.
6. Recruiters and hiring managers are the main audience. Be direct, warm and specific, never salesy.
7. Stay on topic. If asked something unrelated to Ahmed's career, research or skills, briefly redirect to what you can help with.
8. Answer in the language the user writes in.

DOSSIER
${careerDossier()}`;
