export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl bg-navy p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Confiez-nous votre paie dès ce mois-ci
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Décrivez votre situation en quelques lignes : effectif, convention
            collective, échéance. Vous recevez un devis détaillé sous
            48&nbsp;heures.
          </p>
          <a
            href="mailto:contact@cholez-pagotto.fr?subject=Demande%20de%20devis%20paie%20et%20DSN"
            className="mt-8 inline-block rounded-full bg-emerald-brand px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-deep"
          >
            contact@cholez-pagotto.fr
          </a>
          <p className="mt-4 text-sm text-white/70">
            Devis gratuit et sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
