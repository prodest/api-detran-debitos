import { Injectable } from '@nestjs/common';

import { ControllerVeiculosParams } from '../models/controller_model/controllerVeiculosParams';
import { MensagemErro } from '../common/mensagem_erro/mensagemErro';
import { DebitoRetornoDTO } from '../models/dto/debitoRetorno.dto';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { GerarGuiaRetornoDTO } from '../models/dto/gerarGuiaRetorno.dto';
import { TipoDebitoDTO } from '../models/dto/tipoDebito.dto';
import { VeiculoConsultaDTO } from '../models/dto/veiculoConsulta.dto';
import { VeiculoRetornoDTO } from '../models/dto/veiculoRetorno.dto';
import { DetranSoapClient } from '../repository/detran-soap-client';
import { ObterDadosVeiculoResponse } from '../models/wsib_models/obterDadosVeiculoResponse.model';
import { ObterDebitosResponse } from '../models/wsib_models/obterDebitosResponse.model';
import { ObterTiposDebitosResponse } from '../models/wsib_models/obterTiposDebitosResponse.model';
import { ObterDebitosPorTipoDebitoResponse } from '../models/wsib_models/obterDebitosPorTipoDebitoResponse.model';
import { GerarGuiaResponse } from '../models/wsib_models/gerarGuiaResponse.model';

@Injectable()
export class VeiculosService {
  private detranSoapClient: DetranSoapClient;

  constructor() {
    this.detranSoapClient = new DetranSoapClient();
  }

  async getDadosVeiculos(params: ControllerVeiculosParams): Promise<VeiculoRetornoDTO> {
    const veiculoConsulta: VeiculoConsultaDTO = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDadosVeiculoResponse = await client.ObterDadosVeiculo(veiculoConsulta);
      const veiculoRetorno = new VeiculoRetornoDTO(res.ObterDadosVeiculoResult);
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

  async getDebitos(params: ControllerVeiculosParams): Promise<DebitoRetornoDTO> {
    const veiculoConsulta: VeiculoConsultaDTO = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDebitosResponse = await client.ObterDebitos(veiculoConsulta);
      const debitos = new DebitoRetornoDTO(res.ObterDebitosResult);
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

  async getTiposDebitos(params: ControllerVeiculosParams): Promise<TipoDebitoDTO> {
    const veiculoConsulta: VeiculoConsultaDTO = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterTiposDebitosResponse = await client.ObterTiposDebitos(veiculoConsulta);
      const tipoDebito = new TipoDebitoDTO(res.ObterTiposDebitosResult);
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

  async getDebitosPorTipo(params: ControllerVeiculosParams): Promise<DebitoRetornoDTO> {
    const veiculoConsulta: VeiculoConsultaDTO = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;

    params.tipo_debito = params.tipo_debito.toUpperCase();

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      const res: ObterDebitosPorTipoDebitoResponse = await client.ObterDebitosPorTipoDebito(veiculoConsulta);
      const debitos = new DebitoRetornoDTO(res.ObterDebitosPorTipoDebitoResult, params.tipo_debito);
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

  async gerarGRU(params: ControllerVeiculosParams): Promise<GerarGuiaRetornoDTO> {
    const veiculoConsulta = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;
    const array_ids: Array<number> = new Array();

    if (Object.keys(client)[0] === 'mensagemErro') {
      throw new MensagemErro(client.mensagemErro);
    }

    try {
      let deb: DebitoRetornoDTO = await this.getDebitos(params);

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
      const res: GerarGuiaResponse = await client.GerarGuia(veiculoConsulta);
      const guia: GerarGuiaRetornoDTO = new GerarGuiaRetornoDTO(res.GerarGuiaResult);
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

  async gerarGRUParcial(params: ControllerVeiculosParams, listaIDs: Array<number>): Promise<GerarGuiaRetornoDTO> {
    const veiculoConsulta = new VeiculoConsultaDTO(params);
    const client = await this.detranSoapClient._client;
    let validoListaIDs: boolean;
    let deb: DebitoRetornoDTO;

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
        const res: GerarGuiaResponse = await client.GerarGuia(veiculoConsulta);
        const guia: GerarGuiaRetornoDTO = new GerarGuiaRetornoDTO(res.GerarGuiaResult);
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

  async validaListaDebitos(deb: DebitoRetornoDTO, listaIDs: Array<number>): Promise<boolean> {
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


  async validaIPVA(deb: DebitoRetornoDTO, listaIDs: Array<number>): Promise<boolean> {
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

  async verificaIpvaCotaUnica(params: ControllerVeiculosParams, debitos: DebitoRetornoDTO): Promise<DebitoRetornoDTO> {
    let ipvaCotaUnica: boolean = false;
    let cotaUniExerc: number = -1;
    const regExIpvaCotas = /^\d{4}0$/g;
    let ipvaDebitos: DebitoRetornoDTO;

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
