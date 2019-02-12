[![Pipeline Tests](https://gitlab.es.gov.br/espm/apis/api-detran/badges/master/build.svg)](https://gitlab.es.gov.br/espm/apis/api-detran/pipelines)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)]

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![Quality Gate](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-detran&metric=alert_status)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-detran)

[![Bugs](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-detran&metric=bugs)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-detran)

[![Codesmells](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-detran&metric=code_smells)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-detran)

[![Vulnerabilities](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-detran&metric=vulnerabilities)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-detran)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Api Detran-Debitos

Prodest | DETRAN-ES

## Variáveis de ambiente configuráveis para o Docker
```bash
NODE_ENV                # Definir como 'production' para o swagger operar usando HTTPS
REDIS_CACHE_TIME        # Tempo de cache - padrão 1 hora
REDIS_HOST              # Apontar o IP do servidor do Redis
REDIS_PORT              # Apontar a porta do servidor do Redis
DETRAN_URL              # Endpoint do Webservice Internet Banking
DETRAN_USER             # Usuario do Webservice Internet Banking
DETRAN_PASS             # Senha de login do Webservice Internet Banking
```
## Antes de rodar
Essa API está configurada para fazer cache das requisições usando o serviço do <a href="https://redis.io/">redis</a>, portanto, é necessário subir o servidor do redis localmente ou apontar um endereço e porta de um servidor válido através das variaveis de ambiente.  
Para simplesmente subir um redis local (ambiente de teste), você pode rodar esse script:  
```bash
npm run redis
```
Isso irá baixar uma imagem docker do redis e executa-la localmente. 
Para finalizar esta imagem docker é só executar o seguinte comando.
```bash
npm run stopdocker
```
**OBS: Este comando finalizará todos os container em execução.**

Para apontar um servidor dedicado (ambiente de produção) basta definir as variaveis de ambiente como nesse exemplo:  
```bash
export REDIS_HOST="127.0.0.1"
export REDIS_PORT="6379"
```

## Descrição
Api de consulta aos débitos do DETRAN-ES e geração de guia para o pagamento.

## Rotas
/docs Abre o <a href="https://swagger.io/">swagger</a> com todas as rotas.

## Tipos de debitos
Esses tipos são usados para fazer a pesquisa pela rota /veiculos/*PLACA*/*RENAVAM*/debitos-tipo/*TIPO_DO_DEBITO* e também para gerar a guia para pagamento,
pela rota /veiculos/*PLACA*/*RENAVAM*/debitos/guia/*TIPO_DO_DEBITO*/*LISTA_DE_IDS_DEBITOS*. 

- LICENCIAMENTOATUAL
- LICENCIAMENTOANTERIOR
- IPVA
- IPVAANTERIOR
- DPVAT
- DPVATANTERIOR
- MULTA

## Flags
Com as flags é possivel determinar se um débito é opcional ou não. Por exemplo, se deseja pagar debitos do LICENCIAMENTOATUAL, todos os debitos obrigatórios virão com **flagLicenciamentoExercicio** igual a *1*. Nesse mesmo tipo, se tiver uma multa que não foi vencida, ela virá com a **flagLicenciamentoExercicio** igual a *2*, ou seja, opcional.

Existem mais flags, mas somente estas abaixo estão sendo utilizadas:

|**Tipo de debito**     |**Respectiva flag**     |
|:---------------------:|--------------------------|
|  LICENCIAMENTOATUAL   |flagLicenciamentoExercicio|
| LICENCIAMENTOANTERIOR |flagLicenciamentoAnterior |
|         IPVA          |flagIpvaExercicio         |
|     IPVAANTERIOR      |flagIpvaAnterior          |
|         DPVAT         |flagDpvatExercicio        |
|     DPVATANTERIOR     |flagDpvatAnterior         |
|         MULTA         |flagMultas                |

|**Valores**|**Definição**                                    |  
|:---------:|-------------------------------------------------|
|     0     | Não marcado (débito opcional)                   |
|     1     | Marcado (não pode desmarcar, débito obrigatório)|
|     2     | Marcado (pode desmarcar, débito opcional)       |
|     3     | Desabilitado (não exibir o débito)              |

## Fluxo básico
O fluxo básico esperado para as aplicações que consomem este serviço é o seguinte:
>1. Informe a **placa** e o **renavam** do veículo e solicite os tipos de débitos (através da rota debitos-preview);
>    - Receba os tipos de débitos em aberto.
>2. Escolha o tipo de débito a ser pago e solicita os débitos (através da rota *debitos-tipo/<tipo_debito>*)
>    - Receba uma lista de débitos.
>3. Defina os débitos a serem pagos e solicite a guia;
>    - Receba as informações necessarias para o pagamento.

## Instalando
```bash
$ npm install
```

## Executando
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
