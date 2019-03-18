import { ApiModelProperty } from '@nestjs/swagger';

export class ItemGuia {
  @ApiModelProperty()
  linhaDigitavel: string;

  @ApiModelProperty()
  codigoBarra: string;

  @ApiModelProperty()
  valorGuia: number;

  @ApiModelProperty()
  postagem: boolean;

  @ApiModelProperty()
  nome: string;

  @ApiModelProperty()
  placa: string;

  @ApiModelProperty()
  renavam: number;

  @ApiModelProperty()
  marca: string;

  @ApiModelProperty()
  nossoNumero: string;

  @ApiModelProperty()
  vencimentoGuia: string;

  @ApiModelProperty()
  tipoRegistro: number;

  @ApiModelProperty()
  classe: number;

  @ApiModelProperty()
  descricaoServico: string;

  @ApiModelProperty()
  dataVencimento: string;

  @ApiModelProperty()
  valorVencimento: number;

  @ApiModelProperty()
  valorCorrigido: number;

  @ApiModelProperty()
  valorDesconto: number;

  @ApiModelProperty()
  valorJuros: number;

  @ApiModelProperty()
  valorMulta: number;

  @ApiModelProperty()
  valorAtualizadoFranquia: number;

  @ApiModelProperty()
  dataAutuacao: string;

  @ApiModelProperty()
  horaAutuacao: string;

  @ApiModelProperty()
  valorAuto: number;

  constructor(i_guia: any) {
    (this.linhaDigitavel = '85820000000-7  19640219201-0  81130002018-6  80100847395-0'),
      (this.codigoBarra = '85820000000196402192018113000201880100847395'),
      (this.valorGuia = 19.64),
      (this.postagem = true),
      (this.nome = 'TESTE'),
      (this.placa = 'CAR1234'),
      (this.renavam = 12345678910),
      (this.marca = 'UNO MILE 1.0'),
      (this.nossoNumero = '00201880100847395'),
      (this.vencimentoGuia = '2018-11-30T02:00:00.000Z'),
      (this.tipoRegistro = 1),
      (this.classe = 1),
      (this.descricaoServico = 'Postagem do CRLV 2018'),
      (this.dataVencimento = '2018-04-13T03:00:00.000Z'),
      (this.valorVencimento = 19.64),
      (this.valorCorrigido = 19.64),
      (this.valorDesconto = 0.0),
      (this.valorJuros = 0.0),
      (this.valorMulta = 0.0),
      (this.valorAtualizadoFranquia = 19.64),
      (this.dataAutuacao = ''),
      (this.horaAutuacao = '00:00'),
      (this.valorAuto = 0);
  }
}
