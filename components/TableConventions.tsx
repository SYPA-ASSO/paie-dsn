"use client";

import { useMemo, useState } from "react";
import donnees from "@/data/idcc.json";

type Convention = {
  idcc: string;
  titre: string;
  statut: string;
  fusionDans?: string;
};

const conventions = donnees.conventions as Convention[];

function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function TableConventions() {
  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState<"toutes" | "en_vigueur" | "fusionnee">(
    "toutes"
  );

  const resultats = useMemo(() => {
    const terme = normaliser(recherche.trim());
    return conventions.filter((c) => {
      if (statut !== "toutes" && c.statut !== statut) return false;
      if (!terme) return true;
      return (
        normaliser(c.titre).includes(terme) ||
        c.idcc.includes(terme) ||
        c.idcc.replace(/^0+/, "").includes(terme)
      );
    });
  }, [recherche, statut]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Rechercher par intitulé ou numéro IDCC (ex. 1979, bâtiment, avocats...)"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full max-w-xl rounded-full border border-line bg-white px-5 py-3 text-sm text-ink shadow-sm"
          aria-label="Rechercher une convention collective"
        />
        <div className="flex gap-2 text-sm">
          {(
            [
              ["toutes", "Toutes"],
              ["en_vigueur", "En vigueur"],
              ["fusionnee", "Fusionnées"],
            ] as const
          ).map(([valeur, libelle]) => (
            <button
              key={valeur}
              type="button"
              onClick={() => setStatut(valeur)}
              className={
                statut === valeur
                  ? "rounded-full bg-navy px-4 py-2 font-semibold text-white"
                  : "rounded-full border border-line bg-white px-4 py-2 font-medium text-navy hover:border-emerald-brand/50"
              }
            >
              {libelle}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink/70">
        {resultats.length} convention{resultats.length > 1 ? "s" : ""}{" "}
        affichée{resultats.length > 1 ? "s" : ""} · liste mise à jour le{" "}
        {donnees.derniereMiseAJour}
      </p>

      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
        {resultats.map((c) => (
          <li
            key={c.idcc}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="font-semibold text-navy">{c.titre}</p>
              <p className="mt-0.5 text-sm text-ink/70">
                IDCC {c.idcc.replace(/^0+/, "")}
                {c.statut === "fusionnee" && c.fusionDans && (
                  <span className="ml-2 rounded-full bg-amber-tint px-2.5 py-0.5 text-xs font-semibold text-amber-brand">
                    Fusionnée dans l&apos;IDCC{" "}
                    {c.fusionDans.replace(/^0+/, "")}
                  </span>
                )}
              </p>
            </div>
            <a
              href="/#tarifs"
              className="shrink-0 rounded-full border border-emerald-brand px-4 py-1.5 text-sm font-semibold text-emerald-deep transition hover:bg-emerald-brand hover:text-white"
            >
              Estimer ma paie
            </a>
          </li>
        ))}
        {resultats.length === 0 && (
          <li className="px-5 py-8 text-center text-ink/70">
            Aucune convention ne correspond à votre recherche. Elle existe
            peut-être sous un autre intitulé :{" "}
            <a
              href="/#contact"
              className="font-semibold text-emerald-deep underline"
            >
              contactez-nous
            </a>
            , nous l&apos;identifierons avec vous.
          </li>
        )}
      </ul>
    </div>
  );
}
