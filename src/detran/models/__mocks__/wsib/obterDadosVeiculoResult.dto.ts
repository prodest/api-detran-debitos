
import { VeiculoInfoDTO } from './veiculoInfo.dto';

export class ObterDadosVeiculoResultDTO {
    VeiculoInfo: VeiculoInfoDTO;
    MensagemErro: string;

    constructor(params){
        console.log('PARAMS >>>>> ', params);
        if (params.placa === 'VAL1705' && params.renavam === '98765432101') {
            this.VeiculoInfo = new VeiculoInfoDTO(params);
        } else if (params.placa === 'ROU8470' && params.renavam === '12345678910') {
            this.MensagemErro = 'Consulta não permitida para veículo com registro de furto/roubo ativo';
        } else {
            this.MensagemErro = 'Veículo não encontrado.';
        }
    }
}