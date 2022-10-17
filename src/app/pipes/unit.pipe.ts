import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  unidad: string;
  transform(value: number): string {

    this.unidad = value + ' kPA';
    return this.unidad;
  }

}
