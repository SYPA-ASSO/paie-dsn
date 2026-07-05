"use client";

import { clientNavigateur } from "@/lib/supabase/client";

export default function Deconnexion() {
  return (
    <button
      type="button"
      onClick={async () => {
        await clientNavigateur().auth.signOut();
        window.location.assign("/espace-client");
      }}
      className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-emerald-brand/50"
    >
      Se déconnecter
    </button>
  );
}
