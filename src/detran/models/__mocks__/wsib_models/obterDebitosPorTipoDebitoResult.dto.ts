import { DebitoArray } from './debitoArray.dto';

export class ObterDebitosPorTipoDebitoResultDTO {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(params: any){
        this.Debito = new DebitoArray(params);
    }
}