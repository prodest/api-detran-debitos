import { Veiculo } from './veiculo.model';

export class VeiculoInfo {
    Veiculo: Veiculo;
    Nome: string;
    MarcaModelo: string;
    AnoFabricacao: string;

    constructor(params: any){
        this.Veiculo = new Veiculo(params);
        this.Nome = 'José da Silva';
        this.MarcaModelo = 'UNO MILE 1.0';
        this.AnoFabricacao = '2006';
    }
}