import { VeiculoConsulta } from '../../../models/veiculoConsulta.model';

export class DebitoDTO {
    DescricaoServico: string;
    ValorAtualizadoFranquia: number;
    DataVencimento: string;
    DpvatCotas: string;
    IdDebito: number;
    Placa: string;
    IpvaExercicio: number;
    IpvaAnterior: number;
    LicenciamentoExercicio: number;
    LicenciamentoAnterior: number;
    TaxaServico: number;
    Multas: number;
    IpvaParcelamento: number;
    TaxaEspecial: number;
    TaxaPatio: number;
    DpvatExercicio: number;
    DpvatAnterior: number;
    CodigoServico: number;
    Classe: number;
    Exercicio: number;
    Parcela: number;
    IpvaCotas: string;

    constructor(debito: VeiculoConsulta) {
        if (debito.tipoSelecionado === 'IPVA') {
          this.DescricaoServico = 'IPVA 4ª Cota 2018';
          this.ValorAtualizadoFranquia = 77.58;
          this.DataVencimento = '2017-07-12T03:00:00.000Z';
          this.DpvatCotas = '';
          this.IdDebito = 78994827;
          this.Placa = 'ROU8470';
          this.IpvaExercicio = 1;
          this.IpvaAnterior = 1;
          this.LicenciamentoExercicio = 1;
          this.LicenciamentoAnterior = 1;
          this.TaxaServico = -1;
          this.Multas = -1;
          this.IpvaParcelamento = -1;
          this.TaxaEspecial = -1;
          this.TaxaPatio = -1;
          this.DpvatExercicio = -1;
          this.DpvatAnterior = -1;
          this.CodigoServico = 129;
          this.Classe = 3;
          this.Exercicio = 2017;
          this.Parcela = 4;
          this.IpvaCotas = '20174';
        } else {
          this.DescricaoServico = 'Licenciamento Anual 2018';
          this.ValorAtualizadoFranquia = 157.08;
          this.DataVencimento = '2018-04-13T03:00:00.000Z';
          this.DpvatCotas = '';
          this.IdDebito = 84677125;
          this.Placa = 'ROU8470';
          this.IpvaExercicio = -1;
          this.IpvaAnterior = -1;
          this.LicenciamentoExercicio = 1;
          this.LicenciamentoAnterior = -1;
          this.TaxaServico = -1;
          this.Multas = -1;
          this.IpvaParcelamento = -1;
          this.TaxaEspecial = -1;
          this.TaxaPatio = -1;
          this.DpvatExercicio = -1;
          this.DpvatAnterior = -1;
          this.CodigoServico = 1;
          this.Classe = 1;
          this.Exercicio = 2018;
          this.Parcela = 0;
          this.IpvaCotas = '';
        }
      }
}