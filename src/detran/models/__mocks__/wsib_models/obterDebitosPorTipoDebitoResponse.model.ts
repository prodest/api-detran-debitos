import { ObterDebitosPorTipoDebitoResult } from './obterDebitosPorTipoDebitoResult.model';

export class ObterDebitosPorTipoDebitoResponse {
    ObterDebitosPorTipoDebitoResult: ObterDebitosPorTipoDebitoResult;
    _rawResponse: string;

    constructor(params: any){
        this.ObterDebitosPorTipoDebitoResult = new ObterDebitosPorTipoDebitoResult(params);
    }
}