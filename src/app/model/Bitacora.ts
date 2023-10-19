export class Bitacora{
    private _id: number;
    private _dispositivoId: number;
    private _usuarioId: number;
    private _fecha: string;
    private _titulo: string;
    private _contenido: string;

    constructor(id,dispositivoId,usuarioId,fecha,titulo,contenido){
        this._id=id;
        this._dispositivoId=dispositivoId;
        this._usuarioId=usuarioId;
        this._fecha=fecha;
        this._titulo=titulo;
        this._contenido=contenido;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }

    public get usuarioId(): number {
        return this._usuarioId;
    }
    public set usuarioId(value: number) {
        this._usuarioId = value;
    }

    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }

    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(value: string) {
        this._titulo = value;
    }

    public get contenido(): string {
        return this._contenido;
    }
    public set contenido(value: string) {
        this._contenido = value;
    }
}