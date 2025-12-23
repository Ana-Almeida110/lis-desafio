## Como rodar o projeto

npm install
npm run dev

## Testes manuais

- POST /login
- POST /leads (admin, colaborador)
- PUT /leads/:id/aprovar (admin, aprovador)
- GET /leads (todos)

## Observações técnicas

- O sistema possui estrutura de autenticação e autorização por perfil (Admin, Colaborador, Aprovador).
- Devido ao tempo limitado do desafio, os middlewares de autenticação foram temporariamente desativados para permitir a validação completa do fluxo de leads.
- As rotas protegidas estão implementadas e documentadas no código, podendo ser reativadas facilmente.

A modelagem das entidades foi ajustada para aderir ao modelo fornecido no desafio.
Alguns relacionamentos e fluxos de autenticação foram parcialmente implementados devido ao tempo limitado.

