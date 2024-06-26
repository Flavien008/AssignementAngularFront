import { Component, computed, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./compoments/custom-sidenav/custom-sidenav.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, MatButtonModule, MatDividerModule,
        MatIconModule, MatSlideToggleModule,
        AssignmentsComponent, MatToolbarModule, MatSidenavModule, CustomSidenavComponent]
})
export class AppComponent {
    title = 'Application de gestion des assignments';
    isLoginPage: boolean = false;
    titrefiltre = '';
    matierefiltre = '';
    collapsed = signal(false);
    sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

    constructor(private authService: AuthService,
        private assignmentsService: AssignmentsService,
        private router: Router,) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url === '/login' || event.url === '/' || event.url === '/inscription') {
                    this.isLoginPage = true;
                } else {
                    this.isLoginPage = false;
                }

            }

            // Check user data and redirect if necessary
            if (event instanceof NavigationEnd && this.authService.getUserData() !== null) {
                const userData = this.authService.getUserData();
                if (userData.role !== null && event.url === '/login' || event.url === '/' || event.url === '/inscription') {
                    if (userData.role === 'student') {
                        this.router.navigateByUrl('/groups');
                    } else if (userData.role === 'prof') {
                        this.router.navigateByUrl('/dashboard');
                    }
                }
            }
            else if (event instanceof NavigationEnd && this.authService.getUserData() === null && event.url !== '/inscription') {
                this.router.navigateByUrl('/login');
            }

        });
    }

    // login() {
    //   // on utilise le service d'autentification
    //   // pour se connecter ou se déconnecter
    //   if(!this.authService.loggedIn) {
    //     this.authService.logIn();
    //   } else {
    //     this.authService.logOut();
    //     // on navigue vers la page d'accueil
    //     this.router.navigate(['/home']);
    //   }
    // }

    logout() {
        this.authService.logOut();
        this.router.navigate(['/']);
    }

    genererDonneesDeTest() {
        // on utilise le service
        /* VERSION NAIVE
        this.assignmentsService.peuplerBD();
        */

        // VERSION AVEC Observable
        this.assignmentsService.peuplerBDavecForkJoin()
            .subscribe(() => {
                console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
                window.location.reload();
                // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
                // this.router.navigate(['/home'], {replaceUrl:true});
            });
    }
}
