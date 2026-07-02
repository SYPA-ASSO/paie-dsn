const publics = [
  {
    titre: "TPE et PME",
    texte:
      "De la première embauche à plusieurs dizaines de salariés, tous secteurs : bâtiment, hôtellerie-restauration, commerce, bureaux d'études. Votre convention collective est appliquée, pas approximée.",
  },
  {
    titre: "Associations et ESS",
    texte:
      "Animation, sport, aide à domicile, insertion, mais aussi coopératives, mutuelles, fondations et fonds de dotation : quelle que soit votre convention collective, la paie de l'ESS a ses spécificités, ses financements et ses contrats particuliers. Nous les connaissons.",
  },
  {
    titre: "Professions libérales",
    texte:
      "Cabinets d'avocats (nous sommes à jour de la convention collective de leur personnel), cabinets médicaux et dentaires, pharmacies d'officine, architectes, notaires : un ou plusieurs salariés, chaque paie mérite d'être juste, sans y consacrer vos soirées.",
  },
  {
    titre: "Particuliers employeurs",
    texte:
      "Assistant de vie, garde d'enfants, employé de maison : nous établissons les bulletins et les déclarations de votre salarié à domicile, selon la convention collective des particuliers employeurs et de l'emploi à domicile.",
  },
  {
    titre: "Dirigeants assimilés salariés",
    texte:
      "Président de SAS ou de SASU, gérant minoritaire ou égalitaire de SARL, dirigeant d'association rémunéré : votre rémunération de mandataire passe par un bulletin de paie et une DSN, même sans contrat de travail. Nous l'établissons chaque mois.",
  },
  {
    titre: "Copropriétés et CSE",
    texte:
      "Syndicat de copropriétaires employant un gardien ou un employé d'immeuble, comité social et économique salariant un permanent : des paies peu courantes mais très encadrées, traitées selon leur convention collective propre.",
  },
];

export default function PourQui() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Pour qui ?
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Pensé pour tous les employeurs
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publics.map((p) => (
            <article
              key={p.titre}
              className="rounded-2xl bg-emerald-tint p-6"
            >
              <h3 className="text-xl font-bold">{p.titre}</h3>
              <p className="mt-2 leading-relaxed">{p.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
