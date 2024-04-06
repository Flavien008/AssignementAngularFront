import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Chart } from 'chart.js/auto'
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-dahsboard',
    standalone: true,
    imports: [MatInputModule,MatCardActions,MatLabel, MatDatepicker,MatDatepickerToggle,MatFormField,MatCardContent,MatGridTile, MatGridList,MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    public chart: any;
    public donut: any;
    public line: any;
    public pyramide: any;
    ngOnInit(): void {
        this.createChart();
        this.createChartDonus();
        this.createChartLine();
        this.createAgePyramide();
    }

    createChart() {

        this.chart = new Chart("MyChart", {
            type: 'bar', //this denotes tha type of chart

            data: {// values on X-Axis
                labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
                datasets: [
                    {
                        label: "Sales",
                        data: ['467', '576', '572', '79', '92', '574', '573', '576'],
                        backgroundColor: 'blue'
                    },
                    {
                        label: "Profit",
                        data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
                        backgroundColor: 'limegreen'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }

        });
    }


    createChartDonus() {
        this.donut = new Chart("Donus", {
            type: 'doughnut', // This denotes the type of chart
            data: {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ]
                }],
            }
        });
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

    createAgePyramide() {
        this.pyramide = new Chart('Pyramide', {
            type: 'bar',
            data: {
                labels: ["71+", "61-70", "51-60", "41-50", "31-40", "21-30", "0-20"],
                datasets: [
                    {
                        label: "Femme",
                        stack: "Stack 0",
                        backgroundColor: "purple",
                        data: [10, 15, 45, 60, 48, 22, 8].map((k: number) => -k), // Spécifiez le type de retour de map comme number
                    },
                    {
                        label: "Homme",
                        stack: "Stack 0",
                        backgroundColor: "blue",
                        data: [10, 20, 48, 55, 50, 30, 5],
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Pyramide des âges',
                        font: {
                            size: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (c: any) => { // Spécifiez le type de c comme any ou comme un type approprié si disponible
                                const value = Number(c.raw);
                                const positiveOnly = value < 0 ? -value : value;
                                return `${c.dataset.label}: ${positiveOnly.toString()}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        min: -120,
                        max: 120,
                        ticks: {
                            stepSize: 20,
                            callback: (v: any) => v < 0 ? -v : v, // Spécifiez le type de v comme any ou comme un type approprié si disponible
                        },
                    },
                },
            },
        });
    }
    
    

}
