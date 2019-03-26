import { ApiModelProperty } from '@nestjs/swagger';
import { DefineClasseDebitosDTO } from './defineClasseDebitos.dto';
import { ClassDeb } from '../enuns/classDeb.enum';
import { Debito } from '../wsib_models/debito.model';
import { TipoFlagDTO } from './tipoFlag.dto';

export class DebitoDTO extends DefineClasseDebitosDTO{
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

  @ApiModelProperty({example: 27})
  codigoServico: number;

  @ApiModelProperty({example: 'Postagem do CRLV 2019'})
  descricaoServico: string;

  @ApiModelProperty({example: '2019-04-17T00:00:00.000Z'})
  dataVencimento: string;

  @ApiModelProperty({example: 2019})
  exercicio: number;

  @ApiModelProperty({example: 158009223})
  idDebito: number;

  @ApiModelProperty({example: 0})
  parcela: number;

  @ApiModelProperty({example: 'ABC1234'})
  placa: string;

  @ApiModelProperty({example: 20.5300})
  valorAtualizadoFranquia: number;

  @ApiModelProperty({example: ''})
  dpvatCotas: string;

  @ApiModelProperty({
    type: TipoFlagDTO,
    description: 'Atributo que determina se o objeto é obrigatório ou não na hora de gerar\
     a guia para o pagamento.\
     -Se retornar \'checked === false\' e \'disabled === false\' o débito é opcional, mas é exibido não selecionado;\
     -Se retornar \'checked === true\' e \'disabled === true\' o débito é obrigatório;\
     -Se retornar \'checked === true\' e \'disabled === false\' o débito é opcional, mas é exibido selecionado;\
     -Se retornar \'checked === false\' e \'disabled === true\' o débito está desabilitado;\
     Esse atributo só é exibido se for requisitado por tipo.\
     ',
  })
  flag?: TipoFlagDTO;

  @ApiModelProperty({example: ''})
  ipvaCotas: string;

  constructor(debito: Debito, tipo_debito?: string) {
    super();
    this.descricaoServico = debito.DescricaoServico;
    this.valorAtualizadoFranquia = debito.ValorAtualizadoFranquia;
    this.dataVencimento = debito.DataVencimento;
    this.dpvatCotas = debito.DpvatCotas;
    this.idDebito = debito.IdDebito;
    this.placa = debito.Placa;
    if (tipo_debito){
      this.flag = new TipoFlagDTO(debito, tipo_debito);
    }
    this.codigoServico = debito.CodigoServico;
    this.classe = super.defineClasse(debito.Classe);
    this.exercicio = debito.Exercicio;
    this.parcela = debito.Parcela;
    this.ipvaCotas = debito.IpvaCotas;
  }
}
