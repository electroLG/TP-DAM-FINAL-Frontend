/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class Dispositivo{
    private _dispositivoId: number;
    private _nombre: string;
    private _tipo: string;
    private _ubicacion: string;
    private _marca: string;
    private _modelo: string;
    private _estado: number;

    constructor(dispositivo,nombre,ubicacion,marca,modelo,estado){
        this._dispositivoId=dispositivo;
        this._nombre=nombre;
        this._ubicacion=ubicacion;
        this._marca=marca;
        this._modelo=modelo;
        this._estado=estado;
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get tipo(): string {
      return this._tipo;
  }
  public set tipo(value: string) {
      this._tipo = value;
  }
    public get ubicacion(): string {
        return this._ubicacion;
    }
    public set ubicacion(value: string) {
        this._ubicacion = value;
    }

    public get marca(): string {
      return this._marca;
    }
    public set marca(value: string) {
      this._marca = value;
    }
    public get modelo(): string {
    return this._modelo;
    }
    public set modelo(value: string) {
    this._modelo = value;
    }
    public get estado(): number {
        return this._estado;
    }
    public set estado(value: number) {
        this._estado = value;
    }
}
