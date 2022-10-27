/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
import { Medida } from '../model/Medida';
import { Log } from '../model/Log';

@Injectable({
  providedIn: 'root'
})
export class ApiConnService {

  dispositivo:  Promise<Dispositivo>;
  dispositivos: Promise<Array<Dispositivo>>;
  medicion: Promise<Medida>;
  mediciones: Promise<Array<Medida>>;
  logs: Promise<Array<Log>>;
  logEv: Promise<Log>;
  postId: any;

  constructor(private _http: HttpClient) {}

  getDispositivo(id): Promise<Dispositivo> {

    this.dispositivo = this._http.get<Dispositivo>('http://localhost:8000/api/dispositivo/'+ id).toPromise();
    return this.dispositivo;
  }
  getDispositivos(): Promise<Array<Dispositivo>> {

    this.dispositivos = this._http.get<Array<Dispositivo>>('http://localhost:8000/api/dispositivo/').toPromise();
    return this.dispositivos;
  }

  getUltimaMedicion(id): Promise<Medida>  {
    this.medicion = this._http.get<Medida>('http://localhost:8000/api/medicion/' + id).toPromise();
    return this.medicion;
   }

   getMediciones(id): Promise<Array<Medida>> {
    this.mediciones = this._http.get<Array<Medida>> ('http://localhost:8000/api/medicion/' + id +'/todas/').toPromise();
    return this.mediciones;
   }

   getLogsRiego(id): Promise<Array<Log>> {
    this.logs = this._http.get<Array<Log>> ('http://localhost:8000/api/logRiego/' + id).toPromise();
    return this.logs;
   }

   getLogsRiegoEv(id): Promise<Log> {
    this.logEv = this._http.get<Log> ('http://localhost:8000/api/logRiego/' + id + '/estado').toPromise();
    return this.logEv;
   }
   postLogRiego(estadoEv,fechadate,ev): Promise<any> {
    const body ={'apertura': estadoEv,'fecha': fechadate ,'electrovalvulaId':ev};
    return this._http.post<any>('http://localhost:8000/api/logRiego/add',body).toPromise();
  }
  postMedicion(fechadate,valorMed,dispId): Promise<any> {
    const body ={'fecha': fechadate,'valor': valorMed,'dispositivoId':dispId};
    return this._http.post<any>('http://localhost:8000/api/medicion/add',body).toPromise();
  }
  //Intentos de conexión a la Base de Batos //

  getTepelcoLogs(): Promise<any> {
    return this._http.get<any>('http://192.168.0.91:8000/graf/todos').toPromise();
  }

  getTepelcoLogsSemana(): Promise<any> {
    return this._http.get<any>('http://192.168.0.91:8000/graf/semana').toPromise();
  }
  getTepelcoLogsDia(): Promise<any> {
    return this._http.get<any>('http://192.168.0.91:8000/graf/dia').toPromise();
  }
}
