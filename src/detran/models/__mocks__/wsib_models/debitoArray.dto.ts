import { DebitoDTO } from './debito.dto';
import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class DebitoArray {
    Debito: Array<DebitoDTO>;

    constructor(params: VeiculoConsulta){
        if (params.veiculoConsulta.Placa === 'COT4100') {
            this.Debito = new Array();

            if (params.tipoSelecionado === 'IPVA'){
                this.Debito.push(new DebitoDTO(params));
                params.tipoSelecionado = '';
                this.Debito.push(new DebitoDTO(params));
            }else{
                this.Debito.push(new DebitoDTO(params));
                params.tipoSelecionado = 'IPVA';
                this.Debito.push(new DebitoDTO(params));
            }
        }else{
            this.Debito = new Array(new DebitoDTO(params));
        }
    }
}