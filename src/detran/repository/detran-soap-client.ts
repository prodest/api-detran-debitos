import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as soap from 'soap-as-promised';
import { SegurancaDetran } from '../models/segurancaDetran.model';
import { DebitosWS } from '../common/config/debitosWS.config';
import { MsgErro } from '../models/enuns/msgErro.enum';

@Injectable()
export class DetranSoapClient {
    _client: any ;
    debitosWS: DebitosWS;

    constructor() {
        this.debitosWS = new DebitosWS();
        this._client = soap.createClient(this.debitosWS.serviceUrl)
        .then(client => {
            client.addSoapHeader(
                {
                    SegurancaDetran: new SegurancaDetran(),
                },
                undefined,
                '__tns__',
                'http://tempuri.org/',
            );
            return client;
        }).catch(error => {
// tslint:disable-next-line: no-console
            console.error(error);
            return {
                mensagemErro: MsgErro.REPO_ERR,
            };
        });
    }
}
