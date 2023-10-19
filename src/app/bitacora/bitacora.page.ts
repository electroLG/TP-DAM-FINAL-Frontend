import { Component, OnInit,ViewChild } from '@angular/core';
import { DatetimeCustomEvent, IonDatetime, IonicModule } from '@ionic/angular';
import { interval } from 'rxjs';
import { ApiConnService } from '../services/api-conn.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Bitacora } from '../model/Bitacora';
import { FechaPipe } from '../pipes/fecha.pipe';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})

export class BitacoraPage implements OnInit {

  public alertButtons = ['OK'];

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;}

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  bitacora:Array<Bitacora>;
  name: string;
  address:string;
  data: any;
  idDis: any;
  dataReady : boolean; 
  fechaDesde: any;
  fechaHasta: any;
  dispositivo: any;
  items = [];
  estado: string;
  dbStatus: boolean;
  subscription: any;
  constructor(public conndb: ApiConnService,
              private alertController: AlertController) { 
                                                this.dbStatus=true;
                                                this.dataReady=false; 
                                                console.log("Constructor device");
                                                this.idDis=sessionStorage.getItem('myId');
                                                console.log('constructor myId = ' + this.idDis);
                                                this.callApi();

                                              }

  async callApi(){
                  try{
                    this.dispositivo = await this.conndb.getDispositivo(this.idDis);
                    this.estado="warning";  //Prueba para ver el color de la card
                    console.log('DEBUG-home.page.ts  this.conndb.getDispositivos()');
                    console.log(this.dispositivo);
                    this.bitacora = await this.conndb.getBitacora(this.idDis);
                    console.log('Bitacora = ' + JSON.stringify(this.bitacora));
                  }
                  catch(error){
                    this.dbStatus=false;
                  }
                  this.dataReady=true;    //Dibujo página luego de consultar los datos
                  //this.subscription = interval(2000).subscribe(() => {console.log('Message every 2 seconds') });
                 }

  ngOnInit() {
   this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonChange(ev: Event) {

                            console.log(ev.target);
                            console.log((ev.target as Element).id);
                            
                            if((ev.target as Element).id=="datetime")
                            {
                              console.log("Fecha desde");
                              this.fechaDesde = (ev as DatetimeCustomEvent).detail.value;
                          
                            }
                            if((ev.target as Element).id=="datetime2")
                            {
                              console.log("Fecha hasta");
                              this.fechaHasta = (ev as DatetimeCustomEvent).detail.value;
                            }
     
                          }
                          onIonInfinite(ev) {
                            this.generateItems();
                            setTimeout(() => {
                              (ev as InfiniteScrollCustomEvent).target.complete();
                            }, 500);
                          }
  


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss([this.name, this.address], 'confirm');
    this.enviarBitacora();
    this.callApi();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  openModal(i)
  {
    console.log("El valor es : "+ i);
    this.presentAlert(i);
  }




  async presentAlert(i) {
    const alert = await this.alertController.create({
      // header: this.bitacora[i].fecha,
      subHeader: this.bitacora[i].titulo,
      message: this.bitacora[i].contenido,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async enviarBitacora()
  {
    console.log(this.name);
    console.log(this.address);
    let a=await this.conndb.postBitacora(this.name,this.address,this.idDis,this.idDis);
  }
}