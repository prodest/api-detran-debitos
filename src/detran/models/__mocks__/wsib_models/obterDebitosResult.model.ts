import { DebitoArray } from './debitoArray.model';
import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class ObterDebitosResult {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(params: VeiculoConsultaDTO){

        if (params.veiculoConsulta.Placa === 'VAL1705' || params.veiculoConsulta.Placa === 'COT4100') {
            this.Debito = new DebitoArray(params);
        } else {
            this.Debito = null;
        }
    }
}