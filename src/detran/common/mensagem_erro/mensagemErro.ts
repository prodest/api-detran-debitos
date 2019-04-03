import { ApiModelProperty } from '@nestjs/swagger';

export class MensagemErro {
    @ApiModelProperty()
    readonly mensagem: string;

    @ApiModelProperty()
    readonly status?: number;

    constructor( message: string, status?: number ) {
        this.mensagem = message;
        this.status = status;
    }
}
