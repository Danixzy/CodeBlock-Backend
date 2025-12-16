# Template Backend Daniel

Template completo de backend Node.js com TypeScript, MySQL, Knex.js, JWT e Docker.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **Knex.js** - Query builder SQL
- **Objection.js** - ORM baseado em Knex
- **JWT** - Autenticação
- **Joi** - Validação de dados
- **Docker** - Containerização
- **Jest** - Testes automatizados
- **AWS S3** - Armazenamento de arquivos

## 📁 Estrutura do Projeto

```
template-backend-daniel/
├── src/
│   ├── server.ts              # Inicialização do servidor
│   ├── app.ts                 # Configuração do Express
│   ├── config/                # Configurações globais
│   ├── routes/                # Rotas da API
│   ├── domains/               # Domínios de negócio
│   │   ├── users/             # Domínio de usuários
│   │   └── products/          # Domínio de produtos
│   ├── middlewares/           # Middlewares globais
│   ├── errors/                # Tratamento de erros
│   ├── database/              # Configuração do banco
│   │   ├── migrations/        # Migrações
│   │   └── seeds/             # Seeds
│   ├── helpers/               # Funções auxiliares
│   ├── utils/                 # Utilitários
│   ├── services/              # Serviços externos
│   ├── storage/               # Armazenamento
│   ├── translations/          # i18n
│   ├── types/                 # Tipos TypeScript
│   ├── validators/            # Validações globais
│   ├── bootstrap/             # Inicializações
│   ├── cli/                   # Scripts CLI
│   └── templates/             # Templates
├── uploads/                   # Arquivos enviados
├── logs/                      # Logs da aplicação
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── Dockerfile
├── knexfile.ts
└── README.md
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Danixzy/Template-Backend-daniel.git
cd Template-Backend-daniel
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações:
```bash
yarn migrate:latest
```

5. (Opcional) Execute os seeds:
```bash
yarn seed:run
```

## 🐳 Docker

Para executar com Docker:

```bash
docker-compose up -d
```

## 🚀 Uso

### Desenvolvimento
```bash
yarn dev
```

### Produção
```bash
yarn build
yarn start
```

### Testes
```bash
yarn test
yarn test:watch
yarn test:coverage
```

## 📝 Scripts Disponíveis

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o TypeScript
- `yarn start` - Inicia o servidor em produção
- `yarn test` - Executa os testes
- `yarn migrate:latest` - Executa as migrações
- `yarn migrate:rollback` - Desfaz a última migração
- `yarn migrate:make <name>` - Cria uma nova migração
- `yarn seed:run` - Executa os seeds
- `yarn seed:make <name>` - Cria um novo seed
- `yarn lint` - Verifica o código
- `yarn lint:fix` - Corrige problemas de lint

## 🔐 Autenticação

A API usa JWT para autenticação. Endpoints protegidos requerem um token no header:

```
Authorization: Bearer <token>
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Daniel - [@Danixzy](https://github.com/Danixzy)