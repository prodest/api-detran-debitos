import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DetranSoapClient } from '../repository/detran-soap-client';
import { Retorno } from '../models/retorno.model';
import { VeiculoConsulta } from '../models/veiculoConsulta.model';
import { VeiculoRetorno } from '../models/veiculoRetorno.model';
import { DebitoRetorno } from '../models/debitoRetorno.model';
import { GerarGuiaRetorno } from '../models/gerarGuiaRetorno.model';
import { TipoDebito } from '../models/tipoDebito.model';
import { TypeDeb } from '../models/enum';
import { ControllerVeiculosParams } from '../common/controllerVeiculosParams';

@Injectable()
export class VeiculosService {
  private detranSoapClient: DetranSoapClient;

  constructor() {
    this.detranSoapClient = new DetranSoapClient();
  }

  async getDadosVeiculos(params: ControllerVeiculosParams): Promise<Retorno<VeiculoRetorno>> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      return new Retorno(client);
    }

    try {
      const res = await client.ObterDadosVeiculo(veiculoConsulta);
      const veiculoRetorno = new VeiculoRetorno(res.ObterDadosVeiculoResult);
      return new Retorno<VeiculoRetorno>(veiculoRetorno);
    } catch (error) {
      throw new HttpException('Erro ao obter os dados do veiculo. ', HttpStatus.FORBIDDEN);
    }
  }

  async getDebitos(params: ControllerVeiculosParams): Promise<Retorno<DebitoRetorno>> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      return new Retorno(client);
    }

    try {
      const res = await client.ObterDebitos(veiculoConsulta);
      const debitos = new DebitoRetorno(res.ObterDebitosResult);
      return new Retorno<DebitoRetorno>(debitos);
    } catch (error) {
      throw new HttpException( 'Erro ao obter debitos.', HttpStatus.FORBIDDEN);
    }
  }

  async getDebitosPreview(params: ControllerVeiculosParams): Promise<Retorno<TipoDebito>> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      return new Retorno(client);
    }

    try {
      const res = await client.ObterTiposDebitos(veiculoConsulta);
      const tipoDebito = new TipoDebito(res.ObterTiposDebitosResult.TipoDebito);

      return new Retorno<TipoDebito>(tipoDebito);
    } catch (error) {
      throw new HttpException('Erro ao buscar debitos.', HttpStatus.FORBIDDEN);
    }
  }

  async getTiposDebitos(params: ControllerVeiculosParams): Promise<Retorno<DebitoRetorno>> {
    const veiculoConsulta: VeiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;

    if (Object.keys(client)[0] === 'mensagemErro') {
      return new Retorno(client);
    }

    try {
      const res = await client.ObterDebitosPorTipoDebito(veiculoConsulta);
      const debitos = new DebitoRetorno(res.ObterDebitosPorTipoDebitoResult);
      return new Retorno<DebitoRetorno>(debitos);
    } catch (error) {
      throw new HttpException('Erro ao buscar os debitos.', HttpStatus.FORBIDDEN);
    }
  }

  async gerarGRU(params: ControllerVeiculosParams): Promise<Retorno<GerarGuiaRetorno>> {
    const veiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;
    const array_ids: Array<string> = new Array();

    if (Object.keys(client)[0] === 'mensagemErro') {
      return new Retorno(client);
    }

    try {
      let deb: Retorno<DebitoRetorno> = await this.getDebitos(params);
      if (
        deb.res[0] === 'Não foram encontrados debitos para esse veiculo.' ||
        deb.status !== HttpStatus.OK
      ) {
        return deb;
      } else {
        deb = await this.verificaIpvaCotaUnica(params, deb);
        for (const debito of deb.res.debitos) {
          array_ids.push(debito.idDebito);
        }
      }
    } catch (error) {
        throw new HttpException('Erro ao buscar os debitos.', HttpStatus.FORBIDDEN);
    }

    veiculoConsulta.listaDebitos = array_ids.toString();

    try {
      const res = await client.GerarGuia(veiculoConsulta);
      const guia: GerarGuiaRetorno = new GerarGuiaRetorno(res.GerarGuiaResult);
      return new Retorno(guia);
    } catch (error) {
      throw new HttpException('Error ao gerar a GRU.', HttpStatus.FORBIDDEN);
    }
  }

  async gerarGRUParcial(params: ControllerVeiculosParams): Promise<Retorno<GerarGuiaRetorno>> {
    const veiculoConsulta = new VeiculoConsulta(params);
    const client = await this.detranSoapClient._client;
    let validoListaIDs: boolean;
    let deb: Retorno<DebitoRetorno>;

    const listaIDs: Array<number> = params.listaIDs.split(',').map(Number);

    try {
      deb = await this.getTiposDebitos(params);
      if (
        deb.res[0] === 'Não foram encontrados debitos para esse veiculo.' ||
        deb.status !== HttpStatus.OK
      ) {
        validoListaIDs = false;
      } else {
        try {
          switch (params.tipo_debito.toUpperCase()) {
            case TypeDeb.LICATUAL:
              validoListaIDs = await this.validaLicenciamentoAtual(
                deb,
                listaIDs,
              );
              break;
            case TypeDeb.LICANTER:
              validoListaIDs = await this.validaLicenciamentoAnterior(
                deb,
                listaIDs,
              );
              break;
            case TypeDeb.IPVAATUAL:
              validoListaIDs = await this.validaIPVA(deb, listaIDs);
              break;
            case TypeDeb.IPVAANTER:
              validoListaIDs = await this.validaIPVAAnterior(deb, listaIDs);
              break;
            case TypeDeb.DPVATATUA:
              validoListaIDs = await this.validaDPVAT(deb, listaIDs);
              break;
            case TypeDeb.DPVATANTE:
              validoListaIDs = await this.validaDPVATAnterior(deb, listaIDs);
              break;
            case TypeDeb.MULTA:
              validoListaIDs = await this.validaMulta(deb, listaIDs);
              break;
            default:
            throw new HttpException('Tipo não cadastrado.', HttpStatus.FORBIDDEN);
          }
        } catch (error) {
          throw new HttpException('Error ao validar debitos. Tente novamente mais tarde.', HttpStatus.FORBIDDEN);
        }
      }
    } catch (error) {
      throw new HttpException('Error ao validar a lista de debitos.', HttpStatus.FORBIDDEN);
    }

    veiculoConsulta.listaDebitos = listaIDs.toString();

    if (validoListaIDs === true) {
      try {
        const res = await client.GerarGuia(veiculoConsulta);
        const guia: GerarGuiaRetorno = new GerarGuiaRetorno(res.GerarGuiaResult);
        return new Retorno<GerarGuiaRetorno>(guia);
      } catch (error) {
        throw new HttpException('Error ao gerar a GRU.', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Debitos obrigatorios não foram passados.', HttpStatus.FORBIDDEN);
    }
  }

  async validaLicenciamentoAtual(
    deb: Retorno<DebitoRetorno>,
    listaIDs: Array<number>,
  ): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        if (debito.flagLicenciamentoExercicio === 1) {
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

  async validaLicenciamentoAnterior(
    deb: Retorno<DebitoRetorno>,
    listaIDs: Array<number>,
  ): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        if (debito.flagLicenciamentoAnterior === 1) {
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

  async validaIPVA(deb: Retorno<DebitoRetorno>, listaIDs: Array<number>): Promise<boolean> {
    let ipvaCotasMaisNovo: number = 0;
    try {
      for (const debito of deb.res.debitos) {
        const index = listaIDs.indexOf(debito.idDebito);
        if (index > -1 && ipvaCotasMaisNovo < Number(debito.ipvaCotas)) {
          ipvaCotasMaisNovo = Number(debito.ipvaCotas);
        }
      }

      for (const debito of deb.res.debitos) {
        const index = listaIDs.indexOf(debito.idDebito);
        if (
          debito.flagIpvaExercicio === 1 ||
          (Number(debito.ipvaCotas) <= ipvaCotasMaisNovo &&
            debito.parcela !== 0)
        ) {
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

  async validaIPVAAnterior(
    deb: Retorno<DebitoRetorno>,
    listaIDs: Array<number>,
  ): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        const index = listaIDs.indexOf(debito.idDebito);
        if (debito.flagIpvaAnterior === 1) {
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

  async validaDPVAT(deb: Retorno<DebitoRetorno>, listaIDs: Array<number>): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        if (debito.flagDpvatExercicio === 1) {
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

  async validaDPVATAnterior(
    deb: Retorno<DebitoRetorno>,
    listaIDs: Array<number>,
  ): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        if (debito.flagDpvatAnterior === 1) {
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

  async validaMulta(deb: Retorno<DebitoRetorno>, listaIDs: Array<number>): Promise<boolean> {
    try {
      for (const debito of deb.res.debitos) {
        if (debito.flagMulta === 1) {
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

  async verificaIpvaCotaUnica(params: any, debitos: Retorno<DebitoRetorno>): Promise<Retorno<any>> {
    let ipvaCotaUnica: boolean = false;
    let cotaUniExerc: number = -1;
    const regExIpvaCotas = /^\d{4}0$/g;
    let ipvaDebitos: Retorno<DebitoRetorno>;

    params.tipo_debito = 'ipva';
    ipvaDebitos = await this.getTiposDebitos(params);

    for (const ipvadeb of ipvaDebitos.res.debitos) {
      if (regExIpvaCotas.test(ipvadeb.ipvaCotas)) {
        ipvaCotaUnica = true;
        cotaUniExerc = ipvadeb.exercicio;
        break;
      }
    }

    if (ipvaCotaUnica) {
      for (const ipvadeb of ipvaDebitos.res.debitos) {
        if (ipvadeb.exercicio === cotaUniExerc && ipvadeb.parcela !== 0) {
          const result = debitos.res.debitos.findIndex(
            obj => obj.idDebito === ipvadeb.idDebito,
          );
          debitos.res.debitos.splice(result, 1);
        }
      }
    }
    return debitos;
  }
}
