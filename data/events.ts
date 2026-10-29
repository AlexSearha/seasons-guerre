export type EventItem = {
  id: string;
  date: string; // AAAA-MM-JJ
  title: string;
  venue: string;
  city: string;
  time?: string;
  url?: string; // lien de réservation (optionnel)
};

// Exemples à remplacer par tes vraies dates. Les événements passés sont masqués automatiquement.
export const events: EventItem[] = [
  { id: 'e1', date: '2027-02-20', title: 'Événement à venir', venue: 'Lieu à confirmer', city: 'Ville', time: '20 h 30' },
  { id: 'e2', date: '2027-04-17', title: 'Événement à venir', venue: 'Lieu à confirmer', city: 'Ville', time: '21 h 00' },
  { id: 'e3', date: '2027-06-05', title: 'Événement à venir', venue: 'Lieu à confirmer', city: 'Ville' },
];
