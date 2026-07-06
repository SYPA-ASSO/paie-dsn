import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export function configurationPresente(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function clientServeur() {
  const magasin = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return magasin.getAll();
        },
        setAll(liste) {
          try {
            liste.forEach(({ name, value, options }) =>
              magasin.set(name, value, options)
            );
          } catch {
            // Appel depuis un Server Component : les cookies sont geres par le middleware/route
          }
        },
      },
    }
  );
}

// Client service (bypass RLS) : usage exclusivement serveur, jamais expose au navigateur.
export function clientService() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export type Profil = {
  user_id: string;
  role: "admin" | "employeur" | "salarie";
  organisation_id: string | null;
  nom: string | null;
};

export async function profilCourant() {
  const supabase = await clientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, profil: null };
  const { data: profil } = await supabase
    .from("profils")
    .select("user_id, role, organisation_id, nom")
    .eq("user_id", user.id)
    .single();
  return { user, profil: (profil as Profil | null) ?? null };
}
