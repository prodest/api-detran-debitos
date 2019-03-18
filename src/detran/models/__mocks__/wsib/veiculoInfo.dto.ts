import { VeiculoDTO } from './veiculo.dto';

export class VeiculoInfoDTO {
    Veiculo: VeiculoDTO;
    Nome: string;
    MarcaModelo: string;
    AnoFabricacao: string;

    constructor(params: any){
        this.Veiculo = new VeiculoDTO(params);
        this.Nome = 'José da Silva';
        this.MarcaModelo = 'UNO MILE 1.0';
        this.AnoFabricacao = '2006';
    }
}