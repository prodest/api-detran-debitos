import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitos } from './defineClasseDebitos.model';
import { ClassDeb } from './enuns/classDeb.enum';
import { DebitoDTO } from './wsib_models/debito.dto';
import { TipoFlag } from './tipoFlag.model';

export class Debito extends DefineClasseDebitos{
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
  })
  classe: ClassDeb;

  @ApiModelProperty()
  codigoServico: number;

  @ApiModelProperty()
  descricaoServico: string;

  @ApiModelProperty()
  dataVencimento: string;

  @ApiModelProperty()
  exercicio: number;

  @ApiModelProperty()
  idDebito: number;

  @ApiModelProperty()
  parcela: number;

  @ApiModelProperty()
  placa: string;

  @ApiModelProperty()
  valorAtualizadoFranquia: number;

  @ApiModelProperty()
  dpvatCotas: string;

  @ApiModelProperty({type: TipoFlag})
  flag?: TipoFlag;

  @ApiModelProperty()
  ipvaCotas: string;

  constructor(debito: DebitoDTO, tipo_debito?: string) {
    super();
    this.descricaoServico = debito.DescricaoServico;
    this.valorAtualizadoFranquia = debito.ValorAtualizadoFranquia;
    this.dataVencimento = debito.DataVencimento;
    this.dpvatCotas = debito.DpvatCotas;
    this.idDebito = debito.IdDebito;
    this.placa = debito.Placa;
    if (tipo_debito){
      this.flag = new TipoFlag(debito, tipo_debito);
    }
    this.codigoServico = debito.CodigoServico;
    this.classe = super.defineClasse(debito.Classe);
    this.exercicio = debito.Exercicio;
    this.parcela = debito.Parcela;
    this.ipvaCotas = debito.IpvaCotas;
  }
}
