import { DebitoDTO } from './debito.dto';
import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class DebitoArray {
    Debito: Array<DebitoDTO>;

    constructor(params: VeiculoConsulta){
        this.Debito = new Array(new DebitoDTO(params));
    }
}