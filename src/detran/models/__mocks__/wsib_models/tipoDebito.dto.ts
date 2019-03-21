export class TipoDebitoDTO {
    TemLicenciamentoAtual: string;
    TemLicenciamentoAnterior: string;
    TemDPVAT: string;
    TemIPVA: string;
    TemMulta: string;
    TemIPVAAnterior: string;
    TemDPVATAnterior: string;

    constructor(params: any){
        this.TemLicenciamentoAtual = 'S';
        this.TemLicenciamentoAnterior = 'N';
        this.TemDPVAT = 'S';
        this.TemIPVA = 'S';
        this.TemMulta = 'N';
        this.TemIPVAAnterior = 'S';
        this.TemDPVATAnterior = 'N';
    }
}