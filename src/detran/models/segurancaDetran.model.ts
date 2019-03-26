import { DebitosWS } from '../common/config/debitosWS.config';

const debitosWS: DebitosWS = new DebitosWS();
export class SegurancaDetran {
  Usuario: string;
  Senha: string;

  constructor() {
    this.Usuario = debitosWS.user || 'usuario';
    this.Senha = debitosWS.password || 'senhacomplicada';
  }
}
