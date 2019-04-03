import { VeiculoConsultaDTO } from '../../dto/veiculoConsulta.dto';

export class Debito {
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

    constructor(debito: VeiculoConsultaDTO) {
        if (debito.tipoSelecionado === 'IPVA') {
          this.DescricaoServico = 'IPVA 4ª Cota 2018';
          this.ValorAtualizadoFranquia = 77.58;
          this.DataVencimento = '2018-07-12T03:00:00.000Z';
          this.DpvatCotas = '';
          this.IdDebito = 78994827;
          this.Placa = 'VAL1705';
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
          this.Exercicio = 2018;
          this.Parcela = 4;
          this.IpvaCotas = '20184';
        } else if (debito.veiculoConsulta.Placa === 'COT4100') {
          this.DescricaoServico = 'IPVA Cota Única 2018';
          this.ValorAtualizadoFranquia = 300.00;
          this.DataVencimento = '2018-07-12T03:00:00.000Z';
          this.DpvatCotas = '';
          this.IdDebito = 78994821;
          this.Placa = 'VAL1705';
          this.IpvaExercicio = 0;
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
          this.CodigoServico = 8;
          this.Classe = 3;
          this.Exercicio = 2018;
          this.Parcela = 0;
          this.IpvaCotas = '20180';
        } else {
          this.DescricaoServico = 'Licenciamento Anual 2018';
          this.ValorAtualizadoFranquia = 157.08;
          this.DataVencimento = '2018-04-13T03:00:00.000Z';
          this.DpvatCotas = '';
          this.IdDebito = 84677125;
          this.Placa = 'VAL1705';
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