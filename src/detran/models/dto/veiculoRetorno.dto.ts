import { ApiModelProperty } from '@nestjs/swagger';
import { ObterDadosVeiculoResult } from '../wsib_models/obterDadosVeiculoResult.model';

export class VeiculoRetornoDTO {
  @ApiModelProperty({example: 'ABC1234'})
  placa: string;

  @ApiModelProperty({example: 'Uno 1.0'})
  modelo: string;

  @ApiModelProperty({example: '12345679810'})
  renavam: number;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(params: ObterDadosVeiculoResult) {
    if (Object.keys(params)[0] === 'MensagemErro' || Object.keys(params)[0] === 'mensagemErro') {
      this.mensagemErro = params.MensagemErro;
    } else {
      this.placa = params.VeiculoInfo.Veiculo.Placa;
      this.modelo = params.VeiculoInfo.MarcaModelo;
      this.renavam = Number(params.VeiculoInfo.Veiculo.Renavam);
    }
  }
}
