
import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { TimestampService } from '../services/timestamp.service';
import { Dispositivo } from '../model/Dispositivo';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Medida } from '../model/Medida';
import { Log } from '../model/Log';
import { json } from 'express';
import { time } from 'console';
import { threadId } from 'worker_threads';
import { Observable} from 'rxjs';
import { interval} from 'rxjs';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage  {

  data: string;
  med: any; // Medida = new Medida('0','0','0','0');
  dpFiltro: any;
  dpCartucho: any;
  activaciones: any;
  dispositivo: Dispositivo = new Dispositivo('0','nombre','ubicacion','marca','modelo','0');
  fecha: string;
  nombre: string;
  tipo: string;
  dbStatus: boolean;
  dbPostStatus: boolean;
  logs:any;
  subscription: any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();

  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute, public now: TimestampService) {
    this.dbStatus=true;
    this.dbPostStatus=true;
    this.obtenerDatos();

   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = interval(4000).subscribe(x => {  this.obtenerDatos();});

  }
  ionViewDidLoad()
  {

  }
  ionViewWillEnter() {
  }

   async obtenerDatos()
   {

    this.data=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('this.data is = ' + this.data);

    try{

           this.med =await this.conndb.getTepelcoLogsLast();
           this.dpCartucho=this.med.dp_cartucho;
           this.dpFiltro=this.med.dp_filtro;
           this.activaciones=this.med.ciclo_ev1;
           this.dispositivo = await this.conndb.getDispositivo(this.data);
           console.log(this.dispositivo);
           this.nombre=this.dispositivo.nombre;
           this.tipo=this.dispositivo.tipo;

      }
      catch (error)
      {
        this.dbStatus=false;
      }
   }

  async mostrarTepelcoLogs()
  {
      this.logs=await this.conndb.getTepelcoLogs();
      console.log(this.logs);
      this.convertirDatos();
  }

convertirDatos(){

  const a = this.logs.length;
  for( let i = 0; i < a; i ++)
  {
     this.datagraf[i]=[Date.UTC(Number(this.logs[i].fecha.substring(0,4)),
                                Number(this.logs[i].fecha.substring(5,7))-1,
                                Number(this.logs[i].fecha.substring(8,10)),
                                Number(this.logs[i].fecha.substring(11,13)),
                                Number(this.logs[i].fecha.substring(14,16)),
                                Number(this.logs[i].fecha.substring(17,19))),
                                Number(this.logs[i].dp_cartucho)];
   }
   console.log(this.datagraf);
}
}


