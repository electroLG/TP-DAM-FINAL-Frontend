/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class Ev{
    private _electrovalvulaId: number;
    private _nombre: string;

    constructor(electrovalvulaId,nombre){
        this._electrovalvulaId=electrovalvulaId;
        this._nombre=nombre;
    }

    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

}
