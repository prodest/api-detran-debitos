import { Injectable } from '@nestjs/common';

import { ControllerVeiculosParams } from '../models/controller_model/controllerVeiculosParams';
import { MensagemErro } from '../common/mensagem_erro/mensagemErro';
import { DebitoRetorno } from '../models/debitoRetorno.model';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { GerarGuiaRetorno } from '../models/gerarGuiaRetorno.model';
import { TipoDebito } from '../models/tipoDebito.model';
import { VeiculoConsulta } from '../models/veiculoConsulta.model';
import { VeiculoRetorno } from '../models/veiculoRetorno.model';
import { DetranSoapClient } from '../repository/detran-soap-client';
import { ObterDadosVeiculoResponseDTO } from '../models/wsib_models/obterDadosVeiculoResponse.dto';
import { ObterDebitosResponseDTO } from '../models/wsib_models/obterDebitosResponse.dto';
import { ObterTiposDebitosResponse } from '../models/wsib_models/obterTiposDebitosResponse.dto';
import { ObterDebitosPorTipoDebitoResponseDTO } from '../models/wsib_models/obterDebitosPorTipoDebitoResponse.dto';
import { GerarGuiaResponseDTO } from '../models/wsib_models/gerarGuiaResponse.dto';

@Injectable()
export class VeiculosService {
  private detranSoapClient: DetranSoapClient;

  constructor() {
    this.detranSoapClient = new DetranSoapClient();
  }

