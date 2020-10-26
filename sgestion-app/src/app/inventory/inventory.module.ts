import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { InventoryListPage } from "./inventory-list/inventory-list.page";

const routes: Routes = [
  {
    path: '',
    component: InventoryListPage
  }
];

@NgModule({
  declarations: [
    InventoryListPage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    NgxDatatableModule
  ]
})
export class InventoryModule { }