import { Guia } from './guia.model';

export class GerarGuiaResult {
    Guia: Guia;
    MensagemErro: string;
    GuiaPDF: string;

    constructor(params: any){
        this.GuiaPDF =  'PDF';
        if (params.veiculoConsulta.Placa === 'COT4100') {
            this.MensagemErro = 'Não é possível escolher cota única e as demais cotas de IPVA para o mesmo exercício. Verifique conjunto de débitos.';
        }else{
            this.Guia = new Guia(params);
        }
    }
}