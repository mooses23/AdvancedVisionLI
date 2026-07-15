import { createContext, useContext, useState, ReactNode } from 'react';

export type Relationship = '' | 'my-child' | 'myself' | 'my-spouse' | 'someone-else';

interface SymptomsContextValue {
  checked: Set<number>;
  toggleSymptom: (idx: number) => void;
  relationship: Relationship;
  setRelationship: (r: Relationship) => void;
}

const SymptomsContext = createContext<SymptomsContextValue | null>(null);

export function SymptomsProvider({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [relationship, setRelationship] = useState<Relationship>('');

  const toggleSymptom = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <SymptomsContext.Provider value={{ checked, toggleSymptom, relationship, setRelationship }}>
      {children}
    </SymptomsContext.Provider>
  );
}

export function useSymptoms() {
  const ctx = useContext(SymptomsContext);
  if (!ctx) throw new Error('useSymptoms must be used within SymptomsProvider');
  return ctx;
}

// ── Message composition ─────────────────────────────────────────────────────

const SYMPTOMS = [
  'Difficulty copying from the board',
  'Distance blur after near activities',
  'Repeats lines when reading',
  'Reverses letters',
  'Avoids reading',
  'Poor reading comprehension',
  'Misaligns digits in columns',
  'Poor stamina in visual tasks',
  'Eye turn (one eye drifts)',
  'Covers or closes one eye',
  'Double vision complaints',
  'Eye strain or headache complaints',
  'Eye rubbing / tearing',
  'Head turn or tilt',
  'Blurry near or distance vision',
  'Bumps into surroundings / clumsy',
  'Underperforms relative to intelligence',
  'Avoids sports or outdoor activities',
];

const SUBJECT: Record<Relationship, string> = {
  '':             'Someone close to me has',
  'my-child':     'My child has',
  'myself':       'I have',
  'my-spouse':    'My spouse has',
  'someone-else': 'Someone I care for has',
};

/** Build the optional closing line from sender details. */
function closingLine(name: string, phone: string, email: string): string {
  const n = name.trim();
  const p = phone.trim();
  const e = email.trim();

  // Build the contact string from whatever is present
  const contact = [p, e].filter(Boolean).join(' or ');

  if (n && contact) return `My name is ${n}, and I can be reached at ${contact}.`;
  if (n)            return `My name is ${n}.`;
  if (contact)      return `I can be reached at ${contact}.`;
  return '';
}

/**
 * Compose the contact-form message from checked symptoms, the selected
 * relationship, and optional sender details pulled live from the form fields.
 *
 * Rules enforced here:
 *  - No symptoms → friendly default (never an empty box).
 *  - Symptoms → opening line + numbered list + closing ask.
 *  - "free" is never used — the practice doesn't advertise free consultations.
 *  - Sender name/phone/email appended when available so the message is self-contained.
 */
export function composeMessage(
  checked: Set<number>,
  relationship: Relationship,
  senderName = '',
  senderPhone = '',
  senderEmail = '',
): string {
  const closing = closingLine(senderName, senderPhone, senderEmail);

  // ── No symptoms: sensible default (fixes the empty-box bug) ───────────────
  if (checked.size === 0) {
    const base =
      "I'd like to learn more about your vision therapy services and would like to schedule an evaluation. Please don't hesitate to reach out.";
    return closing ? `${base}\n\n${closing}` : base;
  }

  // ── Symptoms checked: numbered list ───────────────────────────────────────
  const selected = [...checked].sort((a, b) => a - b).map((i) => SYMPTOMS[i]);
  const subject  = SUBJECT[relationship];
  const list     = selected.map((s, i) => `${i + 1}. ${s}`).join('\n');

  const lines = [
    `${subject} been showing signs that may point to a vision concern:`,
    '',
    list,
    '',
    "I'd like to schedule an evaluation to discuss this further. Please reach out at your convenience.",
  ];

  if (closing) lines.push('', closing);

  return lines.join('\n');
}
