# Challenge

> Microsserviço responsável pelo controle de desafios e respostas submetidas pelo usuário

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Gerenciamento de desafios
- [x] Submissão de respostas
- [x] Integração com microsserviço de **corrections**
- [ ] Implementação testes unitários
- [ ] Implementação testes integração

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- NodeJs na versão `16.14` ou superior;
- Docker Compose versão `1.29` ou superior;

Executar o docker-compose disponível na raiz do repositório

```bash
docker-compose up -d
```

Criar os seguintes tópicos

- challenge.correction
- correction.finished

## 🚀 Instalando

Instalar dependências

```
npm run install
```

Criar base de dados da aplicação

```
npx run prisma migrate dev
```

## ☕ Usando

Executando o projeto

```bash
npm run start:dev
```

Operações

```graphql
Query {
  challenges(...): [Challenge!]!
  answers(...): [Answer!]!
}

Mutation {
 createChallenge(...): Challenge!
 updateChallenge(...): Challenge!
 deleteChallenge(...): Challenge!

 answerChallenge(...): Answer!
}
```

## 🤝 Desenvolvedores

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/11464809?v=4" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Pedro Henrique</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
