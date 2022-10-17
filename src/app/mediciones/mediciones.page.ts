import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import { Medida } from '../model/Medida';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  idDispositivo: string;
  mediciones: Array<Medida> = new Array<Medida>();
  dbStatus: boolean;
  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {
    this.dbStatus=true;
    this.obtenerMediciones();
  }

  ngOnInit() {
  }
  async obtenerMediciones()
  {

   this.idDispositivo=this.activatedRoute.snapshot.paramMap.get('id');

   try{

          this.mediciones = await this.conndb.getMediciones(this.idDispositivo);

      }
     catch (error)
     {
      this.dbStatus=false;
     }
}
}
