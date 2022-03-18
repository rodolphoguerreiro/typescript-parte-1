import { logarTempo } from "../decorators/logar-tempo.js";

// Cannot instantiate an abstract class, only extend
export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string){
        const elemento = document.querySelector(seletor);

        if(elemento){
            this.elemento = elemento as HTMLElement;
        }else{
            throw Error(`O seletor ${seletor}`);
        }
    }

    protected abstract template(model: T): string;

    @logarTempo()
    update(model: T): void {
        let template =  this.template(model);
        this.elemento.innerHTML = template;
    }
}