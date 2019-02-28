import { Veiculo } from './veiculo.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class VeiculoConsulta {
  @ApiModelProperty()
  veiculoConsulta: Veiculo;

  @ApiModelProperty()
  tipoSelecionado: string;

  @ApiModelProperty()
  listaDebitos: string;

  constructor(params) {
    this.veiculoConsulta = new Veiculo(params);
    if (params.tipo_debito){
      this.tipoSelecionado = params.tipo_debito.toUpperCase();
    }
    
  }
}
