import { AssignmentsService } from './../shared/assignments.service';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Chart } from 'chart.js/auto'
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatiereService } from '../shared/matiere.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
// pour date picker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Matiere } from '../matiere/matiere.model';
@Component({
    selector: 'app-dahsboard',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule,MatSelect,MatOption,DatePipe, MatDatepickerModule, FormsModule, MatButton, MatInputModule, MatCardActions, MatLabel, MatDatepicker, MatDatepickerToggle, MatFormField, MatCardContent, MatGridTile, MatGridList, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    public donut: any;
    public date1: string;
    public date2: string;
    public line: any;
    datePipe = new DatePipe('en-US');
    matierefiltre: string='';
    matieres: Matiere[] | undefined;

    constructor(private matiereService: MatiereService, private assignmentsService: AssignmentsService) {
        const d1 = new Date();
        d1.setDate(1);
        const d2 = new Date(d1.getFullYear(), d1.getMonth() + 1, 0); // Set d2 to last day of current month
        console.log(d1);

        this.date1 = this.formatDate(d1);
        this.date2 = this.formatDate(d2);
    }

    getMatiereFromService() {
        this.matiereService.getMatiere()
            .subscribe((matiere) => {
                console.log(" matiere dashboard" + matiere);
                this.matieres = matiere;
            });
        console.log('Requête envoyée pour recuperer matiers');
    }

    applyFilters() {
        if (this.line) {
            this.line.destroy();
        }
        this.createChartLine();
    }

    formatDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate;
    }

    afficher(): void {
        if (this.line) {
            this.line.destroy();
        }
        this.createChartLine();
    }


    ngOnInit(): void {
        this.getMatiereFromService();
        this.createChartDonus();
        this.createChartLine();
    }

    createChartDonus() {
        this.matiereService.getStatistiqueParMatiere()
            .subscribe(data => {
                const labels = data.map(donut => donut.matiere);
                const percentages = data.map(donut => donut.pourcentage);

                const backgroundColors = labels.map(() => {
                    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                    return randomColor;
                });

                const dataWithLabels = percentages.map((percentage, index) => {
                    const label = `${labels[index]}: ${percentage.toFixed(2)}%`;
                    return { percentage, label };
                });

                this.donut = new Chart("Donus", {
                    type: 'doughnut',
                    data: {
                        labels: dataWithLabels.map(item => item.label),
                        datasets: [{
                            label: 'Pourcentage d\'assignments par matière',
                            data: percentages,
                            backgroundColor: backgroundColors
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        plugins: {
                            title: {
                                display: true,
                                text: 'Pourcentage d\'Assignments par matière',
                                font: {
                                    size: 20
                                }
                            }
                        }
                    }
                });
            })
    }

    createChartLine() {
        this.assignmentsService.getAssignmentsStat(this.date1, this.date2,this.matierefiltre).subscribe(data => {
            const labels = data.map(entry => entry._id); // Utiliser les dates comme labels
            const counts = data.map(entry => entry.count); // Utiliser les counts comme données

            // Mettre à jour les données du graphique avec les données reçues du service
            this.line = new Chart("Line", {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Nombre d\'assignement',
                        data: counts, // Utiliser les données renvoyées par le service
                        borderColor: 'rgb(75, 192, 192)',
                    }],
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: 'Nombre d\'assignement du ' + this.datePipe.transform(new Date(this.date1), 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(new Date(this.date2), 'dd/MM/yyyy'),
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            });
        });
    }
}
