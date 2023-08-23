import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/boost')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
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
  //230408 START
  str1: string;
  str2: string;
  str3: string;
  str4: string;
  str_name: string;
  str_eje: string;
  //230408 STOP
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  datagraf2: Array<Array<number>> = new Array<Array<number>>();
  datagraf3: Array<Array<number>> = new Array<Array<number>>();
  datagraf4: Array<Array<number>> = new Array<Array<number>>();
  btnGraficoDis: boolean;
  public mygraph;
  public graphOptions;
  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {

  this.btnGraficoDis=false; //Arranco mostrando los botones

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.data=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('this.data is = ' + this.data);

     //230408 START
     if(this.data === '1')
     {
      this.str1='TK ECUx10';
      this.str2='TK MIXx10';
      this.str3='FLOW ECU';
      this.str4='O2 Disuelto';

      this.str_name='Lectura de variables de Efluentes';
      this.str_eje='Valor adimensional';
     }
     else{
      this.str1='Cartucho';
      this.str2='Filtro';
      this.str3='act_ev1';
      this.str4='act_ev3';

      this.str_name='Diferencial de presión TEPELCO';
      this.str_eje='Diferencial de presión [Pa]';
     }
     //230408 STOP
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

  clearTepelcoLogs()
  {
      this.regenerarGrafico();
      this.updateChartTepelco();
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

      this.datagraf2[i]=[this.datagraf[i][0],Number(this.logs[i].dp_filtro)];
      this.datagraf3[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev1)];
      this.datagraf4[i]=[this.datagraf[i][0],Number(this.logs[i].ciclo_ev3)];

   }
   console.log(this.datagraf);
   this.updateChartTepelco();
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
  this.logs=[[0,0]];
}

generarGraficoTepelco(){
  this.graphOptions={
    chart: {
      zoomType: 'x'
    },
    title: {
      text: this.str_name
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Medido en relacion a los Pa' : 'Pinch the chart to zoom in'
    },
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
      }
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
}



