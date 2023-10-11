
import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { TimestampService } from '../services/timestamp.service';
import { Dispositivo } from '../model/Dispositivo';
import { ActivatedRoute } from '@angular/router';

import { Medida } from '../model/Medida';
import { Log } from '../model/Log';
import { json } from 'express';
import { time } from 'console';
import { threadId } from 'worker_threads';
import { Observable} from 'rxjs';
import { interval} from 'rxjs';
import { IO } from '../model/IO';
import { StringDecoder } from 'string_decoder';


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage  {

  data: string;
  device: boolean;
  onetime: boolean;
  med: any; // Medida = new Medida('0','0','0','0');
  dpFiltro: any;
  dpCartucho: any;
  activaciones: any;
  dispositivo: Dispositivo = new Dispositivo('0','nombre','ubicacion','marca','modelo','0','0');
  disConfig: Array<IO>;
  fecha: string;
  nombre: string;
  tipo: string;
  dbStatus: boolean;
  dbPostStatus: boolean;
  logs:any;
  subscription: any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  dataDev: Array<string>;
  otherData: Array<JSON>;

  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute, public now: TimestampService) {

    this.dbStatus=true;
    this.dbPostStatus=true;
    this.onetime=true;
    this.data=localStorage.getItem("myId");
    console.log('this.data is 3= ' + this.data);
    this.obtenerDatos();
   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = interval(4000).subscribe(x => {  this.obtenerDatos();});//4000

  }
  ionViewDidLoad()
  {

  }
  ionViewWillEnter() {
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
  IonViewDidLeave(){
    console.log("Paso por IonViewDidLeave");
    this.subscription.unsubscribe();
  }

  ngOnDestroy(){
    console.log("Paso por OnDestroy");
    this.subscription.unsubscribe();
  }

   async obtenerDatos()
   {
    console.log("ENntro a obtener datos");
     // this.data=this.activatedRoute.snapshot.paramMap.get('id');
    if (this.data=== '1')
      {this.device=true;}
      else {this.device=false;}
    console.log('this.data is = ' + this.data);

    try{

           this.med =await this.conndb.getTepelcoLogsLast(this.data);
           console.log(JSON.stringify(this.med));
           let myStr=JSON.stringify(this.med);
           this.dataDev =JSON.parse('[' + myStr.replace(/,/g, '},{') + ']');
           console.log(this.dataDev );
           console.log(String(this.dataDev[3]));
           this.dpCartucho=this.med.dp_cartucho;
           this.dpFiltro=this.med.dp_filtro;
           this.activaciones=this.med.ciclo_ev1;

          //  if(this.onetime)
          //  {
            this.dispositivo = await this.conndb.getDispositivo(this.data);
           console.log(this.dispositivo);
           this.nombre=this.dispositivo.nombre;
           this.tipo=this.dispositivo.tipo;
           console.log("this.dispositivo io = " + this.dispositivo.ch_config);
           this.disConfig=JSON.parse(String(this.dispositivo.ch_config));
           console.log(this.disConfig);
          // }
           this.onetime=false;

     }
      catch (error)
     {
        this.dbStatus=false;
      }
   }

  async mostrarTepelcoLogs()
  {
      this.logs=await this.conndb.getTepelcoLogs(this.data);
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


