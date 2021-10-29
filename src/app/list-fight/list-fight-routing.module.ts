import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFightPage } from './list-fight.page';

const routes: Routes = [
  {
    path: '',
    component: ListFightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFightPageRoutingModule {}
