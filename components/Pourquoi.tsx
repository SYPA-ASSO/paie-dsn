const cartes = [
  {
    icone: "🧩",
    titre: "Zéro logiciel à maîtriser",
    texte:
      "Avec un logiciel de paie en ligne, c'est vous qui paramétrez la convention collective, saisissez les taux et corrigez les anomalies. Ici, vous n'avez rien à installer, rien à apprendre : la production est faite pour vous.",
  },
  {
    icone: "🙋",
    titre: "Un humain qui répond",
    texte:
      "Un arrêt de travail, une rupture de contrat, une prime inhabituelle ? Vous posez la question à un interlocuteur unique qui connaît votre dossier, pas à un chatbot ou à une FAQ.",
  },
  {
    icone: "📡",
    titre: "La veille est incluse",
    texte:
      "SMIC, plafonds, taux de cotisations, évolutions de votre convention collective : nous suivons les changements et les appliquons à vos bulletins sans que vous ayez à y penser.",
  },
];

export default function Pourquoi() {
  return (
    <section id="service" className="scroll-mt-20 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Externaliser plutôt que s&apos;équiper
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Un logiciel de paie ne répond pas au téléphone
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          Les logiciels de paie en ligne sont de bons outils, à condition
          d&apos;avoir le temps et les compétences pour les piloter. Si la paie
          n&apos;est pas votre métier, la déléguer coûte souvent moins cher
          qu&apos;une erreur de cotisations ou une DSN rejetée.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cartes.map((carte) => (
            <article
              key={carte.titre}
              className="rounded-2xl border border-line bg-ivory p-6"
            >
              <span className="text-3xl" aria-hidden="true">
                {carte.icone}
              </span>
              <h3 className="mt-4 text-xl font-bold">{carte.titre}</h3>
              <p className="mt-2 leading-relaxed">{carte.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
