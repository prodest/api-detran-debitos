import { ObterDebitosPorTipoDebitoResultDTO } from './obterDebitosPorTipoDebitoResult.dto';

export class ObterDebitosPorTipoDebitoResponseDTO {
    ObterDebitosPorTipoDebitoResult: ObterDebitosPorTipoDebitoResultDTO;
    _rawResponse: string;

    constructor(params: any){
        this.ObterDebitosPorTipoDebitoResult = new ObterDebitosPorTipoDebitoResultDTO(params);
    }
}