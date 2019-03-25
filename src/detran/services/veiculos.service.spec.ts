import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosService } from './veiculos.service';
import { MsgErro } from '../models/enuns/msgErro.enum';
import { ControllerVeiculosParams } from '../models/controller_model/controllerVeiculosParams';
import { DetranModule } from '../detran.module';
import { VeiculoRetorno } from '../models/veiculoRetorno.model';
import { DebitoRetorno } from '../models/debitoRetorno.model';
import { TipoDebito } from '../models/tipoDebito.model';
import { GerarGuiaRetorno } from '../models/gerarGuiaRetorno.model';
import { ListaIDs } from '../models/listaIDs.dto';
import { RedisAsync } from '../common/config/__mocks__/redis-async.config';

jest.mock( '../repository/detran-soap-client.ts' );

let params: ControllerVeiculosParams;
let listaIDs: ListaIDs;

describe( 'VeiculosService', () => {
  let service: VeiculosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      imports: [ DetranModule ],
    } ).compile();
    service = module.get<VeiculosService>( VeiculosService );
  } );

  it( 'getDadosVeiculos() com dados válidos deve retornar dados do veículo', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };

    const respostaDoTeste: VeiculoRetorno = await service.getDadosVeiculos( params );
    expect( Object.keys(respostaDoTeste)[0])
      .toBe( 'placa' );
  } );

  it( 'getDadosVeiculos() com dados errados deve retornar mensagem de erro', async () => {
    params = {
      placa: 'AB45SD2',
      renavam: '12345678910',
    };
    try {
      const respostaDoTeste: VeiculoRetorno = await service.getDadosVeiculos( params );
    } catch (error) {
      expect( error.mensagem )
      .toBe( MsgErro.SERV_GET_DADOS_VEIC + ' Veículo não encontrado.' );
    }
  } );
  it( 'getDadosVeiculos() com dados de veículo roubado deve impedir a consulta', async () => {
    params = {
      placa: 'ROU8470',
      renavam: '12345678910',
    };
    try{
      const respostaDoTeste: VeiculoRetorno = await service.getDadosVeiculos( params );
    }catch (error) {
      expect( error.mensagem )
      .toBe( MsgErro.SERV_GET_DADOS_VEIC + ' Consulta não permitida para veículo com registro de furto/roubo ativo' );
    }
  } );

  /* getDebitos() */
  it( 'getDebitos() com dados válidos deve retornar uma lista com todoso os debitos', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    const respostaDoTeste: DebitoRetorno = await service.getDebitos( params );

    expect( respostaDoTeste.debitos[0].descricaoServico )
      .toBe( 'Licenciamento Anual 2018' );
  } );

  it( 'getDebitos() com dados inválidos ou veiculo não pussui debitos deve retornar um array vazio', async () => {
    params = {
      placa: 'XXX0000',
      renavam: '12345678910',
    };
    const respostaDoTeste: DebitoRetorno = await service.getDebitos( params );
    expect( respostaDoTeste.debitos )
      .toEqual( expect.arrayContaining( [] ) );
  } );

  /* getTiposDebitos() */
  it( 'getTiposDebitos() com dados válidos deve retornar uma lista de uma previa dos débitos', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    const respostaDoTeste: TipoDebito = await service.getTiposDebitos( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'temLicenciamentoAtual' );
  } );

  /* getDebitosPorTipo() */
  it( 'getDebitosPorTipo() com dados válidos deve retornar uma lista com somente um tipo de débito', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
      tipo_debito: 'IPVA',
    };
    const respostaDoTeste: DebitoRetorno = await service.getDebitosPorTipo( params );
    expect( respostaDoTeste.debitos[0].descricaoServico )
      .toBe( 'IPVA 4ª Cota 2018' );
  } );

  /* gerarGRU() */
  it( 'gerarGRU com dados validos deve retornar uma guia', async () => {
    params = {
      placa: 'VAL1705',
      renavam: '98765432101',
    };
    const respostaDoTeste: GerarGuiaRetorno = await service.gerarGRU( params );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'itensGuia' );
  } );

  it( 'gerarGRUParcial com dados validos deve retornar uma guia', async () => {
    params = {
      placa: 'ABC1234',
      renavam: '98765432101',
      tipo_debito: 'licenciamentoatual',
    };
    listaIDs = {
      lista: [84677125],
    };

    const respostaDoTeste = await service.gerarGRUParcial( params, listaIDs.lista );
    expect( Object.keys(respostaDoTeste)[0] )
      .toBe( 'itensGuia' );
  } );

  it( 'gerarGRUParcial faltando debitos obrigatorios deve retornar uma mensagemErro', async () => {
    params = {
      placa: 'ABC1234',
      renavam: '98765432101',
      tipo_debito: 'licenciamentoatual',
    };
    listaIDs = {
      lista: [84677037],
    };

    try {
      const respostaDoTeste = await service.gerarGRUParcial( params, listaIDs.lista );
    } catch (error) {
      expect( error.mensagem )
      .toBe( MsgErro.SERV_GERAR_GUIA_OBR );
    }
  } );

  it( 'gerarGRU com cota unica e as demais cotas do IPVA do mesmo exercicio', async () => {
    params = {
      placa: 'COT4100',
      renavam: '98765432101',
    };
    try {
      const respostaDoTeste = await service.gerarGRU( params );
    } catch (error) {
      expect( error.mensagem )
      .toBe( MsgErro.SERV_GERAR_GUIA +
        ' Não é possível escolher cota única e as demais cotas de IPVA para o mesmo exercício. Verifique conjunto de débitos.',
        );
    }
  } );

  afterAll( async () => {
  } );
} );
