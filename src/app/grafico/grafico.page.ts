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

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  logs: any;
  datagraf: Array<Array<number>> = new Array<Array<number>>();
  datagraf2: Array<Array<number>> = new Array<Array<number>>();
  btnGraficoDis: boolean;
  public mygraph;
  public graphOptions;
  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {

  this.btnGraficoDis=false; //Arranco mostrando los botones

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
     this.generarGraficoTepelco();

  }
  ionViewWillEnter() {
  }

  async mostrarTepelcoLogs()
  {
      this.regenerarGrafico();
      //console.log('Pido datos historicos');
      this.logs=await this.conndb.getTepelcoLogs();
      //console.log('Llegaron datos historicos');
      //console.log(this.logs);
      this.convertirDatos();
  }
  async mostrarTepelcoLogsSemana()
  {
      this.regenerarGrafico();
      //console.log('Pido datos de la semana');
      this.logs=await this.conndb.getTepelcoLogsSemana();
      //console.log('Llegaron datos de la semana');
      //console.log(this.logs);
      this.convertirDatos();
  }
    async mostrarTepelcoLogsDia()
  {
      this.regenerarGrafico();
      //console.log('Pido datos del día');
      this.logs=await this.conndb.getTepelcoLogsDia();
      //console.log('Llegaron datos del día');
      //console.log(this.logs);
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

    // this.datagraf2[i]=[Date.UTC(Number(this.logs[i].fecha.substring(0,4)),
    //                             Number(this.logs[i].fecha.substring(5,7))-1,
    //                             Number(this.logs[i].fecha.substring(8,10)),
    //                             Number(this.logs[i].fecha.substring(11,13)),
    //                             Number(this.logs[i].fecha.substring(14,16)),
    //                             Number(this.logs[i].fecha.substring(17,19))),
    //                             Number(this.logs[i].dp_filtro)];

      this.datagraf2[i]=[this.datagraf[i][0],Number(this.logs[i].dp_filtro)];

   }
   console.log(this.datagraf);
   this.updateChartTepelco();
}

updateChartTepelco(){

  this.mygraph.update({
   series: [{
      //type: 'area',
      data: this.datagraf,
      name: "Cartucho"
    },
    {
      //type: 'area',
      data: this.datagraf2,
      name: "Filtro"
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
      text: 'Diferencial de presión TEPELCO'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Medido en relacion a los kPA' : 'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime',
      crosshair: true,
      title: {
        text: 'Timestamp'
      }
    },
    yAxis: {
      crosshair: true,
      title: {
        text: 'Diferencial de presión [kPa]'
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
      //type: 'area',
      data: this.datagraf,
      name: "Cartucho"
    },
    {
      //type: 'area',
      data: this.datagraf2,
      name: "Filtro"
    }
  ]
  };
  this.mygraph = Highcharts.chart('container3', this.graphOptions );
}
}
