import { VeiculoConsultaDTO } from '../../models/dto/veiculoConsulta.dto';
import { ObterDadosVeiculoResponse } from '../../models/__mocks__/wsib_models/obterDadosVeiculoResponse.model';
import { ObterDebitosResponse } from '../../models/__mocks__/wsib_models/obterDebitosResponse.model';
import { ObterDebitosPorTipoDebitoResponse } from '../../models/__mocks__/wsib_models/obterDebitosPorTipoDebitoResponse.model';
import { ObterTiposDebitosResponse } from '../../models/__mocks__/wsib_models/obterTiposDebitosResponse.model';
import { GerarGuiaResponse } from '../../models/__mocks__/wsib_models/gerarGuiaResponse.model';

export class Client {
    async ObterDadosVeiculo(veiculoConsulta: VeiculoConsultaDTO){
        return new ObterDadosVeiculoResponse(veiculoConsulta);
    }

    async ObterDebitos(veiculoConsulta: VeiculoConsultaDTO){
        return new ObterDebitosResponse(veiculoConsulta);
    }

    async ObterTiposDebitos(veiculoConsulta: VeiculoConsultaDTO){
        return new ObterTiposDebitosResponse(veiculoConsulta);
    }

    async ObterDebitosPorTipoDebito(veiculoConsulta: VeiculoConsultaDTO){
        return new ObterDebitosPorTipoDebitoResponse(veiculoConsulta);
    }

    async GerarGuia(veiculoConsulta: VeiculoConsultaDTO){
        return new GerarGuiaResponse(veiculoConsulta);
    }
}