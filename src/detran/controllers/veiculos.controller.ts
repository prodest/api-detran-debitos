import { Controller, Get, Param, Res, HttpStatus, HttpException, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiImplicitParam, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

import { ControllerVeiculosParams } from '../models/controller_model/controllerVeiculosParams';
import { DebitoDTO } from '../models/dto/debitoDTO.dto';
import { DebitoRetornoDTO } from '../models/dto/debitoRetorno.dto';
import { GerarGuiaRetornoDTO } from '../models/dto/gerarGuiaRetorno.dto';
import { TipoDebitoDTO } from '../models/dto/tipoDebito.dto';
import { VeiculosService } from '../services/veiculos.service';
import { VeiculoRetornoDTO } from '../models/dto/veiculoRetorno.dto';
import { ListaIDsDTO } from '../models/dto/listaIDs.dto';
import { RedisAsync } from '../common/config/redis-async.config';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { Guia } from '../models/wsib_models/guia.model';

@Controller( 'veiculos' )
@ApiUseTags('veiculos-debitos')
export class VeiculosController {

  constructor( private readonly veiculosService: VeiculosService ) {
  }

  @Get( ':placa/:renavam' )
  @ApiOperation( {
    description: 'Retorna os dados do veículo.',
    title: 'Dados do veículo. Retorna',
  } )
  @ApiResponse( { status: 200, description: 'Retorna informações do veículo.', type: VeiculoRetornoDTO } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  async getDadosVeiculos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: VeiculoRetornoDTO = await this.veiculosService.getDadosVeiculos( params );
      res.status( HttpStatus.OK ).send( resposta );
    } catch ( error ) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos' )
  @ApiOperation( {
    description: 'Retorna uma lista com os débitos do veículo.',
      title: 'Débitos do veículo. Ex.:: /veiculos/VAL1705/1234567910/debitos',
  } )
  @ApiResponse( { status: 200, description: 'Veículo encontrado, retorna um array de débitos.', type: DebitoDTO } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  async getDebitos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: DebitoRetornoDTO = await this.veiculosService.getDebitos( params );
      res.status( HttpStatus.OK ).send( resposta.debitos);
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }

  }

  @Get( ':placa/:renavam/debitos-preview' )
  @ApiOperation( {
    description: 'Retorna um objeto com os tipos de débitos dizendo se ele possui ou não débitos daquele tipo.',
    title: 'Prévia dos débitos do veículo. Ex.: /veiculos/VAL1705/1234567910/debitos-preview',
  } )
  @ApiResponse( { status: 200, description: 'Veículo encontrado, retorna om objeto com os tipos de débitos.', type: TipoDebitoDTO } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  async getTiposDebitos( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: TipoDebitoDTO = await this.veiculosService.getTiposDebitos( params );
      res.status( HttpStatus.OK ).send( resposta);
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos-tipo/:tipo_debito' )
  @ApiOperation( {
    description: 'Retorna uma lista de débitos do veículo filtrada pelo tipo:\
    LICENCIAMENTOATUAL, LICENCIAMETO ANTERIOR, IPVA, IPVAANTERIOR, DPVT, DPVATANTERIOR, MULTA.\
    A flag presentes nos objetos do tipo \'Debito\' retornados determinam se o débito é obrigatório na hora\
    de gerar a guia para o pagamento.',
    title: 'Lista de débitos filtrado por tipo. Ex.: /veiculos/VAL1705/1234567910/debitos-tipo/licenciamentoatual',
  } )
  @ApiResponse( { status: 200, description: 'Veículo encontrado, retorna um array de débitos.', type: DebitoDTO } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'tipo_debito',
    description: 'Tipo de débito.',
    required: true,
  } )
  async getDebitosPorTipo( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    try {
      const resposta: DebitoRetornoDTO = await this.veiculosService.getDebitosPorTipo( params );
      res.status( HttpStatus.OK ).send( resposta.debitos );
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos/guia' )
  @ApiOperation( {
    description: 'Retornar um objeto com um Array de ItensGuia, que contém informações como o número do código de barras\
    e o valor da guia, e o PDF da guia em base64. Usado para quando se quer pagar todos os débitos.',
    title: 'Gerar GRU de todos os débitos. Ex.: /veiculos/VAL1705/1234567910/debitos/guia',
  } )
  @ApiResponse( { status: 200, description: 'Veículo encontrado, retorna o um array de itens\
  e o pdf do boleto, em base64.', type: GerarGuiaRetornoDTO } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  async gerarGRU( @Res() res: Response, @Param() params: ControllerVeiculosParams ) {
    const redisAsync = new RedisAsync();
    redisAsync.client.on('error', (err: Error) => {
      // tslint:disable-next-line: no-console
      console.log('Redis-Async Error: ' + err);
    });

    try {
      const resposta: GerarGuiaRetornoDTO = await this.veiculosService.gerarGRU( params );
      redisAsync.client.set(resposta.itensGuia[0].codigoBarra, resposta.guiaPDF);
      redisAsync.client.expire(resposta.itensGuia[0].codigoBarra, parseInt(process.env.REDIS_GUIA_TIME, 10));
      res.status( HttpStatus.OK ).send( resposta );
    } catch ( error ) {
      throw new HttpException( error.mensagem, HttpStatus.FORBIDDEN );
    }
  }

  @Post( ':placa/:renavam/debitos/guia/:tipo_debito' )
  @ApiOperation( {
    description: 'Retornar um objeto com um Array de ItensGuia, que contém informações como o número do código de barras\
    e o valor da guia, e o PDF da guia em base64, de um determinado tipo de débito. Usado quando pra quando se quer\
    pagar alguns débitos.',
    title: 'Gerar GRU de alguns débitos. Ex.: /veiculos/VAL1705/1234567910/debitos/guia/licenciamentoatual',
  } )
  @ApiResponse( { status: 200, description: 'Veículo encontrado, retorna o um array de itens \
  e o pdf em base64 do boleto.', type: Guia } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'placa',
    description: 'Placa do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'renavam',
    description: 'Renavam do veículo.',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'tipo_debito',
    description: 'tipo do débito.',
    required: true,
  } )
  @ApiImplicitBody( {
    name: 'ListaIDs',
    type: ListaIDsDTO,
    description: 'Array de \'idDebito\'.',
    required: true,
  } )
  async gerarGRUParcial( @Res() res: Response, @Param() params: ControllerVeiculosParams, @Body() listaIDs: ListaIDsDTO ) {
    const redisAsync = new RedisAsync();
    redisAsync.client.on('error', (err: Error) => {
      // tslint:disable-next-line: no-console
      console.log('Redis-Async Error: ' + err);
    });
    try {
      const resposta: GerarGuiaRetornoDTO = await this.veiculosService.gerarGRUParcial( params, listaIDs.lista );
      redisAsync.client.set(resposta.itensGuia[0].codigoBarra, resposta.guiaPDF);
      redisAsync.client.expire(resposta.itensGuia[0].codigoBarra, parseInt(process.env.REDIS_GUIA_TIME, 10));
      res.status( HttpStatus.OK ).send( resposta );
    } catch (error) {
      throw new HttpException(error.mensagem, HttpStatus.FORBIDDEN);
    }
  }

  @Get( 'debitos/get-guia/:codigoBarra' )
  @ApiOperation( {
    description: 'Retornar o pdf da guia para pagamento.',
    title: 'Guia PDF. Ex.: /veiculos/debitos/get-guia/85800000002215102192019000000000080000000000',
  } )
  @ApiResponse( { status: 200, description: 'Guia encontrada, retorna uma guia em pdf.' } )
  @ApiResponse( { status: 403, description: 'Retorna uma MensagemErro.' } )
  @ApiImplicitParam( {
    name: 'codigoBarra',
    description: 'Código de barras da guia gerada.',
    required: true,
  } )
  async getGuia( @Res() res: Response, @Param() params: {codigoBarra: string} ) {
    const redisAsync = new RedisAsync();
    redisAsync.client.on('error', (err: Error) => {
      // tslint:disable-next-line: no-console
      console.log('Redis-Async Error: ' + err);
    });
    try {
      const pdf64: string = await redisAsync.client.get(params.codigoBarra);
      const pdf: Buffer = Buffer.from(pdf64, 'base64');
      const dataAtual: Date = new Date();

      res.header('Content-Type', 'application/pdf')
         .header('Content-Disposition', `inline; filename=dua_detran_${dataAtual.getTime()}.pdf`)
         .status( HttpStatus.OK ).send(pdf);
    } catch (error) {
      throw new HttpException(MsgErro.CONT_GET_GUIA, HttpStatus.FORBIDDEN);
    }
  }

}