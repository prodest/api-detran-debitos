Funcionalidade: Gerar GRU

Essa funcionalidade permite ao usuário escolher os debitos que esse deseja pagar por meio de uma GRU.

Cenário: Selecionando alguns debitos
Dado O usuario possui debitos
Quando o usuario escolher os debitos
And  solicita a geração da GRU
Então o sistema envia a GRU por email

Cenário: Usuário não possui nenhum débito
Dado O usuario não possui debitos
Então O sistema informa que não existem débitos para o veículo informado
