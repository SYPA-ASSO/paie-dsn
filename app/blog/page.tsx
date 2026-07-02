import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog : paie, DSN et droit social expliqués aux employeurs",
  description:
    "Articles pédagogiques sur la paie, la DSN, les conventions collectives et les obligations des employeurs, rédigés par un juriste et vérifiés à la source.",
  alternates: { canonical: "https://paie-et-dsn.fr/blog" },
};

export default function Blog() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Blog
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          La paie et le droit social, expliqués aux employeurs
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Des articles pédagogiques, sourcés et relus par notre juriste, pour
          comprendre vos obligations d&apos;employeur sans jargon inutile.
        </p>
        <div className="mt-10 space-y-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl border border-line bg-white p-6 transition hover:border-emerald-brand/50 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                {article.dateAffichee}
              </p>
              <h2 className="mt-2 text-xl font-bold">
                <Link
                  href={`/blog/${article.slug}`}
                  className="hover:text-emerald-deep"
                >
                  {article.titre}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                {article.description}
              </p>
              <Link
                href={`/blog/${article.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-deep underline decoration-2 underline-offset-4"
              >
                Lire l&apos;article
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
