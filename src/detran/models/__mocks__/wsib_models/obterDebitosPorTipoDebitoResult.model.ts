import { DebitoArray } from './debitoArray.model';

export class ObterDebitosPorTipoDebitoResult {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(params: any){
        this.Debito = new DebitoArray(params);
    }
}