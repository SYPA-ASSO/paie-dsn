import MoisPaie from "@/components/MoisPaie";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-tint px-3 py-1 text-xs font-semibold text-emerald-deep">
            <span aria-hidden="true">●</span> Toutes conventions collectives
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Votre paie et vos DSN,{" "}
            <span className="text-emerald-deep">prises en main de A à Z</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Pas de logiciel à apprendre, pas de paramétrage, pas de veille à
            faire. Vous transmettez vos variables du mois, nous établissons les
            bulletins et transmettons vos déclarations sociales. Vous archivez,
            c&apos;est tout.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-navy px-6 py-3 font-semibold text-white shadow-md transition hover:bg-navy-soft"
            >
              Demander un devis gratuit
            </a>
            <a
              href="#etapes"
              className="font-semibold text-navy underline decoration-amber-brand decoration-2 underline-offset-4 hover:text-emerald-deep"
            >
              Comment ça marche ?
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink">
            <li className="flex items-center gap-2">
              <Check /> Bulletins conformes
            </li>
            <li className="flex items-center gap-2">
              <Check /> DSN transmises pour vous
            </li>
            <li className="flex items-center gap-2">
              <Check /> Un interlocuteur unique
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-2xl bg-amber-tint" />
          <div className="relative rounded-2xl border border-line bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink/60">
                  Bulletin de paie
                </p>
                <p className="font-semibold text-navy"><MoisPaie /></p>
              </div>
              <span className="rounded-full bg-emerald-tint px-3 py-1 text-xs font-bold text-emerald-deep">
                Conforme
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/70">Salaire brut</dt>
                <dd className="font-semibold text-navy">2&nbsp;450,00&nbsp;€</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Cotisations salariales</dt>
                <dd className="font-semibold text-navy">
                  &minus;&nbsp;538,45&nbsp;€
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Prélèvement à la source</dt>
                <dd className="font-semibold text-navy">
                  &minus;&nbsp;72,10&nbsp;€
                </dd>
              </div>
              <div className="flex justify-between rounded-lg bg-ivory px-3 py-2">
                <dt className="font-bold text-navy">Net à payer</dt>
                <dd className="font-bold text-emerald-deep">
                  1&nbsp;839,45&nbsp;€
                </dd>
              </div>
            </dl>
            <div className="mt-5 -rotate-3 rounded-lg border-2 border-dashed border-emerald-brand bg-emerald-tint px-4 py-2 text-center text-sm font-bold uppercase tracking-widest text-emerald-deep">
              DSN transmise ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-emerald-brand"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
