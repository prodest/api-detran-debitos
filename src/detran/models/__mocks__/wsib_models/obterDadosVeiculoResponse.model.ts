import { ObterDadosVeiculoResult } from './obterDadosVeiculoResult.model';
import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class ObterDadosVeiculoResponse {
    ObterDadosVeiculoResult: ObterDadosVeiculoResult;
    _rawResponse: string;

    constructor(params: VeiculoConsultaDTO){
        this.ObterDadosVeiculoResult = new ObterDadosVeiculoResult(params);
    }
}