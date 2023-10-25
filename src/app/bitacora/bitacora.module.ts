import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FechaPipe } from '../pipes/fecha.pipe';
import { BitacoraPageRoutingModule } from './bitacora-routing.module';

import { BitacoraPage } from './bitacora.page';
import { SharedPipeModuleModule } from '../shared-pipe-module/shared-pipe-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraPageRoutingModule,
    SharedPipeModuleModule
  ],
  declarations: [BitacoraPage]
})
export class BitacoraPageModule {}
