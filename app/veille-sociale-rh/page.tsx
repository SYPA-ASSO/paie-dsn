import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Souscription confirmée",
  robots: { index: false, follow: false },
};

export default function Merci() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Abonnement
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Merci, votre souscription est confirmée
        </h1>
        <p className="mt-5 leading-relaxed">
          Vous recevez immédiatement la confirmation de paiement de Stripe par
          e-mail. Le cabinet ouvre votre dossier et vos accès à l&apos;espace
          documentaire sous 24&nbsp;heures ouvrées : vos identifiants vous
          seront transmis, et votre première newsletter suivra. Votre
          justificatif de paiement mensuel est disponible depuis le reçu
          Stripe ; votre facture est émise par le cabinet et déposée dans
          votre espace client.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white transition hover:bg-emerald-deep"
        >
          Retour à l&apos;accueil
        </a>
      </main>
      <Footer />
    </>
  );
}
