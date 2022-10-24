import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import { Medida } from '../model/Medida';

import * as Highcharts from 'highcharts';

require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/timeline')(Highcharts);

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  idDispositivo: string;
  mediciones: Array<Medida> = new Array<Medida>();
  dbStatus: boolean;
  datagraf: any;
  dataproc: Array<Array<number>> = new Array<Array<number>>();
  public myChart;
  private chartOptions;

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
          // console.log(this.mediciones);
      }
     catch (error)
     {
      this.dbStatus=false;
      console.log(error);
     }
}


ionViewDidEnter() {
  this.mostrargrafico();
  this.convertirDatos();
  setTimeout(()=>{
    this.updateChart();
  },1000);
}

convertirDatos(){

  const a = this.mediciones.length;
  for( let i = 0; i < a; i ++)
  {
     this.dataproc[i]=[Date.UTC(Number(this.mediciones[i].fecha.substring(0,4)),
                                Number(this.mediciones[i].fecha.substring(5,7)),
                                Number(this.mediciones[i].fecha.substring(8,10)),
                                Number(this.mediciones[i].fecha.substring(11,13)),
                                Number(this.mediciones[i].fecha.substring(14,16)),
                                Number(this.mediciones[i].fecha.substring(17,19))),
                                Number(this.mediciones[i].valor)];
   }
}

updateChart(){
  this.myChart.update({
    series: [{
      type: 'area',
      name: 'kPA',
      data: this.dataproc
    }]
});
}

mostrargrafico(){
                          this.chartOptions={
                            chart: {
                              zoomType: 'x'
                            },
                            title: {
                              text: 'Nivel de humedad del suelo'
                            },
                            subtitle: {
                              text: document.ontouchstart === undefined ?
                                'Medido en relacion a los kPA' : 'Pinch the chart to zoom in'
                            },
                            xAxis: {
                              type: 'datetime'
                            },
                            yAxis: {
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
                              data: this.dataproc
                            }]
                          };
                          this.myChart = Highcharts.chart('container', this.chartOptions );
                        }
        }


