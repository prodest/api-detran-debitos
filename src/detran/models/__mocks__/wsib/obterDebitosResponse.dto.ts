import { ObterDebitosResultDTO } from './obterDebitosResult.dto';

export class ObterDebitosResponseDTO {
    ObterDebitosResult: ObterDebitosResultDTO;
    _rawResponse: string;

    constructor(params: any){
        this.ObterDebitosResult = new ObterDebitosResultDTO(params);
    }
}