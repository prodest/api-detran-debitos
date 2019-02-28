import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitos } from '../common/config/defineClasseDebitos.config';
import { ClassDeb } from './enum';

export class ItemGuia extends DefineClasseDebitos {
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
    ]
  })
  classe: ClassDeb;

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
