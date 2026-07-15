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
  '': 'Someone close to me has',
  'my-child': 'My child has',
  'myself': 'I have',
  'my-spouse': 'My spouse has',
  'someone-else': 'Someone I care for has',
};

function naturalList(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  const init = items.slice(0, -1).join(', ');
  return `${init}, and ${items[items.length - 1]}`;
}

export function composeMessage(checked: Set<number>, relationship: Relationship): string {
  if (checked.size === 0) return '';

  const selected = [...checked]
    .sort((a, b) => a - b)
    .map((i) => SYMPTOMS[i].charAt(0).toLowerCase() + SYMPTOMS[i].slice(1));

  const subject = SUBJECT[relationship];
  const quantity =
    selected.length === 1
      ? 'a sign'
      : selected.length <= 3
      ? 'a few signs'
      : 'several signs';

  return (
    `${subject} been showing ${quantity} that may point to a vision concern, ` +
    `including ${naturalList(selected)}. ` +
    `I'd like to schedule a free evaluation to learn more about what might be going on. ` +
    `Please feel free to reach out at your convenience.`
  );
}
