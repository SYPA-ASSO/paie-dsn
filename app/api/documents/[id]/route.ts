import { NextResponse } from "next/server";
import {
  clientServeur,
  clientService,
  configurationPresente,
} from "@/lib/supabase/server";

// Telechargement securise : la lecture de la ligne passe par la RLS
// (le demandeur ne voit que ses documents), puis une URL signee courte
// est generee avec la cle service sur le bucket prive.
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

  const { data: document } = await supabase
    .from("documents")
    .select("chemin, titre")
    .eq("id", id)
    .single();
  if (!document) {
    return NextResponse.json({ erreur: "Document introuvable." }, { status: 404 });
  }

  const service = clientService();
  const { data: signe, error } = await service.storage
    .from("documents")
    .createSignedUrl(document.chemin, 60, {
      download: document.titre,
    });
  if (error || !signe) {
    return NextResponse.json({ erreur: "Téléchargement indisponible." }, { status: 502 });
  }
  return NextResponse.redirect(signe.signedUrl);
}
