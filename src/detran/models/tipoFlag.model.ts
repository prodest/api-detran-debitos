import { DebitoDTO } from './wsib_models/debito.dto';

export class Flag {

    flagIpvaExercicio?: TipoFlag;
    flagIpvaAnterior?: TipoFlag;
    flagLicenciamentoExercicio?: TipoFlag;
    flagLicenciamentoAnterior?: TipoFlag;
    flagTaxaServico?: TipoFlag;
    flagMultas?: TipoFlag;
    flagIpvaParcelamento?: TipoFlag;
    flagTaxaEspecial?: TipoFlag;
    flagTaxaPatio?: TipoFlag;
    flagDpvatExercicio?: TipoFlag;
    flagDpvatAnterior?: TipoFlag;

    constructor(debito: DebitoDTO) {
        if (debito.IpvaExercicio > -1){
            this.flagIpvaExercicio =  this.geraFlag(debito.IpvaExercicio);
        }
        if (debito.IpvaAnterior){
            this.flagIpvaAnterior = this.geraFlag(debito.IpvaAnterior);
        }
        if (debito.LicenciamentoExercicio){
            this.flagLicenciamentoExercicio = this.geraFlag(debito.LicenciamentoExercicio);
        }
        if (debito.LicenciamentoAnterior){
            this.flagLicenciamentoAnterior = this.geraFlag(debito.LicenciamentoAnterior);
        }
        if (debito.TaxaServico){
            this.flagTaxaServico = this.geraFlag(debito.TaxaServico);
        }
        if (debito.Multas){
            this.flagMultas = this.geraFlag(debito.Multas);
        }
        if (debito.IpvaParcelamento){
            this.flagIpvaParcelamento = this.geraFlag(debito.IpvaParcelamento);
        }
        if (debito.TaxaEspecial){
            this.flagTaxaEspecial = this.geraFlag(debito.TaxaEspecial);
        }
        if (debito.TaxaPatio){
            this.flagTaxaPatio = this.geraFlag(debito.TaxaPatio);
        }
        if (debito.DpvatExercicio){
            this.flagDpvatExercicio = this.geraFlag(debito.DpvatExercicio);
        }
        if (debito.DpvatAnterior){
            this.flagDpvatAnterior = this.geraFlag(debito.DpvatAnterior);
        }
    }

    // tranforma_dados(debitos){

    //     return debitos.map(debito => {

    //         debito.flag = debito.flagDpvatAnterior > -1 ? this.geraFlag(debito.flagDpvatAnterior) : debito.flag,
    //         debito.flag = debito.flagDpvatExercicio > -1 ? this.geraFlag(debito.flagDpvatExercicio) : debito.flag,
    //         debito.flag = debito.flagIpvaAnterior > -1 ? this.geraFlag(debito.flagIpvaAnterior) : debito.flag,
    //         debito.flag = debito.flagIpvaExercicio > -1 ? this.geraFlag(debito.flagIpvaExercicio) : debito.flag,
    //         debito.flag = debito.flagLicenciamentoAnterior > -1 ? this.geraFlag(debito.flagLicenciamentoAnterior) : debito.flag,
    //         debito.flag = debito.flagLicenciamentoExercicio > -1 ? this.geraFlag(debito.flagLicenciamentoExercicio) : debito.flag,
    //         debito.flag = debito.flagIpvaParcelamento > -1 ? this.geraFlag(debito.flagIpvaParcelamento) : debito.flag;
    //         return debito;
    //     });

    // }

    geraFlag(flag: number){
        const diciFlag: {[id: number]: TipoFlag} = {
            0 : {checked: false, disabled: false},
            1 : {checked: true, disabled: true},
            2 : {checked: true, disabled: false},
            3 : {checked: false, disabled: false},
        };

        return diciFlag[flag];

    }
}

export class TipoFlag {
    checked: boolean;
    disabled: boolean;
}