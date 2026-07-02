import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: {
    canonical: "https://paie-et-dsn.fr/politique-de-confidentialite",
  },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold">Responsable de traitement</h2>
            <p className="mt-2">
              Le responsable de traitement est le Cabinet Cholez-Pagotto
              (François Cholez), SIREN 490&nbsp;889&nbsp;516, Épinal. Contact :
              contact@cholez-pagotto.fr.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Ce site ne vous piste pas</h2>
            <p className="mt-2">
              Ce site ne dépose aucun cookie, n&apos;utilise aucun outil de
              mesure d&apos;audience tiers et ne comporte aucun formulaire de
              collecte. Les polices de caractères sont auto-hébergées : aucune
              donnée n&apos;est transmise à Google ou à un autre fournisseur de
              polices lors de votre visite. Le simulateur de tarif fonctionne
              entièrement dans votre navigateur : les valeurs que vous
              saisissez ne sont ni transmises ni conservées.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Données traitées</h2>
            <p className="mt-2">
              Les seules données traitées sont celles que vous nous transmettez
              volontairement par e-mail dans le cadre d&apos;une demande de
              devis ou de l&apos;exécution d&apos;une prestation de paie. Dans
              le cadre des prestations, le cabinet agit en qualité de
              sous-traitant au sens de l&apos;article 28 du RGPD pour les
              données des salariés de ses clients employeurs ; ce traitement
              est encadré par un accord de sous-traitance annexé aux conditions
              contractuelles.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Finalités et bases légales</h2>
            <p className="mt-2">
              Réponse à vos demandes et établissement de devis (mesures
              précontractuelles), exécution des prestations de paie et de
              déclarations sociales (contrat et obligations légales), gestion
              de la relation client et facturation (contrat et obligations
              légales).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Durées de conservation</h2>
            <p className="mt-2">
              Les données de prospection sont conservées 3&nbsp;ans après le
              dernier contact. Les données liées à l&apos;exécution des
              prestations sont conservées pendant la durée du contrat puis
              selon les durées légales applicables aux documents sociaux et
              comptables.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Hébergement et destinataires</h2>
            <p className="mt-2">
              Le site est hébergé par Vercel Inc. Les échanges par e-mail
              transitent par l&apos;hébergeur de messagerie du cabinet. Aucune
              donnée n&apos;est vendue ni transmise à des tiers à des fins
              commerciales.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Vos droits</h2>
            <p className="mt-2">
              Vous disposez des droits d&apos;accès, de rectification,
              d&apos;effacement, de limitation, de portabilité et
              d&apos;opposition prévus par le RGPD. Pour les exercer :
              contact@cholez-pagotto.fr. Vous pouvez également introduire une
              réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
