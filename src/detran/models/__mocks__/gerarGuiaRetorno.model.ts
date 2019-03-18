import { ItemGuia } from './itemGuia.model';

export class GerarGuiaRetorno {
  itensGuia: Array<ItemGuia>;
  mensagemErro?: string;
  guiaPDF: string;

  constructor(gerar_guia: any) {
    if (gerar_guia.listaIDs === '84677037') {
      this.mensagemErro = 'Debitos obrigatorios não foram passados.';
    } else if (gerar_guia.placa === 'COT4100') {
      this.mensagemErro = 'Não é possível escolher cota única e as demais cotas de IPVA para o mesmo exercício. Verifique conjunto de débitos.';
    } else {
      this.itensGuia = new Array();
      this.itensGuia.push(new ItemGuia(gerar_guia));
      this.guiaPDF = 'PeDeEfe';
    }
  }
}
