import { VeiculoDTO } from './veiculo.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class VeiculoInfoDTO {
  @ApiModelProperty()
  veiculo: VeiculoDTO;

  @ApiModelProperty()
  nome: string;

  @ApiModelProperty()
  marcaModelo: string;

  @ApiModelProperty()
  anoFabricacao: number;

  constructor(veicInfo: any) {
    this.veiculo = new VeiculoDTO(veicInfo.Veiculo);
    this.nome = veicInfo.Nome;
    this.marcaModelo = veicInfo.MarcaModelo;
    this.anoFabricacao = veicInfo.AnoFabricacao;
  }
}
