# Popula

Esse é um projeto que tem a intenção de utilizar dados para poder exibir graficamente o crescimento populacional de bairros.

## Avisos iniciais e recomendações

Para navegar dentro deste repositório e rodar o projeto, é necessário que você tenha instalado o [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

## Extensões do VSCode

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

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

> Ao acessar http://localhost:3000/popula, seu front-end estará funcionando

### Rodar os testes do front-end

Para rodar os testes unitários, use o comando:

```sh
npm run test:unit
```

Para rodar os testes end-to-end, use o comando:

```sh
npm run test:e2e
```

> Caso não funcione, instale as dependências de sistema operacional com os comandos:
>
> `npx playwright install`  
> `npx playwright install-deps`

## O que foi usado nesse projeto?

- [Vue](https://vuejs.org/): Framework JavaScript para construir interfaces e aplicações;
- [Vuetify](https://vuetifyjs.com/en/): Biblioteca de componentes Vue baseada em Material Design;
- [Mirage](https://miragejs.com/): Client-side server para construir API Mock;
- [Leaflet](https://leafletjs.com/): Biblioteca para construir mapas interativos;
- [Chart](https://www.chartjs.org/): Biblioteca extremamente simples e intuitiva para criar gráficos.

## Modelagem

Dentro da nossa Mock temos três modelos, sendo eles:

- `City`, modelo cidades, que contém:

  - `Id`: chave primária do modelo;
  - `Name`: nome da cidade;
  - `Coordinates`: ponto que traz a latitude e longitude da cidade.

- `Neighborhood`, modelo bairros, que contém:

  - `Id`: chave primária do modelo;
  - `Name`: nome do bairro;
  - `CityId`: chave estrangeira do modelo City;
  - `Coordinates`: ponto que traz a latitude e longitude do bairro.

- `Population`, modelo população, que contém:
  - `Id`: chave primária do modelo;
  - `Year`: ano da população;
  - `Count`: tamanho da população dado o ano;
  - `NeighborhoodId`: chave estrangeira do modelo Neighborhood.

Guardamos dentro do "banco de dados" da nossa Mock de forma relacional, ou seja, cada bairro tem uma cidade e cada população tem um bairro.

E ao enviar os dados para o front-end, podemos escolher o tipo da serialização, podendo tratá-los como JSON ou GeoJSON.

<img src="https://i.imgur.com/8IVMPeN.png" height="400px" />

## API

Você vai encontrar os endpoints da mock em `src/mocks/routes/index.js`.

### Search

API de Busca

#### `GET /api/v1/search/cities`

API que busca cidades com base em uma query string.

Parâmetros:

- `query` - Nome da cidade
  - **Obrigatório**
  - Tipo de dado: `String`
  - Tipo de parâmetro: `Query`

Respostas:

- `200 OK`: Objeto com as cidades encontradas.

```json
{
  "cities": [
    {
      "id": "1",
      "name": "São José dos Campos",
      "coordinates": [-23.2198, -45.8916]
    }
  ]
}
```

- `400 Bad Request`: Ausência ou invalidez de parâmetros obrigatórios.

```json
{}
```

- `404 Not Found`: Nenhuma cidade encontrada.

```json
{}
```

### Geo

API que conversa em GEOJson

#### `GET /api/v1/geo/neighborhoods/{cityId}`

Lista a geometrias dos bairros de uma cidade.

Parâmetros:

- `cityId` - ID da cidade
  - **Obrigatório**
  - Tipo de dado: `Integer`
  - Tipo de parâmetro: `Path`

Respostas:

- `200 OK`: Objeto com as geometrias dos bairros da dada cidade.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "1",
      "bbox": [
        -45.916855,
        ...
      ],
      "properties": {
        "name": "Jd. Colinas"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -45.90843208446761,
                -23.20827026939924
              ],
              ...
            ]
          ]
        ]
      }
    },
    ...
  ]
}
```

- `400 Bad Request`: Ausência ou invalidez de parâmetros obrigatórios.

```json
{}
```

- `404 Not Found`: Geometria dos bairros não foram encontradas.

```json
{}
```

### Population

Lista a população de uma localidade ao passar dos anos.

#### `GET /api/v1/populations/neighborhoods/{neighborhoodId}`

Lista a população de um bairro ao passar dos anos.

Parâmetros:

- `neighborhoodId` - Nome da cidade
  - **Obrigatório**
  - Tipo de dado: `Integer`
  - Tipo de parâmetro: `Path`

Respostas:

- `200 OK`: Lista com as populações.

```json
{
  "populations": [
    {
      "id": "1",
      "year": 2000,
      "count": 11567
    },
    {
      "id": "2",
      "year": 2002,
      "count": 12345
    },
    {
      "id": "3",
      "year": 2004,
      "count": 13450
    },
    {
      "id": "4",
      "year": 2006,
      "count": 13550
    }
  ]
}
```

- `400 Bad Request`: Ausência ou invalidez de parâmetros obrigatórios.

```json
{}
```

- `404 Not Found`: População para este bairro não foi encontrada.

```json
{}
```
