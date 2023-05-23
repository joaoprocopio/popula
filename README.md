# Popula

Esse é um projeto que tem a intenção de utilizar dados para poder exibir graficamente o crescimento populacional de bairros.

## Avisos iniciais e recomendações

Para navegar dentro deste repositório e rodar o projeto, é necessário que você tenha instalado o [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

## Extensões do VSCode


[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## O que foi usado e por que foi usado nesse projeto?

## Modelagem

Dentro da nossa Mock temos três tabelas, sendo elas:

  - City, tabela de cidades, que contém:
    - Id: chave primária da tabela;
    - Name: nome da cidade;
    - Coordinates: ponto que traz a latitude e longitude da cidade.

  - Neighborhood, tabela de bairros, que contém:
    - Id: chave primária da tabela;
    - Name: nome do bairro;
    - CityId: chave estrangeira da tabela City;
    - Coordinates: ponto que traz a latitude e longitude do bairro.

  - Population, tabela de população, que contém:
    - Id: chave primária da tabela;
    - Year: ano da população;
    - Count: tamanho da população dado o ano;
    - NeighborhoodId: chave estrangeira da tabela Neighborhood.

Guardamos dentro do "banco de dados" da nossa Mock de forma relacional, ou seja, cada bairro tem uma cidade e cada população tem um bairro.

E ao enviar os dados para o front-end, podemos escolher o tipo da serialização, podendo tratá-los como JSON ou GeoJSON.

<img src="https://i.imgur.com/8IVMPeN.png" height="400px" />

## API

Você vai encontrar os endpoints da mock em `src/mocks/routes/index.js`.

### Search - API de Busca

#### `GET /api/v1/search/cities`

Busca cidades com base em uma query string.

Parâmetros:
  - `query` - Nome da cidade **(obrigatório)**

Respostas:
  - `200 OK`: Objeto com as cidades encontradas.
  ```json
  {
    "cities": [
      {
        "id": "1",
        "name": "São José dos Campos",
        "coordinates": [
          -23.2198,
          -45.8916
        ]
      }
    ]
  }
  ```

  - `400 Bad Request`: Ausência de parâmetros obrigatórios.
  ```json
  {}
  ```

  - `404 Not Found`: Nenhuma cidade encontrada.
  ```json
  {
    "cities": []
  }
  ```

## Como rodar o projeto?

### Instalação geral

Ative a versão correta do `node`

```sh
nvm install
nvm use
```

Instale as dependências

```sh
npm install
```

### Rodar o front-end

Rodar o projeto é extremamente simples, use o comando:

```sh
npm run dev
```

> Ao acessar http://localhost:3000, seu front-end estará funcionando

### Rodar os testes do front-end

Para rodar os testes unitários, use o comando:

```sh
npm run test:unit
```

Para rodar os testes end-to-end, use o comando:

```sh
npm run test:e2e
```
