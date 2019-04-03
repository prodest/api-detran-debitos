import { ObterTiposDebitosResult } from './obterTiposDebitosResult.model';

export class ObterTiposDebitosResponse {
    ObterTiposDebitosResult: ObterTiposDebitosResult;
    _rawResponse: string;

    constructor(params: any){
        this.ObterTiposDebitosResult = new ObterTiposDebitosResult(params);
    }
}