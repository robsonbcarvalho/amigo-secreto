## Sinopse

Aplicação SPA Amigo Secreto

Desenvolvida em stack MEAN, esta aplicação fornece um CRUD, permitindo cadastrar, recuperar, alterar e excluir dados básicos de pessoas em um banco dados MongoDB, bem como realizar o sorteio de amigo secreto entre as pessoas previamente cadastradas.  

## Servidor MongoDB

O endereço do servidor MongoDB está configurado com endereço **Localhost (127.0.0.1)** nesta versão do código, e o mesmo **DEVERÁ** estar em execução para o correto funcionamento da aplicação.

A configuração da conexão mongodb pode ser alterada em backend/db/config.js. 

## Servidor STMP

O software FakeSMTP é utilizado como servidor SMTP nesta versão do código, e está configurado no backend com endereço **Localhost (127.0.0.1)** e porta **25**.

## Instalação

Após baixar o código fonte deste repositório, é necessário instalar os módulos Node.js em ambos os projetos, frontend e backend.

Instalação NPM no Frontend:

```sh
$ cd frontend
$ frontend> npm install
```

Instalação NPM no Backend:

```sh
$ cd backend
$ backend> npm install
```

## Executar a Aplicação

A aplicação SPA deve ser executada através de um terminal ou de linha de comandos, a partir da pasta frontend. O **gulp** será utilizado para iniciar tanto o frontend quando o backend:

```sh
$ cd frontend
$ frontend> gulp
```

O frontend será iniciado e o seguinte endereço deverá ser acessado através do navegador web de preferência.

```sh
http://localhost:3001
ou
http://127.0.0.1:3001
```

O backend será iniciado em http://127.0.0.1:3000 e servirá a API para consumo da aplicação SPA.

Para iniciar o backend manualmente, siga os comandos:

```sh
$ cd backend
$ frontend> npm start
```

## Referência da API

BaseUrl: http://localhost:3000/api/pessoas/

Endpoint |Method | Description
-------- |:-----:| :-----------
/api/pessoas/					|[GET]			|Recupera a lista de pessoas cadastradas no banco de dados.
/api/pessoas/{id}			|[GET]			|Recupera os dados da pessoa com o {id} informado.
/api/pessoas/					|[POST]			|Cadastra uma pessoa no banco de dados.
/api/pessoas/					|[PUT]			|Atualiza os dados de uma pessoa no banco de dados.
/api/pessoas/{id}			|[DELETE]		|Exclui do banco de dados, a pessoa com o {id} informado.
/api/pessoas/sorteio	|[GET]			|Atualiza os dados de uma pessoa no banco de dados.	

## Contribuidores

Robson Bezerra Carvalho
