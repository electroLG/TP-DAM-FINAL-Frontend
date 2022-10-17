/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class Medida{
    private _medicionId: number;
    private _fecha: string;
    private _valor: number;
    private _dispositivoId: number;

    constructor(dispositivo,fecha,valor,dispositivoId){
        this._medicionId=dispositivo;
        this._fecha=fecha;
        this._valor=valor;
        this._dispositivoId=dispositivoId;
    }

    public get medicionId(): number {
        return this._medicionId;
    }
    public set medicionId(value: number) {
        this._medicionId = value;
    }

    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }

    public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
}
