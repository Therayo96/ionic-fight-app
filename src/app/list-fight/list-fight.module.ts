import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFightPageRoutingModule } from './list-fight-routing.module';

import { ListFightPage } from './list-fight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFightPageRoutingModule
  ],
  declarations: [ListFightPage]
})
export class ListFightPageModule {}
