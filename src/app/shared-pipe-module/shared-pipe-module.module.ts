import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitPipe } from '../pipes/unit.pipe';
import { FechaPipe } from '../pipes/fecha.pipe';
import { AperturaPipe } from '../pipes/apertura.pipe';


@NgModule({
  declarations: [UnitPipe,FechaPipe,AperturaPipe],
  imports: [
    CommonModule
  ],
  exports:[UnitPipe,FechaPipe,AperturaPipe],
})
export class SharedPipeModuleModule { }
