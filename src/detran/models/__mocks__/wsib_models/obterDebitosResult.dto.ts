import { DebitoArray } from './debitoArray.dto';
import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class ObterDebitosResultDTO {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(params: VeiculoConsulta){

        if (params.veiculoConsulta.Placa === 'VAL1705' || params.veiculoConsulta.Placa === 'COT4100') {
            this.Debito = new DebitoArray(params);
        } else {
            this.Debito = null;
        }
    }
}