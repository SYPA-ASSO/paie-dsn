import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contenuArticles, trouverArticle } from "@/lib/blog-contenu";

export function generateStaticParams() {
  return contenuArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = trouverArticle(slug);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.description,
    alternates: { canonical: `https://paie-et-dsn.fr/blog/${article.slug}` },
  };
}

// Rend un paragraphe avec liens [texte](url)
function Paragraphe({ texte }: { texte: string }) {
  const morceaux = texte.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <p className="mt-4 leading-relaxed">
      {morceaux.map((morceau, i) => {
        const lien = morceau.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!lien) return <span key={i}>{morceau}</span>;
        const [, texteLien, href] = lien;
        return href.startsWith("/") ? (
          <Link
            key={i}
            href={href}
            className="font-semibold text-emerald-deep underline"
          >
            {texteLien}
          </Link>
        ) : (
          <a
            key={i}
            href={href}
            className="font-semibold text-emerald-deep underline"
          >
            {texteLien}
          </a>
        );
      })}
    </p>
  );
}

export default async function ArticleBlog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = trouverArticle(slug);
  if (!article) notFound();

  const url = `https://paie-et-dsn.fr/blog/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.titre,
        description: article.description,
        datePublished: article.date,
        dateModified: article.dateMaj,
        inLanguage: "fr-FR",
        mainEntityOfPage: url,
        author: {
          "@type": "Organization",
          name: "Cabinet Cholez-Pagotto",
          url: "https://cholez-pagotto.fr",
        },
        publisher: {
          "@type": "Organization",
          name: "paie-et-dsn.fr · Cabinet Cholez-Pagotto",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.reponse },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://paie-et-dsn.fr" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://paie-et-dsn.fr/blog" },
          { "@type": "ListItem", position: 3, name: article.titre, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <nav className="text-sm text-ink/60" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-emerald-deep">
            Accueil
          </Link>{" "}
          ›{" "}
          <Link href="/blog" className="hover:text-emerald-deep">
            Blog
          </Link>{" "}
          › <span className="text-ink/80">{article.categorie}</span>
        </nav>

        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-amber-brand">
          {article.categorie}
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{article.titre}</h1>
        <p className="mt-3 text-sm text-ink/60">
          Publié le {article.dateAffichee} · Vérifié et mis à jour le{" "}
          {article.dateMajAffichee} · Lecture {article.tempsLecture}
          {"\u00a0"}min
        </p>

        {article.intro.map((p, i) => (
          <Paragraphe key={i} texte={p} />
        ))}

        <div className="mt-8 rounded-2xl border border-line bg-ivory p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-ink/60">
            Sommaire
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {article.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="font-medium text-emerald-deep hover:underline"
                >
                  {s.titre}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#questions-frequentes"
                className="font-medium text-emerald-deep hover:underline"
              >
                Questions fréquentes
              </a>
            </li>
          </ul>
        </div>

        {article.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="mt-10 text-2xl font-bold">{s.titre}</h2>
            {s.paragraphes.map((p, i) => (
              <Paragraphe key={i} texte={p} />
            ))}
          </section>
        ))}

        <section id="questions-frequentes" className="scroll-mt-24">
          <h2 className="mt-10 text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-4 space-y-4">
            {article.faq.map((q) => (
              <details
                key={q.question}
                className="group rounded-2xl border border-line bg-ivory p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
                  {q.question}
                  <span
                    className="faq-chevron text-xl text-emerald-brand transition-transform"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed">{q.reponse}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl bg-emerald-tint p-6 text-center">
          <p className="font-semibold text-navy">{article.cta}</p>
          <a
            href="/contact"
            className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
          >
            Demander un devis gratuit
          </a>
        </div>

        <p className="mt-8 text-sm text-ink/70">
          Contenu d&apos;information générale rédigé par notre juriste et
          vérifié à la source ; il ne constitue pas une consultation
          juridique. Références à jour au {article.dateMajAffichee}.
        </p>
      </main>
      <Footer />
    </>
  );
}
