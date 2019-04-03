import { ItemGuiaDTO } from './itemGuia.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { GerarGuiaResult } from '../wsib_models/gerarGuiaResult.model';

export class GerarGuiaRetornoDTO {
  @ApiModelProperty({type: [ItemGuiaDTO]})
  itensGuia: Array<ItemGuiaDTO>;

  @ApiModelProperty()
  mensagemErro?: string;

  @ApiModelProperty()
  guiaPDF: string;

  constructor(gerar_guia: GerarGuiaResult) {
    if (gerar_guia.MensagemErro) {
      this.mensagemErro = gerar_guia.MensagemErro;
    } else if (gerar_guia === null || gerar_guia === undefined) {
      this.mensagemErro = 'Erro ao gerar guia.';
    } else {
      this.itensGuia = new Array();
      for (const item of gerar_guia.Guia.ItemGuia) {
        this.itensGuia.push(new ItemGuiaDTO(item));
      }
      this.guiaPDF = gerar_guia.GuiaPDF;
    }
  }
}
