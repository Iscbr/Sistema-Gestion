import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {VentaListPage} from "./venta-list/venta-list.page";
import {IonicModule} from "@ionic/angular";


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
    IonicModule
  ]
})
export class VentasModule { }
