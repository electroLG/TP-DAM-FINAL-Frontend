/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { Dispositivo } from '../model/Dispositivo';
import { NavparamService } from '../services/navparam.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivo: Array<Dispositivo>;
  dbStatus: boolean;
  idDis: any;
  constructor(public conndb: ApiConnService,
              private navparamService: NavparamService) {
                                              this.dbStatus=true;
                                              this.callApi();
                                              }


 // eslint-disable-next-line no-trailing-spaces

  async callApi(){
    try{
      this.listadoDispositivo = await this.conndb.getDispositivos();
      console.log('DEBUG-home.page.ts  this.conndb.getDispositivos()');
      console.log(this.listadoDispositivo);
    }
     catch(error){
      this.dbStatus=false;
     }
    }
    getId(id){
      this.idDis=id;
      console.log("getId = " + id );
      //this.navparamService.setNavData(id);
      sessionStorage.setItem("myId",this.idDis);
      console.log('this.data is my iD= ' + this.idDis);
    }

   ngOnInit(){

    }
}

