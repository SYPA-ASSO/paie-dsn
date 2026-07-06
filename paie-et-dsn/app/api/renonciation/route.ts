import { NextResponse } from "next/server";

// Fonction de retractation / resiliation en ligne (art. L. 221-21 et D. 221-5
// C. conso, obligation du 19 juin 2026) : declaration en ligne, accuse de
// reception horodate sur support durable (e-mail automatique systematique),
// accessible sans compte.

type Corps = {
  type?: string; // "retractation" | "resiliation"
  nom?: string;
  email?: string;
  formule?: string;
  dateSouscription?: string;
  message?: string;
  siteweb?: string; // honeypot
};

async function envoyerEmail(destinataire: string, sujet: string, texte: string) {
  const cleApi = process.env.BREVO_API_KEY;
  const expediteur = process.env.CONTACT_TO_EMAIL;
  if (!cleApi || !expediteur) throw new Error("Messagerie non configurée");
  const reponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": cleApi, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Cabinet Cholez-Pagotto · paie-et-dsn.fr", email: expediteur },
      to: [{ email: destinataire }],
      subject: sujet,
      textContent: texte,
    }),
  });
  if (!reponse.ok) throw new Error("Envoi impossible");
}

export async function POST(requete: Request) {
  let corps: Corps;
  try {
    corps = (await requete.json()) as Corps;
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }
  if (corps.siteweb) return NextResponse.json({ ok: true });

  const type = corps.type === "retractation" ? "retractation" : "resiliation";
  if (!corps.nom || !corps.email || !corps.formule) {
    return NextResponse.json(
      { erreur: "Merci de renseigner votre nom, votre e-mail et la formule concernée." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(corps.email)) {
    return NextResponse.json({ erreur: "Adresse e-mail invalide." }, { status: 400 });
  }

  const horodatage = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Paris",
  }).format(new Date());

  const libelle =
    type === "retractation"
      ? "rétractation (renonciation au contrat)"
      : "résiliation d'abonnement";

  const recapitulatif = [
    `Type de demande : ${libelle}`,
    `Nom : ${corps.nom}`,
    `E-mail : ${corps.email}`,
    `Contrat concerné : abonnement ${corps.formule}`,
    corps.dateSouscription ? `Date de souscription indiquée : ${corps.dateSouscription}` : null,
    corps.message ? `Précisions : ${corps.message}` : null,
    `Déclaration reçue le : ${horodatage} (heure de Paris)`,
  ].filter((l): l is string => l !== null);

  try {
    // Accuse de reception horodate au client (support durable)
    await envoyerEmail(
      corps.email,
      type === "retractation"
        ? "Accusé de réception de votre rétractation"
        : "Accusé de réception de votre demande de résiliation",
      [
        `Bonjour ${corps.nom},`,
        "",
        type === "retractation"
          ? "Nous accusons réception de votre déclaration de rétractation, dont le contenu et l'horodatage figurent ci-dessous. Le cabinet examine l'applicabilité de votre droit de rétractation au regard de l'article 12 des CGV (les abonnements de contenu numérique souscrits avec demande expresse d'exécution immédiate comportent renonciation à ce droit) et vous répond sous 48 heures ouvrées. Si la rétractation est applicable, votre abonnement est annulé et les sommes versées remboursées dans un délai maximal de 14 jours (article L. 221-24 du Code de la consommation), déduction faite le cas échéant du service déjà fourni (article L. 221-25)."
          : "Nous accusons réception de votre demande de résiliation, dont le contenu et l'horodatage figurent ci-dessous. Votre abonnement prendra fin au terme de la période mensuelle en cours ; aucune échéance ultérieure ne sera prélevée. Une confirmation vous sera adressée.",
        "",
        ...recapitulatif,
        "",
        "Cabinet Cholez-Pagotto · paie-et-dsn.fr",
      ].join("\n")
    );
    // Notification au cabinet avec les actions Stripe a faire
    const destinataireCabinet = process.env.CONTACT_TO_EMAIL;
    if (destinataireCabinet) {
      await envoyerEmail(
        destinataireCabinet,
        `[paie-et-dsn.fr] ${type === "retractation" ? "RETRACTATION" : "Résiliation"} : ${corps.nom}`,
        [
          ...recapitulatif,
          "",
          type === "retractation"
            ? "Actions : VERIFIER le consentement d'execution immediate (Stripe > abonnement > metadonnees : consentement_execution_immediate). S'il est present : droit de retractation eteint (L. 221-28 13°), repondre au client sous 48 h ouvrees (proposer le cas echeant une resiliation fin de periode en geste commercial). S'il est ABSENT : annuler l'abonnement immediatement, rembourser sous 14 jours (prorata possible du service fourni, L. 221-25), desactiver l'offre du dossier."
            : "Actions : annuler l'abonnement dans Stripe EN FIN DE PERIODE (Clients > abonnement > Annuler à la fin de la période), puis désactiver l'offre du dossier client à l'échéance.",
        ].join("\n")
      );
    }
  } catch {
    return NextResponse.json(
      { erreur: "L'envoi de l'accusé de réception a échoué. Merci de réessayer ou d'utiliser le formulaire de contact." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, horodatage });
}
