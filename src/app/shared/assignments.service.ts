import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

// importation des données de test
import { bdInitialAssignments } from './data';
import { Stat } from '../matiere/stat.model';
import { Rendu } from '../assignments/rendu.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  headers: any;
  constructor(private logService: LoggingService,
    private http: HttpClient, private auth: AuthService) {
    this.headers = this.auth.createAuthorizationHeader();
  }

  uri = environment.baseUrl + "/assignments";
  urirendu = environment.baseUrl + "/rendu";


  getAssignmentsStat(date1: String, date2: String,matiere:string): Observable<Stat[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Stat[]>(this.uri + "/statistique?date1=" + date1 + "&date2=" + date2 +"&matiere="+matiere, { headers: this.headers });
  }
  // retourne tous les assignments
  getAssignments(): Observable<Assignment[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Assignment[]>(this.uri, { headers: this.headers });
  }

  getAssignmentsPagines(page: number, limit: number, titre: string, matiere: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit + "&titre=" + titre + "&matiere=" + matiere, { headers: this.headers });
  }

  getAssignmentsPaginesListe(page: number, limit: number, titre: string, matiere: string, groupe: string, triType:string, triDirection:string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit + "&titre=" + titre + "&matiere=" + matiere + "&groupe=" + groupe + "&sortField="+triType + "&sortOrder="+triDirection, { headers: this.headers });
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id: string): Observable<Assignment> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Assignment>(this.uri + "/" + id, { headers: this.headers })
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
  addAssignment(assignment: Assignment): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();

    //this.assignments.push(assignment);
    this.logService.log(assignment.titre, "ajouté");
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(this.uri, assignment, { headers: this.headers });
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();

    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment._id, "modifié");
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(this.uri, assignment, { headers: this.headers });
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    this.logService.log(assignment.titre, "supprimé");
    //return of("Assignment supprimé avec succès");
    return this.http.delete(this.uri + "/" + assignment._id, { headers: this.headers });
  }

  addRendu(rendu: Rendu): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    this.logService.log(rendu.matricule, "ajouté dans rendu");
    return this.http.post(this.urirendu, rendu, { headers: this.headers });
  }


  updateRendu(rendu: Rendu) {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.put(this.urirendu, rendu, { headers: this.headers }).pipe(
      catchError((error) => {
        // Gérer l'erreur ici, par exemple afficher un message d'erreur
        console.error('Erreur lors de la mise à jour du rendu :', error);
        // Renvoyer une observable avec l'erreur pour que le composant puisse la gérer
        return throwError(error);
      })
    );
  }

  getRenduPaginesListe(page: number, limit: number, idAssignment: string, filter: string, idEtudiant: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Rendu[]>(this.urirendu + "?page=" + page + "&limit=" + limit + "&filter=" + filter + "&idEtudiant=" + "&idAssignment=" + idAssignment, { headers: this.headers });
  }

  getRenduPaginesListeByStudent(page: number, limit: number, idAssignment: string, filter: string, idEtudiant: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Rendu[]>(this.urirendu + "?page=" + page + "&limit=" + limit + "&filter=" + filter + "&idEtudiant=" + idEtudiant + "&idAssignment=" + idAssignment, { headers: this.headers });
  }

  getAllRenduPaginesListeByStudent(page: number, limit: number, filter: string, idEtudiant: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Rendu[]>(this.urirendu + "?page=" + page + "&limit=" + limit + "&filter=" + filter + "&idEtudiant=" + idEtudiant + "&idAssignment=", { headers: this.headers });
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

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.titre = a.titre;
      nouvelAssignment.dateLimite = new Date(a.dateLimite);
      nouvelAssignment.description = a.description;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

  getdateNow() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedDate;
  }


}
