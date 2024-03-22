import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { CardGroupComponent } from './groupe/card-group/card-group.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AssignmentListComponent } from './assignments/assignment-list/assignment-list.component';
import { ListeRenduComponent } from './assignments/liste-rendu/liste-rendu.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: AssignmentsComponent },
  { path: "add", component: AddAssignmentComponent },
  { path: "groups", component: CardGroupComponent },
  { path: "assignment/:id", component: AssignmentListComponent},
  {path: "assignment/groupe/:id",component: AssignmentDetailComponent},
  {path: "rendu/assignment/:id",component: ListeRenduComponent},
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  }
];
