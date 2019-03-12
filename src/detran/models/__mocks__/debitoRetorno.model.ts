import { ApiModelProperty } from '@nestjs/swagger';
import { Debito } from './debito.model';
import { MsgErro } from './enuns/msgErro.enum';

export class DebitoRetorno {
  @ApiModelProperty()
  debitos: Array<any>;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(debits: any) {
    this.debitos = new Array();

    if (debits.placa !== 'VAL1705') {
      this.debitos.push(MsgErro.DEB_RET_VAZIO);
    } else {
      this.debitos.push(new Debito(debits));
    }
  }
}
