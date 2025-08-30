<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynGNI5-C7YGr5Wx5owPqTBG7xL2fv_Zh3bQ&s.jpeg" height="150" width="230">  
  <img src="https://file.labex.io/namespace/df87b950-1f37-4316-bc07-6537a1f2c481/java/lab-your-first-java-lab/assets/java.svg" height="150" width="200">
  <br> 
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGakkUEbXyfann4M16v9CV-sTa915cUOdh9g&s" height="150" width="200">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/H2_logo.png/250px-H2_logo.png" height="150" width="200">
</p>

<h1 align="center"> Gestão de Tarefas - API Backend</h1>

<p align="center">
Uma aplicação backend desenvolvida em <b>Java + Spring Boot</b>, com arquitetura em pacotes (domain, dto, repository, service, controller), 
para cadastro, listagem, paginação e gerenciamento de tarefas e projetos.
</p>

---

## **Visão Geral**

Este projeto foi criado para gerenciar tarefas vinculadas a projetos.  
Cada Task possui título, descrição, status, data de criação e referência a um Project.  
A API oferece endpoints para criar, listar (com paginação e filtro por projeto) e remover tarefas.

---

## ** Funcionalidades Implementadas **

- Estrutura inicial do projeto **Spring Boot**.  
- Criação das entidades **Project** e **Task**.  
- Repositórios base com **Spring Data JPA**.  
- DTOs (`TaskRequest`, `TaskResponse`) para padronização da API.  
- Serviços (`TaskService`) com regras de negócio.  
- Controllers REST com endpoints:  
  - `GET /tasks` → lista paginada de tarefas (com filtro por projeto e ordenação desc).  
  - `POST /tasks` → cria uma nova tarefa (validação com `@Valid`).  
  - `DELETE /tasks/{id}` → remove tarefa por ID.  
  - `GET /tasks/projects` → lista todos os projetos cadastrados.  
- Integração com Postman testada.

---


## **Tecnologias Utilizadas**

- **Java 17**  
- **Spring Boot 3.5.5**  
- **Spring Data JPA**  
- **Hibernate**  
- **Lombok** 
- **H2 Database** (em memória, para desenvolvimento e testes)  
- **Maven** 
- **Angular 17**  

---


## **Estrutura do Projeto**

 ```bash
backend  
 ┣ src/main/java/br/com/jennifer/backend  
 ┃ ┣ controller → Controllers REST (TaskController)  
 ┃ ┣ domain → Entidades (Project, Task)  
 ┃ ┣ dto → Objetos de transferência (TaskRequest, TaskResponse)  
 ┃ ┣ repository → Interfaces JPA (TaskRepository, ProjectRepository)  
 ┃ ┗ service → Regras de negócio (TaskService)  
 ┣ src/main/resources  
 ┃ ┣ application.properties  
 ┃ ┣ schema.sql (DDL inicial)  
 ┃ ┗ data.sql (carga inicial de projetos/tarefas)  
 ┣ src/test/java → Testes unitários  
 ┣ pom.xml  
 ┗ README.md  
 
```
---

## ** Como Rodar o Projeto**

### **1️ - Clonar o repositório**
```bash
git clone https://github.com/JenniferFariasRodrigues/gestao-tarefas.git
cd gestao-tarefas/backend
```

### **2️ - Rodar com Maven**
```bash
./mvnw spring-boot:run
```

### **3️ - Testar no Postman**
#### Listar Tarefas (com paginação)
```
GET http://localhost:8080/tasks?page=0&size=5
```

#### Criar Tarefa
```
POST http://localhost:8080/tasks

{
  "title": "Criar UI",
  "description": "Implementar lista e formulário",
  "status": "OPEN",
  "projectId": 1
}
```

#### Deletar Tarefa
```
DELETE http://localhost:8080/tasks/{id}
```

#### Listar Projetos
```
GET http://localhost:8080/tasks/projects
```

---

##  Próximos Passos



---

## Licença

Projeto desenvolvido para estudo e prática com Spring Boot.  
Licença livre (MIT).
