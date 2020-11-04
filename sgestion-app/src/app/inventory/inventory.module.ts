import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { InventoryListPage } from "./inventory-list/inventory-list.page";
import { InventoryUploadCsvPage } from "./inventory-upload-csv/inventory-upload-csv.page";
import { InventoryItemDetailPage } from "./inventory-item-detail/inventory-item-detail.page";

const routes: Routes = [
  {
    path: '',
    component: InventoryListPage
  }
];

@NgModule({
  declarations: [
    InventoryListPage,
    InventoryUploadCsvPage,
    InventoryItemDetailPage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay información para mostrar',
        totalMessage: 'Total',
        selectedMessage: 'Seleccionado'
      }
    }),
  ]
})
export class InventoryModule { }
