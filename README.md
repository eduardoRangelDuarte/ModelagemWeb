# ModelagemWeb
# To-Do List

## Sobre o projeto

O **To-Do List** é uma aplicação web desenvolvida para auxiliar na organização e no gerenciamento de tarefas de forma simples, prática e intuitiva. O sistema permite que o usuário adicione tarefas, marque atividades como concluídas, exclua tarefas e acompanhe a quantidade de atividades pendentes e concluídas.

O projeto foi desenvolvido utilizando **HTML, CSS e JavaScript**, com uma estrutura organizada e semântica, além de armazenamento local das tarefas para que elas permaneçam salvas mesmo após a atualização da página.

## Funcionalidades

- Adicionar novas tarefas.
- Marcar tarefas como concluídas.
- Mover automaticamente tarefas concluídas para a seção de tarefas concluídas.
- Retornar tarefas concluídas para a lista de tarefas pendentes.
- Excluir tarefas.
- Contabilizar o número total de tarefas.
- Contabilizar o número de tarefas concluídas.
- Salvar as tarefas utilizando `localStorage`.
- Manter as tarefas salvas após atualizar ou fechar a página.
- Adicionar tarefas utilizando a tecla Enter.
- Navegar entre as seções através do menu lateral.
- Adaptar a estrutura para diferentes tamanhos de tela.

## Tecnologias utilizadas

### HTML

Utilizado para estruturar o conteúdo da aplicação, utilizando elementos semânticos como:

- `header`
- `nav`
- `main`
- `section`
- `aside`
- `footer`

### CSS

Responsável pela estilização e organização visual da página, incluindo:

- Layout em três áreas.
- Cabeçalho e rodapé fixos.
- Menu lateral fixo.
- Rolagem somente na área principal de conteúdo.
- Cores e identidade visual.
- Estados de interação dos botões e links.
- Adaptação para telas menores.

### JavaScript

Responsável pela interação e funcionamento da aplicação:

- Criação de tarefas.
- Conclusão e reabertura de tarefas.
- Exclusão de tarefas.
- Atualização dos contadores.
- Armazenamento das tarefas no `localStorage`.
- Recuperação das tarefas ao recarregar a página.

## Estrutura do projeto

```text
ModelagemWeb/
│
├── index.html
├── style.css
├── script.js
│
└── img/
    └── logo.png