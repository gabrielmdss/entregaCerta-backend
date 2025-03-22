# 📦 Entrega Certa

**Entrega Certa** é um sistema simples e eficiente para gerenciar a distribuição de cestas básicas em instituições de apoio, como pastorais e organizações sociais. O sistema facilita o controle das entregas, permitindo a busca rápida por código, nome, documento ou data da retirada.

## 📋 Funcionalidades

- Cadastro de assistidos com nome, documento (RG/CPF), imagem do documento e código único de 4 dígitos.
- Registro de cada retirada de cesta com data e identificação do assistido.
- Busca rápida por código, nome, documento ou data da retirada.
- Histórico de entregas para controle e acompanhamento.

## 🗂️ Estrutura do Banco de Dados (PostgreSQL)

### Tabela: `assistidos`
| Coluna          | Tipo     | Descrição                        |
|-----------------|----------|----------------------------------|
| id              | SERIAL   | Identificador único              |
| nome            | TEXT     | Nome completo do assistido       |
| documento       | TEXT     | Documento (RG ou CPF) - Único    |
| codigo          | CHAR(4)  | Código de 4 dígitos - Único      |
| imagem_documento| TEXT     | Caminho ou URL da imagem do documento |

### Tabela: `retiradas`
| Coluna        | Tipo     | Descrição                                |
|---------------|----------|------------------------------------------|
| id            | SERIAL   | Identificador único                      |
| assistido_id  | INT      | Referência ao `id` da tabela assistidos  |
| data_retirada | DATE     | Data da retirada                         |

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **PostgreSQL**

## 📦 Configuração do Ambiente

1. Certifique-se de ter o **Node.js** e o **PostgreSQL** instalados.

2. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/entrega-certa.git
   cd entrega-certa
   ```

3. Crie o banco de dados no PostgreSQL:

   ```sql
   CREATE DATABASE entrega_certa;
   ```

4. Execute o script de criação das tabelas.

5. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/entrega_certa
   ```

6. Instale as dependências:

   ```bash
   npm install
   ```

7. Execute o projeto:

   ```bash
   npm run dev
   ```

## 📊 Melhorias Futuras

- Geração de relatórios de entregas.
- Controle de limite de retirada por período.
- Autenticação para diferentes níveis de acesso.

## 📞 Suporte

Se precisar de ajuda ou tiver sugestões, entre em contato! 😊

