import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitos } from '../common/config/defineClasseDebitos.config';
import { ClassDeb } from './enuns/classDeb.enum';
import { DebitoDTO } from './wsib_models/debito.dto';
import { Flag } from './tipoFlag.model';

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

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos DPVATANTERIOR. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagDpvatAnterior: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos DPVAT. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagDpvatExercicio: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos IPVAANTERIOR. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagIpvaAnterior: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos IPVA. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagIpvaExercicio: number;

  // @ApiModelProperty({description: 'Flag não utilizada no momento.'})
  // flagIpvaParcelamento: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos LICENCIAMENTOANTERIOR. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagLicenciamentoAnterior: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos LICENCIAMENTOATUAL. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagLicenciamentoExercicio: number;

  // @ApiModelProperty({description: 'Flag usado para gerar o boleto do tipo débitos MULTAS. Valores:\
  // 0 -> Não marcado (débito opcional);\
  // 1 -> Marcado (não pode desmarcar, débito obrigatório);\
  // 2 -> Marcado (pode desmarcar, débito opcional);\
  // 3 -> Desabilitado (não exibir o débito).'})
  // flagMultas: number;

  // @ApiModelProperty({description: 'Flag não utilizada no momento.'})
  // flagTaxaEspecial: number;

  // @ApiModelProperty({description: 'Flag não utilizada no momento.'})
  // flagTaxaPatio: number;

  // @ApiModelProperty({description: 'Flag não utilizada no momento.'})
  // flagTaxaServico: number;

  @ApiModelProperty()
  flags: Flag;

  @ApiModelProperty()
  ipvaCotas: string;

  constructor(debito: DebitoDTO) {
    super();
    this.descricaoServico = debito.DescricaoServico;
    this.valorAtualizadoFranquia = debito.ValorAtualizadoFranquia;
    this.dataVencimento = debito.DataVencimento;
    this.dpvatCotas = debito.DpvatCotas;
    this.idDebito = debito.IdDebito;
    this.placa = debito.Placa;
    this.flags = new Flag(debito);
    this.codigoServico = debito.CodigoServico;
    this.classe = super.defineClasse(debito.Classe);
    this.exercicio = debito.Exercicio;
    this.parcela = debito.Parcela;
    this.ipvaCotas = debito.IpvaCotas;
  }

  // tipoFlag = {
  //   0 : {checked: false, disabled: false},
  //   1 : {checked: true, disabled: true},
  //   2 : {checked: true, disabled: false},
  //   3 : {checked: false, disabled: false},
  // };

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

  // geraFlag(flag: number){

  //   return this.tipoFlag[flag];

  // }
}
