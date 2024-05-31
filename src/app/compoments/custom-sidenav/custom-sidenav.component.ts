import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../login/user.model';


export type MenuItem = {
    icon: string;
    label: string;
    route?: string;
}

@Component({
    selector: 'app-custom-sidenav',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
    templateUrl: './custom-sidenav.component.html',
    styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

    userData: User | undefined;
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userData = this.getUserData();
        this.updateMenuItems();
    }

    sideNavCollapsed = signal(false);
    @Input() set collapsed(val: boolean) {
        this.sideNavCollapsed.set(val);
    }
    MenuItems = signal<MenuItem[]>([
        {
            icon: 'dashboard',
            label: 'Dashboard',
            route: 'dashboard',
        },
        {
            icon: 'work',
            label: 'Assignement',
            route: 'assignments',
        }, {
            icon: 'groups',
            label: 'Groups',
            route: 'groups',
        },
        {
            icon: 'book',
            label: 'Matiere',
            route: 'matiere',
        }
    ]);

    profilePicSize = computed(() => this.sideNavCollapsed() ? '20' : '100');

    getUserData(): any {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    updateMenuItems() {
        if (this.isStudent()) {
            this.MenuItems.set([
                {
                    icon: 'groups',
                    label: 'Groups',
                    route: 'groups',
                },
                {
                    icon: 'assignment_turned_in',
                    label: 'Mes rendus',
                    route: 'rendus',
                }
            ]);
        }
    }

    isStudent() {
        return this.authService.isEtudiant();
    }
}
