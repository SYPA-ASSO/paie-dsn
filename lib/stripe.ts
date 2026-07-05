import Stripe from "stripe";

export function configurationStripePresente(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_ESSENTIEL &&
      process.env.STRIPE_PRICE_COPILOTE
  );
}

export function clientStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export const formules = {
  essentiel: {
    nom: "L'Essentiel Social",
    prix: () => process.env.STRIPE_PRICE_ESSENTIEL!,
  },
  copilote: {
    nom: "Le Copilote Social",
    prix: () => process.env.STRIPE_PRICE_COPILOTE!,
  },
} as const;

export type CleFormule = keyof typeof formules;
