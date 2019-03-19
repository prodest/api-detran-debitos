import { GuiaDTO } from './guia.dto';

export class GerarGuiaResultDTO {
    Guia: GuiaDTO;
    MensagemErro: string;
    GuiaPDF: string;

    constructor(params: any){
        this.Guia = new GuiaDTO(params);
        this.GuiaPDF =  'PDF';
    }
}