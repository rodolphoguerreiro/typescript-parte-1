export class Negociacao {
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {}

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public static criaNegociacao(data:string, amount:string, value:string): Negociacao {
        const exp = /-/g;
        const date = new Date(data.replace(exp, ','));
        const quantidade = parseInt(amount);
        const valor = parseFloat(value);
        
        return new Negociacao(date, quantidade, valor);
    }
}