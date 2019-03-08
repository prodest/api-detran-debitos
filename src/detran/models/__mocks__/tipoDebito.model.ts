import { ApiModelProperty } from '@nestjs/swagger';

export class TipoDebito {
  @ApiModelProperty()
  temLicenciamentoAnual: string;

  @ApiModelProperty()
  temLicenciamentoAnterior: string;

  @ApiModelProperty()
  temDPVAT: string;

  @ApiModelProperty()
  temIPVA: string;

  @ApiModelProperty()
  temMulta: string;

  @ApiModelProperty()
  temIPVAAnterior: string;

  @ApiModelProperty()
  temDPVATAnterior: string;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(tipoDeb: any) {
    this.temLicenciamentoAnual = 'S';
    this.temLicenciamentoAnterior = 'N';
    this.temDPVAT = 'S';
    this.temIPVA = 'S';
    this.temMulta = 'N';
    this.temIPVAAnterior = 'S';
    this.temDPVATAnterior = 'N';
  }
}
