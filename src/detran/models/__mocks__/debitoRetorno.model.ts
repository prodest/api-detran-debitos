import { ApiModelProperty } from '@nestjs/swagger';
import { Debito } from './debito.model';

export class DebitoRetorno {
  @ApiModelProperty()
  debitos: Array<any>;

  @ApiModelProperty()
  mensagemErro?: string;

  constructor(debits: any) {
    this.debitos = new Array();

    if (debits.placa !== 'VAL1705') {
      this.debitos.push('Não foram encontrados debitos para esse veiculo.');
    } else {
      this.debitos.push(new Debito(debits));
    }
  }
}
