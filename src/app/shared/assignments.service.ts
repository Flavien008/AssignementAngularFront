import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

// importation des données de test
import { bdInitialAssignments } from './data';
import { Stat } from '../matiere/stat.model';
import { Rendu } from '../assignments/rendu.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logService:LoggingService,
              private http:HttpClient) { }

  //uri = 'http://localhost:8010/api/assignments';
  uri = environment.baseUrl+"/assignments";
  urirendu = environment.baseUrl+"/rendu";


  getAssignmentsStat(date1:String,date2:String):Observable<Stat[]> {
    return this.http.get<Stat[]>(this.uri+"/statistique?date1=" +date1+ "&date2="+date2);
  }
  // retourne tous les assignments
  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagines(page:number, limit:number,titre:string,matiere:string):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit+ "&titre=" + titre+ "&matiere=" + matiere);
  }

  getAssignmentsPaginesListe(page:number, limit:number,titre:string,matiere:string,groupe:string):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit+ "&titre=" + titre+ "&matiere=" + matiere+ "&groupe=" + groupe);
  }


  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id:string):Observable<Assignment> { 
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
           catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  // ajoute un assignment et retourne une confirmation
  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    this.logService.log(assignment.titre, "ajouté");
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
   // l'assignment passé en paramètre est le même objet que dans le tableau
   // plus tard on verra comment faire avec une base de données
   // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment._id, "modifié");
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    this.logService.log(assignment.titre, "supprimé");
    //return of("Assignment supprimé avec succès");
    return this.http.delete(this.uri + "/" + assignment._id);
  }

  addRendu(rendu: Rendu):Observable<any> {
    this.logService.log(rendu.matricule, "ajouté dans rendu");
    return this.http.post(this.urirendu, rendu);
  }

  updateRendu(rendu: Rendu):Observable<any> {
    this.logService.log(rendu._id, "modifié");
    return this.http.put(this.urirendu, rendu);
  }

  getRenduPaginesListe(page:number, limit:number,idAssignment:string,filter:string,idEtudiant:string):Observable<any> {
    return this.http.get<Rendu[]>(this.urirendu + "?page=" + page + "&limit=" + limit+ "&filter=" + filter+ "&idEtudiant=" + "&idAssignment=" + idAssignment);
  }

  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  peuplerBD() {
    // on utilise les données de test générées avec mockaroo.com pour peupler la base
    // de données
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.titre = a.titre;
      nouvelAssignment.dateLimite = new Date(a.dateLimite);
      nouvelAssignment.description = a.description;

      this.addAssignment(nouvelAssignment)
      .subscribe(() => {
        console.log("Assignment " + a.titre + " ajouté");
      });
    });
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.titre = a.titre;
      nouvelAssignment.dateLimite = new Date(a.dateLimite);
      nouvelAssignment.description = a.description;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

  getdateNow(){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedDate;
  }


}
