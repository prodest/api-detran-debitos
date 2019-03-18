import { DebitoArray } from './debitoArray.dto';
import { MsgErro } from '../enuns/msgErro.enum';

export class ObterDebitosResultDTO {
    Debito: DebitoArray;
    MensagemErro: string;

    constructor(debits: any){

        if (debits.placa !== 'VAL1705') {
        this.MensagemErro = MsgErro.DEB_RET_VAZIO;
        } else {
        this.Debito = new DebitoArray(debits);
        }
    }
}