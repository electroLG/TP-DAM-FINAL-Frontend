import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { ApiConnService } from '../services/api-conn.service';
import { Medida } from '../model/Medida';
import { Dispositivo } from '../model/Dispositivo';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {

  private valorObtenido:number=0;
  public myChart;
  private chartOptions;
  public dispositivoId;
  public dispositivo:Dispositivo;
  public medicion:Medida=new Medida('0','0','0','0');


  constructor(private activatedRoute: ActivatedRoute,public conndb: ApiConnService) {

    this.dispositivoId=this.activatedRoute.snapshot.paramMap.get('id');
    this.buscardato();
    // setTimeout(()=>{
    //   console.log("Cambio el valor del sensor");
    //   this.valorObtenido=60;
    //   //llamo al update del chart para refrescar y mostrar el nuevo valor
    //   this.myChart.update({series: [{
    //       name: 'kPA',
    //       data: [this.valorObtenido],
    //       tooltip: {
    //           valueSuffix: ' kPA'
    //       }
    //   }]});
    // },6000);
  }

*
  ngOnInit() {

  }

  ionViewDidEnter() {
    this.generarChart();
  }

  ionViewWillEnter() {
  //this.buscardato();
  }



 async buscardato() {
 this.medicion= await this.conndb.getUltimaMedicion(this.dispositivoId);
 console.log(this.medicion);
 this.updateChart();
 }

 updateChart(){
  this.myChart.update({series: [{
           name: 'kPA',
           data: [Number(this.medicion.valor)],
           tooltip: {
               valueSuffix: ' kPA'
           }
       }]});
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
          text: 'Sensor N° 1'
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
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}
