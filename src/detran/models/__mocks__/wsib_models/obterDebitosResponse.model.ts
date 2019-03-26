import { ObterDebitosResult } from './obterDebitosResult.model';
import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class ObterDebitosResponse {
    ObterDebitosResult: ObterDebitosResult;
    _rawResponse: string;

    constructor(params: VeiculoConsultaDTO){
        this.ObterDebitosResult = new ObterDebitosResult(params);
    }
}