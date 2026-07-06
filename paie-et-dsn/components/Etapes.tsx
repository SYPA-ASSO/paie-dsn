const etapes = [
  {
    numero: "1",
    titre: "Vous transmettez vos variables",
    texte:
      "Chaque mois, vous nous transmettez les éléments du mois : heures, absences, congés, primes. Par simple e-mail ou directement dans votre espace client dédié.",
  },
  {
    numero: "2",
    titre: "Nous établissons les bulletins",
    texte:
      "Les bulletins sont préparés selon votre convention collective, contrôlés, puis mis à votre disposition. Vous disposez de 48 heures pour nous signaler une observation ; trois cas font l'objet d'une validation expresse de votre part : le premier mois du dossier, les soldes de tout compte et les régularisations.",
  },
  {
    numero: "3",
    titre: "La DSN est transmise",
    texte:
      "Sans observation de votre part dans ce délai (hors cas à validation expresse), les bulletins sont réputés validés : la DSN part aux organismes et vous recevez le dossier complet du mois, bulletins, journal de paie et état des charges.",
  },
];

export default function Etapes() {
  return (
    <section id="etapes" className="scroll-mt-20 bg-navy py-16 text-white lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Comment ça marche
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Votre paie du mois en trois étapes
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {etapes.map((etape) => (
            <article key={etape.numero} className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-brand font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {etape.numero}
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">
                {etape.titre}
              </h3>
              <p className="mt-2 leading-relaxed text-white/80">
                {etape.texte}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
