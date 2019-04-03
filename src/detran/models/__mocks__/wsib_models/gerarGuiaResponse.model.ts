import { GerarGuiaResult } from './gerarGuiaResult.model';

export class GerarGuiaResponse {
    GerarGuiaResult: GerarGuiaResult;
    _rawResponse: string;

    constructor(params: any){
        this.GerarGuiaResult = new GerarGuiaResult(params);
    }
}