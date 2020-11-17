import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

import { IntelligenceService } from "../../../services/intelligence.service";
import { UtilUiService } from "../../../services/util/util-ui.service";

import * as moment from "moment";

@Component({
  selector: 'app-intelligence-dashboard',
  templateUrl: './intelligence-dashboard.page.html',
  styleUrls: ['./intelligence-dashboard.page.scss'],
})
export class IntelligenceDashboardPage implements OnInit {

  public year: string;
  public month: string;
  public day: string;

  public chartPerDay: any = null;
  public chartPerMonth: any = null;
  public chartPerYear: any = null;
  private options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor(
    private uiService: UtilUiService,
    private intelligenceService: IntelligenceService
  ) { }

  public async ngOnInit() {
  }

  public async ionViewWillEnter() {
    await this.uiService.showLoadingAlert("Cargando datos...");
    const today = moment().toDate().toLocaleDateString("en-US").split("/")
    this.year = today[2];
    this.month = today[0];
    this.day = today[1];
    await this.salesPerYear();
  }

  public async salesPerYear() {
    this.intelligenceService.getSalesPerYear(this.year).subscribe(
      response => {
        // Se obtienen las ventas por año y se crea la gráfica
        const labelsPerYear = response.months.map(month => month.month);
        const dataPerYear = response.months.map(day => day.numOfSales);
        this.chartPerYear = new Chart('perYear', {
          type: 'bar',
          data: {
            labels: labelsPerYear,
            datasets: [{
              label: 'Total de ventas: ' + response.numOfSales,
              data: dataPerYear,
              borderWidth: 1
            }]
          },
          options: this.options
        });

        // De las ventas obtenidas por año se obtiene el mes actual y se crea la gráfica
        const month = response.months.find(month => month.month === this.year + "-" + this.month);
        const labelsPerMonth = month.days.map(day => {
          const date = day.day.split("-")
          return date[1] + "/" + date[2]
        });
        const dataPerMonth = month.days.map(day => day.numOfSales);
        this.chartPerMonth = new Chart('perMonth', {
          type: 'bar',
          data: {
            labels: labelsPerMonth,
            datasets: [{
              label: 'Total de ventas: ' + month.numOfSales,
              data: dataPerMonth,
              borderWidth: 1
            }]
          },
          options: this.options
        });

        // De las ventas obtendidas por mes se obtiene el día actual y se crea la gráfica.
        const day = month.days.find(day => day.day === this.year + "-" + this.month + "-" + this.day);
        const labelsPerDay = day.hourRanges;
        const dataPerDay = day.salesPerRange;
        this.chartPerDay = new Chart('perDay', {
          type: 'bar',
          data: {
            labels: labelsPerDay,
            datasets: [{
              label: 'Total de ventas: ' + day.numOfSales,
              data: dataPerDay,
              borderWidth: 1
            }]
          },
          options: this.options
        });

        this.uiService.dismissLoadingAlert();
      },
      error => {
        console.log(error);
      }
    )
  }

  // public async salesPerMonth(date: string) {
  //   this.intelligenceService.getSalesPerMonth(date).subscribe(
  //     response => {
  //       const labels = response.days.map(day => {
  //         const date = day.day.split("-")
  //         return date[1] + "/" + date[2]
  //       });
  //       const data = response.days.map(day => day.numOfSales);
  //
  //       this.chartPerMonth = new Chart('perMonth', {
  //         type: 'bar',
  //         data: {
  //           labels: labels,
  //           datasets: [{
  //             label: 'Total de ventas: ' + response.numOfSales,
  //             data: data,
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           scales: {
  //             yAxes: [{
  //               ticks: {
  //                 beginAtZero: true
  //               }
  //             }]
  //           }
  //         }
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  //
  // public async salesPerDay(date: string) {
  //   this.intelligenceService.getSalesPerDay(date).subscribe(
  //     response => {
  //       this.chartPerDay = new Chart('perDay', {
  //         type: 'bar',
  //         data: {
  //           labels: response.hourRanges,
  //           datasets: [{
  //             label: 'Total de ventas: ' + response.numOfSales,
  //             data: response.salesPerRange,
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           scales: {
  //             yAxes: [{
  //               ticks: {
  //                 beginAtZero: true
  //               }
  //             }]
  //           }
  //         }
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

}
