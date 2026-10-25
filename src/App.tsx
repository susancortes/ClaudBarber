import { useState } from 'react';
import { BarraLateral } from './components/estructura/BarraLateral';
import { Encabezado } from './components/estructura/Encabezado';
import { Panel } from './pages/Panel';
import { Citas } from './pages/Citas';

export function App() {
  const [paginaActual, setPaginaActual] = useState<string>('panel');

  return (
    <div className="flex min-h-screen bg-[#0d101d] text-gray-100 font-sans">
      {/* Menú Lateral */}
      <BarraLateral paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        <Encabezado />

        <main className="p-8 flex-1 overflow-y-auto">
          {paginaActual === 'panel' && <Panel irACitas={() => setPaginaActual('citas')} />}
          {paginaActual === 'citas' && <Citas />}
          {paginaActual === 'barberos' && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Equipo de Barberos</h1>
              <p className="text-gray-400 text-sm">Administra los perfiles y la disponibilidad de tu equipo.</p>
            </div>
          )}
          {paginaActual === 'servicios' && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Catálogo de Servicios</h1>
              <p className="text-gray-400 text-sm">Administra los cortes, paquetes y precios.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;