import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormulaireRenonciation from "@/components/FormulaireRenonciation";

export const metadata: Metadata = {
  title: "Renoncer au contrat ici : rétractation et résiliation en ligne",
  description:
    "Exercez en ligne votre droit de rétractation (14 jours) ou résiliez votre abonnement à tout moment : déclaration en ligne, confirmation, accusé de réception horodaté immédiat. Gratuit et sans compte.",
  alternates: { canonical: "https://paie-et-dsn.fr/renoncer-au-contrat" },
};

export default async function RenoncerAuContrat({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const parametres = await searchParams;
  const typeInitial =
    parametres.type === "resiliation" ? ("resiliation" as const) : undefined;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Vos droits
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Renoncer au contrat ici
        </h1>
        <p className="mt-5 leading-relaxed">
          Cette page vous permet d&apos;exercer en ligne, gratuitement et sans
          compte, deux droits distincts. Renseignez la déclaration, confirmez,
          et recevez immédiatement un accusé de réception horodaté par e-mail.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed">
            <p className="font-bold text-navy">La rétractation</p>
            <p className="mt-1">
              Revenir sur une souscription récente : 14&nbsp;jours à compter de
              la conclusion du contrat (article L.&nbsp;221-18 du Code de la
              consommation), exerçable en ligne via cette fonctionnalité
              (article L.&nbsp;221-21). Particularité des abonnements de
              contenu numérique : si vous avez demandé l&apos;exécution
              immédiate lors de la souscription, vous avez renoncé à ce droit
              (article L.&nbsp;221-28, 13° ; voir CGV, article 12).
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed">
            <p className="font-bold text-navy">La résiliation</p>
            <p className="mt-1">
              Mettre fin à un abonnement en cours : à tout moment, sans frais
              ni motif, avec effet au terme de la période mensuelle en cours.
              Pour les contrats conclus en ligne, cette fonctionnalité de
              résiliation vous est garantie en ligne (article
              L.&nbsp;215-1-1 du Code de la consommation).
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-ivory p-6 sm:p-8">
          <FormulaireRenonciation typeInitial={typeInitial} />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink/70">
          Vous pouvez également exercer ces droits par tout autre moyen : le
          formulaire de contact du site ou un courrier au siège du cabinet
          (adresse dans les mentions légales). Pour les prestations de paie,
          les modalités de résiliation figurent aux CGV (préavis d&apos;un
          mois, sans frais). Les données transmises servent uniquement au
          traitement de votre demande.
        </p>
      </main>
      <Footer />
    </>
  );
}
