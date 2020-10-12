import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { IonicSelectableModule } from "ionic-selectable";
import { VentaListPage } from "./venta-list/venta-list.page";


const routes: Routes = [
  {
    path: '',
    component: VentaListPage
  }
];

@NgModule({
  declarations: [
    VentaListPage
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    IonicSelectableModule
  ]
})
export class VentasModule { }
