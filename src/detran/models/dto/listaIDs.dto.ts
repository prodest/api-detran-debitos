import { ApiModelProperty } from '@nestjs/swagger';

export class ListaIDsDTO {
    @ApiModelProperty({
        example: [12345678, 98765432],
    })
    lista: Array<number>;
}