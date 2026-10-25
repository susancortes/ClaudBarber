import React from 'react';
import type { Cita } from '../../types';

interface PropsAgenda {
  citas: Cita[];
  verTodasLasCitas: () => void;
}

export const AgendaDelDia: React.FC<PropsAgenda> = ({ citas, verTodasLasCitas }) => {
  return (
    <div className="bg-[#161B2C] border border-gray-800 rounded-xl overflow-hidden shadow-md mt-6">
      {/* Cabecera de la sección */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Agenda del día</h2>
          <p className="text-xs text-gray-400">Próximas citas - {citas.length} reservas programadas</p>
        </div>
        <button
          onClick={verTodasLasCitas}
          className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          Ver todas las citas →
        </button>
      </div>

      {/* Tabla de la agenda */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Hora</th>
              <th className="px-6 py-3 font-medium">Cliente / Servicio</th>
              <th className="px-6 py-3 font-medium">Barbero Asignado</th>
              <th className="px-6 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-sm">
            {citas.map((cita) => (
              <tr key={cita.id} className="hover:bg-[#1e2538]/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-200">{cita.hora}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-white">{cita.cliente}</p>
                  <p className="text-xs text-gray-400">{cita.servicioOpaquete}</p>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" readOnly checked={cita.estado === 'Confirmada'} className="rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-0" />
                    <span>{cita.barberoAsignado}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      cita.estado === 'Confirmada'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cita.estado === 'Confirmada' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    {cita.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};