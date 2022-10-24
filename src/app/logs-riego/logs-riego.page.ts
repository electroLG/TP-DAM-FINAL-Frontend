import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import { Log } from '../model/Log';
import { LogsRiegoPageModule } from './logs-riego.module';


@Component({
  selector: 'app-logs-riego',
  templateUrl: './logs-riego.page.html',
  styleUrls: ['./logs-riego.page.scss'],
})
export class LogsRiegoPage implements OnInit {



  idElectrovalvula: string;
  logs: Array<Log> = new Array<Log>();
  dbStatus: boolean;

  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {
  this.dbStatus=true;
  this.obtenerLogsRiego();
}

  ngOnInit() {
  }

  async obtenerLogsRiego()
  {
   this.idElectrovalvula=this.activatedRoute.snapshot.paramMap.get('id');

   try{

          this.logs = await this.conndb.getLogsRiego(this.idElectrovalvula);

     }
     catch (error)
     {
      this.dbStatus=false;
     }
    //  this.mostrargrafico();
    }
}
