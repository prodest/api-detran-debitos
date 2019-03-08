import { ItemGuia } from './itemGuia.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class GerarGuiaRetorno {
  @ApiModelProperty({type: [ItemGuia]})
  itensGuia: Array<ItemGuia>;

  @ApiModelProperty()
  mensagemErro?: string;

  @ApiModelProperty()
  guiaPDF: string;

  constructor(gerar_guia: any) {
    if (Object.keys(gerar_guia)[0] === 'MensagemErro') {
      this.mensagemErro = gerar_guia.MensagemErro;
    } else if (gerar_guia === null || gerar_guia === undefined) {
      this.mensagemErro = 'Erro ao gerar guia.';
    } else {
      this.itensGuia = new Array();
      for (const item of gerar_guia.Guia.ItemGuia) {
        this.itensGuia.push(new ItemGuia(item));
      }
      this.guiaPDF = gerar_guia.GuiaPDF;
    }
  }
}
