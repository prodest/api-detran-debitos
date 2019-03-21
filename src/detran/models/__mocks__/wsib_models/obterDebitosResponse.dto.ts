import { ObterDebitosResultDTO } from './obterDebitosResult.dto';
import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class ObterDebitosResponseDTO {
    ObterDebitosResult: ObterDebitosResultDTO;
    _rawResponse: string;

    constructor(params: VeiculoConsulta){
        this.ObterDebitosResult = new ObterDebitosResultDTO(params);
    }
}