import { Guia } from './guia.model';

export class GerarGuiaResult {
    Guia: Guia;
    MensagemErro: string;
    GuiaPDF: BinaryType;
}