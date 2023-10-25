import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AperturaPipe } from '../pipes/apertura.pipe';
import { FechaPipe } from '../pipes/fecha.pipe';
import { IonicModule } from '@ionic/angular';

import { LogsRiegoPageRoutingModule } from './logs-riego-routing.module';

import { LogsRiegoPage } from './logs-riego.page';
import { SharedPipeModuleModule } from '../shared-pipe-module/shared-pipe-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPipeModuleModule,
    LogsRiegoPageRoutingModule
  ],
  declarations: [LogsRiegoPage]
})
export class LogsRiegoPageModule {}
