import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { IonicSelectableModule } from "ionic-selectable";
import { VentaListPage } from "./venta-list/venta-list.page";
import { FinishSalePage } from "./finish-sale/finish-sale.page";
import { SaleCreatePage } from "./sale-create/sale-create.page";

const routes: Routes = [
  {
    path: '',
    component: SaleCreatePage
  },
  {
    path: 'list',
    component: VentaListPage
  }
];

@NgModule({
  declarations: [
    SaleCreatePage,
    VentaListPage,
    FinishSalePage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class VentasModule { }
