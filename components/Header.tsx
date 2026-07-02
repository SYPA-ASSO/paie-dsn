"use client";

import { useState } from "react";
import Link from "next/link";

const ressources = [
  { href: "/particuliers-employeurs", label: "Particuliers employeurs" },
  { href: "/mandat-tiers-declarant", label: "Mandat de tiers déclarant" },
  { href: "/notre-perimetre", label: "Notre périmètre d'intervention" },
  { href: "/veille-sociale-rh", label: "Veille sociale et RH" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 flex-col leading-tight"
          onClick={() => setMenuOuvert(false)}
        >
          <span className="flex items-center gap-1.5 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-none text-navy">
            paie
            <span className="text-base text-emerald-brand">et</span>
            dsn
            <span className="ml-1 inline-block -rotate-6 rounded-lg bg-amber-brand px-1.5 py-0.5 text-xs text-white">
              .fr
            </span>
          </span>
          <span className="truncate text-center text-[10px] tracking-wide text-ink/70">
            Un service de CBT CHOLEZ-PAGOTTO
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 text-sm font-medium text-navy lg:flex"
        >
          <a href="/#service" className="hover:text-emerald-deep">
            Le service
          </a>
          <a href="/#tarifs" className="hover:text-emerald-deep">
            Tarifs
          </a>
          <Link
            href="/conventions-collectives"
            className="hover:text-emerald-deep"
          >
            Conventions
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-emerald-deep"
              aria-haspopup="true"
            >
              Ressources
              <span aria-hidden="true" className="text-xs">
                ▾
              </span>
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="w-64 rounded-2xl border border-line bg-white p-2 shadow-lg">
                {ressources.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-2.5 hover:bg-emerald-tint hover:text-emerald-deep"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/a-propos" className="hover:text-emerald-deep">
            Le cabinet
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/contact"
            className="hidden rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-deep sm:inline-block"
          >
            Demander un devis
          </a>
          <button
            type="button"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-expanded={menuOuvert}
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy lg:hidden"
          >
            <span aria-hidden="true" className="text-lg">
              {menuOuvert ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {menuOuvert && (
        <nav
          aria-label="Navigation mobile"
          className="border-t border-line bg-ivory lg:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 text-navy sm:px-6">
            <li>
              <a
                href="/#service"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-white"
              >
                Le service
              </a>
            </li>
            <li>
              <a
                href="/#etapes"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-white"
              >
                Comment ça marche
              </a>
            </li>
            <li>
              <a
                href="/#tarifs"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-white"
              >
                Tarifs et simulateur
              </a>
            </li>
            <li>
              <Link
                href="/conventions-collectives"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-white"
              >
                Conventions collectives
              </Link>
            </li>
            <li className="pt-2">
              <p className="px-3 text-xs font-bold uppercase tracking-wide text-ink/60">
                Ressources
              </p>
            </li>
            {ressources.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOuvert(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/a-propos"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-white"
              >
                Le cabinet
              </Link>
            </li>
            <li className="pt-3">
              <a
                href="/contact"
                onClick={() => setMenuOuvert(false)}
                className="block rounded-full bg-emerald-brand px-4 py-3 text-center font-semibold text-white"
              >
                Demander un devis
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
