import { useState, useMemo } from 'react'
import './App.css'

// 1. Tipagem dos dados da tabela
interface Processo {
  id: number
  numero: string
  cliente: string
  tribunal: string
  status: 'Em Andamento' | 'Prazo Crítico' | 'Concluído'
}

// 2. Gerando os 2.000 registros na mão (em memória)
const DADOS_MANUAIS: Processo[] = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  numero: `000${1000 + index}-45.2026.8.19.0001`,
  cliente: `Cliente Corporativo ${index + 1} Ltda`,
  tribunal: index % 2 === 0 ? 'TJ-RJ • 4ª Vara Cível' : 'TRT-1 • 12ª Vara',
  status: index % 5 === 0 ? 'Prazo Crítico' : index % 3 === 0 ? 'Concluído' : 'Em Andamento',
}))

function App() {
  const [data] = useState<Processo[]>(() => DADOS_MANUAIS)
  const [globalFilter, setGlobalFilter] = useState('')

  // Filtro feito de forma ingênua/tradicional diretamente sobre o array
  const filteredData = useMemo(() => {
    if (!globalFilter.trim()) return data
    const lower = globalFilter.toLowerCase()
    return data.filter(
      (item) =>
        item.numero.toLowerCase().includes(lower) ||
        item.cliente.toLowerCase().includes(lower) ||
        item.tribunal.toLowerCase().includes(lower) ||
        item.status.toLowerCase().includes(lower)
    )
  }, [data, globalFilter])

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
      <h1>(Sem TanStack / Sem Virtualização)</h1>
      <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>
        ⚠️ Modo Legado: Renderiza TODOS os <strong>{filteredData.length}</strong> registros de uma só vez no DOM!
      </p>

      {/* Input de Filtro Tradicional */}
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Filtrar por número, cliente, tribunal ou status (digite rápido e sinta o travamento)..."
        style={{
          width: '100%',
          padding: '10px 14px',
          marginBottom: '16px',
          borderRadius: '6px',
          border: '1px solid #ef4444',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />

      {/* Container com Scroll */}
      <div
        style={{
          height: '450px',
          overflow: 'auto',
          border: '1px solid #333',
          borderRadius: '8px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#1a1a1a', zIndex: 1 }}>
            <tr>
              <th style={{ width: '70px', padding: '12px', textAlign: 'left', borderBottom: '2px solid #333', color: '#fff' }}>ID</th>
              <th style={{ width: '240px', padding: '12px', textAlign: 'left', borderBottom: '2px solid #333', color: '#fff' }}>Número do Processo</th>
              <th style={{ width: '260px', padding: '12px', textAlign: 'left', borderBottom: '2px solid #333', color: '#fff' }}>Cliente</th>
              <th style={{ width: '200px', padding: '12px', textAlign: 'left', borderBottom: '2px solid #333', color: '#fff' }}>Tribunal</th>
              <th style={{ width: '150px', padding: '12px', textAlign: 'left', borderBottom: '2px solid #333', color: '#fff' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => {
              const color =
                item.status === 'Prazo Crítico' ? '#ef4444' : item.status === 'Concluído' ? '#10b981' : '#3b82f6'

              return (
                <tr
                  key={item.id}
                  style={{
                    height: '42px',
                    borderBottom: '1px solid #2a2a2a',
                  }}
                >
                  <td style={{ padding: '8px 12px' }}>{item.id}</td>
                  <td style={{ padding: '8px 12px' }}>{item.numero}</td>
                  <td style={{ padding: '8px 12px' }}>{item.cliente}</td>
                  <td style={{ padding: '8px 12px' }}>{item.tribunal}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ color, fontWeight: 'bold' }}>{item.status}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App