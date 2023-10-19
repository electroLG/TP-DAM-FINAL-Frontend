import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { NavparamService } from '../services/navparam.service';
//230823
import { DatetimeCustomEvent, IonDatetime, IonicModule } from '@ionic/angular';
import { IO } from '../model/IO';
import { Dispositivo } from '../model/Dispositivo';
//230823
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/data')(Highcharts);
//require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/boost')(Highcharts);
//require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/series-label')(Highcharts);


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  logs: any;
  data: any;
  //230823
  fechaDesde: any;
  fechaHasta: any;
  fecha: string;
  dbStatus:boolean;
  disConfig:Array<IO>;
  dispositivo: Dispositivo = new Dispositivo('0','nombre','ubicacion','marca','modelo','0','0');
  //230823
  //230408 START
  str1: string;
  str2: string;
  str3: string;
  str4: string;
  str5: string;
  str6: string;
  str7: string;
  str8: string;
  str_name: string;
  str_eje: string;
  //230408 STOP
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  datagraf2: Array<Array<number>> = new Array<Array<number>>();
  datagraf3: Array<Array<number>> = new Array<Array<number>>();
  datagraf4: Array<Array<number>> = new Array<Array<number>>();
  datagraf5: Array<Array<number>> = new Array<Array<number>>();
  datagraf6: Array<Array<number>> = new Array<Array<number>>();
  datagraf7: Array<Array<number>> = new Array<Array<number>>();
  datagraf8: Array<Array<number>> = new Array<Array<number>>();
  btnGraficoDis: boolean;
  public mygraph;
  public graphOptions;
  constructor(public conndb: ApiConnService,
              private navParamService:NavparamService,
              private activatedRoute: ActivatedRoute) {

  this.btnGraficoDis=false;                                        //Arranco mostrando los botones


  //this.data=this.activatedRoute.snapshot.paramMap.get('id');       //Obtengo el sensor con el id
        console.log('Constructor graph');
        console.log('this.data is 1 = ' + this.data);
        //Acá leemos el dato posta
        //this.data=this.navParamService.getNavData();
        //console.log('this.data is 2= ' + this.data);
        if(!this.data)
        {
          this.data=sessionStorage.getItem("myId");
          console.log('this.data is 3= ' + this.data);
        }else
          {
            sessionStorage.setItem("myId",this.data);
            console.log('this.data is 4= ' + this.data);
          }
        //this.datosDispositivo();                                         //Traigo de la base los datos del sensor
        console.log('constructor this.data is = ' + this.data);

        console.log('this.data is = ' + this.data);

        this.graphSeries();

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter graph');
    //this.data=this.activatedRoute.snapshot.paramMap.get('id');
    // console.log('this.data is = ' + this.data);
     this.generarGraficoTepelco();
  }
  ionViewWillEnter() {
  }

  async mostrarTepelcoLogs()
  {
      this.regenerarGrafico();
      this.logs=await this.conndb.getTepelcoLogs(this.data);
      this.convertirDatos();
  }
  async mostrarTepelcoLogsSemana()
  {
      this.regenerarGrafico();
      this.logs=await this.conndb.getTepelcoLogsSemana(this.data);
      this.convertirDatos();
  }
    async mostrarTepelcoLogsDia()
  {
      this.regenerarGrafico();
      this.logs=await this.conndb.getTepelcoLogsDia(this.data);
      this.convertirDatos();
  }
    async mostrarTepelcoLogs2h()
  {
      this.regenerarGrafico();
      this.logs=await this.conndb.getTepelcoLogs2h(this.data);
      this.convertirDatos();
  }
  clearTepelcoLogs()
  {
      this.regenerarGrafico();
      this.updateChartTepelco();
  }
  //230823
  async mostrarIntervalo()
  {
    if(this.check_DATE())
    {
      try{
        this.regenerarGrafico();
        this.logs=await this.conndb.getIntervalo(this.data,this.fechaDesde,this.fechaHasta);
        this.convertirDatos();
        }
        catch(error)
        {
          this.dbStatus=false;
        }
    }
  }
  //230823
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

      this.datagraf2[i]=[this.datagraf[i][0],Number(this.logs[i].dp_filtro)];
      this.datagraf3[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev1)];
      this.datagraf4[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev3)];
      this.datagraf5[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev5)];
      this.datagraf6[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev8)];
      this.datagraf7[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev2)];
      this.datagraf8[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev4)];

   }
   console.log(this.datagraf);
   console.log("Ahora voy a entrar al update");
   this.updateChartTepelco();
   console.log("Sali update");
}

updateChartTepelco(){

  this.mygraph.update({
   series: [{
      //type: 'area',
      data: this.datagraf,
      name: this.str1 || ''  //name: 'Cartucho'
    },
    {
      //type: 'area',
      data: this.datagraf2,
      name: this.str2 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf3,
      name: this.str3 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf4,
      name: this.str4 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf5,
      name: this.str5 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf6,
      name: this.str6 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf7,
      name: this.str7 || '' //name: 'Filtro'
    },
    {
      //type: 'area',
      data: this.datagraf8,
      name: this.str8 || '' //name: 'Filtro'
    }
  ]
});
this.btnGraficoDis=false;
}

regenerarGrafico(){
  this.btnGraficoDis=true;
  this.mygraph.destroy();
  this.generarGraficoTepelco();
  this.datagraf=[[0,0]];
  this.datagraf2=[[0,0]];
  this.datagraf3=[[0,0]];
  this.datagraf4=[[0,0]];
  this.datagraf5=[[0,0]];
  this.datagraf6=[[0,0]];
  this.datagraf7=[[0,0]];
  this.datagraf8=[[0,0]];
  this.logs=[[0,0]];
}

