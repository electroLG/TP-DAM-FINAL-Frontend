import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirectiva]'
})
export class DirectivaDirective {

  constructor(private el: ElementRef,private renderer: Renderer2) {

    // renderer.setStyle(el.nativeElement,'color','green');

  }

  private cambiar(color: string) //Metodo privado
  {
    // this.el.nativeElement.style.color=color;
    this.renderer.setStyle(this.el.nativeElement,'color', color);

  }

  @HostListener('mouseenter') onmouseEnter(){
  this.cambiar('green');
  }

  @HostListener('mouseleave') onmouseLeave(){
    this.cambiar('');
  }

}
