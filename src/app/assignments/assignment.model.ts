export class Assignment {
  _id!: string;
  titre!: string;
  description!: string;
  matiere!: string;
  groupe!: { idGroupe: string }[]; // Modifier ici
  dateLimite!: Date; // Notez que vous devrez peut-être traiter cette date dans le service Angular pour l'envoyer correctement
  lien!: string;
}
