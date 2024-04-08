import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Chart } from 'chart.js/auto'
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatiereService } from '../shared/matiere.service';

@Component({
    selector: 'app-dahsboard',
    standalone: true,
    imports: [MatButton,MatInputModule,MatCardActions,MatLabel, MatDatepicker,MatDatepickerToggle,MatFormField,MatCardContent,MatGridTile, MatGridList,MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    public chart: any;
    public donut: any;
    public line: any;
    public pyramide: any;

    constructor(private matiereService: MatiereService) {}

    ngOnInit(): void {
        this.createChartDonus();
        this.createChartLine();
    }

    createChartDonus() {
        this.matiereService.getStatistiqueParMatiere()
        .subscribe(data  => {
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
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.line = new Chart("Line", {
            type: 'line', // This denotes the type of chart
            data: {
                labels: months,
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: 'rgb(75, 192, 192)',
                }],
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart line',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        });
    }
}
