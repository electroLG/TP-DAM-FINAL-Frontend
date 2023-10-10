/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class IO{
    private _nombre: string;
    private _unidad: string;
    private _habilitado: boolean;
    private _tipo: string;
    private _representacion: string;

    constructor(nombre,unidad,habilitado,tipo,representacion){
        this._nombre=nombre;
        this._unidad=unidad;
        this._habilitado=habilitado;
        this._tipo=tipo;
        this._representacion=representacion;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get unidad(): string {
        return this._unidad;
    }
    public set unidad(value: string) {
        this._unidad = value;
    }

    public get habilitado(): boolean {
        return this._habilitado;
    }
    public set habilitado(value: boolean) {
        this._habilitado = value;
    }

    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }
    public get representacion(): string {
        return this._representacion;
    }
    public set representacion(value: string) {
        this._representacion = value;
    }
}
