import { loadFeature, defineFeature } from '../node_modules/jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DetranModule } from '../src/detran/detran.module';
// import { AppModule } from '../src/app.module';
import { ListaIDs } from '../src/detran/models/listaIDs.dto';
import { MsgErro } from '../src/detran/models/enuns/msgErro.enum';
import { RedisAsync } from '../src/detran/common/config/__mocks__/redis-async.config';

const feature = loadFeature( './test/features/gerar_GRU.feature' );

jest.mock( '../src/detran/repository/detran-soap-client' );
jest.mock( '../src/detran/common/config/redis-async.config.ts' );

let resposta: any;
let placa: string;
let renavam: string;
let dataVehicle: any;
let tipoDebito: string;
let listaIDs: ListaIDs;

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
      placa = 'VAL1705';
    } );
    given( 'o renavam do veiculo', () => {
      renavam = '98765432101';
    } );
    when( 'o usuario escolher os debitos', () => {
      listaIDs = {
        lista: [78994827],
      };
      tipoDebito = 'ipva';
    } );
    when( 'solicita a geração da GRU', async () => {
      resposta = await request( app.getHttpServer() )
        .post( `/veiculos/${placa}/${renavam}/debitos/guia/${tipoDebito}` )
        .send(listaIDs);
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
      placa = 'VAL1705';
    } );
    given( 'o renavam do veiculo', () => {
      renavam = '98765432101';
    } );
    when( 'o usuario escolhe um debito que tem outros tipos de débitos obrigatorios', () => {
      listaIDs = {
        lista: [84677037],
      };
      tipoDebito = 'ipva';
    } );
    when( 'solicita a geração da GRU', async () => {
      resposta = await request( app.getHttpServer() )
        .post( `/veiculos/${placa}/${renavam}/debitos/guia/${tipoDebito}` )
        .send(listaIDs);
    } );
    then( 'o sistema retorna uma mensagem informando que é necessário selecionar os outros débitos obrigatórios', () => {
      dataVehicle = resposta.body; 
      expect( dataVehicle.message ).toContain( MsgErro.SERV_GERAR_GUIA_OBR );
    } );
  } );

  test( 'Solicitando todos debitos', ( { given, when, then } ) => {
    given( 'o usuario informa a placa do veiculo', () => {
      placa = 'VAL1705';
    } );
    given('informa o renavam do veiculo', () => {
      renavam = '98765432101';
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
    then( 'o sistema retorna uma mensagem informando que não é possivel fazer essa operação', () => {
      dataVehicle = resposta.body;
      expect( dataVehicle.message )
      .toBe( MsgErro.SERV_GERAR_GUIA +
        ' Não é possível escolher cota única e as demais cotas de IPVA para o mesmo exercício. Verifique conjunto de débitos.',
        );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );
} );