export type Track = { id: string; numeral: string; title: string; teaser: string; src?: string };

// Renseigne `src` (ex. '/audio/piste-1.mp3') pour brancher le vrai son.
export const tracks: Track[] = [
  { id: 't1', numeral: 'I', title: 'Titre à venir', teaser: 'Extrait à venir.' },
  { id: 't2', numeral: 'II', title: 'Titre à venir', teaser: 'Extrait à venir.' },
  { id: 't3', numeral: 'III', title: 'Titre à venir', teaser: 'Extrait à venir.' },
  { id: 't4', numeral: 'IV', title: 'Titre à venir', teaser: 'Extrait à venir.' },
];
