import { Injectable } from '@angular/core';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {
  current: any;
  date: string;
  time: string;
  mod: string;
  constructor() { }

  getTimestamp(){
    this.current = new Date();
    this.date = new Date(this.current).toLocaleDateString('en-us');
    this.time = new Date(this.current).toLocaleTimeString('en-us',{hourCycle: 'h23'});
    return( this.date.substring(6,11)+'-'+this.date.substring(0,2)+'-'+this.date.substring(3,5)+' '+ this.time);
  }
}
