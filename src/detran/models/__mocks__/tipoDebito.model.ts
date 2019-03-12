import { ApiModelProperty } from '@nestjs/swagger';

export class TipoDebito {
  @ApiModelProperty()
  temLicenciamentoAnual: boolean;

  @ApiModelProperty()
  temLicenciamentoAnterior: boolean;

  @ApiModelProperty()
  temDPVAT: boolean;

  @ApiModelProperty()
  temIPVA: boolean;

  @ApiModelProperty()
  temMulta: boolean;

  @ApiModelProperty()
  temIPVAAnterior: boolean;

  @ApiModelProperty()
  temDPVATAnterior: boolean;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(tipoDeb: any) {
    this.temLicenciamentoAnual = true;
    this.temLicenciamentoAnterior = false;
    this.temDPVAT = true;
    this.temIPVA = true;
    this.temMulta = false;
    this.temIPVAAnterior = true;
    this.temDPVATAnterior = false;
  }
}
