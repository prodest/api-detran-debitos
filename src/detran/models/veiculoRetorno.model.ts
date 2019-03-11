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
    if (Object.keys(params)[0] === 'MensagemErro' || Object.keys(params)[0] === 'mensagemErro') {
      this.mensagemErro = params.MensagemErro || params.mensagemErro;
    } else {
      this.placa = params.VeiculoInfo.Veiculo.Placa;
      this.modelo = params.VeiculoInfo.MarcaModelo;
      this.renavam = params.VeiculoInfo.Veiculo.Renavam;
    }
  }
}
