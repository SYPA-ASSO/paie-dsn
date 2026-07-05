import { NextResponse } from "next/server";
import {
  clientStripe,
  configurationStripePresente,
  formules,
  type CleFormule,
} from "@/lib/stripe";

// Creation d'une session Stripe Checkout (abonnement mensuel par carte).
export async function POST(requete: Request) {
  if (!configurationStripePresente()) {
    return NextResponse.json(
      { erreur: "Le paiement en ligne ouvre prochainement. Utilisez la souscription par virement via le formulaire de contact." },
      { status: 503 }
    );
  }

  let formule: CleFormule;
  try {
    const corps = (await requete.json()) as { formule?: string };
    if (corps.formule !== "essentiel" && corps.formule !== "copilote") {
      throw new Error();
    }
    formule = corps.formule;
  } catch {
    return NextResponse.json({ erreur: "Formule inconnue." }, { status: 400 });
  }

  const stripe = clientStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: formules[formule].prix(), quantity: 1 }],
    locale: "fr",
    allow_promotion_codes: true,
    billing_address_collection: "required",
    success_url:
      "https://paie-et-dsn.fr/veille-sociale-rh/merci?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://paie-et-dsn.fr/veille-sociale-rh",
    metadata: { source: "paie-et-dsn.fr", formule },
    subscription_data: {
      metadata: { source: "paie-et-dsn.fr", formule },
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { erreur: "Impossible d'ouvrir le paiement. Merci de réessayer." },
      { status: 502 }
    );
  }
  return NextResponse.json({ url: session.url });
}
