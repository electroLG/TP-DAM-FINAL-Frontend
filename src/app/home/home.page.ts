/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivo: Array<Dispositivo>;
  dbStatus: boolean;
  constructor(public conndb: ApiConnService) {
                                              this.dbStatus=true;
                                              this.callApi();
                                              }


 // eslint-disable-next-line no-trailing-spaces

  async callApi(){
    try{
      this.listadoDispositivo = await this.conndb.getDispositivos();
    }
     catch(error){
      this.dbStatus=false;
     }
    }
   ngOnInit(){

    }
}

