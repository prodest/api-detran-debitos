import { loadFeature, defineFeature } from '../node_modules/jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DetranModule } from '../src/detran/detran.module';
import { MsgErro } from '../src/detran/models/enuns/msgErro.enum';

const feature = loadFeature( './test/features/acessar_dados_veiculo.feature' );

jest.mock( '../src/detran/repository/detran-soap-client' );
jest.mock( '../src/detran/common/config/redis-async.config' );

let resposta: any;
let placa: string;
let renavam: string;
let dataVehicle: any;

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

  test( 'Exibindo os dados do veículo', ( {
    given,
    when,
    then,
  } ) => {
    given( 'O usuario informa a placa do veiculo', async () => {
      placa = 'VAL1705';
    } );
    given( 'informa o renavam do veiculo', async () => {
      renavam = '98765432101';
    } );
    when('o usuario solicitar os dados do veiculo', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}` );
      expect( resposta.status ).toBe( 200 );
    } );
    then(
      'o sistema retorna os dados do veiculo',
      async () => {
        dataVehicle = resposta.body;
        expect( Object.keys( dataVehicle )[0] ).toContain( 'placa' );
      },
    );
  } );

  test( 'Exibindo os dados de veículo inexistente', ( { given, when, then } ) => {
    given( 'O usuario informa a placa do veiculo', async () => {
      placa = 'XXX0000';
    } );
    given( 'informa o renavam do veiculo', async () => {
      renavam = '00000000000';
    } );
    when( 'o usuario solicitar os dados do veiculo', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}` );
      expect( resposta.status ).toBe( 403 );
    } );
    then( 'o sistema retorna uma mensagem informando que o veículo não existe', async () => {
      dataVehicle = resposta.body;
      expect( dataVehicle.message )
        .toEqual( MsgErro.SERV_GET_DADOS_VEIC + ' Veículo não encontrado.' );
    } );
  } );

  test( 'Exibindo os dados de veículo com registro de furto/roubo ativo', ( { given, when, then } ) => {
    given( 'O usuario informa a placa do veiculo', () => {
      placa = 'ROU8470';
    } );
    given( 'informa o renavam do veiculo', () => {
      renavam = '12345678910';
    } );
    when( 'o usuario solicitar os dados do veiculo', async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/veiculos/${placa}/${renavam}` );
      expect( resposta.status ).toBe( 403 );
    } );
    then( 'o sistema retorna uma mensagem informando que a consulta não é permitida para esse tipo de resgitro ativo', () => {
      dataVehicle = resposta.body;
      expect( dataVehicle.message )
        .toEqual( MsgErro.SERV_GET_DADOS_VEIC + ' Consulta não permitida para veículo com registro de furto/roubo ativo' );
    } );
  } );
  afterAll( async () => {
    await app.close();
  } );
} );