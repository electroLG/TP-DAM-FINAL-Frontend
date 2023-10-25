import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitPipe } from '../pipes/unit.pipe';
import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';
import { SharedPipeModuleModule } from '../shared-pipe-module/shared-pipe-module.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule,
    SharedPipeModuleModule
  ],
  declarations: [DispositivoPage]
})
export class DispositivoPageModule {}
