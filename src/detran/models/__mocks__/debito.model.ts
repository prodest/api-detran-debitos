import { ApiModelProperty } from '@nestjs/swagger';
import { ClassDeb } from './enuns/classDeb.enum';

export class Debito {
  @ApiModelProperty()
  classe: string;

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
  flagDpvatAnterior: number;

  @ApiModelProperty()
  dpvatCotas: string;

  @ApiModelProperty()
  flagDpvatExercicio: number;

  @ApiModelProperty()
  flagIpvaAnterior: number;

  @ApiModelProperty()
  flagIpvaExercicio: number;

  @ApiModelProperty()
  flagIpvaParcelamento: number;

  @ApiModelProperty()
  flagLicenciamentoAnterior: number;

  @ApiModelProperty()
  flagLicenciamentoExercicio: number;

  @ApiModelProperty()
  flagMultas: number;

  @ApiModelProperty()
  flagTaxaEspecial: number;

  @ApiModelProperty()
  flagTaxaPatio: number;

  @ApiModelProperty()
  flagTaxaServico: number;

  @ApiModelProperty()
  ipvaCotas: string;

  constructor(debito: any) {
    if (debito.tipo_debito === 'IPVA') {
      this.descricaoServico = 'IPVA 4ª Cota 2018';
      this.valorAtualizadoFranquia = 77.58;
      this.dataVencimento = '2017-07-12T03:00:00.000Z';
      this.dpvatCotas = '';
      this.idDebito = 78994827;
      this.placa = 'ROU8470';
      this.flagIpvaExercicio = 1;
      this.flagIpvaAnterior = 1;
      this.flagLicenciamentoExercicio = 1;
      this.flagLicenciamentoAnterior = 1;
      this.flagTaxaServico = -1;
      this.flagMultas = -1;
      this.flagIpvaParcelamento = -1;
      this.flagTaxaEspecial = -1;
      this.flagTaxaPatio = -1;
      this.flagDpvatExercicio = -1;
      this.flagDpvatAnterior = -1;
      this.codigoServico = 129;
      this.classe = ClassDeb.CLASSE3;
      this.exercicio = 2017;
      this.parcela = 4;
      this.ipvaCotas = '20174';
    } else {
      this.descricaoServico = 'Licenciamento Anual 2018';
      this.valorAtualizadoFranquia = 157.08;
      this.dataVencimento = '2018-04-13T03:00:00.000Z';
      this.dpvatCotas = '';
      this.idDebito = 84677125;
      this.placa = 'ROU8470';
      this.flagIpvaExercicio = -1;
      this.flagIpvaAnterior = -1;
      this.flagLicenciamentoExercicio = 1;
      this.flagLicenciamentoAnterior = -1;
      this.flagTaxaServico = -1;
      this.flagMultas = -1;
      this.flagIpvaParcelamento = -1;
      this.flagTaxaEspecial = -1;
      this.flagTaxaPatio = -1;
      this.flagDpvatExercicio = -1;
      this.flagDpvatAnterior = -1;
      this.codigoServico = 1;
      this.classe = ClassDeb.CLASSE1;
      this.exercicio = 2018;
      this.parcela = 0;
      this.ipvaCotas = '';
    }
  }
}
