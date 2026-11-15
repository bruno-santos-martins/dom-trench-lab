# ⚡ Teste 01: Com TanStack (Virtualização & Alta Performance)

Este diretório contém a prova de conceito (POC) focada em **alta performance e virtualização de DOM** utilizando o ecossistema TanStack (`@tanstack/react-table` e `@tanstack/react-virtual`).

---

## 🎯 Objetivo do Teste

Demonstrar como a virtualização de linhas resolve o gargalo de performance em tabelas de grande volumetria. Mesmo quando o array possui milhares de registros, o DOM renderiza apenas os elementos visíveis na *viewport* do usuário.

---

## 🛠️ O que foi aplicado
* **TanStack Virtual (`useVirtualizer`):** Calcula dinamicamente o tamanho do container de rolagem e renderiza apenas uma fração minúscula de linhas reais no HTML (reciclando-as conforme o scroll).
* **`useMemo`:** Otimização para evitar recálculos desnecessários do filtro sobre a massa de dados em memória.
* **Fluidez Garantida:** Rolagem cravada em 60 FPS, independentemente da quantidade de registros gerados.

---

## 🧪 Como Testar na Prática

1. Instale as dependências:
   ```bash
   yarn install