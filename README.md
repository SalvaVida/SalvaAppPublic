# SalvaApp

# Nome do Projeto

Descrição breve do projeto em uma ou duas frases.

## Visão Geral

Este projeto é uma aplicação web/microserviço/outra funcionalidade que utiliza o Docker para facilitar o ambiente de desenvolvimento e implantação. O Docker permite criar contêineres isolados e portáteis, fornecendo uma maneira consistente de executar o projeto em diferentes ambientes.

# Frontend

Requer npm e React instalado. Instale as dependências com `npm install` e execute o servidor com `npm start`.

# Backend

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Docker: [Instruções de Instalação](https://docs.docker.com/get-docker/)
- Docker Compose: [Instruções de Instalação](https://docs.docker.com/compose/install/)

## Instalação e Execução

Siga as etapas abaixo para configurar e executar o projeto:

```bash
$ cd backend
$ docker compose up # Se não funcionar rode docker-compose up
```

## Rodar as migrations no banco de dados

Rode o comando dentro do container backend no docker desktop:
```bash
$ python manage.py migrate
```

![image](https://github.com/SalvaVida/SalvaApp/assets/18364803/e653b851-cbe8-4c66-bbeb-68961cf66da2)

## Criar um superuser do django admin
Rode o comando dentro do container backend no docker desktop:
```bash
$ python manage.py createsuperuser
```

![image](https://github.com/SalvaVida/SalvaApp/assets/18364803/3889e346-f7ca-47d7-8d80-2d389bfe10f5)
