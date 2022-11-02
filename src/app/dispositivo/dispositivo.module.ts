import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitPipe } from '../pipes/unit.pipe';
import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     DispositivoPageRoutingModule
  ],
  declarations: [DispositivoPage,UnitPipe]
})
export class DispositivoPageModule {}
