import { Injectable } from '@nestjs/common';
import { Retorno } from '../../models/__mocks__/retorno.model';
import { VeiculoRetorno } from '../../models/__mocks__/veiculoRetorno.model';
import { DebitoRetorno } from '../../models/__mocks__/debitoRetorno.model';
import { TipoDebito } from '../../models/__mocks__/tipoDebito.model';
import { GerarGuiaRetorno } from '../../models/__mocks__/gerarGuiaRetorno.model';

@Injectable()
export class VeiculosService {
  resposta: Retorno;

  async getDadosVeiculos( params ): Promise<any> {
    const veiculoRetorno = new VeiculoRetorno(params);
    return new Retorno(veiculoRetorno);
  }

  async getDebitos( params ): Promise<any> {
    const debitoRetorno = new DebitoRetorno(params);
    return new Retorno( debitoRetorno );
  }

  async getDebitosPreview( params ): Promise<any>{
    const debitosPreview = new TipoDebito(params);
    return new Retorno(debitosPreview);
  }

  async getTiposDebitos( params ): Promise<any> {
    const debitoRetorno = new DebitoRetorno(params);
    return new Retorno( debitoRetorno );
  }

  async gerarGRU( params ): Promise<Retorno>{
    const retornoGRU = new GerarGuiaRetorno(params);
    return new Retorno(retornoGRU);
  }

  async gerarGRUParcial( params ): Promise<Retorno>{
    const retornoGRU = new GerarGuiaRetorno(params);
    return new Retorno(retornoGRU);
  }
}
