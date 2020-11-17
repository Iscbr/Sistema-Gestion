import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { IntelligenceDashboardPage } from "./intelligence-dashboard/intelligence-dashboard.page";

const routes: Routes = [
  {
    path: '',
    component: IntelligenceDashboardPage
  }
];

@NgModule({
  declarations: [
    IntelligenceDashboardPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
  ]
})
export class IntelligenceModule { }
