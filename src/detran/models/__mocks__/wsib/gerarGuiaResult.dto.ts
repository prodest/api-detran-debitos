import { GuiaDTO } from "./guia.dto";

export class GerarGuiaResultDTO {
    Guia: GuiaDTO
    MensagemErro: string;
    GuiaPDF: BinaryType;
}