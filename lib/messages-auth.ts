// Traduction en francais des messages d'erreur Supabase (auth et divers)
const traductions: Array<[RegExp, string]> = [
  [/new password should be different/i, "Le nouveau mot de passe doit être différent de l'ancien."],
  [/invalid login credentials/i, "Identifiants incorrects : vérifiez l'e-mail et le mot de passe."],
  [/email not confirmed/i, "Adresse e-mail non confirmée : contactez le cabinet."],
  [/already been registered|already registered|already exists/i, "Un compte existe déjà avec cette adresse e-mail."],
  [/password should be at least (\d+)/i, "Mot de passe trop court : $1 caractères minimum."],
  [/password should contain/i, "Le mot de passe ne respecte pas les règles de complexité requises."],
  [/auth session missing/i, "Session expirée : reconnectez-vous ou utilisez un nouveau lien."],
  [/for security purposes.*(\d+) second/i, "Pour des raisons de sécurité, patientez $1 secondes avant de réessayer."],
  [/rate limit exceeded/i, "Trop de tentatives : patientez quelques minutes puis réessayez."],
  [/invalid format|unable to validate email/i, "Adresse e-mail invalide."],
  [/user not found/i, "Aucun compte ne correspond à cette adresse e-mail."],
  [/token has expired|is invalid|expired or invalid/i, "Ce lien a expiré ou a déjà été utilisé."],
  [/network|failed to fetch/i, "Connexion au serveur impossible : vérifiez votre réseau puis réessayez."],
  [/duplicate key/i, "Cet enregistrement existe déjà."],
  [/violates foreign key/i, "Opération impossible : des éléments liés existent encore."],
];

export function traduireErreur(message: string | undefined | null): string {
  if (!message) return "Une erreur est survenue. Réessayez ou contactez le cabinet.";
  for (const [motif, francais] of traductions) {
    const resultat = motif.exec(message);
    if (resultat) {
      return francais
        .replace("$1", resultat[1] ?? "")
        .trim();
    }
  }
  // Message deja en francais (nos propres erreurs) : le laisser tel quel
  if (/[àâéèêëîïôùûç]|^Le |^La |^Les |^Un |^Une |^Ce |^Cette |requis|invalide|impossible/i.test(message)) {
    return message;
  }
  return `Une erreur est survenue (détail technique : ${message}).`;
}
