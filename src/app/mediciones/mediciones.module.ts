import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FechaPipe } from '../pipes/fecha.pipe';
import { UnitPipe } from '../pipes/unit.pipe';
import { IonicModule } from '@ionic/angular';

import { MedicionesPageRoutingModule } from './mediciones-routing.module';

import { MedicionesPage } from './mediciones.page';
import { SharedPipeModuleModule } from '../shared-pipe-module/shared-pipe-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionesPageRoutingModule,
    SharedPipeModuleModule,
  ],
  declarations: [MedicionesPage]
})
export class MedicionesPageModule {}
