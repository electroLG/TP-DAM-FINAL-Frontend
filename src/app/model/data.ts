export class data{
    private _id: string;
    private _valor: any;


    constructor(id,valor,){
        this._id=id;
        this._valor=valor;

    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get valor(): any {
        return this._valor;
    }
    public set valor(value: any) {
        this._valor = value;
    }

}