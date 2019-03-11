import { loadFeature, defineFeature } from '../node_modules/jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DetranModule } from '../src/detran/detran.module';
import { MsgErro } from '../src/detran/models/enuns/msgErro.enum';
const feature = loadFeature( './test/features/listar_debitos.feature' );
jest.mock( '../src/detran/detran.module' );
jest.mock( '../src/detran/services/veiculos.service' );

let resposta: any;
let placa: string;
let renavam: string;
let dataVehicle: any;
let tipoDebito: string;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ DetranModule ],
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( 'Listando uma prévia dos tipos de debitos do usuario', ( {
    given,
    when,
    then,
  } ) => {
    given( 'o usuario informa a placa do veiculo', () => {
      placa = 'VAL1705';
    } );
    given( 'informa o renavam do veiculo', () => {
      renavam = '98765432101';
    } );
    when( 'o usuario solicitar uma previa da lista de debitos', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos-preview` );
      expect( resposta.status ).toBe( 200 );
    } );
    then(
      'o sistema retorna uma lista com a previa de todos os tipos de debitos',
      async () => {
      dataVehicle = resposta.body;
      expect( Object.keys( dataVehicle )[0] ).toContain( 'temLicenciamentoAnual' );
      },
    );
  } );

  test( 'Listando todos os debitos do usuario', ( { given, when, then } ) => {
    given( 'o usuario informa a placa do veiculo', async () => {
      placa = 'VAL1705';
    } );
    given( 'informa o renavam do veiculo', async () => {
      renavam = '98765432101';
    } );
    when( 'o usuario solicitar uma lista com todos debitos', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos` );
      expect( resposta.status ).toBe( 200 );
    } );
    then( 'o sistema retorna uma lista com todos os debitos', async () => {
      dataVehicle = resposta.body;
      expect( dataVehicle[0].descricaoServico ).toContain( 'Licenciamento Anual 2018' );
    } );
  } );

  test( 'Listando todos os debitos de um tipo de debito', ( {
    given,
    when,
    then,
  } ) => {
    given( 'o usuario informa a placa do veiculo', async () => {
      placa = 'VAL1705';
    } );
    given( 'informa o renavam do veiculo', async () => {
      renavam = '98765432101';
    } );
    given( 'o tipo de debito', async () => {
      tipoDebito = 'IPVA';
    } );
    when( 'o usuario solicitar uma lista de debitos do tipo selecionado', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos-tipo/${tipoDebito}` );
      expect( resposta.status ).toBe( 200 );
    } );
    then( 'o sistema retorna uma lista com o tipo de debito selecionado', () => {
      dataVehicle = resposta.body;
      expect( dataVehicle[0].descricaoServico ).toContain( 'IPVA 4ª Cota 2018' );
    } );
  } );

  test( 'O usuario não possui nenhum débito', ( { given, when, then } ) => {
    given( 'o usuario informa a placa do veiculo', async () => {
      placa = 'XXX0000';
    } );
    given( 'informa o renavam do veiculo', async () => {
      renavam = '2345678910';
    } );
    when( 'o usuario solicitar uma lista de debitos', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos` );
      expect( resposta.status ).toBe( 200 );
    } );
    then( 'o sistema retorna uma lista com nenhum debito', async () => {
      dataVehicle = resposta.body;
      expect( dataVehicle[0] ).toContain( MsgErro.DEB_RET_VAZIO );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
