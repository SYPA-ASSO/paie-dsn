import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "https://paie-et-dsn.fr/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">Mentions légales</h1>
        <p className="mt-3 text-sm text-ink/70">
          Conformément aux dispositions de la loi n°&nbsp;2004-575 du 21 juin
          2004 pour la confiance dans l&apos;économie numérique (LCEN),
          notamment son article 6-III.
        </p>
        <div className="mt-8 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold">Éditeur du site</h2>
            <p className="mt-2">
              Le site paie-et-dsn.fr est édité par CBT CHOLEZ-PAGOTTO, CHOLEZ
              François E.I. SIRET 490&nbsp;889&nbsp;516&nbsp;00053, dont le
              siège social est situé 12 rue d&apos;Olima, 88000 Épinal.
              Téléphone : 03&nbsp;74&nbsp;47&nbsp;40&nbsp;55 (mention requise
              par l&apos;article 6-III de la LCEN).
            </p>
            <p className="mt-2">
              Contact :{" "}
              <a
                href="/contact"
                className="font-semibold text-emerald-deep underline"
              >
                via le formulaire du présent site
              </a>
              .
            </p>
            <p className="mt-2">Directeur de la publication : François CHOLEZ.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Activités réglementées</h2>
            <p className="mt-2">
              Courtage en assurances et réassurances : activité réglementée
              exercée sous le contrôle de l&apos;Autorité de Contrôle
              Prudentiel et de Résolution (ACPR), 4 place de Budapest, CS
              92459, 75436 Paris Cedex 09. Immatriculation ORIAS
              n°&nbsp;26003943, consultable sur www.orias.fr. Membre de
              l&apos;association d&apos;autorégulation ENDYA.
            </p>
            <p className="mt-2">
              Le Cabinet Cholez-Pagotto n&apos;est pas un cabinet
              d&apos;avocats. Les informations proposées sur ce site sont à
              visée informative et pédagogique et ne constituent pas un conseil
              juridique personnalisé au sens de la loi n°&nbsp;71-1130 du 31
              décembre 1971. Le cabinet travaille en collaboration avec des
              avocats et d&apos;autres professionnels du droit réglementés ;
              toute situation nécessitant une consultation juridique est
              orientée vers eux.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Autres activités</h2>
            <p className="mt-2">
              La gestion externalisée de la paie et des déclarations sociales
              proposée sur ce site est exercée en qualité de prestataire
              indépendant, dans le respect du périmètre énoncé par
              l&apos;ordonnance n°&nbsp;45-2138 du 19 septembre 1945 : le cabinet ne réalise aucun travail comptable
              pour le compte de tiers. Par ailleurs, François CHOLEZ intervient dans
              le cadre des activités du cabinet en qualité de juriste et de
              formaliste. Le cabinet est membre du Conseil Représentatif des
              Formalistes de France (CRFF).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Hébergement</h2>
            <p className="mt-2">
              L&apos;hébergement du site est réalisé par Vercel Inc., 340 Pine
              Street Suite 701, San Francisco CA 94104, États-Unis.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Médiation de la consommation</h2>
            <p className="mt-2">
              Conformément à l&apos;article L. 612-1 du Code de la
              consommation, tout client consommateur (notamment particulier
              employeur) peut recourir gratuitement, après réclamation écrite
              préalable auprès du cabinet, au médiateur de la consommation
              désigné : Centre de Médiation de la Consommation de Conciliateurs
              de Justice (CM2C), www.cm2c.net.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble du contenu de ce site (textes, structure,
              éléments graphiques, simulateur, base de données des conventions
              collectives) est la propriété exclusive du Cabinet Cholez-Pagotto
              et est protégé par le droit d&apos;auteur et la propriété
              intellectuelle. Toute reproduction sans autorisation écrite
              préalable est interdite.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Limitation de responsabilité</h2>
            <p className="mt-2">
              Les informations publiées sur ce site, y compris la liste des
              conventions collectives et les estimations du simulateur, sont
              fournies à titre informatif et pédagogique et ne constituent ni
              une consultation juridique ni une offre contractuelle : seul le
              devis établi par le cabinet engage ce dernier. Le cabinet
              s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              diffusées mais ne saurait être tenu responsable des erreurs ou
              omissions, ni du contenu des sites tiers accessibles par lien
              hypertexte.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Données personnelles et cookies</h2>
            <p className="mt-2">
              Ce site ne dépose aucun cookie de suivi ni de mesure
              d&apos;audience. Seuls des cookies strictement nécessaires à
              l&apos;authentification sont utilisés dans l&apos;espace client
              (accès par e-mail et mot de passe). Le traitement des données
              personnelles, notamment celles transmises via le formulaire de
              contact, est détaillé dans la politique de confidentialité
              accessible depuis le pied de page. Conformément au RGPD et à la
              loi Informatique et Libertés, vous disposez de droits
              d&apos;accès, de rectification, d&apos;effacement, de
              portabilité, d&apos;opposition et de limitation, exerçables{" "}
              <a
                href="/contact"
                className="font-semibold text-emerald-deep underline"
              >
                via le formulaire de contact du site
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">
              Droit applicable et juridiction compétente
            </h2>
            <p className="mt-2">
              Les présentes mentions légales sont soumises au droit français.
              En cas de litige et à défaut de résolution amiable, les tribunaux
              français seront seuls compétents.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
