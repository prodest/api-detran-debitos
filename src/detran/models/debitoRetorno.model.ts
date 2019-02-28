import { ApiModelProperty } from '@nestjs/swagger';
import { Debito } from './debito.model';

export class DebitoRetorno {
  @ApiModelProperty({type: [Debito]})
  debitos: Array<any>;

  @ApiModelProperty()
  mensagemErro: string;

  constructor(debits: any) {
    this.debitos = new Array();

    if (Object.keys(debits)[0] === 'MensagemErro') {
      this.mensagemErro = debits.MensagemErro;
    } else if (debits.Debito === null) {
      this.debitos.push('Não foram encontrados debitos para esse veiculo.');
    } else if (debits === null || debits === undefined) {
      this.mensagemErro = 'Erro ao buscar debitos.';
    } else {
      for (const d of debits.Debito.Debito) {
        this.debitos.push(new Debito(d));
      }
    }
  }
}
