import { NextResponse } from "next/server";

// Envoi du formulaire de contact via Brevo (API transactionnelle).
// Variables d'environnement requises sur Vercel :
// - BREVO_API_KEY : cle API Brevo (compte du cabinet)
// - CONTACT_TO_EMAIL : adresse de reception des demandes

type Corps = {
  type?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  siret?: string;
  adresse?: string;
  effectif?: string;
  ccn?: string;
  message?: string;
  consentement?: boolean;
  siteweb?: string; // honeypot anti-spam : doit rester vide
};

export async function POST(requete: Request) {
  let corps: Corps;
  try {
    corps = (await requete.json()) as Corps;
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un robot qui remplit ce champ est ignoré silencieusement
  if (corps.siteweb) {
    return NextResponse.json({ ok: true });
  }

  if (!corps.consentement) {
    return NextResponse.json(
      { erreur: "Le consentement au traitement des données est requis." },
      { status: 400 }
    );
  }
  if (!corps.nom || !corps.prenom || !corps.email || !corps.message) {
    return NextResponse.json(
      { erreur: "Merci de renseigner les champs obligatoires." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(corps.email)) {
    return NextResponse.json(
      { erreur: "Adresse e-mail invalide." },
      { status: 400 }
    );
  }

  const cleApi = process.env.BREVO_API_KEY;
  const destinataire = process.env.CONTACT_TO_EMAIL;
  if (!cleApi || !destinataire) {
    return NextResponse.json(
      { erreur: "Le formulaire n'est pas encore configuré. Merci de réessayer plus tard." },
      { status: 503 }
    );
  }

  const lignes = [
    `Type de demande : ${corps.type ?? "Non précisé"}`,
    `Nom : ${corps.nom}`,
    `Prénom : ${corps.prenom}`,
    `E-mail : ${corps.email}`,
    corps.telephone ? `Téléphone : ${corps.telephone}` : null,
    corps.siret ? `SIRET : ${corps.siret}` : null,
    corps.adresse ? `Adresse du siège : ${corps.adresse}` : null,
    corps.effectif ? `Effectif : ${corps.effectif}` : null,
    corps.ccn ? `Convention collective : ${corps.ccn}` : null,
    "",
    "Message :",
    corps.message,
  ].filter((l): l is string => l !== null);

  const reponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": cleApi,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "paie-et-dsn.fr", email: destinataire },
      to: [{ email: destinataire }],
      replyTo: { email: corps.email, name: `${corps.prenom} ${corps.nom}` },
      subject: `[paie-et-dsn.fr] ${corps.type ?? "Contact"} : ${corps.prenom} ${corps.nom}`,
      textContent: lignes.join("\n"),
    }),
  });

  if (!reponse.ok) {
    return NextResponse.json(
      { erreur: "L'envoi a échoué. Merci de réessayer dans quelques instants." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
