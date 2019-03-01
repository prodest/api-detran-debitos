import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorMessage {
    @ApiModelProperty()
    readonly mensagem: string;

    @ApiModelProperty()
    readonly data: Date;

    @ApiModelProperty()
    readonly statusCode: number;

    constructor( message: string, status: number ) {
        this.mensagem = message;
        this.data = new Date();
        this.statusCode = status;
    }

}
