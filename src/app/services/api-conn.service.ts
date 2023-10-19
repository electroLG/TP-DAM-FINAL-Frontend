/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
import { Medida } from '../model/Medida';
import { Log } from '../model/Log';
import { Bitacora } from '../model/Bitacora';

@Injectable({
  providedIn: 'root'
})
export class ApiConnService {


  HOST='192.168.0.103';;//HOST="192.168.0.186";//HOST='192.168.0.103';
  PORT='8000';

  bitacora: Promise<Array<Bitacora>>;
  dispositivo:  Promise<Dispositivo>;
  dispositivos: Promise<Array<Dispositivo>>;
  medicion: Promise<Medida>;
  mediciones: Promise<Array<Medida>>;
  logs: Promise<Array<Log>>;
  logEv: Promise<Log>;
  postId: any;

  constructor(private _http: HttpClient) {}

  getDispositivo(id): Promise<Dispositivo> {

    this.dispositivo = this._http.get<Dispositivo>('http://'+this.HOST+':'+this.PORT+'/api/dispositivo/'+ id).toPromise();
    return this.dispositivo;
  }
  getDispositivos(): Promise<Array<Dispositivo>> {

    this.dispositivos = this._http.get<Array<Dispositivo>>('http://'+this.HOST+':'+this.PORT+'/api/dispositivo/').toPromise();
    return this.dispositivos;
  }

  getUltimaMedicion(id): Promise<Medida>  {
    this.medicion = this._http.get<Medida>('http://'+this.HOST+':'+this.PORT+'/api/medicion/' + id).toPromise();
    return this.medicion;
   }

   getMediciones(id): Promise<Array<Medida>> {
    this.mediciones = this._http.get<Array<Medida>> ('http://'+this.HOST+':'+this.PORT+'/api/medicion/' + id +'/todas/').toPromise();
    return this.mediciones;
   }

   getLogsRiego(id): Promise<Array<Log>> {
    this.logs = this._http.get<Array<Log>> ('http://'+this.HOST+':'+this.PORT+'/api/logRiego/' + id).toPromise();
    return this.logs;
   }

   getLogsRiegoEv(id): Promise<Log> {
    this.logEv = this._http.get<Log> ('http://'+this.HOST+':'+this.PORT+'/api/logRiego/' + id + '/estado').toPromise();
    return this.logEv;
   }
   postLogRiego(estadoEv,fechadate,ev): Promise<any> {
    const body ={'apertura': estadoEv,'fecha': fechadate ,'electrovalvulaId':ev};
    return this._http.post<any>('http://'+this.HOST+':'+this.PORT+'/api/logRiego/add',body).toPromise();
  }
  postMedicion(fechadate,valorMed,dispId): Promise<any> {
    const body ={'fecha': fechadate,'valor': valorMed,'dispositivoId':dispId};
    return this._http.post<any>('http://'+this.HOST+':'+this.PORT+'/api/medicion/add',body).toPromise();
  }
  //Intentos de conexión a la Base de Batos //

  getTepelcoLogs(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/todos/' + id).toPromise();
  }
  getTepelcoLogsSemana(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/semana/' + id).toPromise();
  }
  getTepelcoLogsDia(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/dia/' + id).toPromise();
  }
  getTepelcoLogs2h(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/hs/' + id).toPromise();
  }
  getTepelcoLogsLast(id): Promise<any> {
    console.log("Paso por getTepelcoLogsLast");
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/last/' + id).toPromise();
  }
  //230823
  getIntervalo(id,inicio,fin): Promise<any> {
    const body={'inicio':inicio,'fin':fin};
    return this._http.post<any>('http://'+this.HOST+':'+this.PORT+'/graf/intervalo/'+ id, body).toPromise();
  }
  postBitacora(titulo,contenido,usuario,idDis): Promise<any>{
    const body={'titulo':titulo,'contenido':contenido,'usuario':usuario,'idDis':idDis};
    return this._http.post('http://'+this.HOST+':'+this.PORT+'/bitacora/post/',body,{responseType: "text"}).toPromise();
  }
  getBitacora(id):Promise<Array<Bitacora>> {
    this.bitacora = this._http.get<Array<Bitacora>>('http://'+this.HOST+':'+this.PORT+'/bitacora/get/'+ id).toPromise();
    return this.bitacora;
  }
}