  async getDadosVeiculos(params: ControllerVeiculosParams): Promise<VeiculoRetorno> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDadosVeiculoResponseDTO = await client.ObterDadosVeiculo(veiculoConsulta);
      const veiculoRetorno = new VeiculoRetorno(res.ObterDadosVeiculoResult);
      if (veiculoRetorno.mensagemErro){
        throw new MensagemErro(veiculoRetorno.mensagemErro);
      }
      return veiculoRetorno;
    } catch (error) {
      let mensagem: string = MsgErro.SERV_GET_DADOS_VEIC;
      if (Object.keys(error)[0] === 'mensagem'){
        mensagem = mensagem + ' ' + error.mensagem;
      }
      throw new MensagemErro(mensagem);
    }
  }

  async getDebitos(params: ControllerVeiculosParams): Promise<DebitoRetorno> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDebitosResponseDTO = await client.ObterDebitos(veiculoConsulta);
      const debitos = new DebitoRetorno(res.ObterDebitosResult);
      if (debitos.mensagemErro){
        throw new MensagemErro(debitos.mensagemErro);
      }
      return debitos;
    } catch (error) {
      let mensagem: string = MsgErro.SERV_GET_DEB;
      if (Object.keys(error)[0] === 'mensagem'){
        mensagem = mensagem + ' ' + error.mensagem;
      }
      throw new MensagemErro(mensagem);
    }
  }

  async getTiposDebitos(params: ControllerVeiculosParams): Promise<TipoDebito> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterTiposDebitosResponse = await client.ObterTiposDebitos(veiculoConsulta);
      const tipoDebito = new TipoDebito(res.ObterTiposDebitosResult);
      if (tipoDebito.mensagemErro){
        throw new MensagemErro(tipoDebito.mensagemErro);
      }
      return tipoDebito;
    } catch (error) {
      let mensagem: string = MsgErro.SERV_GET_DEB_PREV;
      if (Object.keys(error)[0] === 'mensagem'){
        mensagem = mensagem + ' ' + error.mensagem;
      }
      throw new MensagemErro(mensagem);
    }
  }

  async getDebitosPorTipo(params: ControllerVeiculosParams): Promise<DebitoRetorno> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    params.tipo_debito = params.tipo_debito.toUpperCase();

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDebitosPorTipoDebitoResponseDTO = await client.ObterDebitosPorTipoDebito(veiculoConsulta);
      const debitos = new DebitoRetorno(res.ObterDebitosPorTipoDebitoResult, params.tipo_debito);
      if (debitos.mensagemErro){
        throw new MensagemErro(debitos.mensagemErro);
      }
      return debitos;
    } catch (error) {
      let mensagem: string = MsgErro.SERV_GET_DEB;
      if (Object.keys(error)[0] === 'mensagem'){
        mensagem = mensagem + ' ' + error.mensagem;
      }
      throw new MensagemErro(mensagem);
    }
  }

  async gerarGRU(params: ControllerVeiculosParams): Promise<GerarGuiaRetorno> {
    const veiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;
    const array_ids: Array<number> = new Array();

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      let deb: DebitoRetorno = await this.getDebitos(params);

      if (deb.debitos === []) {
        throw new MensagemErro(MsgErro.DEB_RET_VAZIO);
      } else {
        deb = await this.verificaIpvaCotaUnica(params, deb);
        for (const debito of deb.debitos) {
          array_ids.push(debito.idDebito);
        }
      }
    } catch (error) {
      if (error.mensagem === MsgErro.DEB_RET_VAZIO){
        throw new MensagemErro(MsgErro.DEB_RET_VAZIO);
      }else{
        throw new MensagemErro(MsgErro.SERV_GERAR_GUIA_DEB);
      }
    }

    veiculoConsulta.listaDebitos = array_ids.toString();

    try {
      const res: GerarGuiaResponseDTO = await client.GerarGuia(veiculoConsulta);
      const guia: GerarGuiaRetorno = new GerarGuiaRetorno(res.GerarGuiaResult);
      if (guia.mensagemErro){
        throw new MensagemErro(guia.mensagemErro);
      }
      return guia;
    } catch (error) {
      let mensagem: string = MsgErro.SERV_GERAR_GUIA;
      if (Object.keys(error)[0] === 'mensagem'){
        mensagem = mensagem + ' ' + error.mensagem;
      }
      throw new MensagemErro(mensagem);
    }
  }

  async gerarGRUParcial(params: ControllerVeiculosParams, listaIDs: Array<number>): Promise<GerarGuiaRetorno> {
    const veiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;
    let validoListaIDs: boolean;
    let deb: DebitoRetorno;

    try {
      deb = await this.getDebitosPorTipo(params);      
      if (deb[0] === MsgErro.DEB_RET_VAZIO) {
        validoListaIDs = false;
      } else {
        try {
          validoListaIDs = await this.validaListaDebitos(deb, listaIDs);
        } catch (error) {
          throw new MensagemErro(MsgErro.SERV_GERAR_GUIA_VAL);
        }
      }
    } catch (error) {
      throw new MensagemErro(MsgErro.SERV_GERAR_GUIA_VAL);
    }

    veiculoConsulta.listaDebitos = listaIDs.toString();

    if (validoListaIDs === true) {
      try {
        const res: GerarGuiaResponseDTO = await client.GerarGuia(veiculoConsulta);
        const guia: GerarGuiaRetorno = new GerarGuiaRetorno(res.GerarGuiaResult);
        if (guia.mensagemErro){
          throw new MensagemErro(guia.mensagemErro);
        }
        return guia;
      } catch (error) {
        let mensagem: string = MsgErro.SERV_GERAR_GUIA;
        if (Object.keys(error)[0] === 'mensagem'){
          mensagem = mensagem + ' ' + error.mensagem;
        }
        throw new MensagemErro(mensagem);
      }
    } else {
      throw new MensagemErro(MsgErro.SERV_GERAR_GUIA_OBR);
    }
  }

  async validaListaDebitos(deb: DebitoRetorno, listaIDs: Array<number>): Promise<boolean> {
    try {

      if(await this.validaIPVA(deb, listaIDs) === false){
        return false;
      }
      for (const debito of deb.debitos) {
        if (debito.flag.checked === true && debito.flag.disabled === true) {
          const index = listaIDs.indexOf(debito.idDebito);
          if (index <= -1) {
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }


  async validaIPVA(deb: DebitoRetorno, listaIDs: Array<number>): Promise<boolean> {
    let ipvaCotasMaisNovo: number = 0;
    try {
      for (const debito of deb.debitos) {
        const index = listaIDs.indexOf(debito.idDebito);
        if (index > -1 && ipvaCotasMaisNovo < Number(debito.ipvaCotas)) {
          ipvaCotasMaisNovo = Number(debito.ipvaCotas);
        }
      }

      for (const debito of deb.debitos) {
        const index = listaIDs.indexOf(debito.idDebito);
        if (Number(debito.ipvaCotas) <= ipvaCotasMaisNovo && debito.parcela !== 0) {
          if (index <= -1) {
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async verificaIpvaCotaUnica(params: ControllerVeiculosParams, debitos: DebitoRetorno): Promise<DebitoRetorno> {
    let ipvaCotaUnica: boolean = false;
    let cotaUniExerc: number = -1;
    const regExIpvaCotas = /^\d{4}0$/g;
    let ipvaDebitos: DebitoRetorno;

    params.tipo_debito = 'ipva';
    ipvaDebitos = await this.getDebitosPorTipo(params);

    for (const ipvadeb of ipvaDebitos.debitos) {
      if (regExIpvaCotas.test(ipvadeb.ipvaCotas)) {
        ipvaCotaUnica = true;
        cotaUniExerc = ipvadeb.exercicio;
        break;
      }
    }

    if (ipvaCotaUnica) {

      for (const ipvadeb of ipvaDebitos.debitos) {
        if (ipvadeb.exercicio === cotaUniExerc && ipvadeb.parcela !== 0) {
          const result = debitos.debitos.findIndex(
            obj => obj.idDebito === ipvadeb.idDebito,
          );
          debitos.debitos.splice(result, 1);
        }
      }
    }
    return debitos;
  }
}
