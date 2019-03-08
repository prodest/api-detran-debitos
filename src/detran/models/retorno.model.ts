import { HttpStatus } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

export class Retorno<T> {
  @ApiModelProperty()
  public res: T;

  @ApiModelProperty()
  public status: HttpStatus;

  constructor(resposta: T) {
    this.res = resposta;

    if (
      Object.keys(this.res)[0] === 'mensagemErro' ||
      Object.keys(this.res)[0] === 'MensagemErro'
    ) {
      this.status = HttpStatus.FORBIDDEN;
    } else {
      this.status = HttpStatus.OK;
    }
  }
}
