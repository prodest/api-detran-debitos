import { TipoDebitoDTO } from './tipoDebito.dto';

export class ObterTiposDebitosResultDTO {
    TipoDebito: TipoDebitoDTO;
    MensagemErro: string;

    constructor(params: any){
        this.TipoDebito = new TipoDebitoDTO(params);
    }
}