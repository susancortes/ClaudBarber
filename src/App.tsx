import { useState } from 'react';
import { BarraLateral } from './components/estructura/BarraLateral';
import { Encabezado } from './components/estructura/Encabezado';
import { Panel } from './pages/Panel';
import { Citas } from './pages/Citas';
import { Barberos } from './pages/Barberos';
import { Servicios } from './pages/Servicios';
import type { Cita } from './types';

export function App() {
  const [paginaActual, setPaginaActual] = useState<string>('panel');

  // Estado global de las citas para que no se reinicien al cambiar de pantalla
  const [citas, setCitas] = useState<Cita[]>([
    {
      id: '#001',
      cliente: 'Juan Pérez',
      contacto: '612 345 678 · juan.perez@correo.es',
      servicioOpaquete: 'Corte clásico',
      barberoAsignado: 'Carlos Ruiz',
      fecha: '17/10/2026',
      hora: '10:00 h',
      estado: 'Confirmada',
      precioTotal: 200,
      pagado: false,
    },
    {
      id: '#002',
      cliente: 'Miguel López',
      contacto: '612 987 654 · miguel@correo.es',
      servicioOpaquete: 'Corte + barba',
      barberoAsignado: 'Diego Martín',
      fecha: '17/10/2026',
      hora: '11:00 h',
      estado: 'Pendiente',
      precioTotal: 350,
      pagado: false,
    },
    {
      id: '#003',
      cliente: 'Pedro García',
      contacto: '612 111 222 · pedro@correo.es',
      servicioOpaquete: 'Arreglo de barba',
      barberoAsignado: 'Luis Torres',
      fecha: '17/10/2026',
      hora: '12:00 h',
      estado: 'Confirmada',
      precioTotal: 150,
      pagado: true,
    },
    {
      id: '#004',
      cliente: 'Andrés Gómez',
      contacto: '612 333 444 · andres@correo.es',
      servicioOpaquete: 'Corte clásico',
      barberoAsignado: 'Carlos Ruiz',
      fecha: '17/10/2026',
      hora: '13:00 h',
      estado: 'Pendiente',
      precioTotal: 200,
      pagado: false,
    },
  ]);

  const handleActualizarCita = (citaActualizada: Cita) => {
    setCitas((prev) => prev.map((c) => (c.id === citaActualizada.id ? citaActualizada : c)));
  };

  return (
    <div className="flex min-h-screen bg-[#0d101d] text-gray-100 font-sans">
      <BarraLateral paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      <div className="flex-1 flex flex-col">
        <Encabezado />

        <main className="p-8 flex-1 overflow-y-auto">
          {paginaActual === 'panel' && (
            <Panel citas={citas} irACitas={() => setPaginaActual('citas')} />
          )}
          {paginaActual === 'citas' && (
            <Citas citas={citas} onActualizarCita={handleActualizarCita} />
          )}
          {paginaActual === 'barberos' && <Barberos />}
          {paginaActual === 'servicios' && <Servicios />}
        </main>
      </div>
    </div>
  );
}

export default App;