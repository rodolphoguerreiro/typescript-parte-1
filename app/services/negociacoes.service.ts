import { NegociaDia } from "../interfaces/negocia-dia";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
    
    public obterNegociacoes(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json() )
            .then((dados: NegociaDia[]) => {
                return dados.map(dadoToday => {
                    return new Negociacao(
                        new Date(),
                        dadoToday.vezes,
                        dadoToday.montante
                    )
                })
            })
    }

}