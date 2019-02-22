import { Controller, Get, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { VeiculosService } from '../services/veiculos.service';
import { ApiOperation, ApiResponse, ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';
import { Retorno } from '../models/retorno.model';
import { Debito } from '../models/debito.model';
import { VeiculoRetorno } from '../models/veiculoRetorno.model';
import { TipoDebito } from '../models/tipoDebito.model';
import { DebitoRetorno } from '../models/debitoRetorno.model';
import { GerarGuiaRetorno } from '../models/gerarGuiaRetorno.model';

@Controller( 'veiculos' )
@ApiUseTags('veiculos-debitos')
export class VeiculosController {
  resposta: Retorno;
  respostaErro: any;

  constructor( private readonly veiculosService: VeiculosService ) { }

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
  async getDadosVeiculos( @Res() res, @Param() params ) {
    try {
      this.resposta = await this.veiculosService.getDadosVeiculos( params );
      res.status( this.resposta.status ).send( this.resposta.res);
    } catch ( error ) {
      throw new HttpException('Error ao fazer a requisição dos dados do veiculo.', HttpStatus.FORBIDDEN);
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
  async getDebitos( @Res() res, @Param() params ) {
    try {
      this.resposta = await this.veiculosService.getDebitos( params );
      res.status( this.resposta.status ).send( this.resposta.res);
    } catch (error) {
      throw new HttpException('Erro ao requisitar os débitos.', HttpStatus.FORBIDDEN);
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
  async getDebitosPreview( @Res() res, @Param() params ) {
    try {
      this.resposta = await this.veiculosService.getDebitosPreview( params );
      res.status( this.resposta.status ).send( this.resposta.res);
    } catch (error) {
      throw new HttpException('Erro ao exibir preview dos debitos.', HttpStatus.FORBIDDEN);
    }
  }

  @Get( ':placa/:renavam/debitos-tipo/:tipo_debito' )
  @ApiOperation( {
    description: 'Retorna uma lista de débitos do veiculo filtrada pelo tipo: LICENCIAMENTOATUAL, LICENCIAMETO ANTERIOR, IPVA, IPVAANTERIOR, DPVT, DPVATANTERIOR, MULTA',
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
  async getTiposDebitos( @Res() res, @Param() params ) {
    try {
      this.resposta = await this.veiculosService.getTiposDebitos( params );
      res.status( this.resposta.status ).send( this.resposta.res );
    } catch (error) {
      throw new HttpException('Erro ao exibir lista de debitos do tipo.', HttpStatus.FORBIDDEN);
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
  async gerarGRU ( @Res() res: Response, @Param() params ) {

    try {
      const resposta = await this.veiculosService.gerarGRU( params );
      
      if (resposta.status === HttpStatus.OK) {
        const pdf = new Buffer(resposta.res.guiaPDF, 'base64');
        return res.status(resposta.status)
           .header('Content-Type', 'application/pdf')
           .send(pdf);
      }

      return res.status( resposta.status ).send( resposta.res );
    } catch ( error ) {
      throw new HttpException( 'Erro ao gerar a GRU.', HttpStatus.FORBIDDEN );
    }
  }

  @Get( ':placa/:renavam/debitos/guia/:tipo_debito/:listaIDs' )
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
  @ApiImplicitParam( {
    name: 'listaIDs',
    description: 'Lista de IDs de debitos, separados por virgula',
    required: true,
  } )
  async gerarGRUParcial( @Res() res, @Param() params ) {

    try {
      this.resposta = await this.veiculosService.gerarGRUParcial( params);
      res.status( this.resposta.status ).send( this.resposta.res );
    } catch (error) {
      throw new HttpException('Erro ao gerar a GRU.', HttpStatus.FORBIDDEN);
    }
  }

}