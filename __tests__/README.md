# Testes unitários

Testes focados em funções puras

### Funções puras

Dados os mesmos valores tem o **mesmo retorno**, independente da quantidade de vezes\
Nunca tocam em recursos que podem dar errado, se restringem a recursos da linguagem.\
Não são para testar conexão com banco de dados, criação de usuários, recursos externos da linguagem.

Exemplo: Cálculos matemáticos, geradores de caminho

# Testes de integração

Testam funcionalidades que podem ter efeitos colaterais, como chamadas a APIs, manipulação de banco de dados


## Sequelize database SQLite

Base de dados em formato de arquivos útil para rodar testes sem afetar banco de dados em produção

Para isso é interessante usar variáveis de ambiente diferentes, por isso os arquivos `.env` e `.env.test`.

Para trabalhar com esses arquivos, precisamos da biblioteca `dotenv`.

### Teste de requisição a API

O Jest não possui esse recurso por padrão. Para isso usamos a *lib* `supertest`