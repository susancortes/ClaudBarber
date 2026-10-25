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
        <span className="font-semibold text-gray-300">Reservas registradas</span>
        <span>{citas.length} citas encontradas</span>
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
              <th className="px-6 py-3 font-medium">Precio a pagar</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-sm">
            {citas.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No se encontraron citas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              citas.map((cita) => (
                <tr key={cita.id} className="hover:bg-[#1e2538]/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{cita.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{cita.cliente}</td>
                  <td className="px-6 py-4 text-gray-300">{cita.servicioOpaquete}</td>
                  <td className="px-6 py-4 text-gray-300">{cita.barberoAsignado}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <p className="font-medium">{cita.fecha}</p>
                    <p className="text-xs text-gray-500">{cita.hora}</p>
                  </td>
                  {/* Nueva Columna de Precio */}
                  <td className="px-6 py-4 font-bold text-white">
                    ${cita.precioTotal}.00 MXN
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                        cita.estado === 'Confirmada'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : cita.estado === 'Realizada'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : cita.estado === 'Cancelada'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cita.estado === 'Confirmada'
                            ? 'bg-emerald-400'
                            : cita.estado === 'Realizada'
                            ? 'bg-blue-400'
                            : cita.estado === 'Cancelada'
                            ? 'bg-red-400'
                            : 'bg-amber-400'
                        }`}
                      ></span>
                      {cita.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onVerDetalle(cita)}
                      className="w-8 h-8 bg-[#1e2538] hover:bg-gray-700 border border-gray-700 rounded-lg inline-flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-sm"
                      title="Ver detalle de reserva"
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};