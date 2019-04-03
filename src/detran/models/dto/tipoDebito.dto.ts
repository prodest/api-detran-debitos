import { ApiModelProperty } from '@nestjs/swagger';
import { MsgErro } from '../enuns/msgErro.enum';
import { ObterTiposDebitosResult } from '../wsib_models/obterTiposDebitosResult.model';

export class TipoDebitoDTO {
  @ApiModelProperty({example: true})
  temLicenciamentoAtual: boolean;

  @ApiModelProperty({example: true})
  temLicenciamentoAnterior: boolean;

  @ApiModelProperty({example: false})
  temDPVAT: boolean;

  @ApiModelProperty({example: true})
  temIPVA: boolean;

  @ApiModelProperty({example: false})
  temMulta: boolean;

  @ApiModelProperty({example: true})
  temIPVAAnterior: boolean;

  @ApiModelProperty({example: false})
  temDPVATAnterior: boolean;

  @ApiModelProperty({example: ''})
  mensagemErro?: string;

  constructor(tipoDeb: ObterTiposDebitosResult) {
    if (Object.keys(tipoDeb)[0] === 'MensagemErro') {
      this.mensagemErro = tipoDeb.MensagemErro;
    } else if (tipoDeb === null || tipoDeb === undefined) {
      this.mensagemErro = MsgErro.MODL_TIPO_DEB_ERR;
    } else {
      this.temLicenciamentoAtual = this.convert2boolean(tipoDeb.TipoDebito.TemLicenciamentoAtual);
      this.temLicenciamentoAnterior = this.convert2boolean(tipoDeb.TipoDebito.TemLicenciamentoAnterior);
      this.temDPVAT = this.convert2boolean(tipoDeb.TipoDebito.TemDPVAT);
      this.temIPVA = this.convert2boolean(tipoDeb.TipoDebito.TemIPVA);
      this.temMulta = this.convert2boolean(tipoDeb.TipoDebito.TemMulta);
      this.temIPVAAnterior = this.convert2boolean(tipoDeb.TipoDebito.TemIPVAAnterior);
      this.temDPVATAnterior = this.convert2boolean(tipoDeb.TipoDebito.TemDPVATAnterior);
    }
  }

  private convert2boolean(str: string){
    if (str === 'S') {
      return true;
    }else{
      return false;
    }

  }
}
