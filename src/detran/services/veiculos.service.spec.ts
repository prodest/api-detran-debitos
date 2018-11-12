import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosService } from './veiculos.service';
jest.mock( './veiculos.service' );

let placa: string;
let doc_proprietario: string;
let respostaDoTeste: any;
let tipo_debito: string;

describe( 'VeiculosService', () => {
  let service: VeiculosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ VeiculosService ],
    } ).compile();
    service = module.get<VeiculosService>( VeiculosService );
  } );

  it( 'SearchVehicle() com dados válidos deve retornar dados do veículo', async () => {
    placa = 'VAL1705';
    doc_proprietario = '9876543210';
    respostaDoTeste = await service.getDadosVeiculos( placa, doc_proprietario );
    expect( Object.keys(respostaDoTeste.res)[0])
      .toBe( 'VeiculoInfo' );
  } );

  it( 'getDadosVeiculosWS() com dados errados deve retornar mensagem de erro', async () => {
    placa = 'a';
    doc_proprietario = '12345678910';
    respostaDoTeste = await service.getDadosVeiculos( placa, doc_proprietario );
    expect( respostaDoTeste.res.MensagemErro )
      .toBe( 'Veículo não encontrado.' );
  } );

  it( 'SearchVehicle() com dados de veículo roubado deve impedir a consulta', async () => {
    placa = 'ROU8470';
    doc_proprietario = '12345678910';
    respostaDoTeste = await service.getDadosVeiculos( placa, doc_proprietario );
    expect( respostaDoTeste.res.MensagemErro )
      .toBe( 'Consulta não permitida para veículo com registro de furto/roubo ativo' );
  } );

  /* GetTickets() */

  it( 'GetTickets() com dados válidos deve retornar uma lista com todoso os debitos', async () => {
    placa = 'VAL1705';
    doc_proprietario = '9876543210';
    respostaDoTeste = await service.getDebits( placa, doc_proprietario );
    expect( Object.keys(respostaDoTeste.res.Debito)[0] )
      .toBe( 'Debito' );
  } );

  it( 'getDebits() com dados inválidos ou veiculo não pussui debitos deve retornar uma lista vazia de debitos', async () => {
    placa = 'XXX0000';
    doc_proprietario = '12345678910';
    respostaDoTeste = await service.getDebits( placa, doc_proprietario );
    expect( respostaDoTeste.res.Debito )
      .toBe( null );
  } );

  /* getDebitsPreview() */

  it( 'getDebitsPreview() com dados válidos deve retornar uma lista de uma previa dos débitos', async () => {
    placa = 'VAL1705';
    doc_proprietario = '9876543210';
    respostaDoTeste = await service.getDebitsPreview( placa, doc_proprietario );
    expect( Object.keys(respostaDoTeste.res)[0] )
      .toBe( 'TipoDebito' );
  } );

  /* getTypeDebits() */

  it( 'getTypeDebits() com dados válidos deve retornar uma lista com somente um tipo de débito', async () => {
    placa = 'VAL1705';
    doc_proprietario = '9876543210';
    tipo_debito = 'IPVA'
    respostaDoTeste = await service.getTypeDebits( placa, doc_proprietario, tipo_debito );
    expect( Object.keys(respostaDoTeste.res)[0] )
      .toBe( 'Debito' );
  } );

  /* gerarGRU() */
  it( 'getTypeDebits() somente com a placa do carro e o documento do proprietario', async () => {
    const params = {
      placa: 'ABC1234',
      doc_proprietario: '9876543210',
    };
    respostaDoTeste = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste.res.Guia)[0] )
      .toBe( 'ItemGuia' );
  } );
} );