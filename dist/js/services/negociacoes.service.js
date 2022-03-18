import { Negociacao } from "../models/negociacao.js";
export class NegociacoesService {
    obterNegociacoes() {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dadoToday => {
                return new Negociacao(new Date(), dadoToday.vezes, dadoToday.montante);
            });
        });
    }
}
