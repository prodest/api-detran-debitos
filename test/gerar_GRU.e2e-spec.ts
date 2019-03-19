import { loadFeature, defineFeature } from '../node_modules/jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DetranModule } from '../src/detran/detran.module';
const feature = loadFeature( './test/features/gerar_GRU.feature' );
jest.mock( '../src/detran/detran.module' );
jest.mock( '../src/detran/repository/detran-soap-client' );

let resposta: any;
let placa: string;
let renavam: string;
let dataVehicle: any;
let tipoDebito: string;
let listaIDs: string;

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
  test( 'Solicitando alguns debitos', ( {
    given,
    when,
    then,
  } ) => {
    given( 'O usuario possui debitos', () => {
    } );
    given( 'informa a placa', () => {
      placa = 'ROU8470';
    } );
    given( 'o renavam do veiculo', () => {
      renavam = '12345678910';
    } );
    when( 'o usuario escolher os debitos', () => {
      listaIDs = '78994349';
      tipoDebito = 'dpvat';
    } );
    when( 'solicita a geração da GRU', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos/guia/${tipoDebito}/${listaIDs}` );
    } );
    then( 'o sistema retorna a GRU com os debitos', () => {
      dataVehicle = resposta.body;
      expect( Object.keys( dataVehicle )[0] ).toContain( 'itensGuia' );
    } );
  } );

  test( 'Solicitando um débito que possuem outros débitos obrigatorios', ( { given, when, then } ) => {
    given( 'O usuario possui debitos', () => {
    } );
    given( 'informa a placa', () => {
      placa = 'ROU8470';
    } );
    given( 'o renavam do veiculo', () => {
      renavam = '12345678910';
    } );
    when( 'o usuario escolhe um debito que tem outros tipos de débitos obrigatorios', () => {
      listaIDs = '84677037';
      tipoDebito = 'dpvat';
    } );
    when( 'solicita a geração da GRU', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos/guia/${tipoDebito}/${listaIDs}` );
    } );
    then( 'o sistema retorna uma mensagem informando que é necessário selecionar os outros débitos obrigatórios', () => {
      dataVehicle = resposta.body;
      expect( dataVehicle.message ).toContain( 'Debitos obrigatorios não foram passados.' );
    } );
  } );

  test( 'Solicitando todos debitos', ( { given, when, then } ) => {
    given( 'o usuario informa a placa do veiculo', () => {
      placa = 'ROU8470';
    } );
    given('informa o renavam do veiculo', () => {
      renavam = '12345678910';
    });
    when( 'o usuario deseja pagar todos os debitos', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos/guia` );
      expect( resposta.status ).toBe( 200 );
    } );
    when( 'solicita a geração da GRU', () => {
      // Já testado acima
    } );
    then( 'o sistema retorna a GRU com os debitos', () => {
      dataVehicle = resposta.body;
      expect( Object.keys( dataVehicle )[0] ).toContain( 'itensGuia' );
    } );
  } );
  
  test( 'Solicitando com a cota unica do IPVA e as demais cotas ao mesmo tempo', ( { given, when, then } ) => {
    given( 'o usuario informa a placa do veiculo', () => {
      placa = 'COT4100';
    } );
    given('informa o renavam do veiculo', () => {
      renavam = '12345678910';
    });
    when( 'o usuario deseja pagar todos os debitos', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}/debitos/guia` );
      expect( resposta.status ).toBe( 403 );
    } );
    when( 'solicita a geração da GRU', () => {
      // Já testado acima
    } );
    then( 'o sistema retorna uma mensagem informando que não é possivel escolher a cota única e as demais cotas de IPVA para o mesmo exercício', () => {
      dataVehicle = resposta.body;
      expect( dataVehicle.message ).toContain( 'Não é possível escolher cota única e as demais cotas de IPVA para o mesmo exercício. Verifique conjunto de débitos.' );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );
} );