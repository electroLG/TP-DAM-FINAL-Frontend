import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AperturaPipe } from '../pipes/apertura.pipe';
import { FechaPipe } from '../pipes/fecha.pipe';
import { IonicModule } from '@ionic/angular';

import { LogsRiegoPageRoutingModule } from './logs-riego-routing.module';

import { LogsRiegoPage } from './logs-riego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    LogsRiegoPageRoutingModule
  ],
  declarations: [LogsRiegoPage,AperturaPipe,FechaPipe]
})
export class LogsRiegoPageModule {}
