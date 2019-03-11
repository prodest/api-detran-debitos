import { ApiModelProperty } from '@nestjs/swagger';
import { MsgErro } from './enuns/msgErro.enum';

export class TipoDebito {
  @ApiModelProperty()
  temLicenciamentoAtual: boolean;

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
    if(str === 'S'){
      return true;
    }else{
      return false;
    }

  }
}
