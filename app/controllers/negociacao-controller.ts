import { DiasSemana } from '../enums/diasSemana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView =  new MensagemView('#mensagemView', true);

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    private isDiaUtil(data: Date){
        return data.getDay() > DiasSemana.SABADO && data.getDay() < DiasSemana.DOMINGO;
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
    
        if(!this.isDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas dias úteis são aceitos');
            return ;
        }
        
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}
