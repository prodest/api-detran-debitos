import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitos } from '../common/config/defineClasseDebitos.config';
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

  @ApiModelProperty()
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

  // tranforma_dados(debitos){

  //   return debitos.map(debito => {

  //     debito.flag = debito.flagDpvatAnterior > -1 ? this.geraFlag(debito.flagDpvatAnterior) : debito.flag,
  //     debito.flag = debito.flagDpvatExercicio > -1 ? this.geraFlag(debito.flagDpvatExercicio) : debito.flag,
  //     debito.flag = debito.flagIpvaAnterior > -1 ? this.geraFlag(debito.flagIpvaAnterior) : debito.flag,
  //     debito.flag = debito.flagIpvaExercicio > -1 ? this.geraFlag(debito.flagIpvaExercicio) : debito.flag,
  //     debito.flag = debito.flagLicenciamentoAnterior > -1 ? this.geraFlag(debito.flagLicenciamentoAnterior) : debito.flag,
  //     debito.flag = debito.flagLicenciamentoExercicio > -1 ? this.geraFlag(debito.flagLicenciamentoExercicio) : debito.flag,
  //     debito.flag = debito.flagIpvaParcelamento > -1 ? this.geraFlag(debito.flagIpvaParcelamento) : debito.flag;
  //     return debito;
  //   });

  // }
}
