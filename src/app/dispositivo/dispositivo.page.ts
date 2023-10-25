
import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { TimestampService } from '../services/timestamp.service';
import { Dispositivo } from '../model/Dispositivo';
import { ActivatedRoute } from '@angular/router';
import { data } from '../model/data';
import { Medida } from '../model/Medida';
import { Log } from '../model/Log';
import { json } from 'express';
import { time } from 'console';
import { threadId } from 'worker_threads';
import { Observable} from 'rxjs';
import { interval} from 'rxjs';
import { IO } from '../model/IO';



@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage  {
  string1: string;
  string2: string;
  string3: string;
  string4: string;
  datos: Array<data>;
  data: string;
  device: boolean;
  onetime: boolean;
  med: any; // Medida = new Medida('0','0','0','0');
  dpFiltro: any;
  dpCartucho: any;
  activaciones: any;
  dispositivo: Dispositivo = new Dispositivo('0','nombre','ubicacion','marca','modelo','0','0');
  disConfig: Array<IO>;
  disConfig2: Array<IO>=new Array<IO>();
  fecha: string;
  nombre: string;
  ubicacion: string;
  tipo: string;
  dbStatus: boolean;
  dbPostStatus: boolean;
  logs:any;
  subscription: any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  dataDev: Array<string>;
  otherData: Array<JSON>;
  btnGraficoDis: boolean;

  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute, public now: TimestampService) {

    this.btnGraficoDis=false;
    this.dbStatus=true;
    this.dbPostStatus=true;
    this.onetime=true;
    this.data=sessionStorage.getItem("myId");
    console.log('this.data is 3= ' + this.data);
    this.obtenerDatos();
   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = interval(5000).subscribe(x => {  this.obtenerDatos();});//4000

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
              let myStr=JSON.stringify(this.med);
              this.dataDev =JSON.parse('[' + myStr.replace(/,/g, '},{') + ']');
              this.dpCartucho=this.med.dp_cartucho;
              this.dpFiltro=this.med.dp_filtro;
              this.activaciones=this.med.ciclo_ev1;
              this.string2="";
              for(let i=1;i<this.dataDev.length;i++)
                  {
                          this.string1=JSON.stringify(this.dataDev[i]);
                          let inicio=this.string1.search('{');
                          let final=this.string1.search(':');
                          let c=inicio;
                              while(c<=final)
                              {
                                this.string1=this.string1.replace(this.string1[c],"");
                                final--;
                              }
                          this.string1=this.string1.replace(" ","");
                          let a=this.string2.concat('{"id":',this.string1);
                          this.string2=a;
                          this.string2=this.string2.replace(/}{/g,'},{');
                  }
            this.string3='['+this.string2+']';
            this.datos=JSON.parse(this.string3);
            console.log("this.datos");
            console.log(this.datos);
//--------------------------------------------------------------------------------------------------------

            this.dispositivo = await this.conndb.getDispositivo(this.data);
            this.nombre=this.dispositivo.nombre;
            this.ubicacion=this.dispositivo.ubicacion;
            this.tipo=this.dispositivo.tipo;
            this.disConfig=JSON.parse(String(this.dispositivo.ch_config));
            console.log("this.disConfig");
            console.log(this.disConfig);
            let lng=this.disConfig2.length;
            console.log("longitud de this.disConfig2.length" );
            for(let i=0;i<lng;i++)
            {
             this.disConfig2.pop();
            }
            console.log("la longitud dsd del for de this.cfgcanal2 es " + this.disConfig2.length);
            console.log("this.datos");
            console.log(this.datos);


            var j=0;
            let lng2=this.disConfig.length;
            for(let i=0;i<lng2;i++)
            {

              if (this.disConfig[i].habilitado)
               {
                 this.disConfig2.push(this.disConfig[i]);   //this.cfgcanal[i];

               }
               if (!this.disConfig[i].habilitado)
               {
                 console.log(this.datos[i]);
                 this.datos.splice(i-j,1);
                 j++;
               }
             }
            console.log(this.disConfig2);
            console.log("this.datos");
            console.log(this.datos);
            console.log("this.dataDev");
            console.log(this.dataDev);
            console.log("this.disConfig");
            console.log(this.disConfig);


//----------------------------------------------------------------------------------------------
            // this.dispositivo = await this.conndb.getDispositivo(this.data);
            // console.log(this.dispositivo);
            // this.nombre=this.dispositivo.nombre;
            // this.tipo=this.dispositivo.tipo;
            // console.log("this.dispositivo io = " + this.dispositivo.ch_config);
            // this.disConfig=JSON.parse(String(this.dispositivo.ch_config));
            // console.log(this.disConfig);

            this.onetime=false;

        }
          catch (error)
        {
            this.dbStatus=false;
          }
   }

  //  async obtenerDatos()
  //  {
  //   try{

  //           this.med=await this.conndb.getTepelcoLogsLast(this.data);
  //           this.med2=JSON.stringify(this.med);
  //           this.medObj=JSON.parse('[' + this.med2.replace(/,/g, '},{') + ']');
  //           console.log(this.medObj.length);
  //           this.string2="";
  //           this.string3='[';
  //           for(let i=2;i<this.medObj.length;i++)
  //               {
  //                       this.string1=JSON.stringify(this.medObj[i]);
  //                       let inicio=this.string1.search('{');
  //                       let final=this.string1.search(':');
  //                       let c=inicio;
  //                           while(c<=final)
  //                           {
  //                             this.string1=this.string1.replace(this.string1[c],"");
  //                             final--;
  //                           }
  //                       this.string1=this.string1.replace("","");
  //                       let a=this.string2.concat('{"id":',this.string1);
  //                       this.string2=a;
  //                       this.string2=this.string2.replace(/}{/g, '},{');
  //               }
  //           this.string3='['+this.string2+']';
  //           this.datos=JSON.parse(this.string3);


  //          this.dispositivo = await this.conndb.getDispositivo(this.data);
  //          this.cfgcanal=JSON.parse(String(this.dispositivo.cfg));
  //          let lng=this.cfgcanal2.length;
  //          for(let i=0;i<lng;i++)
  //          {
  //           this.cfgcanal2.pop();
  //          }
  //          console.log("la longitud dsd del for de this.cfgcanal2 es " + this.cfgcanal2.length);
  //          console.log("this.datos");
  //          console.log(this.datos);


  //          var j=0;
  //          let lng2=this.cfgcanal.length;
  //          for(let i=0;i<lng2;i++)
  //          {

  //            if (this.cfgcanal[i].habilitado)
  //             {
  //               this.cfgcanal2.push(this.cfgcanal[i]);   //this.cfgcanal[i];

  //             }
  //             if (!this.cfgcanal[i].habilitado)
  //             {
  //               console.log(this.datos[i]);
  //               this.datos.splice(i-j,1);
  //               j++;
  //             }
  //           }
  //          console.log(this.cfgcanal2);
  //          console.log("this.datos");
  //          console.log(this.datos);
  //          console.log("this.medObj");
  //          console.log(this.medObj);
  //          console.log("this.cfgcanal");
  //          console.log(this.cfgcanal);

  //          this.temperatura=(this.med.temperatura );
  //          this.humedad=this.med.humedad;
  //          this.presion=this.med.presion;
  //          this.canal1=this.med.canal1;
  //          this.canal2=this.med.canal2;
  //          this.timestamp=this.med.timestamp;
  //          this.nombre=this.dispositivo.nombre;
  //          this.ubicacion=this.dispositivo.ubicacion;
  //          this.servicio=this.dispositivo.servicio;
  //          this.sampling=this.dispositivo.sampling;
  //          this.topico=this.dispositivo.topicoServ;
  //          this.convertirDatos();
  //    }
  //    catch (error)
  //     {
  //       this.dbStatus=false;
  //       console.log('error');
  //     }

  //     this.dataReady=true;    //Dibujo página luego de consultar los datos
  //     console.log("dataReady");
  //    }



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


