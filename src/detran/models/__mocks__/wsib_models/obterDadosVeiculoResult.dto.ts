
import { VeiculoInfoDTO } from './veiculoInfo.dto';
import { VeiculoConsulta } from '../../veiculoConsulta.model';

export class ObterDadosVeiculoResultDTO {
    VeiculoInfo: VeiculoInfoDTO;
    MensagemErro: string;

    constructor(params: VeiculoConsulta){
        if (params.veiculoConsulta.Placa === 'VAL1705' && params.veiculoConsulta.Renavam === 98765432101) {
            this.VeiculoInfo = new VeiculoInfoDTO(params);
        } else if (params.veiculoConsulta.Placa === 'ROU8470' && params.veiculoConsulta.Renavam === 12345678910) {
            this.MensagemErro = 'Consulta não permitida para veículo com registro de furto/roubo ativo';
        } else {
            this.MensagemErro = 'Veículo não encontrado.';
        }
    }
}