import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


export type MenuItem = {
    icon: string;
    label: string;
    route?:string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule,MatListModule,MatIconModule,RouterLink,RouterLinkActive],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

    sideNavCollapsed = signal(false);
    @Input() set collapsed(val:boolean){
        this.sideNavCollapsed.set(val);
    }
    MenuItems = signal<MenuItem[]>([
        {
            icon : 'dashboard',
            label : 'Dahsboard',
            route : 'home',
        },
        {
            icon : 'video_library',
            label : 'Assignement',
            route : 'add',
        }, {
            icon : 'groups',
            label : 'Groups',
            route : 'groups',
        }
    ]);

    profilePicSize = computed(() => this.sideNavCollapsed() ? '20':'100');
}
