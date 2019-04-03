import { TipoDebito } from './tipoDebito.model';

export class ObterTiposDebitosResult {
    TipoDebito: TipoDebito;
    MensagemErro: string;

    constructor(params: any){
        this.TipoDebito = new TipoDebito(params);
    }
}