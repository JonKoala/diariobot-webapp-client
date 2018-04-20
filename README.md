# diariobot-webapp-client
Client para as aplicações web do diariobot.

### Requisitos
 - [Node](https://nodejs.org) >= 6.9
 - [webpack](https://webpack.js.org) >= 3.6

### Instalação
Clone o projeto para a sua máquina e acesse o diretório do mesmo.
``` bash
git clone https://github.com/JonKoala/diariobot-webapp-client.git
cd diariobot-webapp-client
```
Instale as dependências.
``` bash
npm install
```

### Configuração
O projeto depende de um arquivo `appconfig.yml`, na sua raiz, contendo algumas configurações locais. Crie uma cópia do arquivo `appconfig.yml.example` e coloque as configurações do seu ambiente.

Exemplo de `appconfig.yml`:
``` yaml
url:
  api: 'http://localhost:8080'

server:
  port: '8081'
```

### Execução
O diariobot possui duas aplicações web:
 - __Crowdsourcer__: Interface para a classificação manual de publicações do diário e visualização dos resultados do sistema.
 - __Simple__: Visualização simplificada dos resultados do sistema.

Esse projeto gera os builds de cada aplicação e sobe um servidor de Client.

Para gerar os builds, basta executar um dos seguintes comandos.
``` bash
# aplicação Crowdsourcer
npm run build

# aplicação Simple
npm run build:simple
```
Com o build gerado, para subir o servidor de Client execute o comando `start` do _npm_.
``` bash
npm start
```
Caso não ocorra nenhum erro, um servidor deve ser criado, usando a porta especificada no `appconfig.yml` (_e.g `http://localhost:8081/`_).

### Desenvolvimento
Para subir o servidor de Client em modo de desenvolvimento (fazendo uso do [_webpack-dev-server_](https://github.com/webpack/webpack-dev-server)), execute um dos seguintes comandos.
``` bash
# aplicação Crowdsourcer
npm run dev

# aplicação Simple
npm run dev:simple
```
Caso não ocorra nenhum erro, um servidor deve ser criado, usando a porta especificada no `appconfig.yml` (_e.g `http://localhost:8081/`_).
