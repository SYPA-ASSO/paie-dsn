"use client";

import { useEffect, useState } from "react";

// Affiche le mois precedent (en aout 2026 : "Juillet 2026"),
// calcule cote navigateur pour rester juste sans redeploiement.
export default function MoisPaie() {
  const [libelle, setLibelle] = useState("");

  useEffect(() => {
    const maintenant = new Date();
    const precedent = new Date(
      maintenant.getFullYear(),
      maintenant.getMonth() - 1,
      1
    );
    const texte = precedent.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
    setLibelle(texte.charAt(0).toUpperCase() + texte.slice(1));
  }, []);

  return <>{libelle || "\u00A0"}</>;
}
