import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


export type MenuItem = {
    icon: string;
    label: string;
    route?:string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule,MatListModule,MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {
    MenuItems = signal<MenuItem[]>([
        {
            icon : 'dashboard',
            label : 'Dahsboard',
            route : 'dashboard',
        },
        {
            icon : 'video_library',
            label : 'Assignement',
            route : 'Assignement',
        }
        
    ]);
}
