import { GerarGuiaResultDTO } from "./gerarGuiaResult.dto";

export class GerarGuiaResponseDTO {
    GerarGuiaResult: GerarGuiaResultDTO;
    _rawResponse: string;
}