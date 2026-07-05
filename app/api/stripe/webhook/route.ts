import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clientStripe } from "@/lib/stripe";

// Webhook Stripe : notification du cabinet a chaque souscription ou resiliation.
// L'activation de l'offre dans l'espace client reste une action admin (V1).
async function envoyerEmail(
  destinataire: string,
  sujet: string,
  lignes: string[]
) {
  const cleApi = process.env.BREVO_API_KEY;
  const expediteur = process.env.CONTACT_TO_EMAIL;
  if (!cleApi || !expediteur) return;
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": cleApi, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Cabinet Cholez-Pagotto · paie-et-dsn.fr", email: expediteur },
      to: [{ email: destinataire }],
      subject: sujet,
      textContent: lignes.join("\n"),
    }),
  });
}

async function notifierCabinet(sujet: string, lignes: string[]) {
  const destinataire = process.env.CONTACT_TO_EMAIL;
  if (!destinataire) return;
  await envoyerEmail(destinataire, `[paie-et-dsn.fr] ${sujet}`, lignes);
}

const nomsFormules: Record<string, string> = {
  essentiel: "L'Essentiel Social",
  copilote: "Le Copilote Social",
};

export async function POST(requete: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ erreur: "Non configuré." }, { status: 503 });
  }
  const signature = requete.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ erreur: "Signature absente." }, { status: 400 });
  }

  const stripe = clientStripe();
  let evenement: Stripe.Event;
  try {
    const brut = await requete.text();
    evenement = stripe.webhooks.constructEvent(brut, signature, secret);
  } catch {
    return NextResponse.json({ erreur: "Signature invalide." }, { status: 400 });
  }

  if (evenement.type === "checkout.session.completed") {
    const session = evenement.data.object;
    // Compte Stripe partage avec cholez-pagotto.fr : ne traiter QUE les
    // souscriptions initiees par ce site (metadata source posee au checkout).
    if (
      session.mode === "subscription" &&
      session.metadata?.source === "paie-et-dsn.fr"
    ) {
      const emailClient = session.customer_details?.email;
      const formule =
        nomsFormules[session.metadata?.formule ?? ""] ?? "votre abonnement";
      if (emailClient) {
        await envoyerEmail(
          emailClient,
          `Bienvenue : votre abonnement ${formule} est confirmé`,
          [
            `Bonjour${session.customer_details?.name ? " " + session.customer_details.name : ""},`,
            "",
            `Votre souscription à la formule ${formule} (paie-et-dsn.fr, un service du Cabinet Cholez-Pagotto) est confirmée. Merci de votre confiance.`,
            "",
            "Ce qui se passe maintenant :",
            "- le cabinet ouvre votre dossier et vos accès à l'espace documentaire sous 24 heures ouvrées ; vos identifiants vous seront transmis par e-mail ;",
            "- votre première newsletter suivra ;",
            "- votre facture mensuelle est émise par le cabinet et déposée dans votre espace client (le reçu de paiement Stripe vous sert de justificatif immédiat).",
            "",
            "Votre abonnement est sans engagement et résiliable chaque mois. Pour toute question, utilisez le formulaire de contact : https://paie-et-dsn.fr/contact",
            "",
            "Bien cordialement,",
            "Cabinet Cholez-Pagotto",
          ]
        );
      }
      await notifierCabinet("Nouvelle souscription abonnement", [
        `Formule : ${session.metadata?.formule ?? "inconnue"}`,
        `Client : ${session.customer_details?.name ?? ""}`,
        `E-mail : ${session.customer_details?.email ?? ""}`,
        `Source : ${session.metadata?.source ?? ""}`,
        "",
        "Actions : creer/completer le dossier client dans /admin (cocher l'offre),",
        "creer le compte d'acces, et emettre la facture via le logiciel de facturation.",
      ]);
    }
  }

  if (evenement.type === "customer.subscription.deleted") {
    const abonnement = evenement.data.object;
    if (abonnement.metadata?.source !== "paie-et-dsn.fr") {
      return NextResponse.json({ recu: true, ignore: "autre site" });
    }
    await notifierCabinet("Resiliation d'abonnement", [
      `Formule : ${abonnement.metadata?.formule ?? "inconnue"}`,
      `Abonnement Stripe : ${abonnement.id}`,
      "",
      "Action : decocher l'offre du dossier client dans Supabase ou /admin.",
    ]);
  }

  return NextResponse.json({ recu: true });
}
