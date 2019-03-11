import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosService } from './veiculos.service';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { ControllerVeiculosParams } from '../common/controllerVeiculosParams';

jest.mock( './veiculos.service' );

let params: ControllerVeiculosParams;
let respostaDoTeste: any;

describe( 'VeiculosService', () => {
  let service: VeiculosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ VeiculosService ],
    } ).compile();
    service = module.get<VeiculosService>( VeiculosService );
  } );

  it( 'getDadosVeiculos() com dados válidos deve retornar dados do veículo', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    respostaDoTeste = await service.getDadosVeiculos( params );
    expect( Object.keys(respostaDoTeste)[0])
      .toBe( 'placa' );
  } );

  it( 'getDadosVeiculosWS() com dados errados deve retornar mensagem de erro', async () => {
    params = {
      placa: 'AB45SD2',
      renavam: '12345678910',
    };
    respostaDoTeste = await service.getDadosVeiculos(  params );
    expect( respostaDoTeste.mensagemErro )
      .toBe( 'Veículo não encontrado.' );
  } );

  it( 'getDadosVeiculos() com dados de veículo roubado deve impedir a consulta', async () => {
    params = {
      placa: 'ROU8470',
      renavam: '12345678910',
    };
    respostaDoTeste = await service.getDadosVeiculos(  params );
    expect( respostaDoTeste.mensagemErro )
      .toBe( 'Consulta não permitida para veículo com registro de furto/roubo ativo' );
  } );

  /* getDebitos() */
  it( 'getDebitos() com dados válidos deve retornar uma lista com todoso os debitos', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    respostaDoTeste = await service.getDebitos( params );

    expect( respostaDoTeste.debitos[0].descricaoServico )
      .toBe( 'Licenciamento Anual 2018' );
  } );

  it( 'getDebitos() com dados inválidos ou veiculo não pussui debitos deve retornar uma mensagem', async () => {
    params = {
      placa: 'XXX0000',
      renavam: '12345678910',
    };
    respostaDoTeste = await service.getDebitos( params );
    expect( respostaDoTeste.debitos[0] )
      .toBe( MsgErro.DEB_RET_VAZIO );
  } );

  /* getDebitosPreview() */
  it( 'getDebitosPreview() com dados válidos deve retornar uma lista de uma previa dos débitos', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    respostaDoTeste = await service.getDebitosPreview( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'temLicenciamentoAnual' );
  } );

  /* getTiposDebitos() */
  it( 'getTiposDebitos() com dados válidos deve retornar uma lista com somente um tipo de débito', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
      tipo_debito: 'IPVA',
    };
    respostaDoTeste = await service.getTiposDebitos( params );
    expect( respostaDoTeste.debitos[0].descricaoServico )
      .toBe( 'IPVA 4ª Cota 2018' );
  } );

  /* gerarGRU() */
  it( 'gerarGRU com dados validos deve retornar uma guia', async () => {
    params = {
      placa: 'ABC1234',
      renavam: '98765432101',
    };
    respostaDoTeste = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'itensGuia' );
  } );

  it( 'gerarGRUParcial com dados validos deve retornar uma guia', async () => {
    params = {
      placa: 'ABC1234',
      renavam: '98765432101',
      tipo_debito: 'dpvat',
      listaIDs: '78994446,84677037',
    };
    respostaDoTeste = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'itensGuia' );
  } );

  it( 'gerarGRUParcial faltando debitos obrigatorios deve retornar uma mensagemErro', async () => {
    params = {
      placa: 'ABC1234',
      renavam: '98765432101',
      tipo_debito: 'dpvat',
      listaIDs: '84677037',
    };
    respostaDoTeste = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'mensagemErro' );
  } );

  it( 'gerarGRU com cota unica e as demais cotas do IPVA do mesmo exercicio', async () => {
    params = {
      placa: 'COT4100',
      renavam: '98765432101',
    };
    respostaDoTeste = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'mensagemErro' );
  } );

} );
