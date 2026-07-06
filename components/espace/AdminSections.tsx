"use client";

import { useState } from "react";

type Organisation = {
  id: string;
  nom: string;
  siret: string | null;
  offre_paie?: boolean;
  offre_essentiel?: boolean;
  offre_copilote?: boolean;
};
type Profil = {
  user_id: string;
  nom: string | null;
  role: string;
  organisation_id: string | null;
  email: string | null;
};
type Document = {
  id: string;
  titre: string;
  type: string;
  periode: string | null;
  organisation_id: string;
  salarie_user_id: string | null;
};
type Ressource = {
  id: string;
  titre: string;
  categorie: string | null;
  type_ressource: string;
  acces: string;
};
type Souscription = {
  id: string;
  nom: string;
  email: string;
  formule: string;
  statut: string;
  resilieEnFin: boolean;
  depuis: string;
};

const libellesTypes: Record<string, string> = {
  bulletin: "Bulletin",
  journal_paie: "Journal de paie",
  etat_charges: "État des charges",
  cr_dsn: "CR DSN",
  facture: "Facture",
  mandat: "Mandat",
  justificatif: "Justificatif",
  archive: "Archive (zip)",
  autre: "Autre",
};
const champ = "mt-1 w-full rounded-lg border border-line bg-ivory px-2 py-1.5 text-sm";
const lienAction = "text-xs font-semibold text-emerald-deep underline";
const lienDanger = "text-xs font-semibold text-red-700 underline";

async function appelAdmin(donnees: Record<string, string>) {
  const corps = new FormData();
  Object.entries(donnees).forEach(([cle, valeur]) => corps.append(cle, valeur));
  const reponse = await fetch("/api/admin", { method: "POST", body: corps });
  const resultat = (await reponse.json()) as { erreur?: string };
  if (!reponse.ok) throw new Error(resultat.erreur ?? "Erreur inconnue.");
}

function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-3 flex items-center justify-center gap-3 text-sm">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-full border border-line px-3 py-1 font-semibold text-navy disabled:opacity-40"
      >
        Précédent
      </button>
      <span className="text-ink/70">
        Page {page} / {pages}
      </span>
      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="rounded-full border border-line px-3 py-1 font-semibold text-navy disabled:opacity-40"
      >
        Suivant
      </button>
    </div>
  );
}

