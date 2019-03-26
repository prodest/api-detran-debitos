import { ApiModelProperty } from '@nestjs/swagger';
import { ObterDadosVeiculoResultDTO } from './wsib_models/obterDadosVeiculoResult.dto';

export class VeiculoRetorno {
  @ApiModelProperty()
  placa: string;

  @ApiModelProperty()
  modelo: string;

  @ApiModelProperty()
  renavam: number;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(params: ObterDadosVeiculoResultDTO) {
    if (Object.keys(params)[0] === 'MensagemErro' || Object.keys(params)[0] === 'mensagemErro') {
      this.mensagemErro = params.MensagemErro;
    } else {
      this.placa = params.VeiculoInfo.Veiculo.Placa;
      this.modelo = params.VeiculoInfo.MarcaModelo;
      this.renavam = Number(params.VeiculoInfo.Veiculo.Renavam);
    }
  }
}
