import { NextResponse } from "next/server";
import {
  clientService,
  configurationPresente,
  profilCourant,
} from "@/lib/supabase/server";

// Actions d'administration (creation d'organisation, d'utilisateur, depot de document).
// Toutes les ecritures passent par la cle service, apres verification du role admin.
type ClientService = ReturnType<typeof clientService>;

async function envoyerInvitation(
  service: ClientService,
  email: string,
  nomContact: string
): Promise<string> {
  // Genere un lien a usage unique ou le client definit lui-meme son mot de passe
  const { data, error } = await service.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: "https://paie-et-dsn.fr/espace-client/nouveau-mot-de-passe",
    },
  });
  if (error || !data?.properties?.action_link) {
    return "Compte créé. E-mail d'invitation non généré : transmettez le mot de passe provisoire par un canal séparé.";
  }
  const cleApi = process.env.BREVO_API_KEY;
  const expediteur = process.env.CONTACT_TO_EMAIL;
  if (!cleApi || !expediteur) {
    return "Compte créé. Messagerie non configurée : transmettez le mot de passe provisoire par un canal séparé.";
  }
  const texte = [
    `Bonjour${nomContact ? ` ${nomContact}` : ""},`,
    "",
    "Le Cabinet Cholez-Pagotto a ouvert votre espace client sur paie-et-dsn.fr.",
    "",
    "Pour définir votre mot de passe et accéder à votre espace, utilisez ce lien personnel (valable une seule fois) :",
    data.properties.action_link,
    "",
    "Votre identifiant de connexion est votre adresse e-mail. Si le lien a expiré, utilisez le mot de passe provisoire communiqué par le cabinet, puis changez-le depuis votre espace, ou demandez un nouveau lien via le formulaire de contact : https://paie-et-dsn.fr/contact",
    "",
    "Cabinet Cholez-Pagotto · paie-et-dsn.fr",
  ].join("\n");
  try {
    const reponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": cleApi, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Cabinet Cholez-Pagotto · paie-et-dsn.fr", email: expediteur },
        to: [{ email }],
        subject: "Votre espace client paie-et-dsn.fr : définissez votre mot de passe",
        textContent: texte,
      }),
    });
    if (!reponse.ok) throw new Error();
    return "Compte créé et e-mail d'invitation envoyé au client (lien de définition du mot de passe).";
  } catch {
    return "Compte créé. E-mail d'invitation non parti : transmettez le mot de passe provisoire par un canal séparé.";
  }
}

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
      const information = await envoyerInvitation(
        service,
        email,
        String(donnees.get("nom") ?? "").trim()
      );
      return NextResponse.json({ ok: true, information });
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

    if (action === "client_complet") {
      const nom = String(donnees.get("nom") ?? "").trim();
      const email = String(donnees.get("email") ?? "").trim();
      const motdepasse = String(donnees.get("motdepasse") ?? "");
      if (!nom) throw new Error("Nom du client requis.");
      if (!email || motdepasse.length < 8) {
        throw new Error("E-mail et mot de passe provisoire (8 caractères minimum) requis.");
      }
      const { data: organisation, error: erreurOrganisation } = await service
        .from("organisations")
        .insert({
          nom,
          siret: String(donnees.get("siret") ?? "").trim() || null,
          offre_paie: donnees.get("offre_paie") === "on",
          offre_essentiel: donnees.get("offre_essentiel") === "on",
          offre_copilote: donnees.get("offre_copilote") === "on",
        })
        .select("id")
        .single();
      if (erreurOrganisation) throw erreurOrganisation;
      const { data: cree, error: erreurUtilisateur } = await service.auth.admin.createUser({
        email,
        password: motdepasse,
        email_confirm: true,
      });
      if (erreurUtilisateur) {
        throw new Error(
          `Dossier créé, mais compte non créé : ${erreurUtilisateur.message}. Créez le compte via "+ Compte" en le rattachant au dossier.`
        );
      }
      const { error: erreurProfil } = await service.from("profils").insert({
        user_id: cree.user.id,
        role: "employeur",
        organisation_id: organisation.id,
        nom: String(donnees.get("nom_contact") ?? "").trim() || nom,
      });
      if (erreurProfil) throw erreurProfil;
      const information = await envoyerInvitation(
        service,
        email,
        String(donnees.get("nom_contact") ?? "").trim() || nom
      );
      return NextResponse.json({ ok: true, information });
    }

    if (action === "organisation_offres") {
      const organisation = String(donnees.get("organisation_id") ?? "");
      if (!organisation) throw new Error("Organisation requise.");
      const { error } = await service
        .from("organisations")
        .update({
          offre_paie: donnees.get("offre_paie") === "on",
          offre_essentiel: donnees.get("offre_essentiel") === "on",
          offre_copilote: donnees.get("offre_copilote") === "on",
        })
        .eq("id", organisation);
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

    if (action === "modifier") {
      const cible = String(donnees.get("cible") ?? "");
      const id = String(donnees.get("id") ?? "");
      if (!id) throw new Error("Identifiant requis.");
      if (cible === "organisation") {
        const { error } = await service
          .from("organisations")
          .update({
            nom: String(donnees.get("nom") ?? "").trim(),
            siret: String(donnees.get("siret") ?? "").trim() || null,
          })
          .eq("id", id);
        if (error) throw error;
      } else if (cible === "document") {
        const { error } = await service
          .from("documents")
          .update({
            titre: String(donnees.get("titre") ?? "").trim(),
            periode: String(donnees.get("periode") ?? "").trim() || null,
          })
          .eq("id", id);
        if (error) throw error;
      } else if (cible === "ressource") {
        const { error } = await service
          .from("ressources")
          .update({
            titre: String(donnees.get("titre") ?? "").trim(),
            categorie: String(donnees.get("categorie") ?? "").trim() || null,
            acces: String(donnees.get("acces") ?? "essentiel"),
          })
          .eq("id", id);
        if (error) throw error;
      } else if (cible === "compte") {
        const { error } = await service
          .from("profils")
          .update({
            nom: String(donnees.get("nom") ?? "").trim() || null,
            organisation_id: String(donnees.get("organisation_id") ?? "") || null,
            role: String(donnees.get("role") ?? "employeur"),
          })
          .eq("user_id", id);
        if (error) throw error;
      } else {
        throw new Error("Cible inconnue.");
      }
      return NextResponse.json({ ok: true });
    }

    if (action === "supprimer") {
      const cible = String(donnees.get("cible") ?? "");
      const id = String(donnees.get("id") ?? "");
      if (!id) throw new Error("Identifiant requis.");
      if (cible === "document" || cible === "ressource") {
        const table = cible === "document" ? "documents" : "ressources";
        const { data: ligne } = await service
          .from(table)
          .select("chemin")
          .eq("id", id)
          .single();
        if (ligne?.chemin) {
          await service.storage.from("documents").remove([ligne.chemin]);
        }
        const { error } = await service.from(table).delete().eq("id", id);
        if (error) throw error;
      } else if (cible === "compte") {
        const { error } = await service.auth.admin.deleteUser(id);
        if (error) throw error;
      } else if (cible === "organisation") {
        const { count } = await service
          .from("profils")
          .select("user_id", { count: "exact", head: true })
          .eq("organisation_id", id);
        if ((count ?? 0) > 0) {
          throw new Error(
            "Ce dossier a des comptes rattachés : supprimez-les ou déplacez-les d'abord."
          );
        }
        const { data: docs } = await service
          .from("documents")
          .select("chemin")
          .eq("organisation_id", id);
        const chemins = (docs ?? []).map((d) => d.chemin).filter(Boolean);
        if (chemins.length > 0) {
          await service.storage.from("documents").remove(chemins);
        }
        const { error } = await service.from("organisations").delete().eq("id", id);
        if (error) throw error;
      } else {
        throw new Error("Cible inconnue.");
      }
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
