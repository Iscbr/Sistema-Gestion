import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { IonicSelectableModule } from "ionic-selectable";
import { SaleListPage } from "./sale-list/sale-list.page";
import { SaleFinishPage } from "./sale-finish/sale-finish.page";
import { SaleCreatePage } from "./sale-create/sale-create.page";

const routes: Routes = [
  {
    path: '',
    component: SaleCreatePage
  },
  {
    path: 'list',
    component: SaleListPage
  }
];

@NgModule({
  declarations: [
    SaleCreatePage,
    SaleListPage,
    SaleFinishPage
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
export class SalesModule { }
