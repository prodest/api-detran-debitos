import { ApiModelProperty } from '@nestjs/swagger';

export class ListaIDs {
    @ApiModelProperty()
    lista: Array<number>;
}