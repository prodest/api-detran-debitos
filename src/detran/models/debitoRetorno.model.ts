import { ApiModelProperty } from '@nestjs/swagger';
import { Debito } from './debito.model';
import { MsgErro } from './enuns/msgErro.enum';
import { ObterDebitosResultDTO } from './wsib_models/obterDebitosResult.dto';

export class DebitoRetorno {
  @ApiModelProperty({type: [Debito]})
  debitos: Array<Debito>;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(debits: ObterDebitosResultDTO) {

    if (debits.MensagemErro) {
      this.mensagemErro = debits.MensagemErro;
    } else if (debits === null || debits === undefined) {
      this.mensagemErro = MsgErro.DEB_RET_ERR;
    } else if (debits.Debito !== null){
      this.debitos = new Array();
      for (const d of debits.Debito.Debito) {
        this.debitos.push(new Debito(d));
      }
    } else {
      this.debitos = new Array();
    }
  }
}