export default function AdminSections({
  souscriptions,
  stripeIndisponible,
  organisations,
  profils,
  documents,
  ressources,
  emailsComptes,
}: {
  souscriptions: Souscription[];
  stripeIndisponible: boolean;
  organisations: Organisation[];
  profils: Profil[];
  documents: Document[];
  ressources: Ressource[];
  emailsComptes: string[];
}) {
  const [message, setMessage] = useState("");
  const [edition, setEdition] = useState<string | null>(null);
  const [pageStripe, setPageStripe] = useState(1);
  const [pageRessources, setPageRessources] = useState(1);
  const [pageDossiers, setPageDossiers] = useState(1);
  const [documentsDeplies, setDocumentsDeplies] = useState<Record<string, boolean>>({});

  const emails = new Set(emailsComptes.map((e) => e.toLowerCase()));
  const offres = [
    { cle: "offre_paie" as const, libelle: "Gestion de paie" },
    { cle: "offre_essentiel" as const, libelle: "L'Essentiel Social" },
    { cle: "offre_copilote" as const, libelle: "Le Copilote Social" },
  ];

  async function executer(
    libelle: string,
    donnees: Record<string, string>,
    confirmation?: string
  ) {
    if (confirmation && !window.confirm(confirmation)) return;
    setMessage("Action en cours...");
    try {
      await appelAdmin(donnees);
      setMessage(`${libelle} : fait. Rechargez la page pour actualiser.`);
      setEdition(null);
    } catch (e) {
      setMessage(`Erreur : ${e instanceof Error ? e.message : "inconnue"}`);
    }
  }

  function envoyerEdition(
    e: React.FormEvent<HTMLFormElement>,
    libelle: string,
    base: Record<string, string>
  ) {
    e.preventDefault();
    const donnees: Record<string, string> = { ...base };
    new FormData(e.currentTarget).forEach((valeur, cle) => {
      donnees[cle] = String(valeur);
    });
    void executer(libelle, donnees);
  }

  const parPage = 10;
  const pagesStripe = Math.ceil(souscriptions.length / parPage);
  const trancheStripe = souscriptions.slice((pageStripe - 1) * parPage, pageStripe * parPage);
  const pagesRessources = Math.ceil(ressources.length / parPage);
  const trancheRessources = ressources.slice(
    (pageRessources - 1) * parPage,
    pageRessources * parPage
  );
  const dossiersParPage = 5;
  const pagesDossiers = Math.ceil(organisations.length / dossiersParPage);
  const trancheDossiers = organisations.slice(
    (pageDossiers - 1) * dossiersParPage,
    pageDossiers * dossiersParPage
  );
  const nomUtilisateur = (id: string | null) => {
    if (!id) return "";
    const p = profils.find((x) => x.user_id === id);
    return p?.nom ?? p?.email ?? id.slice(0, 8);
  };

  return (
    <>
      {message && (
        <p className="mt-8 rounded-xl bg-emerald-tint p-3 text-sm font-semibold text-emerald-deep">
          {message}
        </p>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">Souscriptions en ligne (Stripe)</h2>
        {stripeIndisponible ? (
          <p className="mt-2 text-sm text-ink/70">
            Lecture Stripe momentanément indisponible : consultez le dashboard Stripe.
          </p>
        ) : souscriptions.length === 0 ? (
          <p className="mt-2 text-sm text-ink/70">
            Aucune souscription en ligne pour le moment (les abonnements souscrits par
            virement n&apos;apparaissent pas ici).
          </p>
        ) : (
          <div className="mt-2 overflow-x-auto rounded-2xl border border-line bg-white p-4">
            <p className="mb-2 text-xs text-ink/60">
              Badge « Dossier à créer » : utilisez + Nouveau client ci-dessus, le
              pré-remplissage reprend la souscription et l&apos;e-mail identique rattache
              automatiquement.
            </p>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                  <th className="py-2 pr-3">Client</th>
                  <th className="py-2 pr-3">E-mail</th>
                  <th className="py-2 pr-3">Formule</th>
                  <th className="py-2 pr-3">Depuis</th>
                  <th className="py-2 pr-3">Statut</th>
                  <th className="py-2">Dossier</th>
                </tr>
              </thead>
              <tbody>
                {trancheStripe.map((s) => (
                  <tr key={s.id} className="border-b border-line/60">
                    <td className="py-2 pr-3 font-medium text-navy">{s.nom || "Sans nom"}</td>
                    <td className="py-2 pr-3">{s.email}</td>
                    <td className="py-2 pr-3">{s.formule}</td>
                    <td className="py-2 pr-3">{s.depuis}</td>
                    <td className="py-2 pr-3">
                      <span
                        className={
                          s.statut === "Actif" || s.statut === "Essai"
                            ? "rounded-full bg-emerald-tint px-2 py-0.5 text-xs font-semibold text-emerald-deep"
                            : s.statut === "Résilié" || s.statut === "Expiré"
                              ? "rounded-full bg-ivory px-2 py-0.5 text-xs font-semibold text-ink/60"
                              : "rounded-full bg-amber-tint px-2 py-0.5 text-xs font-semibold text-amber-brand"
                        }
                      >
                        {s.statut}
                        {s.resilieEnFin && s.statut === "Actif" ? " · fin de période" : ""}
                      </span>
                    </td>
                    <td className="py-2">
                      {s.email && emails.has(s.email.toLowerCase()) ? (
                        <span className="text-xs font-semibold text-emerald-deep">Rattaché</span>
                      ) : (
                        <span className="rounded-full bg-amber-tint px-2 py-0.5 text-xs font-semibold text-amber-brand">
                          Dossier à créer
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={pageStripe} pages={pagesStripe} onChange={setPageStripe} />
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">
          Répartition des dossiers clients par offre
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {offres.map((offre) => {
            const dossiers = organisations.filter(
              (o) => (o as Record<string, unknown>)[offre.cle]
            );
            return (
              <div key={offre.cle} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-bold text-navy">
                  {offre.libelle}{" "}
                  <span className="text-sm font-normal text-ink/60">({dossiers.length})</span>
                </h3>
                {dossiers.length === 0 ? (
                  <p className="mt-2 text-sm text-ink/70">Aucun dossier.</p>
                ) : (
                  <ul className="mt-2 space-y-1 text-sm">
                    {dossiers.slice(0, 12).map((o) => (
                      <li key={o.id} className="font-medium text-navy">
                        {o.nom}
                      </li>
                    ))}
                    {dossiers.length > 12 && (
                      <li className="text-ink/60">... et {dossiers.length - 12} autres</li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">
          Espace documentaire ({ressources.length} ressource{ressources.length > 1 ? "s" : ""})
        </h2>
        {ressources.length === 0 ? (
          <p className="mt-2 text-sm text-ink/70">Aucune ressource déposée pour le moment.</p>
        ) : (
          <div className="mt-2 overflow-x-auto rounded-2xl border border-line bg-white p-4">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                  <th className="py-2 pr-3">Titre</th>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Catégorie</th>
                  <th className="py-2 pr-3">Accès</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {trancheRessources.map((r) => (
                  <tr key={r.id} className="border-b border-line/60 align-top">
                    <td className="py-2 pr-3 font-medium text-navy">
                      {edition === `ressource-${r.id}` ? (
                        <form
                          onSubmit={(e) =>
                            envoyerEdition(e, "Ressource modifiée", {
                              action: "modifier",
                              cible: "ressource",
                              id: r.id,
                            })
                          }
                          className="space-y-2"
                        >
                          <input name="titre" defaultValue={r.titre} required className={champ} />
                          <input
                            name="categorie"
                            defaultValue={r.categorie ?? ""}
                            placeholder="Catégorie"
                            className={champ}
                          />
                          <select name="acces" defaultValue={r.acces} className={champ}>
                            <option value="essentiel">Essentiel + Copilote</option>
                            <option value="copilote">Copilote uniquement</option>
                          </select>
                          <div className="flex gap-3">
                            <button className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                              Enregistrer
                            </button>
                            <button
                              type="button"
                              onClick={() => setEdition(null)}
                              className="text-xs underline"
                            >
                              Annuler
                            </button>
                          </div>
                        </form>
                      ) : (
                        r.titre
                      )}
                    </td>
                    <td className="py-2 pr-3">{r.type_ressource}</td>
                    <td className="py-2 pr-3">{r.categorie ?? ""}</td>
                    <td className="py-2 pr-3">{r.acces}</td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-3">
                        <a href={`/api/ressources/${r.id}`} className={lienAction}>
                          Télécharger
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            setEdition(edition === `ressource-${r.id}` ? null : `ressource-${r.id}`)
                          }
                          className={lienAction}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            executer(
                              "Ressource supprimée",
                              { action: "supprimer", cible: "ressource", id: r.id },
                              `Supprimer définitivement la ressource « ${r.titre} » ?`
                            )
                          }
                          className={lienDanger}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={pageRessources}
              pages={pagesRessources}
              onChange={setPageRessources}
            />
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">Vue d&apos;ensemble : comptes et documents</h2>

        {profils.some((p) => p.role === "admin") && (
          <div className="mt-4 rounded-2xl border border-line bg-white p-5">
            <h3 className="font-bold text-navy">Comptes cabinet (admin)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {profils
                .filter((p) => p.role === "admin")
                .map((p) => (
                  <li key={p.user_id}>
                    <span className="font-medium text-navy">{p.nom ?? "Sans nom"}</span>{" "}
                    <span className="text-ink/60">{p.email ?? ""}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {trancheDossiers.map((org) => {
          const membres = profils.filter((p) => p.organisation_id === org.id);
          const docs = documents.filter((d) => d.organisation_id === org.id);
          const deplie = documentsDeplies[org.id];
          const docsAffiches = deplie ? docs : docs.slice(0, 8);
          return (
            <div key={org.id} className="mt-4 rounded-2xl border border-line bg-white p-5">
              {edition === `organisation-${org.id}` ? (
                <form
                  onSubmit={(e) =>
                    envoyerEdition(e, "Dossier modifié", {
                      action: "modifier",
                      cible: "organisation",
                      id: org.id,
                    })
                  }
                  className="flex max-w-md flex-col gap-2"
                >
                  <input name="nom" defaultValue={org.nom} required className={champ} />
                  <input
                    name="siret"
                    defaultValue={org.siret ?? ""}
                    placeholder="SIRET"
                    className={champ}
                  />
                  <div className="flex gap-3">
                    <button className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                      Enregistrer
                    </button>
                    <button type="button" onClick={() => setEdition(null)} className="text-xs underline">
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <h3 className="flex flex-wrap items-center gap-2 font-bold text-navy">
                  {org.nom}
                  {org.siret && (
                    <span className="text-sm font-normal text-ink/60">· SIRET {org.siret}</span>
                  )}
                  {offres
                    .filter((offre) => (org as Record<string, unknown>)[offre.cle])
                    .map((offre) => (
                      <span
                        key={offre.cle}
                        className="rounded-full bg-emerald-tint px-2 py-0.5 text-xs font-semibold text-emerald-deep"
                      >
                        {offre.libelle}
                      </span>
                    ))}
                  <button
                    type="button"
                    onClick={() => setEdition(`organisation-${org.id}`)}
                    className={lienAction}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      executer(
                        "Dossier supprimé",
                        { action: "supprimer", cible: "organisation", id: org.id },
                        `Supprimer le dossier « ${org.nom} » et tous ses documents ? (impossible s'il reste des comptes rattachés)`
                      )
                    }
                    className={lienDanger}
                  >
                    Supprimer
                  </button>
                </h3>
              )}

              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink/60">
                Comptes ({membres.length})
              </p>
              {membres.length === 0 ? (
                <p className="mt-1 text-sm text-ink/70">Aucun compte.</p>
              ) : (
                <ul className="mt-1 space-y-1.5 text-sm">
                  {membres.map((p) => (
                    <li key={p.user_id}>
                      {edition === `compte-${p.user_id}` ? (
                        <form
                          onSubmit={(e) =>
                            envoyerEdition(e, "Compte modifié", {
                              action: "modifier",
                              cible: "compte",
                              id: p.user_id,
                            })
                          }
                          className="flex max-w-md flex-col gap-2"
                        >
                          <input name="nom" defaultValue={p.nom ?? ""} placeholder="Nom" className={champ} />
                          <select name="role" defaultValue={p.role} className={champ}>
                            <option value="employeur">Client : accès à tout son dossier</option>
                            <option value="salarie">Salarié : ses seuls bulletins</option>
                            <option value="admin">Admin cabinet</option>
                          </select>
                          <select name="organisation_id" defaultValue={p.organisation_id ?? ""} className={champ}>
                            <option value="">Aucun dossier</option>
                            {organisations.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.nom}
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-3">
                            <button className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                              Enregistrer
                            </button>
                            <button type="button" onClick={() => setEdition(null)} className="text-xs underline">
                              Annuler
                            </button>
                          </div>
                        </form>
                      ) : (
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-navy">{p.nom ?? "Sans nom"}</span>
                          <span className="text-ink/60">{p.email ?? ""}</span>
                          <span className="rounded-full bg-emerald-tint px-2 text-xs font-semibold leading-5 text-emerald-deep">
                            {p.role === "employeur" ? "client" : p.role}
                          </span>
                          <button
                            type="button"
                            onClick={() => setEdition(`compte-${p.user_id}`)}
                            className={lienAction}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              executer(
                                "Compte supprimé",
                                { action: "supprimer", cible: "compte", id: p.user_id },
                                `Supprimer le compte de ${p.nom ?? p.email ?? "cet utilisateur"} ? Ses accès seront immédiatement révoqués.`
                              )
                            }
                            className={lienDanger}
                          >
                            Supprimer
                          </button>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
                Documents ({docs.length})
              </p>
              {docs.length === 0 ? (
                <p className="mt-1 text-sm text-ink/70">Aucun document.</p>
              ) : (
                <div className="mt-1 overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                        <th className="py-2 pr-3">Titre</th>
                        <th className="py-2 pr-3">Type</th>
                        <th className="py-2 pr-3">Période</th>
                        <th className="py-2 pr-3">Destinataire</th>
                        <th className="py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {docsAffiches.map((d) => (
                        <tr key={d.id} className="border-b border-line/60 align-top">
                          <td className="py-2 pr-3 font-medium text-navy">
                            {edition === `document-${d.id}` ? (
                              <form
                                onSubmit={(e) =>
                                  envoyerEdition(e, "Document modifié", {
                                    action: "modifier",
                                    cible: "document",
                                    id: d.id,
                                  })
                                }
                                className="space-y-2"
                              >
                                <input name="titre" defaultValue={d.titre} required className={champ} />
                                <input
                                  name="periode"
                                  defaultValue={d.periode ?? ""}
                                  placeholder="AAAA-MM"
                                  className={champ}
                                />
                                <div className="flex gap-3">
                                  <button className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                                    Enregistrer
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEdition(null)}
                                    className="text-xs underline"
                                  >
                                    Annuler
                                  </button>
                                </div>
                              </form>
                            ) : (
                              d.titre
                            )}
                          </td>
                          <td className="py-2 pr-3">{libellesTypes[d.type] ?? d.type}</td>
                          <td className="py-2 pr-3">{d.periode ?? ""}</td>
                          <td className="py-2 pr-3">{nomUtilisateur(d.salarie_user_id)}</td>
                          <td className="py-2 text-right">
                            <div className="flex justify-end gap-3">
                              <a href={`/api/documents/${d.id}`} className={lienAction}>
                                Télécharger
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  setEdition(edition === `document-${d.id}` ? null : `document-${d.id}`)
                                }
                                className={lienAction}
                              >
                                Modifier
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  executer(
                                    "Document supprimé",
                                    { action: "supprimer", cible: "document", id: d.id },
                                    `Supprimer définitivement « ${d.titre} » ?`
                                  )
                                }
                                className={lienDanger}
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {docs.length > 8 && (
                    <button
                      type="button"
                      onClick={() =>
                        setDocumentsDeplies({ ...documentsDeplies, [org.id]: !deplie })
                      }
                      className="mt-2 text-sm font-semibold text-emerald-deep underline"
                    >
                      {deplie ? "Réduire" : `Voir les ${docs.length - 8} autres documents`}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <Pagination page={pageDossiers} pages={pagesDossiers} onChange={setPageDossiers} />
      </section>
    </>
  );
}
