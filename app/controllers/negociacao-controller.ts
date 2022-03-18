import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempo } from '../decorators/logar-tempo.js';
import { DiasSemana } from '../enums/diasSemana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView =  new MensagemView('#mensagemView');

    constructor() {
        // Substituidos pelo decorator @domInjector();
        // this.inputData = document.querySelector('#data') as HTMLInputElement;
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public importarDados(): void{
        fetch('http://localhost:8080/dados')
            .then(res => res.json() )
            .then((dados: any[]) => {
                return dados.map(dadoToday => {
                    return new Negociacao(
                        new Date(),
                        dadoToday.vezes,
                        dadoToday.montante
                    )
                })
            })
            .then(negociacoesToday => {
                for (let negociacao of negociacoesToday) {
                    this.negociacoes.adiciona(negociacao);
                }

                this.negociacoesView.update(this.negociacoes)
            })
    }

    private isDiaUtil(data: Date){
        return data.getDay() > DiasSemana.SABADO && data.getDay() < DiasSemana.DOMINGO;
    }

    @inspect
    @logarTempo()
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
