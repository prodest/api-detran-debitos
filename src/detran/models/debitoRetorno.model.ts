import { ApiModelProperty } from '@nestjs/swagger';
import { Debito } from './debito.model';
import { MsgErro } from './enuns/msgErro.enum';

export class DebitoRetorno {
  @ApiModelProperty({type: [Debito]})
  debitos: Array<any>;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(debits: any) {
    this.debitos = new Array();

    if (Object.keys(debits)[0] === 'MensagemErro') {
      this.mensagemErro = debits.MensagemErro;
    } else if (debits.Debito === null) {
      this.debitos.push(MsgErro.DEB_RET_VAZIO);
    } else if (debits === null || debits === undefined) {
      this.mensagemErro = MsgErro.DEB_RET_ERR;
    } else {
      for (const d of debits.Debito.Debito) {
        this.debitos.push(new Debito(d));
      }
    }
  }
}
