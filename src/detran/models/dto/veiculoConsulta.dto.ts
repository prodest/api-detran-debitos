import { VeiculoDTO } from './veiculo.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class VeiculoConsultaDTO {
  @ApiModelProperty()
  veiculoConsulta: VeiculoDTO;

  @ApiModelProperty()
  tipoSelecionado?: string;

  @ApiModelProperty()
  listaDebitos?: string;

  constructor(params) {
    this.veiculoConsulta = new VeiculoDTO(params);
    if (params.tipo_debito){
      this.tipoSelecionado = params.tipo_debito.toUpperCase();
    }
    if (params.listaIDs){
      this.listaDebitos = params.listaIDs;
    }
  }
}
