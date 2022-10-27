import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  logs: any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  public mygraph;
  public graphOptions;
  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
     this.generarGraficoTepelco();
    //  this.updateChartTepelco();
    // setTimeout(()=>{
    //    this.updateChartTepelco();
    //  },1000);
  }
  ionViewWillEnter() {
  }

  async mostrarTepelcoLogs()
  {
      this.logs=await this.conndb.getTepelcoLogs();
      console.log(this.logs);
      this.convertirDatos();
  }
  async mostrarTepelcoLogsSemana()
  {
      this.logs=await this.conndb.getTepelcoLogsSemana();
      console.log(this.logs);
      this.convertirDatos();
  }
    async mostrarTepelcoLogsDia()
  {
      this.logs=await this.conndb.getTepelcoLogsDia();
      console.log(this.logs);
      this.convertirDatos();
  }

  clearTepelcoLogs()
  {
      this.datagraf=[[0,0]];
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
   }
   console.log(this.datagraf);
   this.updateChartTepelco();
}

updateChartTepelco(){
  this.mygraph.update({
    series: [{
      type: 'area',
      name: 'kPA',
      data: this.datagraf
    }]
});
}

generarGraficoTepelco(){
  this.graphOptions={
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
  this.mygraph = Highcharts.chart('container3', this.graphOptions );
}
}
