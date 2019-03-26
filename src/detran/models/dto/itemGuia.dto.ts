import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitosDTO } from './defineClasseDebitos.dto';
import { ClassDeb } from '../enuns/classDeb.enum';

export class ItemGuia extends DefineClasseDebitosDTO {
  @ApiModelProperty({example: '85800000002-0  21510219201-5  90000000000-0  80000000000-0'})
  linhaDigitavel: string;

  @ApiModelProperty({example: '85800000002215102192019000000000080000000000'})
  codigoBarra: string;

  @ApiModelProperty({example: '20.5300'})
  valorGuia: number;

  @ApiModelProperty({example: true})
  postagem: boolean;

  @ApiModelProperty({example: 'José Maria'})
  nome: string;

  @ApiModelProperty({example: 'ABC1234'})
  placa: string;

  @ApiModelProperty({example: '9876543210'})
  renavam: number;

  @ApiModelProperty({example: 'Uno 1.0'})
  marca: string;

  @ApiModelProperty({example: '12345678910987654'})
  nossoNumero: string;

  @ApiModelProperty({example: '2019-03-31T00:00:00.000Z'})
  vencimentoGuia: string;

  @ApiModelProperty({example: 1})
  tipoRegistro: number;

  @ApiModelProperty({
    enum: [
      'Licenciamento',
      'Registro Veículo',
      'IPVA',
      'Seguro DPVAT',
      'Multas',
      'Vistoria',
      'Certidões',
      'Apreensão',
      'Credenciamento',
      'Diversos Veículos',
      'Parcelamento IPVA',
      'Placas',
      'Pátio',
      'Registro de Contrato',
    ],
    example: 'Licenciamento',
  })
  classe: ClassDeb;

  @ApiModelProperty({example: 'Postagem do CRLV 2018'})
  descricaoServico: string;

  @ApiModelProperty({example: '2019-04-17T00:00:00.000Z'})
  dataVencimento: string;

  @ApiModelProperty({example: '19.6400'})
  valorVencimento: number;

  @ApiModelProperty({example: '20.5300'})
  valorCorrigido: number;

  @ApiModelProperty({example: '0.0000'})
  valorDesconto: number;

  @ApiModelProperty({example: '0.0000'})
  valorJuros: number;

  @ApiModelProperty({example: '0.0000'})
  valorMulta: number;

  @ApiModelProperty({example: '20.5300'})
  valorAtualizadoFranquia: number;

  @ApiModelProperty({example: ''})
  dataAutuacao: string;

  @ApiModelProperty({example: '00:00'})
  horaAutuacao: string;

  @ApiModelProperty({example: '0'})
  valorAuto: number;

  constructor(i_guia: any) {
    super();
    this.linhaDigitavel = i_guia.LinhaDigitavel;
    this.codigoBarra = i_guia.CodigoBarra;
    this.valorGuia = i_guia.ValorGuia;
    this.postagem = i_guia.Postagem;
    this.nome = i_guia.Nome;
    this.placa = i_guia.Placa;
    this.renavam = i_guia.Renavam;
    this.marca = i_guia.Marca;
    this.nossoNumero = i_guia.Nossonumero;
    this.vencimentoGuia = i_guia.Vencimentoguia;
    this.tipoRegistro = i_guia.Tiporegistro;
    this.classe = super.defineClasse(i_guia.Classe) || i_guia.Classe;
    this.descricaoServico = i_guia.Descricaoservico;
    this.dataVencimento = i_guia.Datavencimento;
    this.valorVencimento = i_guia.Valorvencimento;
    this.valorCorrigido = i_guia.Valorcorrigido;
    this.valorDesconto = i_guia.Valordesconto;
    this.valorJuros = i_guia.Valorjuros;
    this.valorMulta = i_guia.Valormulta;
    this.valorAtualizadoFranquia = i_guia.Valoratualizadofranquia;
    this.dataAutuacao = i_guia.Dataautuacao;
    this.horaAutuacao = i_guia.Horaautuacao;
    this.valorAuto = i_guia.Valorauto;
  }
}
