import { useState, useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
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
const DADOS_MANUAIS: Processo[] = Array.from({ length: 2000000 }, (_, index) => ({
  id: index + 1,
  numero: `000${1000 + index}-45.2026.8.19.0001`,
  cliente: `Cliente Corporativo ${index + 1} Ltda`,
  tribunal: index % 2 === 0 ? 'TJ-RJ • 4ª Vara Cível' : 'TRT-1 • 12ª Vara',
  status: index % 5 === 0 ? 'Prazo Crítico' : index % 3 === 0 ? 'Concluído' : 'Em Andamento',
}))

function App() {
  const [data] = useState<Processo[]>(() => DADOS_MANUAIS)
  const [globalFilter, setGlobalFilter] = useState('')

  // Referência do container com scroll para a virtualização
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Filtro tradicional sobre o array
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

  // Configuração do TanStack Virtual
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 42, // Altura fixa de cada <tr> (42px)
    overscan: 10,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) : 0

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
      <h1>(Com TanStack Virtualização)</h1>
      <p style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 'bold' }}>
        ⚡ Modo Sênior: {filteredData.length} registros filtrados, mas renderizando apenas <strong>{virtualRows.length}</strong> linhas no DOM!
      </p>

      {/* Input de Filtro */}
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Filtrar por número, cliente, tribunal ou status (fluidez máxima)..."
        style={{
          width: '100%',
          padding: '10px 14px',
          marginBottom: '16px',
          borderRadius: '6px',
          border: '1px solid #10b981',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />

      {/* Container com Scroll */}
      <div
        ref={tableContainerRef}
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
            {/* Espaçador superior virtual */}
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px`, padding: 0 }} />
              </tr>
            )}

            {/* Apenas as linhas visíveis na viewport */}
            {virtualRows.map((virtualRow) => {
              const item = filteredData[virtualRow.index]
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

            {/* Espaçador inferior virtual */}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px`, padding: 0 }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App