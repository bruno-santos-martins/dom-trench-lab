# ⚡ Dom Trench Lab — Testes de Performance no React

Repositório dedicado à criação e execução de testes práticos de performance, renderização, paginação e manipulação de grandes volumes de dados no React. 

Cada pasta funciona como um laboratório isolado onde você pode alterar a quantidade de registros e comparar o comportamento da aplicação na prática.

---

## 📂 Projetos e Experimentos

| Identificador | Descrição |
| :--- | :--- |
| **`1-without-tanstack`** | Teste de paginação e listagem tradicional feito **sem** TanStack. Renderiza todos os registros diretamente no DOM usando `.map()` puro, permitindo observar o impacto na performance e o travamento ao aumentar a quantidade de itens. |
| **`1-tanstack`** | Teste de paginação e listagem otimizada feito **com** TanStack (`@tanstack/react-table` e `@tanstack/react-virtual`). Virtualiza a lista para renderizar apenas os itens visíveis na tela, mantendo a fluidez mesmo ao alterar para milhares de registros. |

---

## 🛠️ Como Testar

1. Clone o repositório:
   ```bash
   git clone git@github.com:bruno-santos-martins/dom-trench-lab.git