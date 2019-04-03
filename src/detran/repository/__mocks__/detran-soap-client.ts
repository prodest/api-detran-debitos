import { Injectable } from '@nestjs/common';
import { DebitosWS } from '../../common/config/debitosWS.config';

import { Client } from './client';

@Injectable()
export class DetranSoapClient {
    _client: any ;
    debitosWS: DebitosWS;

    constructor(){
        this._client = new Client();
    }
}
