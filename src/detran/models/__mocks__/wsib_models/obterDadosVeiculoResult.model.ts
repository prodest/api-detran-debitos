
import { VeiculoInfo } from './veiculoInfo.model';
import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class ObterDadosVeiculoResult {
    VeiculoInfo: VeiculoInfo;
    MensagemErro: string;

    constructor(params: VeiculoConsultaDTO){
        if (params.veiculoConsulta.Placa === 'VAL1705' && params.veiculoConsulta.Renavam === 98765432101) {
            this.VeiculoInfo = new VeiculoInfo(params);
        } else if (params.veiculoConsulta.Placa === 'ROU8470' && params.veiculoConsulta.Renavam === 12345678910) {
            this.MensagemErro = 'Consulta não permitida para veículo com registro de furto/roubo ativo';
        } else {
            this.MensagemErro = 'Veículo não encontrado.';
        }
    }
}