
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

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


// require('highcharts/modules/data')(Highcharts);
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts/modules/export-data')(Highcharts);
// require('highcharts/modules/accessibility')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage  {

  data: string;
  med: Medida = new Medida('0','0','0','0');
  medFunca: any;
  electrovalvula: any;
  estadoElectrovalvula: any;
  dispositivo: Dispositivo = new Dispositivo('0','nombre','ubicacion','0');
  evEstado: Log = new Log('0','0','0','0');
  respPostLR: any;
  fecha: string;
  datetime: string;
  nombre: string;
  dbStatus: boolean;
  dbPostStatus: boolean;
  logs:any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  private valorObtenido=0;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public myChart;
  public myChart2;
  private chartOptions;
  private chartOptions2;


  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute, public now: TimestampService) {
    this.dbStatus=true;
    this.dbPostStatus=true;
    this.obtenerDatos();
   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit() {

  }

  ionViewDidEnter() {
    this.generarChart();
    this.generarGraficoTepelco();
     setTimeout(()=>{
      this.updateChart();
    },1000);
  }
  ionViewWillEnter() {
  }
   async obtenerDatos()
   {

    this.data=this.activatedRoute.snapshot.paramMap.get('id');

    try{

           this.med = await this.conndb.getUltimaMedicion(this.data);
           this.medFunca = this.med.valor;
           this.dispositivo = await this.conndb.getDispositivo(this.data);
           this.electrovalvula=this.dispositivo.electrovalvulaId;
           this.nombre=this.dispositivo.nombre;
           this.evEstado = await this.conndb.getLogsRiegoEv(this.electrovalvula);
           this.estadoElectrovalvula=this.evEstado.apertura;
      }
      catch (error)
      {
        this.dbStatus=false;
      }
   }

  updateChart(){
    this.myChart.update({series: [{
             name: 'kPA',
             data: [Number(this.med.valor)],
             tooltip: {
                 valueSuffix: ' kPA'
             }
         }]});
  }
  async clickBtnTS(){
    try{

        this.estadoElectrovalvula=!this.estadoElectrovalvula;
        // eslint-disable-next-line max-len
        this.respPostLR=await this.conndb.postLogRiego(String(Number(this.estadoElectrovalvula)),this.now.getTimestamp(),String(this.electrovalvula));
        if(this.estadoElectrovalvula){
              this.med.valor=this.getRandomInt(50,70);} //this.med.valor=this.getRandomInt(1,49)
        else{
              this.med.valor=this.getRandomInt(50,70); //this.med.valor=this.getRandomInt(50,100);
        }
        this.updateChart();
        this.respPostLR=await this.conndb.postMedicion(this.now.getTimestamp(),String(Number(this.med.valor)),String(this.data));
        this.dbPostStatus=true;
        }catch(error){
          this.dbPostStatus=false;
     }
  }

  getRandomInt(min, max): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° '+ this.data
        }

        ,credits:{enabled:false}


        ,pane: {
            startAngle: -150,
            endAngle: 150
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,

    series: [{
        name: 'kPA',
        data: [Number(this.med.valor)],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
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
   this.updateChartTepelco();
}

updateChartTepelco(){
  this.myChart2.update({
    series: [{
      type: 'area',
      name: 'kPA',
      data: this.datagraf
    }]
});
}

generarGraficoTepelco(){
  this.chartOptions2={
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Diferencial de presión TEPELCO'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Medido en relacion a los kPA' : 'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime',
      crosshair: true
    },
    yAxis: {
      crosshair: true,
      title: {
        text: 'Diferencial de presión'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
      name: 'kPA',
      data: this.datagraf
    }]
  };
  this.myChart2 = Highcharts.chart('container2', this.chartOptions2 );
}
}


