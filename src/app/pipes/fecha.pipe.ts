import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  fecha: string;
  transform(value: string): string {

    this.fecha=value.substring(0,10) +' '+ value.substring(11,19);

    return this.fecha;
  }

}
