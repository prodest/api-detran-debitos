import { ApiModelProperty } from '@nestjs/swagger';

export class VeiculoDTO {
  @ApiModelProperty()
  Placa: string;

  @ApiModelProperty()
  CPF?: string;

  @ApiModelProperty()
  Renavam: number;

  constructor(veic: any) {
    this.Placa = veic.Placa || veic.placa;
    this.CPF = veic.CPF || veic.doc_proprietario;
    this.Renavam = Number(veic.Renavam) || Number(veic.renavam);
  }
}
