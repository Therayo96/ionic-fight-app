import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFightPageRoutingModule } from './list-fight-routing.module';

import { ListFightPage } from './list-fight.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFightPageRoutingModule,
    SwiperModule
  ],
  declarations: [ListFightPage]
})
export class ListFightPageModule {}
