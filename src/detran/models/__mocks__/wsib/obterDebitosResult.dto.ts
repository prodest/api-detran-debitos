import { DebitoArray } from './debitoArray.dto';
import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class ObterDebitosResultDTO {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(params: VeiculoConsulta){
        if (params.veiculoConsulta.Placa !== 'VAL1705') {
            this.Debito = null;
        } else {
            this.Debito = new DebitoArray(params);
        }
    }
}