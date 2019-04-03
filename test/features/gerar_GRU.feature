#language: pt
Funcionalidade: Gerar GRU

Essa funcionalidade permite ao usuário escolher os debitos que esse deseja pagar por meio de uma GRU.

Cenário: Solicitando alguns debitos
Dado O usuario possui debitos
E informa a placa
E o renavam do veiculo
Quando o usuario escolher os debitos
E solicita a geração da GRU
Então o sistema retorna a GRU com os debitos

Cenário: Solicitando um débito que possuem outros débitos obrigatorios
Dado O usuario possui debitos
E informa a placa  
E o renavam do veiculo
Quando o usuario escolhe um debito que tem outros tipos de débitos obrigatorios
E solicita a geração da GRU
Então o sistema retorna uma mensagem informando que é necessário selecionar os outros débitos obrigatórios

Cenário: Solicitando todos debitos
Dado o usuario informa a placa do veiculo
E informa o renavam do veiculo
Quando o usuario deseja pagar todos os debitos
E  solicita a geração da GRU
Então o sistema retorna a GRU com os debitos

Cenário: Solicitando com a cota unica do IPVA e as demais cotas ao mesmo tempo
Dado o usuario informa a placa do veiculo
E informa o renavam do veiculo
Quando o usuario deseja pagar todos os debitos
E  solicita a geração da GRU
Então o sistema retorna uma mensagem informando que não é possivel fazer essa operação