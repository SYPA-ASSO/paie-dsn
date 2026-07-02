import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: "https://paie-et-dsn.fr", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://paie-et-dsn.fr/conventions-collectives", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://paie-et-dsn.fr/particuliers-employeurs", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://paie-et-dsn.fr/mandat-tiers-declarant", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: "https://paie-et-dsn.fr/notre-perimetre", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: "https://paie-et-dsn.fr/veille-sociale-rh", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: "https://paie-et-dsn.fr/a-propos", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: "https://paie-et-dsn.fr/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: "https://paie-et-dsn.fr/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
  for (const article of articles) {
    pages.push({
      url: `https://paie-et-dsn.fr/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  return pages;
}
