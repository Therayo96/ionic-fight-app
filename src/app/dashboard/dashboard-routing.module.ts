import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'make',
    loadChildren: () => import('../make/make.module').then( m => m.MakePageModule)
  },
  {
    path: 'list-fight',
    loadChildren: () => import('../list-fight/list-fight.module').then( m => m.ListFightPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
