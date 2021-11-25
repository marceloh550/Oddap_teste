COMO RODAR O PROJETO BAIXADO

Na pasta node_mysql:
Instalar todas as dependencias indicada pelo package.json
### npm install

Alterar as credenciais do banco de dados e as credenciais do servidor de e-mail no arquivo ".env".

Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte, g significa globalmente
### npm install -g nodemon

Instalar o banco de dados MySQL

Verificar o banco de dados MySQL no pront de comando
### mysql -h localhost -u root -p

Instalar o Workbench para gerenciar o banco de dados de forma gráfica

Criar a base de dados
### create database clinica character set utf8mb4 collate utf8mb4_unicode_ci;

Rodar o projeto usando o nodemon 
### nodemon app.js


Na pasta login_react
Instalar todas as dependencias indicada pelo package.json
### npm install

Rodar o projeto React 
### npm start