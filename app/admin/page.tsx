import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Deconnexion from "@/components/espace/Deconnexion";
import AdminPanel from "@/components/espace/AdminPanel";
import {
  clientServeur,
  configurationPresente,
  profilCourant,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function Admin() {
  if (!configurationPresente()) redirect("/espace-client");
  const { user, profil } = await profilCourant();
  if (!user || profil?.role !== "admin") redirect("/espace-client");

  const supabase = await clientServeur();
  const { data: organisations } = await supabase
    .from("organisations")
    .select("id, nom")
    .order("nom");
  const { data: utilisateurs } = await supabase
    .from("profils")
    .select("user_id, nom, role, organisation_id")
    .order("nom");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Back-office cabinet
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Administration
            </h1>
          </div>
          <Deconnexion />
        </div>
        <AdminPanel
          organisations={organisations ?? []}
          utilisateurs={utilisateurs ?? []}
        />
      </main>
      <Footer />
    </>
  );
}
