import { Injectable } from '@nestjs/common';
import { VeiculoRetorno } from '../../models/__mocks__/veiculoRetorno.model';
import { DebitoRetorno } from '../../models/__mocks__/debitoRetorno.model';
import { TipoDebito } from '../../models/__mocks__/tipoDebito.model';
import { GerarGuiaRetorno } from '../../models/__mocks__/gerarGuiaRetorno.model';
import { MensagemErro } from '../../common/mensagemErro';

@Injectable()
export class VeiculosService {

  async getDadosVeiculos( params ): Promise<VeiculoRetorno> {
    const veiculoRetorno = new VeiculoRetorno(params);
    if(veiculoRetorno.mensagemErro){
      throw new MensagemErro(veiculoRetorno.mensagemErro);
    }
    return veiculoRetorno;
  }

  async getDebitos( params ): Promise<DebitoRetorno> {
    const debitoRetorno = new DebitoRetorno(params);
    if(debitoRetorno.mensagemErro){
      throw new MensagemErro(debitoRetorno.mensagemErro);
    }
    return debitoRetorno;
  }

  async getDebitosPreview( params ): Promise<TipoDebito>{
    const debitosPreview = new TipoDebito(params);
    if(debitosPreview.mensagemErro){
      throw new MensagemErro(debitosPreview.mensagemErro);
    }
    return debitosPreview;
  }

  async getTiposDebitos( params ): Promise<DebitoRetorno> {
    const debitoRetorno = new DebitoRetorno(params);
    if(debitoRetorno.mensagemErro){
      throw new MensagemErro(debitoRetorno.mensagemErro);
    }
    return debitoRetorno;
  }

  async gerarGRU( params ): Promise<GerarGuiaRetorno>{
    const retornoGRU = new GerarGuiaRetorno(params);
    if(retornoGRU.mensagemErro){
      throw new MensagemErro(retornoGRU.mensagemErro);
    }
    return retornoGRU;
  }

  async gerarGRUParcial( params ): Promise<GerarGuiaRetorno>{
    const retornoGRU = new GerarGuiaRetorno(params);
    if(retornoGRU.mensagemErro){
      throw new MensagemErro(retornoGRU.mensagemErro);
    }
    return retornoGRU;
  }
}
