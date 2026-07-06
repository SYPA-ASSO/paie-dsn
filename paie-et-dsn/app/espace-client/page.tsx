import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Connexion from "@/components/espace/Connexion";
import { configurationPresente, profilCourant } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Espace client",
  robots: { index: false, follow: false },
};

export default async function EspaceClient() {
  if (!configurationPresente()) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <h1 className="text-3xl font-bold">Espace client</h1>
          <p className="mt-4">
            L&apos;espace client ouvre prochainement. Pour toute demande,
            utilisez le formulaire de contact.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const { user, profil } = await profilCourant();
  if (user && profil) {
    if (profil.role === "admin") redirect("/admin");
    if (profil.role === "employeur") redirect("/espace-client/employeur");
    redirect("/espace-client/salarie");
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-amber-brand">
          Espace client
        </p>
        <h1 className="mt-2 text-center text-3xl font-bold sm:text-4xl">
          Accédez à votre dossier
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed">
          Employeur : vos bulletins, journaux de paie, états des charges,
          comptes rendus DSN, factures et mandat. Salarié : vos bulletins de
          paie, en accès strictement personnel.
        </p>
        <div className="mt-10">
          <Connexion />
        </div>
      </main>
      <Footer />
    </>
  );
}
