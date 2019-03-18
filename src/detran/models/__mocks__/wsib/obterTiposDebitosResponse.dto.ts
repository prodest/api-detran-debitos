import { ObterTiposDebitosResultDTO } from './obterTiposDebitosResult.dto';

export class ObterTiposDebitosResponse {
    ObterTiposDebitosResult: ObterTiposDebitosResultDTO;
    _rawResponse: string;

    constructor(params: any){
        this.ObterTiposDebitosResult = new ObterTiposDebitosResultDTO(params);
    }
}