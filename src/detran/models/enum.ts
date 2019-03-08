export enum TypeDeb {
  LICATUAL = 'LICENCIAMENTOATUAL',
  LICANTER = 'LICENCIMENTOANTERIOR',
  IPVAATUAL = 'IPVA',
  IPVAANTER = 'IPVAANTERIOR',
  DPVATATUA = 'DPVAT',
  DPVATANTE = 'DPVATANTERIOR',
  MULTA = 'MULTA',
}

export enum ClassDeb {
  CLASSE1 = 'Licenciamento',
  CLASSE2 = 'Registro Veículo',
  CLASSE3 = 'IPVA',
  CLASSE4 = 'Seguro DPVAT',
  CLASSE5 = 'Multas',
  CLASSE6 = 'Vistoria',
  CLASSE7 = 'Certidões',
  CLASSE8 = 'Apreensão',
  CLASSE9 = 'Credenciamento',
  CLASSE10 = 'Diversos Veículos',
  CLASSE11 = 'Parcelamento IPVA',
  CLASSE12 = 'Placas',
  CLASSE13 = 'Pátio',
  CLASSE14 = 'Registro de Contrato',
}

export enum MsgErro {
  CONT_GET_DADOS_VEIC = 'Não foi possivel requisitar os dados.',
  SERV_GET_DADOS_VEIC = '',
}
