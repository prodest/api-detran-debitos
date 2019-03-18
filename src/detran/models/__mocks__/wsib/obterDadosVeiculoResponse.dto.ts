import { ObterDadosVeiculoResultDTO } from './obterDadosVeiculoResult.dto';

export class ObterDadosVeiculoResponseDTO {
    ObterDadosVeiculoResult: ObterDadosVeiculoResultDTO;
    _rawResponse: string;

    constructor(params: any){
        this.ObterDadosVeiculoResult = new ObterDadosVeiculoResultDTO(params);
    }
}