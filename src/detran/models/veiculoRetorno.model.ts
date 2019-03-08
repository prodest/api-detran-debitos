import { ApiModelProperty } from '@nestjs/swagger';

export class VeiculoRetorno {
  @ApiModelProperty()
  placa: string;

  @ApiModelProperty()
  modelo: string;

  @ApiModelProperty()
  renavam: number;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(params: any) {
    if (Object.keys(params)[0] === 'MensagemErro') {
      this.mensagemErro = params.MensagemErro;
    } else {
      this.placa = params.VeiculoInfo.Veiculo.Placa;
      this.modelo = params.VeiculoInfo.MarcaModelo;
      this.renavam = params.VeiculoInfo.Veiculo.Renavam;
    }
  }
}
