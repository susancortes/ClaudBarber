import React from 'react';
import { TarjetaMetrica } from '../components/panel/TarjetaMetrica';
import type { Cita } from '../types';

interface PropsPanel {
  citas: Cita[];
  irACitas: () => void;
}

export const Panel: React.FC<PropsPanel> = ({ citas, irACitas }) => {
  // Filtrar citas del día (ej. 17/10/2026)
  const citasHoy = citas.filter((c) => c.fecha === '17/10/2026');
  const confirmadasHoy = citasHoy.filter((c) => c.estado === 'Confirmada').length;
  const realizadasHoy = citasHoy.filter((c) => c.estado === 'Realizada').length;
  const pendientesHoy = citasHoy.filter((c) => c.estado === 'Pendiente').length;

  // Calcular ingresos del día sumando las citas marcadas como 'Realizada' o pagadas
  const ingresosDia = citasHoy
    .filter((c) => c.estado === 'Realizada' || c.pagado)
    .reduce((acc, curr) => acc + curr.precioTotal, 0);

  const ingresosPrevistos = citasHoy
    .filter((c) => c.estado !== 'Cancelada')
    .reduce((acc, curr) => acc + curr.precioTotal, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
          <p className="text-sm text-gray-400">Resumen de la actividad de tu barbería.</p>
        </div>
        <span className="text-xs text-gray-400 bg-[#161B2C] border border-gray-800 px-3 py-1.5 rounded-lg">
          Sábado, 17 de octubre de 2026
        </span>
      </div>

      {/* Tarjetas de Métricas actualizadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TarjetaMetrica
          titulo="Citas hoy"
          valor={citasHoy.length}
          subtitulo={`${confirmadasHoy} confirmadas · ${realizadasHoy} realizadas`}
          icono="📅"
        />
        <TarjetaMetrica
          titulo="Pendientes"
          valor={pendientesHoy}
          subtitulo="Reservas por confirmar"
          icono="⏱️"
        />
        <TarjetaMetrica
          titulo="Ingresos del día"
          valor={`$${ingresosDia}.00 MXN`}
          subtitulo={`$${ingresosPrevistos}.00 MXN previstos en reservas`}
          icono="💳"
        />
      </div>

      {/* Sección Agenda del Día (Sin checkboxes molestos) */}
      <div className="bg-[#161B2C] border border-gray-800 rounded-xl overflow-hidden shadow-md">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Agenda del día</h2>
            <p className="text-xs text-gray-400">Próximas citas - {citasHoy.length} reservas programadas</p>
          </div>
          <button
            onClick={irACitas}
            className="px-3.5 py-2 bg-[#1e2538] hover:bg-gray-700 text-xs font-semibold text-white rounded-lg border border-gray-700 transition-colors shadow-sm"
          >
            Ver todas las citas →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider bg-[#131726]/50">
                <th className="px-6 py-3 font-medium">Hora</th>
                <th className="px-6 py-3 font-medium">Cliente / Servicio</th>
                <th className="px-6 py-3 font-medium">Barbero Asignado</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-sm">
              {citasHoy.map((cita) => (
                <tr key={cita.id} className="hover:bg-[#1e2538]/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-200">{cita.hora}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{cita.cliente}</p>
                    <p className="text-xs text-gray-400">{cita.servicioOpaquete}</p>
                  </td>
                  {/* Columna de Barbero limpia sin checkboxes */}
                  <td className="px-6 py-4 text-gray-300 font-medium">
                    {cita.barberoAsignado}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};