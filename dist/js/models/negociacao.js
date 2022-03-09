export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
    static criaNegociacao(data, amount, value) {
        const exp = /-/g;
        const date = new Date(data.replace(exp, ','));
        const quantidade = parseInt(amount);
        const valor = parseFloat(value);
        return new Negociacao(date, quantidade, valor);
    }
}
