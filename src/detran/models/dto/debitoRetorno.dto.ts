import { ApiModelProperty } from '@nestjs/swagger';
import { DebitoDTO } from './debitoDTO.dto';
import { MsgErro } from '../enuns/msgErro.enum';
import { ObterDebitosResult } from '../wsib_models/obterDebitosResult.model';

export class DebitoRetornoDTO {
  @ApiModelProperty({type: [DebitoDTO]})
  debitos: Array<DebitoDTO>;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(debits: ObterDebitosResult, tipo_debito?: string) {

    if (debits.MensagemErro) {
      this.mensagemErro = debits.MensagemErro;
    } else if (debits === null || debits === undefined) {
      this.mensagemErro = MsgErro.DEB_RET_ERR;
    } else if (debits.Debito !== null){
      this.debitos = new Array();
      for (const d of debits.Debito.Debito) {
        this.debitos.push(new DebitoDTO(d, tipo_debito));
      }
    } else {
      this.debitos = new Array();
    }
  }
}
