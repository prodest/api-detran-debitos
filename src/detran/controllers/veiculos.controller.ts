import { Controller, Get, Param, Res, HttpStatus, HttpException, Post, Body } from '@nestjs/common';
import * as Redis from 'async-redis';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiImplicitParam, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

import { ControllerVeiculosParams } from '../common/controllerVeiculosParams';
import { Debito } from '../models/debito.model';
import { DebitoRetorno } from '../models/debitoRetorno.model';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { GerarGuiaRetorno } from '../models/gerarGuiaRetorno.model';
import { TipoDebito } from '../models/tipoDebito.model';
import { VeiculosService } from '../services/veiculos.service';
import { VeiculoRetorno } from '../models/veiculoRetorno.model';
import { ListaIDs } from '../models/listaIDs.dto';

@Controller( 'veiculos' )
@ApiUseTags('veiculos-debitos')
export class VeiculosController {
  // redisClient = Redis.createClient({
  //   port: process.env.REDIS_PORT || 6379,
  //   host: process.env.REDIS_HOST || '127.0.0.1',
  // });

  constructor( private readonly veiculosService: VeiculosService ) {
//     this.redisClient.on('error', (err: Error) => {
// // tslint:disable-next-line: no-console
//       console.log('Error ' + err);
//     });
  }

  @Get( ':placa/:renavam' )
  @ApiOperation( {
    description: 'retorna os dados do veiculo através do WebService InternetBanking',
    title: 'Dados do veiculo',
  } )
  @ApiResponse( { status: 200, description: 'Retorna informações do veiculo ', type: VeiculoRetorno } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo.',
    required: true,
  } )
  async getDadosVeiculos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: VeiculoRetorno = await this.veiculosService.getDadosVeiculos( params );
      res.status( HttpStatus.OK ).send( resposta );
    } catch ( error ) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos' )
  @ApiOperation( {
    description: 'retorna uma lista com os débitos do veiculo',
    title: 'Débitos do veiculo',
  } )
  @ApiResponse( { status: 200, description: 'Veiculo encontrado, retorna um array de debitos', type: Debito } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo',
    required: true,
  } )
  async getDebitos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: DebitoRetorno = await this.veiculosService.getDebitos( params );
      res.status( HttpStatus.OK ).send( resposta.debitos);
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }

  }

  @Get( ':placa/:renavam/debitos-preview' )
  @ApiOperation( {
    description: 'Retorna uma previa dos débitos do veiculo',
    title: 'Prévia dos débitos do veiculo',
  } )
  @ApiResponse( { status: 200, description: 'Veiculo encontrado, retorna um array de debitos', type: TipoDebito } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo',
    required: true,
  } )
  async getDebitosPreview( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: TipoDebito = await this.veiculosService.getDebitosPreview( params );
      res.status( HttpStatus.OK ).send( resposta);
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos-tipo/:tipo_debito' )
  @ApiOperation( {
    description: 'Retorna uma lista de débitos do veiculo filtrada pelo tipo:\
                  LICENCIAMENTOATUAL, LICENCIAMETO ANTERIOR, IPVA, IPVAANTERIOR, DPVT, DPVATANTERIOR, MULTA',
    title: 'Lista de débitos filtrado por tipo',
  } )
  @ApiResponse( { status: 200, description: 'Veiculo encontrado, retorna um array de debitos', type: Debito } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'tipo_debito',
    description: 'Tipo de debitos',
    required: true,
  } )
  async getTiposDebitos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: DebitoRetorno = await this.veiculosService.getTiposDebitos( params );
      res.status( HttpStatus.OK ).send( resposta.debitos );
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos/guia' )
  @ApiOperation( {
    description: 'Retornar uma GRU com todos os debitos ',
    title: 'Gerar GRU de todos os débitos',
  } )
  @ApiResponse( { status: 200, description: 'Veiculo encontrado, retorna o um array de itens e o pdf do boleto, em base64', type: GerarGuiaRetorno } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo',
    required: true,
  } )
  async gerarGRU( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {

    try {
      const resposta: GerarGuiaRetorno = await this.veiculosService.gerarGRU( params );
      // this.redisClient.set(resposta.itensGuia[0].codigoBarra, resposta.guiaPDF);
      // this.redisClient.expire(resposta.itensGuia[0].codigoBarra, parseInt(process.env.REDIS_GUIA_TIME, 10));
      res.status( HttpStatus.OK ).send( resposta );
    } catch ( error ) {
      throw new HttpException( error.mensagem, HttpStatus.FORBIDDEN );
    }
  }

  @Post( ':placa/:renavam/debitos/guia/:tipo_debito' )
  @ApiOperation( {
    description: 'Retornar uma guia para pagamento dos debitos requisitados.',
    title: 'Gerar GRU de alguns debitos',
  } )
  @ApiResponse( { status: 200, description: 'Veiculo encontrado, retorna o um array de itens e o pdf em base64 do boleto', type: DebitoRetorno } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veiculo',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'tipo_debito',
    description: 'tipo do debito',
    required: true,
  } )
  @ApiImplicitBody( {
    name: 'ListaIDs',
    type: ListaIDs,
    description: 'Array com os IDs dos debitos.',
    required: true,
  } )
  async gerarGRUParcial( @Res() res: Response, @Param() params: ControllerVeiculosParams, @Body() listaIDs: ListaIDs ) {

    try {
      // console.log('LISTAIDS ', listaIDs);
      const resposta: GerarGuiaRetorno = await this.veiculosService.gerarGRUParcial( params, listaIDs.lista );
      // this.redisClient.set(resposta.itensGuia[0].codigoBarra, resposta.guiaPDF);
      // this.redisClient.expire(resposta.itensGuia[0].codigoBarra, parseInt(process.env.REDIS_GUIA_TIME, 10));
      res.status( HttpStatus.OK ).send( resposta );
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  // @Get( 'debitos/getGuia/:codigoBarra' )
  // @ApiOperation( {
  //   description: 'Retornar um pdf da guia para pagamento.',
  //   title: 'Guia PDF',
  // } )
  // @ApiResponse( { status: 200, description: 'Guia encontrada, retorna uma guia em pdf ', type: DebitoRetorno } )
  // @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro' } )
  // @ApiImplicitParam( {
  //   name: 'codigoBarra',
  //   description: 'Código de barras da guia gerada',
  //   required: true,
  // } )
  // async getGuia( @Res() res: Response, @Param() params: {codigoBarra: string} ) {

  //   try {
  //     const pdf64: string = await this.redisClient.get(params.codigoBarra);
  //     const pdf: Buffer = new Buffer(pdf64, 'base64');
  //     const dataAtual: Date = new Date();

  //     res.header('Content-Type', 'application/pdf')
  //        .header('Content-Disposition', `inline; filename=dua_detran_${dataAtual.getTime()}.pdf`)
  //        .status( HttpStatus.OK ).send(pdf);
  //   } catch (error) {
  //     throw new HttpException(MsgErro.CONT_GET_GUIA, HttpStatus.FORBIDDEN);
  //   }
  // }

}