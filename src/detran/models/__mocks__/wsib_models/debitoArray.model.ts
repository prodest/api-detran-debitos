import { Debito } from './debito.model';
import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class DebitoArray {
    Debito: Array<Debito>;

    constructor(params: VeiculoConsultaDTO){
        if (params.veiculoConsulta.Placa === 'COT4100') {
            this.Debito = new Array();

            if (params.tipoSelecionado === 'IPVA'){
                this.Debito.push(new Debito(params));
                params.tipoSelecionado = '';
                this.Debito.push(new Debito(params));
            }else{
                this.Debito.push(new Debito(params));
                params.tipoSelecionado = 'IPVA';
                this.Debito.push(new Debito(params));
            }
        }else{
            this.Debito = new Array(new Debito(params));
        }
    }
}