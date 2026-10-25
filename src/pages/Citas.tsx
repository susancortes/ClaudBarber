import React, { useState } from 'react';
import { TablaAgenda } from '../components/citas/TablaAgenda';
import { ModalDetalleCita } from '../components/citas/DetalleCita';
import type { Cita } from '../types';

export const Citas: React.FC = () => {
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

  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const handleGuardarCita = (actualizada: Cita) => {
    setCitas((prev) => prev.map((c) => (c.id === actualizada.id ? actualizada : c)));
  };

  return (
    <div>
      {/* Encabezado de la página */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Citas</h1>
        <p className="text-sm text-gray-400">Consulta y administra las reservas de la barbería.</p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fecha</label>
          <input
            type="date"
            defaultValue="2026-10-17"
            className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Barbero</label>
          <select className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none focus:border-gray-600">
            <option value="todos">Todos los barberos</option>
            <option value="carlos">Carlos Ruiz</option>
            <option value="diego">Diego Martín</option>
            <option value="luis">Luis Torres</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Estado</label>
          <select className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none focus:border-gray-600">
            <option value="todos">Todos los estados</option>
            <option value="confirmada">Confirmada</option>
            <option value="pendiente">Pendiente</option>
            <option value="realizada">Realizada</option>
          </select>
        </div>
      </div>

      {/* Tabla de Citas */}
      <TablaAgenda citas={citas} onVerDetalle={(cita) => setCitaSeleccionada(cita)} />

      {/* Modal de Detalle */}
      <ModalDetalleCita
        key={citaSeleccionada?.id ?? 'sin-cita'}
        cita={citaSeleccionada}
        onClose={() => setCitaSeleccionada(null)}
        onGuardar={handleGuardarCita}
      />
    </div>
  );
};