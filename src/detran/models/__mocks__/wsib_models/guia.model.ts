import { ItemGuia } from './itemGuia.model';

export class Guia {
    ItemGuia: Array<ItemGuia>;

    constructor(params: any){
        this.ItemGuia = new Array(new ItemGuia(params));
    }
}