generarGraficoTepelco(){
  this.graphOptions={
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: this.str_name
    },
   /* subtitle: {
      text: document.ontouchstart === undefined ?
        'Medido en relacion a los Pa' : 'Pinch the chart to zoom in'
    },*/
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      crosshair: true,
      title: {
        text: 'Timestamp'
      }
    },
    yAxis: {
      crosshair: true,
      title: {
        text: this.str_eje
      }
    },
    legend: {
      enabled: true
    },
    accessibility: {
      screenReaderSection: {
        // eslint-disable-next-line max-len
        beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
      }
    },
    tooltip: {
      valueDecimals: 2
    },
    series: [{
      //type: 'area',
      name: this.str1, //name: 'Cartucho',
      data: this.datagraf
      },
      {
        //type: 'area',
        name: this.str2, //name: 'Filtro',
        data: this.datagraf2
      }, //nuevo
      {
        //type: 'area',
        name: this.str3, //name: 'Caudal',
        data: this.datagraf3
      }, //nuevo
      {
        //type: 'area',
        name: this.str4, //name: 'Caudal',
        data: this.datagraf4
      }, //nuevo
      {
        //type: 'area',
        name: this.str5, //name: 'Caudal',
        data: this.datagraf5
      }, //nuevo
      {
        //type: 'area',
        name: this.str6, //name: 'Caudal',
        data: this.datagraf6
      }, //nuevo
      {
        //type: 'area',
        name: this.str7, //name: 'Caudal',
        data: this.datagraf7
      }, //nuevo
      {
        //type: 'area',
        name: this.str8, //name: 'Caudal',
        data: this.datagraf8      }
            ]
  };
  this.mygraph = Highcharts.chart('container3', this.graphOptions );
  Highcharts.setOptions({
    lang: {
        months: [
            'Enero', 'Febrero', 'Marzo', 'Abril',
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        weekdays: [
            'Domingo', 'Lunes', 'Martes', 'Miercoles',
            'Jueves', 'Viernes', 'Sabado'
        ]
    }
  });
}
//230823
test() //flag
  {
    this.fecha=this.fechaDesde;
    console.log("hola");
  }
  check_DATE()
  {
    let desde: number;
    let hasta: number;
    if(this.fechaDesde != null)
    {
      let yearDesde=Number(<string>(this.fechaDesde).substring(0,4));
      let monthDesde=Number(<string>(this.fechaDesde).substring(5,7));
      let dayDesde=Number(<string>(this.fechaDesde).substring(8,10));
      let hsDesde=Number(<string>(this.fechaDesde).substring(11,13));
      let minDesde=Number(<string>(this.fechaDesde).substring(14,16));
      let segDesde=Number(<string>(this.fechaDesde).substring(17,19));
      console.log(yearDesde+" "+ monthDesde+" "+ dayDesde+" "+hsDesde+" "+ minDesde+" "+ segDesde);
      desde=Date.UTC(yearDesde,monthDesde,dayDesde,hsDesde,minDesde,segDesde);
      console.log(desde);
    }else{
      console.log("No se ha ingresado Fecha Desde");
      alert("No se ha ingresado Fecha Desde");
      return (false);
    }
    if(this.fechaHasta != null)
    {
      let yearHasta=Number(<string>(this.fechaHasta).substring(0,4));
      let monthHasta=Number(<string>(this.fechaHasta).substring(5,7));
      let dayHasta=Number(<string>(this.fechaHasta).substring(8,10));
      let hsHasta=Number(<string>(this.fechaHasta).substring(11,13));
      let minHasta=Number(<string>(this.fechaHasta).substring(14,16));
      let segHasta=Number(<string>(this.fechaHasta).substring(17,19));
      console.log(yearHasta+" "+ monthHasta+" "+ dayHasta+" "+hsHasta+" "+ minHasta+" "+ segHasta);
      hasta=Date.UTC(yearHasta,monthHasta,dayHasta,hsHasta,minHasta,segHasta);
      console.log("hasta=",hasta);
    }else{
      console.log("No se ha ingresado Fecha Hasta");
      alert("No se ha ingresado Fecha Hasta");
      return (false);
    }
    if(hasta>desde)
    {
      if((hasta-desde)<<15768000000)
        {
          console.log(hasta-desde);
          return(true);
        }
        else{
          console.log(hasta-desde);
          alert("Especifique un intervalo menor a 6 meses")
          return(false);
        }

    }
    else{
      alert("La fecha final debe ser posterior a la inicial");
      return(false);
      }
  }
async graphSeries()
{
  this.dispositivo = await this.conndb.getDispositivo(this.data);
  this.disConfig=JSON.parse(String(this.dispositivo.ch_config));
  console.log("this.disConfig");
  console.log(this.disConfig);
  this.str1=this.disConfig[0].nombre;
  this.str2=this.disConfig[1].nombre;
  this.str3=this.disConfig[2].nombre;
  this.str4=this.disConfig[4].nombre;
  this.str5=this.disConfig[6].nombre;
  this.str6=this.disConfig[9].nombre;
  this.str7=this.disConfig[3].nombre;
  this.str8=this.disConfig[5].nombre;

}

  onIonChange(ev: Event) {

    console.log(ev.target);
    console.log((ev.target as Element).id);

    if((ev.target as Element).id=="datetime")
    {
      console.log("Fecha desde");
      this.fechaDesde = (ev as DatetimeCustomEvent).detail.value;

    }
    if((ev.target as Element).id=="datetime2")
    {
      console.log("Fecha hasta");
      this.fechaHasta = (ev as DatetimeCustomEvent).detail.value;
    }

  }
}






