import { ObterDadosVeiculoResultDTO } from './obterDadosVeiculoResult.dto';
import { VeiculoConsulta } from '../../veiculoConsulta.model';

export class ObterDadosVeiculoResponseDTO {
    ObterDadosVeiculoResult: ObterDadosVeiculoResultDTO;
    _rawResponse: string;

    constructor(params: VeiculoConsulta){
        this.ObterDadosVeiculoResult = new ObterDadosVeiculoResultDTO(params);
    }
}