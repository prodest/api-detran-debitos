import { ApiModelProperty } from '@nestjs/swagger';

export class MensagemErro {
    @ApiModelProperty()
    readonly mensagem: string;

    constructor( message: string ) {
        this.mensagem = message;;
    }
}
