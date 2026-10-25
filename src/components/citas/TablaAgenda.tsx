import React from 'react';
import type { Cita } from '../../types';

interface PropsTablaAgenda {
  citas: Cita[];
  onVerDetalle: (cita: Cita) => void;
}

export const TablaAgenda: React.FC<PropsTablaAgenda> = ({ citas, onVerDetalle }) => {
  return (
    <div className="bg-[#161B2C] border border-gray-800 rounded-xl overflow-hidden shadow-md">
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center text-xs text-gray-400">
        <span className="font-semibold text-gray-300">Reservas del día</span>
        <span>{citas.length} citas en total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider bg-[#131726]/50">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Servicio</th>
              <th className="px-6 py-3 font-medium">Barbero</th>
              <th className="px-6 py-3 font-medium">Fecha/Hora</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-sm">
            {citas.map((cita) => (
              <tr key={cita.id} className="hover:bg-[#1e2538]/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{cita.id}</td>
                <td className="px-6 py-4 font-medium text-white">{cita.cliente}</td>
                <td className="px-6 py-4 text-gray-300">{cita.servicioOpaquete}</td>
                <td className="px-6 py-4 text-gray-300">{cita.barberoAsignado}</td>
                <td className="px-6 py-4 text-gray-300">
                  <p className="font-medium">{cita.fecha}</p>
                  <p className="text-xs text-gray-500">{cita.hora}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      cita.estado === 'Confirmada'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : cita.estado === 'Realizada'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        cita.estado === 'Confirmada'
                          ? 'bg-emerald-400'
                          : cita.estado === 'Realizada'
                          ? 'bg-blue-400'
                          : 'bg-amber-400'
                      }`}
                    ></span>
                    {cita.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onVerDetalle(cita)}
                    className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="Ver detalle de reserva"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};