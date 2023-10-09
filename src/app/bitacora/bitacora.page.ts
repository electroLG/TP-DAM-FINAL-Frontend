import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {
  data: any;
  constructor() { 

    this.data=localStorage.getItem("myId");
    console.log('this.data is 3= ' + this.data);
  }

  ngOnInit() {
  }

}
