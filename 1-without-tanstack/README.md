# ⚠️ Teste 01: Sem TanStack (Abordagem Tradicional / Legada)

Este diretório contém a prova de conceito (POC) utilizando a **abordagem tradicional de renderização** (com `.map()` puro direto no HTML), servindo como o cenário base (*baseline*) de comparação para medir o impacto de performance.

---

## 🎯 Objetivo do Teste

Demonstrar o comportamento da *Main Thread* e o gargalo imposto ao navegador quando tentamos renderizar uma grande volumetria de dados diretamente no DOM, sem o auxílio de bibliotecas de virtualização.

---

## 🛠️ O que foi aplicado
* **Renderização Direta (`.map()`):** Percorre o array e injeta todos os nós `<tr>` de uma só vez na árvore do DOM.
* **Filtro Tradicional (`useMemo` + `.filter()`):** Abordagem comum em aplicações web legadas para filtragem em memória.

---

## 🧪 Como Testar na Prática

1. Instale as dependências:
   ```bash
   yarn install