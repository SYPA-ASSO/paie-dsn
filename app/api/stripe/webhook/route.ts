import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clientStripe } from "@/lib/stripe";

// Webhook Stripe : notification du cabinet a chaque souscription ou resiliation.
// L'activation de l'offre dans l'espace client reste une action admin (V1).
async function notifierCabinet(sujet: string, lignes: string[]) {
  const cleApi = process.env.BREVO_API_KEY;
  const destinataire = process.env.CONTACT_TO_EMAIL;
  if (!cleApi || !destinataire) return;
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": cleApi, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "paie-et-dsn.fr", email: destinataire },
      to: [{ email: destinataire }],
      subject: `[paie-et-dsn.fr] ${sujet}`,
      textContent: lignes.join("\n"),
    }),
  });
}

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
    if (session.mode === "subscription") {
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
    await notifierCabinet("Resiliation d'abonnement", [
      `Formule : ${abonnement.metadata?.formule ?? "inconnue"}`,
      `Abonnement Stripe : ${abonnement.id}`,
      "",
      "Action : decocher l'offre du dossier client dans Supabase ou /admin.",
    ]);
  }

  return NextResponse.json({ recu: true });
}
