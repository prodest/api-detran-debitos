import { DebitoDTO } from './debito.dto';

export class DebitoArray {
    Debito: Array<DebitoDTO>;

    constructor(params: any){
        this.Debito = new Array(new DebitoDTO(params));
    }
}