import { ItemGuiaDTO } from './itemGuia.dto';

export class GuiaDTO {
    ItemGuia: Array<ItemGuiaDTO>;

    constructor(params: any){
        this.ItemGuia = new Array(new ItemGuiaDTO(params));
    }
}