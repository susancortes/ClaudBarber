import React, { useState } from 'react';
import { TablaAgenda } from '../components/citas/TablaAgenda';
import { ModalDetalleCita } from '../components/citas/DetalleCita';
import type { Cita } from '../types';

interface PropsCitas {
  citas: Cita[];
  onActualizarCita: (cita: Cita) => void;
}

export const Citas: React.FC<PropsCitas> = ({ citas, onActualizarCita }) => {
  const [filtroFecha, setFiltroFecha] = useState('2026-10-17');
  const [filtroBarbero, setFiltroBarbero] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const convertirFechaAISO = (fechaStr: string) => {
    const partes = fechaStr.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return '';
  };

  const citasFiltradas = citas.filter((cita) => {
    if (filtroFecha) {
      const fechaCitaISO = convertirFechaAISO(cita.fecha);
      if (fechaCitaISO !== filtroFecha) return false;
    }
    if (filtroBarbero !== 'todos') {
      const barberoMatch = cita.barberoAsignado.toLowerCase().includes(filtroBarbero.toLowerCase());
      if (!barberoMatch) return false;
    }
    if (filtroEstado !== 'todos') {
      if (cita.estado.toLowerCase() !== filtroEstado.toLowerCase()) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Citas</h1>
        <p className="text-sm text-gray-400">Consulta y administra las reservas de la barbería.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fecha</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Barbero</label>
          <select
            value={filtroBarbero}
            onChange={(e) => setFiltroBarbero(e.target.value)}
            className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none"
          >
            <option value="todos">Todos los barberos</option>
            <option value="Carlos Ruiz">Carlos Ruiz</option>
            <option value="Diego Martín">Diego Martín</option>
            <option value="Luis Torres">Luis Torres</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Estado</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full bg-[#161B2C] border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:outline-none"
          >
            <option value="todos">Todos los estados</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Realizada">Realizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      <TablaAgenda citas={citasFiltradas} onVerDetalle={(cita) => setCitaSeleccionada(cita)} />

      {citaSeleccionada && (
        <ModalDetalleCita
          key={citaSeleccionada.id}
          cita={citaSeleccionada}
          onClose={() => setCitaSeleccionada(null)}
          onGuardar={onActualizarCita}
        />
      )}
    </div>
  );
};