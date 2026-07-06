// Moteur de contenu du blog : articles structures rendus par app/blog/[slug]/page.tsx
// Les paragraphes acceptent des liens au format [texte](/chemin) ou [texte](https://...)

import { articles2024 } from "./blog-contenu-1";
import { articles2025 } from "./blog-contenu-2";
import { articles2026 } from "./blog-contenu-3";

export type SectionArticle = {
  id: string;
  titre: string;
  paragraphes: string[];
};

export type QuestionArticle = { question: string; reponse: string };

export type ContenuArticle = {
  slug: string;
  titre: string;
  description: string;
  categorie: "Paie" | "RH" | "Externalisation" | "Déclaratif";
  date: string; // AAAA-MM-JJ (publication)
  dateAffichee: string;
  dateMaj: string; // derniere verification juridique
  dateMajAffichee: string;
  tempsLecture: number; // minutes
  intro: string[];
  sections: SectionArticle[];
  faq: QuestionArticle[];
  cta: string;
};

export const contenuArticles: ContenuArticle[] = [
  ...articles2024,
  ...articles2025,
  ...articles2026,
].sort((a, b) => b.date.localeCompare(a.date));

export function trouverArticle(slug: string): ContenuArticle | undefined {
  return contenuArticles.find((a) => a.slug === slug);
}
