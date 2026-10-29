export type Seg = { t: string; b?: boolean; i?: boolean };
export type Para = Seg[];

const s = (t: string): Seg => ({ t });
const b = (t: string, i = false): Seg => ({ t, b: true, i });

export const intro: Para[] = [
  [s('Ici s’élève la voix d’un soldat. Un témoin de l’Histoire qui, malgré le camp qu’il avait choisi, a perçu les voix de celles et ceux qu’on a voulu faire taire à coups de canons.')],
  [s('Ce projet est un cri : celui d’un peuple en lutte qui a dressé des barricades, celui d’un homme qu’on a envoyé tuer ses compatriotes.')],
  [s('Porté par la force de la musique et l’intensité du récit, ce voyage ranime les braises de '), b('1871'), s(' : la sanglante année où Paris s’est embrasée.')],
];

export const projet: Para[] = [
  [s('Nous sommes deux créateurs réunis autour d’une passion commune pour la musique, le cinéma et les récits. Nous portons ensemble ce projet musical, visuel et narratif inspiré de la forme immersive initiée par '), b('« The Inner Path »', true), s(' (notre première collaboration). '), b('« 1871 : les cendres et le sang »'), s(' témoigne de l’enchevêtrement de l’Histoire dans nos histoires personnelles.')],
  [s('Le protagoniste, '), b('Aristide'), s(', n’est pas un personnage fictif : '), b('il s’agit de l’un de nos aïeux'), s(', un soldat de l’armée versaillaise ayant combattu lors de la guerre franco-prussienne puis contre les insurgés de la Commune. Au travers de son carnet de route, nous revisitons ses convictions, ses doutes, sa colère et son effroi. Paris brûle, la République chancelle et '), b('Aristide'), s(' – tiraillé entre devoir et conscience – devient le témoin d’une guerre fratricide.')],
  [s('Comme pour « The Inner Path », notre œuvre mêle narration sonore et visuelle, musique orchestrale et Metal pour créer une expérience inédite. Il ne s’agit pas seulement d’une création artistique, c’est une plongée dans une histoire vécue et transmise.')],
  [s('Avec '), b('« 1871 : les cendres et le sang »'), s(' nous ne faisons pas que porter la parole d’Aristide. '), b('Nous faisons parler la mémoire.')],
];

export const aproposA: Para[] = [
  [s('Après avoir combattu contre les Prussiens, l’armée régulière française doit faire face aux insurgés de la Commune qui refusent d’une part la capitulation de la France et d’autre part rejettent le gouvernement nouvellement élu. '), b('« 1871 : les cendres et le sang »'), s(' relate la progression des soldats versaillais vers Paris et les combats qui les opposent en chemin aux Communards.')],
];

export const aproposB: Para[] = [
  [b('Aristide Fidel'), s(' contemple la désolation des destructions prussiennes et s’interroge sur le bien-fondé de cette guerre civile menée contre des concitoyens.')],
  [s('Bien qu’il soit un soldat loyal, il est traversé de doutes, de questions et même parfois d’écœurement quant au devoir qui est le sien. Lorsque l’armée régulière arrive dans Paris, '), b('l’affrontement contre les Communards fait rage'), s('. Aux destructions causées par les Prussiens, s’ajoutent maintenant celles des insurgés : la capitale est détruite de l’intérieur.')],
  [s('La guerre et son fracas se font plus présents. '), b('Le feu ravage Paris.')],
  [s('En réponse à la révolte des émeutiers, la répression de la Commune est impitoyable : aux combats succèdent les exécutions après des procès expéditifs. Malgré son épouvante devant les destructions, Aristide désapprouve les méthodes de l’armée dont il fait pourtant partie : le sang coule à flot et les morts de la guerre civile viennent grossir les rangs des victimes du conflit franco-prussien.')],
];
