export type Article = {
  slug: string;
  titre: string;
  description: string;
  date: string;
  dateAffichee: string;
};

export const articles: Article[] = [
  {
    slug: "qui-peut-etablir-vos-bulletins-de-paie",
    titre:
      "Qui peut établir vos bulletins de paie ? Expert-comptable, gestionnaire indépendant, logiciel : ce que dit le droit",
    description:
      "Beaucoup d'employeurs croient que la paie est réservée aux experts-comptables. La réalité juridique est plus nuancée : ce qui est réservé, ce qui est libre, et comment choisir en connaissance de cause.",
    date: "2026-07-02",
    dateAffichee: "2 juillet 2026",
  },
];
