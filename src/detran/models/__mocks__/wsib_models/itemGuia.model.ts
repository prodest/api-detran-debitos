export class ItemGuia {
    LinhaDigitavel: string;
    CodigoBarra: string;
    ValorGuia: number;
    Postagem: boolean;
    Nome: string;
    Placa: string;
    Renavam: number;
    Marca: string;
    Nossonumero: string;
    Vencimentoguia: Date;
    Tiporegistro: number;
    Classe: number;
    Descricaoservico: string;
    Datavencimento: string;
    Valorvencimento: number;
    Valorcorrigido: number;
    Valordesconto: number;
    Valorjuros: number;
    Valormulta: number;
    Valoratualizadofranquia: number;
    Dataautuacao: string;
    Horaautuacao: string;
    Valorauto: number;

    constructor(i_guia: any) {
        this.LinhaDigitavel = '85820000000-7  19640219201-0  81130002018-6  80100847395-0';
        this.CodigoBarra = '85820000000196402192018113000201880100847395';
        this.ValorGuia = 19.64;
        this.Postagem = true;
        this.Nome = 'TESTE';
        this.Placa = 'CAR1234';
        this.Renavam = 12345678910;
        this.Marca = 'UNO MILE 1.0';
        this.Nossonumero = '00201880100847395';
        this.Vencimentoguia = new Date('2018-11-30T02:00:00.000Z');
        this.Tiporegistro = 1;
        this.Classe = 1;
        this.Descricaoservico = 'Postagem do CRLV 2018';
        this.Datavencimento = '2018-04-13T03:00:00.000Z';
        this.Valorvencimento = 19.64;
        this.Valorcorrigido = 19.64;
        this.Valordesconto = 0.0;
        this.Valorjuros = 0.0;
        this.Valormulta = 0.0;
        this.Valoratualizadofranquia = 19.64;
        this.Dataautuacao = '';
        this.Horaautuacao = '00:00';
        this.Valorauto = 0;
    }
}