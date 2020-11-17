import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from "../services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'intelligence',
    loadChildren: () => import('./intelligence/intelligence.module').then( m => m.IntelligenceModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
