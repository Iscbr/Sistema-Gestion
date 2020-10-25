import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { IonicSelectableModule } from "ionic-selectable";
import { VentaListPage } from "./venta-list/venta-list.page";
import { FinishSalePage } from "./finish-sale/finish-sale.page";


const routes: Routes = [
  {
    path: '',
    component: VentaListPage
  }
];

@NgModule({
  declarations: [
    VentaListPage,
    FinishSalePage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    IonicSelectableModule
  ]
})
export class VentasModule { }
