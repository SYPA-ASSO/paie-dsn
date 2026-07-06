"use client";

import { useState } from "react";

type Organisation = {
  id: string;
  nom: string;
  offre_paie?: boolean;
  offre_essentiel?: boolean;
  offre_copilote?: boolean;
};
type Utilisateur = {
  user_id: string;
  nom: string | null;
  role: string;
  organisation_id: string | null;
  email?: string | null;
};
export type SouscriptionARattacher = {
  nom: string;
  email: string;
  formule: string; // "essentiel" | "copilote"
};

const champ = "mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm";
const etiquette = "block text-sm font-semibold text-navy";
const caseOffre = "h-4 w-4 accent-[#00a878]";

const actions = [
  { cle: "client", libelle: "+ Nouveau client" },
  { cle: "document", libelle: "+ Document" },
  { cle: "ressource", libelle: "+ Ressource documentaire" },
  { cle: "offres", libelle: "Offres d'un dossier" },
  { cle: "compte", libelle: "+ Compte seul" },
  { cle: "organisation", libelle: "+ Dossier seul" },
  { cle: "import", libelle: "Import en masse (zip)" },
] as const;

type CleAction = (typeof actions)[number]["cle"];

export default function AdminPanel({
  organisations,
  utilisateurs,
  aRattacher = [],
}: {
  organisations: Organisation[];
  utilisateurs: Utilisateur[];
  aRattacher?: SouscriptionARattacher[];
}) {
  const [message, setMessage] = useState("");
  const [ouvert, setOuvert] = useState<CleAction | null>(null);
  const [dossierOffres, setDossierOffres] = useState("");
  const [prerempli, setPrerempli] = useState(-1);
  const [progression, setProgression] = useState("");
  const [importEnCours, setImportEnCours] = useState(false);
  const organisationOffres = organisations.find((o) => o.id === dossierOffres);
  const souscription = aRattacher[prerempli];

  async function importerZip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formulaire = e.currentTarget;
    const donnees = new FormData(formulaire);
    const fichier = donnees.get("zip") as File | null;
    const typeRessource = String(donnees.get("type_ressource") ?? "modele");
    const acces = String(donnees.get("acces") ?? "essentiel");
    if (!fichier) return;
    setImportEnCours(true);
    setProgression("Lecture du zip...");
    try {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(fichier);
      const entrees = Object.values(zip.files).filter(
        (entree) => !entree.dir && !entree.name.startsWith("__MACOSX")
      );
      if (entrees.length === 0) throw new Error("Aucun fichier dans le zip.");
      if (entrees.length > 500) {
        throw new Error("Plus de 500 fichiers : découpez le zip en plusieurs lots.");
      }
      let faits = 0;
      const echecs: string[] = [];
      for (const entree of entrees) {
        const segments = entree.name.split("/").filter(Boolean);
        const nomFichier = segments[segments.length - 1];
        const categorie = segments.length > 1 ? segments[0] : "";
        const titre = nomFichier
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim();
        try {
          const contenu = await entree.async("blob");
          const envoi = new FormData();
          envoi.append("action", "ressource");
          envoi.append("titre", titre || nomFichier);
          envoi.append("categorie", categorie);
          envoi.append("type_ressource", typeRessource);
          envoi.append("acces", acces);
          envoi.append("fichier", new File([contenu], nomFichier));
          const reponse = await fetch("/api/admin", { method: "POST", body: envoi });
          if (!reponse.ok) {
            const resultat = (await reponse.json()) as { erreur?: string };
            throw new Error(resultat.erreur ?? "erreur");
          }
        } catch (erreurFichier) {
          echecs.push(
            `${entree.name} (${erreurFichier instanceof Error ? erreurFichier.message : "erreur"})`
          );
        }
        faits += 1;
        setProgression(`Import : ${faits} / ${entrees.length}...`);
      }
      setProgression(
        echecs.length === 0
          ? `Import terminé : ${entrees.length} ressources créées. Rechargez la page.`
          : `Import terminé : ${entrees.length - echecs.length} créées, ${echecs.length} échec(s) : ${echecs.slice(0, 5).join(" ; ")}${echecs.length > 5 ? "..." : ""}`
      );
      formulaire.reset();
    } catch (erreur) {
      setProgression(`Erreur : ${erreur instanceof Error ? erreur.message : "inconnue"}`);
    } finally {
      setImportEnCours(false);
    }
  }

  async function envoyer(e: React.FormEvent<HTMLFormElement>, libelle: string) {
    e.preventDefault();
    const formulaire = e.currentTarget;
    setMessage("Envoi en cours...");
    const reponse = await fetch("/api/admin", {
      method: "POST",
      body: new FormData(formulaire),
    });
    const resultat = (await reponse.json()) as {
      erreur?: string;
      information?: string;
    };
    if (!reponse.ok) {
      setMessage(`Erreur (${libelle}) : ${resultat.erreur ?? "inconnue"}`);
      return;
    }
    setMessage(
      resultat.information
        ? `${resultat.information} Rechargez la page pour voir la mise à jour.`
        : `${libelle} : fait. Rechargez la page pour voir la mise à jour.`
    );
    formulaire.reset();
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action) => (
          <button
            key={action.cle}
            type="button"
            onClick={() => setOuvert(ouvert === action.cle ? null : action.cle)}
            className={
              ouvert === action.cle
                ? "rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-emerald-brand/50"
            }
          >
            {action.libelle}
          </button>
        ))}
        {ouvert && (
          <button
            type="button"
            onClick={() => setOuvert(null)}
            className="text-sm font-semibold text-ink/60 underline"
          >
            Fermer
          </button>
        )}
      </div>

      {message && (
        <p className="mt-4 rounded-xl bg-emerald-tint p-3 text-sm font-semibold text-emerald-deep">
          {message}
        </p>
      )}

      <div className={ouvert === "client" ? "mt-6 max-w-lg" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Client créé (dossier + accès)")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">Nouveau client : dossier et accès</h2>
          <p className="mt-1 text-xs text-ink/70">
            Crée le dossier avec ses offres et le compte d&apos;accès du client
            en une seule fois. Employeur ou simple abonné : même circuit.
          </p>
          <input type="hidden" name="action" value="client_complet" />
          {aRattacher.length > 0 && (
            <label className={`mt-3 ${etiquette}`}>
              Pré-remplir depuis une souscription Stripe
              <select
                value={prerempli}
                onChange={(e) => setPrerempli(Number(e.target.value))}
                className={champ}
              >
                <option value={-1}>Saisie libre</option>
                {aRattacher.map((s, i) => (
                  <option key={`${s.email}-${i}`} value={i}>
                    {s.nom || s.email} · {s.formule === "copilote" ? "Le Copilote Social" : "L'Essentiel Social"}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div key={`client-${prerempli}`}>
            <label className={`mt-3 ${etiquette}`}>
              Nom du client (dossier)&nbsp;*
              <input name="nom" required defaultValue={souscription?.nom ?? ""} className={champ} />
            </label>
            <label className={`mt-3 ${etiquette}`}>
              SIRET (si professionnel)
              <input name="siret" className={champ} />
            </label>
            <p className={`mt-3 ${etiquette}`}>Offres souscrites</p>
            <label className="mt-1 flex items-center gap-2 text-sm">
              <input type="checkbox" name="offre_paie" className={caseOffre} />
              Gestion de paie
            </label>
            <label className="mt-1 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="offre_essentiel"
                defaultChecked={souscription?.formule === "essentiel"}
                className={caseOffre}
              />
              L&apos;Essentiel Social
            </label>
            <label className="mt-1 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="offre_copilote"
                defaultChecked={souscription?.formule === "copilote"}
                className={caseOffre}
              />
              Le Copilote Social
            </label>
            <label className={`mt-3 ${etiquette}`}>
              E-mail de connexion du client&nbsp;*
              <input
                name="email"
                type="email"
                required
                defaultValue={souscription?.email ?? ""}
                className={champ}
              />
            </label>
            <label className={`mt-3 ${etiquette}`}>
              Nom du contact (si différent du dossier)
              <input name="nom_contact" className={champ} />
            </label>
            <label className={`mt-3 ${etiquette}`}>
              Mot de passe provisoire&nbsp;* (8 caractères min., à transmettre
              par un canal séparé)
              <input name="motdepasse" required minLength={8} className={champ} />
            </label>
          </div>
          <button className="mt-4 w-full rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white">
            Créer le client
          </button>
        </form>
      </div>

      <div className={ouvert === "organisation" ? "mt-6 max-w-md" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Dossier créé")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">Dossier seul (sans accès en ligne)</h2>
          <input type="hidden" name="action" value="organisation" />
          <label className={`mt-3 ${etiquette}`}>
            Nom&nbsp;*
            <input name="nom" required className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            SIRET
            <input name="siret" className={champ} />
          </label>
          <p className={`mt-3 ${etiquette}`}>Offres souscrites</p>
          <label className="mt-1 flex items-center gap-2 text-sm">
            <input type="checkbox" name="offre_paie" className={caseOffre} />
            Gestion de paie
          </label>
          <label className="mt-1 flex items-center gap-2 text-sm">
            <input type="checkbox" name="offre_essentiel" className={caseOffre} />
            L&apos;Essentiel Social
          </label>
          <label className="mt-1 flex items-center gap-2 text-sm">
            <input type="checkbox" name="offre_copilote" className={caseOffre} />
            Le Copilote Social
          </label>
          <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
            Créer
          </button>
        </form>
      </div>

      <div className={ouvert === "compte" ? "mt-6 max-w-md" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Compte créé")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">
            Compte seul (salarié, accès supplémentaire, admin)
          </h2>
          <input type="hidden" name="action" value="utilisateur" />
          <label className={`mt-3 ${etiquette}`}>
            Nom
            <input name="nom" className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            E-mail&nbsp;*
            <input name="email" type="email" required className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Mot de passe provisoire&nbsp;* (8 caractères min.)
            <input name="motdepasse" required minLength={8} className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Type d&apos;accès&nbsp;*
            <select name="role" required className={champ}>
              <option value="employeur">Client : accès à tout son dossier</option>
              <option value="salarie">Salarié : accès à ses seuls bulletins</option>
              <option value="admin">Admin cabinet</option>
            </select>
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Dossier de rattachement
            <select name="organisation_id" className={champ}>
              <option value="">Aucun (admin)</option>
              {organisations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nom}
                </option>
              ))}
            </select>
          </label>
          <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
            Créer
          </button>
        </form>
      </div>

      <div className={ouvert === "document" ? "mt-6 max-w-md" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Document déposé")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">Déposer un document</h2>
          <input type="hidden" name="action" value="document" />
          <label className={`mt-3 ${etiquette}`}>
            Dossier client&nbsp;*
            <select name="organisation_id" required className={champ}>
              {organisations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nom}
                </option>
              ))}
            </select>
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Type&nbsp;*
            <select name="type" required className={champ}>
              <option value="facture">Facture</option>
              <option value="bulletin">Bulletin de paie</option>
              <option value="journal_paie">Journal de paie</option>
              <option value="etat_charges">État des charges</option>
              <option value="cr_dsn">Compte rendu DSN</option>
              <option value="mandat">Mandat tiers déclarant</option>
              <option value="justificatif">Justificatif</option>
              <option value="archive">Archive mensuelle (zip)</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Période (AAAA-MM)
            <input name="periode" placeholder="2026-07" className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Destinataire du bulletin (salarié ou dirigeant)
            <select name="salarie_user_id" className={champ}>
              <option value="">Aucun</option>
              {utilisateurs
                .filter((u) => u.role !== "admin")
                .map((u) => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.nom ?? u.email ?? u.user_id.slice(0, 8)} (
                    {u.role === "employeur" ? "client" : u.role})
                  </option>
                ))}
            </select>
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Titre affiché
            <input name="titre" className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Fichier&nbsp;*
            <input name="fichier" type="file" required className={champ} />
          </label>
          <button className="mt-4 w-full rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white">
            Déposer
          </button>
        </form>
      </div>

      <div className={ouvert === "offres" ? "mt-6 max-w-md" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Offres mises à jour")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">
            Modifier les offres d&apos;un dossier (souscription manuelle)
          </h2>
          <input type="hidden" name="action" value="organisation_offres" />
          <label className={`mt-3 ${etiquette}`}>
            Dossier client&nbsp;*
            <select
              name="organisation_id"
              required
              value={dossierOffres}
              onChange={(e) => setDossierOffres(e.target.value)}
              className={champ}
            >
              <option value="">Choisir...</option>
              {organisations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nom}
                </option>
              ))}
            </select>
          </label>
          {organisationOffres && (
            <div key={`offres-${dossierOffres}`}>
              <p className={`mt-3 ${etiquette}`}>Offres souscrites</p>
              <label className="mt-1 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="offre_paie"
                  defaultChecked={Boolean(organisationOffres.offre_paie)}
                  className={caseOffre}
                />
                Gestion de paie
              </label>
              <label className="mt-1 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="offre_essentiel"
                  defaultChecked={Boolean(organisationOffres.offre_essentiel)}
                  className={caseOffre}
                />
                L&apos;Essentiel Social
              </label>
              <label className="mt-1 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="offre_copilote"
                  defaultChecked={Boolean(organisationOffres.offre_copilote)}
                  className={caseOffre}
                />
                Le Copilote Social
              </label>
              <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
                Enregistrer
              </button>
            </div>
          )}
        </form>
      </div>

      <div className={ouvert === "import" ? "mt-6 max-w-lg" : "hidden"}>
        <form onSubmit={importerZip} className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-bold text-navy">
            Import en masse de ressources documentaires (zip)
          </h2>
          <p className="mt-1 text-xs text-ink/70">
            Le zip est décompressé dans votre navigateur et chaque fichier est
            envoyé individuellement : aucun plafond de taille global. Les
            dossiers de premier niveau du zip deviennent les catégories, les
            noms de fichiers deviennent les titres. Type et accès ci-dessous
            s&apos;appliquent à tout le lot (modifiables ensuite fiche à fiche).
          </p>
          <label className={`mt-3 ${etiquette}`}>
            Fichier zip&nbsp;*
            <input name="zip" type="file" accept=".zip" required className={champ} />
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Type appliqué au lot&nbsp;*
            <select name="type_ressource" required className={champ}>
              <option value="modele">Modèle de document</option>
              <option value="jurisprudence">Jurisprudence commentée</option>
              <option value="dossier">Dossier de synthèse</option>
              <option value="procedure">Procédure RH</option>
              <option value="outil">Outil de gestion</option>
              <option value="newsletter">Newsletter</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <label className={`mt-3 ${etiquette}`}>
            Accès appliqué au lot&nbsp;*
            <select name="acces" required className={champ}>
              <option value="essentiel">Essentiel + Copilote</option>
              <option value="copilote">Copilote uniquement</option>
            </select>
          </label>
          <button
            disabled={importEnCours}
            className="mt-4 w-full rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {importEnCours ? "Import en cours, ne fermez pas la page..." : "Lancer l'import"}
          </button>
          {progression && (
            <p className="mt-3 rounded-xl bg-ivory p-3 text-sm font-semibold text-navy">
              {progression}
            </p>
          )}
        </form>
      </div>

      <div className={ouvert === "ressource" ? "mt-6" : "hidden"}>
        <form
          onSubmit={(e) => envoyer(e, "Ressource déposée")}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="font-bold text-navy">
            Déposer une ressource documentaire (abonnements)
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <input type="hidden" name="action" value="ressource" />
            <label className={etiquette}>
              Titre&nbsp;*
              <input name="titre" required className={champ} />
            </label>
            <label className={etiquette}>
              Catégorie
              <input
                name="categorie"
                placeholder="Ex. Contrats, Discipline, Congés..."
                className={champ}
              />
            </label>
            <label className={etiquette}>
              Type&nbsp;*
              <select name="type_ressource" required className={champ}>
                <option value="modele">Modèle de document</option>
                <option value="jurisprudence">Jurisprudence commentée</option>
                <option value="dossier">Dossier de synthèse</option>
                <option value="procedure">Procédure RH</option>
                <option value="outil">Outil de gestion</option>
                <option value="newsletter">Newsletter</option>
                <option value="autre">Autre</option>
              </select>
            </label>
            <label className={etiquette}>
              Accès&nbsp;*
              <select name="acces" required className={champ}>
                <option value="essentiel">Essentiel + Copilote</option>
                <option value="copilote">Copilote uniquement</option>
              </select>
            </label>
            <label className={etiquette}>
              Fichier&nbsp;*
              <input name="fichier" type="file" required className={champ} />
            </label>
          </div>
          <button className="mt-4 rounded-full bg-emerald-brand px-6 py-2 text-sm font-semibold text-white">
            Déposer la ressource
          </button>
        </form>
      </div>
    </div>
  );
}
