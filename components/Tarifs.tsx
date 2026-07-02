import Simulateur from "@/components/Simulateur";

const criteres = [
  "Le nombre de salariés et de bulletins par mois",
  "Votre convention collective et ses particularités",
  "La fréquence des entrées et sorties de personnel",
  "Les événements à gérer : arrêts, temps partiel, contrats multiples",
];

export default function Tarifs() {
  return (
    <section id="tarifs" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Tarifs
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Un forfait mensuel clair, sans surprise
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Estimez votre forfait en quelques secondes avec le simulateur,
              puis recevez un devis précis et détaillé sous 48&nbsp;heures, sans
              engagement. Le forfait mensuel est fixe : pas de surprise en fin
              de mois. Il dépend de quatre critères :
            </p>
            <ul className="mt-6 space-y-3">
              {criteres.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-brand"
                    aria-hidden="true"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/80">
              Une ouverture de dossier (création de votre compte, paramétrage de
              votre convention collective et, s&apos;il y a lieu, reprise de
              l&apos;historique de bulletins et de DSN) est facturée une seule
              fois, à l&apos;ouverture. Son montant dépend de votre situation et
              figure au devis : aucun frais caché ensuite.
            </p>
          </div>
          <Simulateur />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-navy sm:text-2xl">
            En option, avec ou sans forfait de paie
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <a
              href="/veille-sociale-rh"
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-emerald-brand/50 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-ink/60">
                Abonnement veille
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-navy">
                L&apos;Essentiel Social
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-emerald-deep">
                109,90&nbsp;€{" "}
                <span className="text-sm font-semibold text-ink/70">
                  par mois
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Newsletters hebdomadaires, jurisprudences commentées,
                webinaires gratuits, plus de 350 modèles de documents social et
                RH, alertes sur les actualités sociales, RH et paie.
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-deep group-hover:underline">
                Découvrir la formule
              </p>
            </a>
            <a
              href="/veille-sociale-rh"
              className="group rounded-2xl border-2 border-emerald-brand bg-white p-6 transition hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-ink/60">
                Abonnement veille et assistance
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-navy">
                Le Copilote Social
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-emerald-deep">
                229,90&nbsp;€{" "}
                <span className="text-sm font-semibold text-ink/70">
                  par mois
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Tout L&apos;Essentiel Social, plus dossiers de synthèse et
                procédures RH, outils de gestion, priorité en information
                juridique employeur et en assistance administrative paie et RH,
                frais de dossier offerts pour toutes études assurantielles.
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-deep group-hover:underline">
                Découvrir la formule
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
