import { NextResponse } from "next/server";
import {
  clientServeur,
  clientService,
  configurationPresente,
} from "@/lib/supabase/server";

// Telechargement d'une ressource documentaire : la lecture de la ligne passe
// par la RLS (abonnement du dossier client verifie en base), puis URL signee.
export async function GET(
  _requete: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!configurationPresente()) {
    return NextResponse.json({ erreur: "Non configuré." }, { status: 503 });
  }
  const { id } = await params;
  const supabase = await clientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/espace-client", _requete.url));
  }

  const { data: ressource } = await supabase
    .from("ressources")
    .select("chemin, titre")
    .eq("id", id)
    .single();
  if (!ressource) {
    return NextResponse.json({ erreur: "Ressource introuvable ou accès non couvert par votre abonnement." }, { status: 404 });
  }

  const service = clientService();
  const { data: signe, error } = await service.storage
    .from("documents")
    .createSignedUrl(ressource.chemin, 60, { download: ressource.titre });
  if (error || !signe) {
    return NextResponse.json({ erreur: "Téléchargement indisponible." }, { status: 502 });
  }
  return NextResponse.redirect(signe.signedUrl);
}
