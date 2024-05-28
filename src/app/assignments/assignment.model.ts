export class Assignment {
  _id!: string;
  titre!: string;
  description!: string;
  matiere!: string;
  groupe!: { idGroupe: string }[];
  dateLimite!: Date;
  dateCreation!: Date;
  lien!: string;
  matierePhoto? : String;
}
