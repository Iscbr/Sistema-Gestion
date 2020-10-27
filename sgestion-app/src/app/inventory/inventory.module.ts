import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { InventoryListPage } from "./inventory-list/inventory-list.page";
import { InventoryUploadCsvPage } from "./inventory-upload-csv/inventory-upload-csv.page";

const routes: Routes = [
  {
    path: '',
    component: InventoryListPage
  }
];

@NgModule({
  declarations: [
    InventoryListPage,
    InventoryUploadCsvPage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay información para mostrar', // Message to show when array is presented, but contains no values
        totalMessage: 'Total', // Footer total message
        selectedMessage: 'Seleccionado' // Footer selected message
      }
    }),
  ]
})
export class InventoryModule { }
