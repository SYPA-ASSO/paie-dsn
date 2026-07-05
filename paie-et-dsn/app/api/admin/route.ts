import { NextResponse } from "next/server";
import {
  clientService,
  configurationPresente,
  profilCourant,
} from "@/lib/supabase/server";

// Actions d'administration (creation d'organisation, d'utilisateur, depot de document).
// Toutes les ecritures passent par la cle service, apres verification du role admin.
export async function POST(requete: Request) {
  if (!configurationPresente() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ erreur: "Non configuré." }, { status: 503 });
  }
  const { user, profil } = await profilCourant();
  if (!user || profil?.role !== "admin") {
    return NextResponse.json({ erreur: "Accès refusé." }, { status: 403 });
  }

  const service = clientService();
  const donnees = await requete.formData();
  const action = String(donnees.get("action") ?? "");

  try {
    if (action === "organisation") {
      const nom = String(donnees.get("nom") ?? "").trim();
      if (!nom) throw new Error("Nom requis.");
      const { error } = await service.from("organisations").insert({
        nom,
        siret: String(donnees.get("siret") ?? "").trim() || null,
        offre_paie: donnees.get("offre_paie") === "on",
        offre_essentiel: donnees.get("offre_essentiel") === "on",
        offre_copilote: donnees.get("offre_copilote") === "on",
      });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "utilisateur") {
      const email = String(donnees.get("email") ?? "").trim();
      const motdepasse = String(donnees.get("motdepasse") ?? "");
      const role = String(donnees.get("role") ?? "");
      const organisation = String(donnees.get("organisation_id") ?? "") || null;
      if (!email || motdepasse.length < 8 || !["employeur", "salarie", "admin"].includes(role)) {
        throw new Error("Champs invalides (mot de passe : 8 caractères minimum).");
      }
      const { data: cree, error } = await service.auth.admin.createUser({
        email,
        password: motdepasse,
        email_confirm: true,
      });
      if (error) throw error;
      const { error: erreurProfil } = await service.from("profils").insert({
        user_id: cree.user.id,
        role,
        organisation_id: organisation,
        nom: String(donnees.get("nom") ?? "").trim() || null,
      });
      if (erreurProfil) throw erreurProfil;
      return NextResponse.json({ ok: true });
    }

    if (action === "document") {
      const fichier = donnees.get("fichier");
      const organisation = String(donnees.get("organisation_id") ?? "");
      const type = String(donnees.get("type") ?? "");
      if (!(fichier instanceof File) || !organisation || !type) {
        throw new Error("Fichier, organisation et type requis.");
      }
      const periode = String(donnees.get("periode") ?? "").trim() || null;
      const salarie = String(donnees.get("salarie_user_id") ?? "").trim() || null;
      const titre = String(donnees.get("titre") ?? "").trim() || fichier.name;
      const chemin = `${organisation}/${Date.now()}-${fichier.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: erreurStockage } = await service.storage
        .from("documents")
        .upload(chemin, fichier, { contentType: fichier.type || "application/octet-stream" });
      if (erreurStockage) throw erreurStockage;
      const { error } = await service.from("documents").insert({
        organisation_id: organisation,
        salarie_user_id: salarie,
        type,
        periode,
        titre,
        chemin,
      });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "ressource") {
      const fichier = donnees.get("fichier");
      const typeRessource = String(donnees.get("type_ressource") ?? "");
      const acces = String(donnees.get("acces") ?? "essentiel");
      if (!(fichier instanceof File) || !typeRessource) {
        throw new Error("Fichier et type de ressource requis.");
      }
      const titre = String(donnees.get("titre") ?? "").trim() || fichier.name;
      const chemin = `ressources/${Date.now()}-${fichier.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: erreurStockage } = await service.storage
        .from("documents")
        .upload(chemin, fichier, { contentType: fichier.type || "application/octet-stream" });
      if (erreurStockage) throw erreurStockage;
      const { error } = await service.from("ressources").insert({
        titre,
        categorie: String(donnees.get("categorie") ?? "").trim() || null,
        type_ressource: typeRessource,
        acces,
        chemin,
      });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    throw new Error("Action inconnue.");
  } catch (e) {
    console.error("Erreur admin :", e);
    const message =
      (e as { message?: string })?.message ??
      (typeof e === "string" ? e : "Erreur inattendue.");
    return NextResponse.json({ erreur: message }, { status: 400 });
  }
}
