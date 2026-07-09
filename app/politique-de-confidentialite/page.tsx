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
              (François Cholez), SIREN 490&nbsp;889&nbsp;516, 12 rue d&apos;Olima, 88000 Épinal. Contact :
              via le formulaire de contact du site.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Ce site ne vous piste pas</h2>
            <p className="mt-2">
              Ce site utilise Google Analytics, un outil de mesure
              d&apos;audience, uniquement avec votre accord préalable : un
              bandeau vous permet d&apos;accepter ou de refuser son activation
              à votre première visite, et vous pouvez modifier ce choix à tout
              moment en effaçant les données de navigation de votre
              navigateur pour ce site. En l&apos;absence d&apos;accord, aucun
              cookie de mesure n&apos;est déposé. Les adresses IP sont
              anonymisées avant tout traitement statistique. Seuls des cookies
              strictement nécessaires à l&apos;authentification sont utilisés
              dans l&apos;espace client, sans recueil de consentement requis
              pour ceux-ci. Les polices de caractères sont auto-hébergées : aucune
              donnée n&apos;est transmise à Google ou à un autre fournisseur de
              polices lors de votre visite. Le simulateur de tarif fonctionne
              entièrement dans votre navigateur : les valeurs que vous
              saisissez ne sont ni transmises ni conservées.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Données traitées</h2>
            <p className="mt-2">
              Les données traitées sont celles que vous transmettez
              volontairement via le formulaire de contact du site (type de
              demande, identité, coordonnées, et pour les demandes de devis :
              SIRET, adresse du siège, effectif, convention collective,
              message), celles liées à votre compte de l&apos;espace client
              (e-mail, mot de passe chiffré, journal des accès), et celles
              nécessaires à l&apos;exécution des prestations de paie. Dans
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
              L&apos;architecture distingue plusieurs briques. Le site public
              (pages d&apos;information, simulateur) et les fonctions
              applicatives sont opérés par Vercel Inc., avec exécution dans
              l&apos;Union européenne (région Paris, France) et transferts
              encadrés par le Data Privacy Framework UE-États-Unis ; aucune
              donnée de paie n&apos;y est stockée, et le simulateur fonctionne
              localement dans votre navigateur. Les données de l&apos;espace
              client (comptes, authentification, dossiers, bulletins et
              documents de paie) sont hébergées sur l&apos;infrastructure
              Supabase, dans l&apos;Union européenne (région Irlande), avec
              accès authentifié et cloisonné par rôle. Les e-mails
              transactionnels (accusés de réception, invitations) sont émis
              via Brevo, société française. Les paiements en ligne sont
              traités par Stripe, prestataire de services de paiement, qui
              collecte directement les données de carte bancaire : le cabinet
              n&apos;y a jamais accès. Aucune donnée n&apos;est vendue ni
              transmise à des tiers à des fins commerciales.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Vos droits</h2>
            <p className="mt-2">
              Vous disposez des droits d&apos;accès, de rectification,
              d&apos;effacement, de limitation, de portabilité et
              d&apos;opposition prévus par le RGPD. Pour les exercer :
              utilisez le formulaire de contact du site. Vous pouvez également introduire une
              réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
