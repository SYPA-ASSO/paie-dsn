const prestations = [
  {
    titre: "Bulletins de paie",
    texte:
      "Établissement mensuel des bulletins, conformes à votre convention collective : heures, absences, congés payés, primes, prélèvement à la source.",
  },
  {
    titre: "DSN mensuelle",
    texte:
      "Génération, contrôle et transmission de la déclaration sociale nominative chaque mois, avec suivi des comptes rendus des organismes.",
  },
  {
    titre: "DSN événementielle",
    texte:
      "Arrêt de travail, fin de contrat : les signalements sont transmis dans les délais pour ne pas retarder les indemnités journalières ni les droits du salarié.",
  },
  {
    titre: "Entrées de salariés",
    texte:
      "DPAE, affiliations aux caisses de retraite et de prévoyance, paramétrage du dossier salarié dès l'embauche.",
  },
  {
    titre: "Sorties et soldes de tout compte",
    texte:
      "Reçu pour solde de tout compte, certificat de travail, attestation France Travail, DSN de fin de contrat : le dossier de sortie complet.",
  },
  {
    titre: "Documents pour votre expert-comptable",
    texte:
      "Chaque mois, vous recevez le journal de paie, l'état des charges et tous les éléments nécessaires aux écritures de paie, prêts à remettre à votre expert-comptable. En option, nous transmettons directement ces documents à son cabinet, sans action de votre part.",
  },
];

export default function Prestations() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Ce qui est inclus
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Tout le cycle de paie, du recrutement au départ
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prestations.map((p) => (
            <article
              key={p.titre}
              className="rounded-2xl border border-line bg-white p-6 transition hover:border-emerald-brand/50 hover:shadow-md"
            >
              <h3 className="text-lg font-bold">{p.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed">{p.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
