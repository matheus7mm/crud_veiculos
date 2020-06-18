# CRUD - Veículos

## Informações Gerais

Foi criado uma CRUD simples de veículos utilizando Angular no Frontend e Node.js no Backend. No Backend foi utilizado [Express](https://expressjs.com/) para criação de uma RESTful API.

O banco de dados utilizado foi o MongoDB, que foi criado e estruturado com o Mongoose.

## Passos para Instalação:

Necessário ter [Node.js](https://nodejs.org/en/) na máquina e [Angular CLI](https://github.com/angular/angular-cli).

A senha do usuário do banco de dados deve ser inserida na variável `$password` em *\backend\app.js*.

Necessário navegar até o diretório onde o projeto se encontra e utilizar os comandos abaixo.

Comando para executar o Backend:
```
npm run start:server
```

Comando para executar o Frontend:
```
ng serve
```

O Frontend executa no `http://localhost:4200/` e o Backend executa no `http://localhost:3000/`.

Exemplo da busca de veículos com a API: `http://localhost:3000/api/veiculos`.


## Estrutura do Código:

A parte Backend do projeto está toda contida na pasta *Backend*.

O restante do código faz parte do Frontend.




## General Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
