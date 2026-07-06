import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-1.5 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-none text-navy">
            paie
            <span className="text-base text-emerald-brand">et</span>
            dsn
            <span className="ml-1 inline-block -rotate-6 rounded-lg bg-amber-brand px-1.5 py-0.5 text-xs text-white">
              .fr
            </span>
          </p>
          <p className="mt-1 text-[10px] tracking-wide text-ink/70">
            Un service de CBT CHOLEZ-PAGOTTO
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Externalisation de la paie et des déclarations sociales pour les
            TPE, PME, associations, professions libérales et particuliers
            employeurs. Un service du{" "}
            <a
              href="https://cholez-pagotto.fr/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-emerald-deep hover:underline"
            >
              Cabinet Cholez-Pagotto
            </a>
            .
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-navy">
            Le service
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/#service" className="hover:text-emerald-deep">
                Pourquoi externaliser
              </a>
            </li>
            <li>
              <a href="/#etapes" className="hover:text-emerald-deep">
                Comment ça marche
              </a>
            </li>
            <li>
              <a href="/#tarifs" className="hover:text-emerald-deep">
                Tarifs et simulateur
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-emerald-deep">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-emerald-deep">
                Contact et devis
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-navy">
            Ressources
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/conventions-collectives"
                className="hover:text-emerald-deep"
              >
                Liste des conventions collectives (IDCC)
              </Link>
            </li>
            <li>
              <Link
                href="/particuliers-employeurs"
                className="hover:text-emerald-deep"
              >
                Particuliers employeurs
              </Link>
            </li>
            <li>
              <Link
                href="/mandat-tiers-declarant"
                className="hover:text-emerald-deep"
              >
                Mandat de tiers déclarant
              </Link>
            </li>
            <li>
              <Link href="/notre-perimetre" className="hover:text-emerald-deep">
                Notre périmètre d&apos;intervention
              </Link>
            </li>
            <li>
              <Link
                href="/veille-sociale-rh"
                className="hover:text-emerald-deep"
              >
                Veille sociale et RH
              </Link>
            </li>
            <li>
              <Link
                href="/comprendre-bulletin-de-paie"
                className="hover:text-emerald-deep"
              >
                Comprendre votre bulletin de paie
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-emerald-deep">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-navy">
            Le cabinet
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/a-propos" className="hover:text-emerald-deep">
                À propos et autres solutions
              </Link>
            </li>
            <li>
              <Link href="/espace-client" className="hover:text-emerald-deep">
                Espace client
              </Link>
            </li>
            <li>
              <a
                href="https://cholez-pagotto.fr"
                target="_blank"
                rel="noopener"
                className="hover:text-emerald-deep"
              >
                Cabinet Cholez-Pagotto ↗
              </a>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-emerald-deep">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-de-confidentialite"
                className="hover:text-emerald-deep"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/renoncer-au-contrat"
                className="hover:text-emerald-deep"
              >
                Renoncer au contrat ici
              </Link>
            </li>
            <li>
              <Link
                href="/renoncer-au-contrat?type=resiliation"
                className="hover:text-emerald-deep"
              >
                Résilier votre abonnement
              </Link>
            </li>
            <li>
              <Link href="/cgv" className="hover:text-emerald-deep">
                Conditions générales de vente
              </Link>
            </li>
            <li>
              <Link href="/cgs" className="hover:text-emerald-deep">
                Conditions générales de service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-ink/60">
        © {new Date().getFullYear()}{" "}Cabinet Cholez-Pagotto · Tous droits
        réservés
      </div>
    </footer>
  );
}
