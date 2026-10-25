import { useState } from 'react';
import { BarraLateral } from './components/estructura/BarraLateral';
import { Encabezado } from './components/estructura/Encabezado';

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
          {paginaActual === 'panel' && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Panel de Control</h1>
              <p className="text-gray-400 text-sm">Resumen de la actividad de tu barbería.</p>
            </div>
          )}
          {paginaActual === 'citas' && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Gestión de Citas</h1>
              <p className="text-gray-400 text-sm">Consulta y administra las reservas de la barbería.</p>
            </div>
          )}
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