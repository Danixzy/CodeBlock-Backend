# API Endpoints - Template Backend Daniel

Base URL: `http://localhost:3000`

---

## 🔓 Endpoints Públicos

### Health Check
```
GET http://localhost:3000/health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-27T12:00:00.000Z"
}
```

---

## 👤 Usuários (Users)

### 1. Registrar Novo Usuário
```
POST http://localhost:3000/api/users/register
Content-Type: application/json
```
**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:00:00.000Z"
  }
}
```

---

### 2. Login
```
POST http://localhost:3000/api/users/login
Content-Type: application/json
```
**Body:**
```json
{
  "email": "joao@example.com",
  "password": "123456"
}
```
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2025-10-27T12:00:00.000Z",
      "updatedAt": "2025-10-27T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🔒 Endpoints Protegidos (Requerem Autenticação)

**Para todos os endpoints abaixo, adicione o header:**
```
Authorization: Bearer {seu_token_aqui}
```

---

### 3. Listar Todos os Usuários
```
GET http://localhost:3000/api/users
Authorization: Bearer {token}
```
**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2025-10-27T12:00:00.000Z",
      "updatedAt": "2025-10-27T12:00:00.000Z"
    }
  ]
}
```

---

### 4. Buscar Usuário por ID
```
GET http://localhost:3000/api/users/1
Authorization: Bearer {token}
```
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:00:00.000Z"
  }
}
```

---

### 5. Atualizar Usuário
```
PUT http://localhost:3000/api/users/1
Authorization: Bearer {token}
Content-Type: application/json
```
**Body (todos os campos são opcionais):**
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com",
  "password": "novaSenha123"
}
```
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com",
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:05:00.000Z"
  }
}
```

---

### 6. Deletar Usuário
```
DELETE http://localhost:3000/api/users/1
Authorization: Bearer {token}
```
**Response (204):**
```
No Content
```

---

## 📦 Produtos (Products)

### 7. Criar Produto
```
POST http://localhost:3000/api/products
Authorization: Bearer {token}
Content-Type: application/json
```
**Body:**
```json
{
  "name": "Notebook Dell",
  "description": "Notebook Dell Inspiron 15 com 8GB RAM",
  "price": 2999.99,
  "stock": 10
}
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Notebook Dell",
    "description": "Notebook Dell Inspiron 15 com 8GB RAM",
    "price": 2999.99,
    "stock": 10,
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:00:00.000Z"
  }
}
```

---

### 8. Listar Todos os Produtos
```
GET http://localhost:3000/api/products
Authorization: Bearer {token}
```
**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Notebook Dell",
      "description": "Notebook Dell Inspiron 15 com 8GB RAM",
      "price": 2999.99,
      "stock": 10,
      "createdAt": "2025-10-27T12:00:00.000Z",
      "updatedAt": "2025-10-27T12:00:00.000Z"
    }
  ]
}
```

---

### 9. Buscar Produto por ID
```
GET http://localhost:3000/api/products/1
Authorization: Bearer {token}
```
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Notebook Dell",
    "description": "Notebook Dell Inspiron 15 com 8GB RAM",
    "price": 2999.99,
    "stock": 10,
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:00:00.000Z"
  }
}
```

---

### 10. Atualizar Produto
```
PUT http://localhost:3000/api/products/1
Authorization: Bearer {token}
Content-Type: application/json
```
**Body (todos os campos são opcionais):**
```json
{
  "name": "Notebook Dell Atualizado",
  "description": "Nova descrição",
  "price": 2799.99,
  "stock": 15
}
```
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Notebook Dell Atualizado",
    "description": "Nova descrição",
    "price": 2799.99,
    "stock": 15,
    "createdAt": "2025-10-27T12:00:00.000Z",
    "updatedAt": "2025-10-27T12:10:00.000Z"
  }
}
```

---

### 11. Deletar Produto
```
DELETE http://localhost:3000/api/products/1
Authorization: Bearer {token}
```
**Response (204):**
```
No Content
```

---

## ❌ Respostas de Erro

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Token not provided"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "User not found"
}
```

### 409 Conflict
```json
{
  "status": "error",
  "message": "Email already in use"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## 📝 Fluxo de Teste Recomendado

1. **Health Check** - Verificar se a API está rodando
2. **Registrar Usuário** - Criar uma nova conta
3. **Login** - Obter o token JWT
4. **Copiar o token** - Usar nos próximos requests
5. **Criar Produto** - Testar criação (com token)
6. **Listar Produtos** - Ver todos os produtos
7. **Atualizar/Deletar** - Testar outras operações

---

## 🔧 Dicas para o Postman

### Configurar Variável de Ambiente
1. Crie uma coleção no Postman
2. Adicione uma variável `{{baseUrl}}` = `http://localhost:3000`
3. Adicione uma variável `{{token}}` para armazenar o JWT

### Salvar Token Automaticamente
No request de Login, vá em **Tests** e adicione:
```javascript
pm.test("Login successful", function () {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.data.token);
});
```

### Usar Token nos Headers
Nos requests protegidos, use:
```
Authorization: Bearer {{token}}
```