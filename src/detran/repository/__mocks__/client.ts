import { VeiculoConsulta } from '../../models/veiculoConsulta.model';
import { ObterDadosVeiculoResponseDTO } from '../../models/__mocks__/wsib_models/obterDadosVeiculoResponse.dto';
import { ObterDebitosResponseDTO } from '../../models/__mocks__/wsib_models/obterDebitosResponse.dto';
import { ObterDebitosPorTipoDebitoResponseDTO } from '../../models/__mocks__/wsib_models/obterDebitosPorTipoDebitoResponse.dto';
import { ObterTiposDebitosResponse } from '../../models/__mocks__/wsib_models/obterTiposDebitosResponse.dto';
import { GerarGuiaResponseDTO } from '../../models/__mocks__/wsib_models/gerarGuiaResponse.dto';

export class Client {
    async ObterDadosVeiculo(veiculoConsulta: VeiculoConsulta){
        return new ObterDadosVeiculoResponseDTO(veiculoConsulta);
    }

    async ObterDebitos(veiculoConsulta: VeiculoConsulta){
        return new ObterDebitosResponseDTO(veiculoConsulta);
    }

    async ObterTiposDebitos(veiculoConsulta: VeiculoConsulta){
        return new ObterTiposDebitosResponse(veiculoConsulta);
    }

    async ObterDebitosPorTipoDebito(veiculoConsulta: VeiculoConsulta){
        return new ObterDebitosPorTipoDebitoResponseDTO(veiculoConsulta);
    }

    async GerarGuia(veiculoConsulta: VeiculoConsulta){
        return new GerarGuiaResponseDTO(veiculoConsulta);
    }
}