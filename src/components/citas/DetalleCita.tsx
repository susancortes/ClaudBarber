import React, { useState } from 'react';
import type { Cita, MetodoPago } from '../../types';

interface PropsModal {
  cita: Cita | null;
  onClose: () => void;
  onGuardar: (citaActualizada: Cita) => void;
}

export const ModalDetalleCita: React.FC<PropsModal> = ({ cita, onClose, onGuardar }) => {
  const [metodoPago, setMetodoPago] = useState<MetodoPago>(cita?.metodoPago ?? 'Efectivo');

  if (!cita) return null;

  const handleMarcarAtendida = () => {
    const actualizada: Cita = {
      ...cita,
      estado: 'Realizada',
      metodoPago,
      pagado: true,
    };
    onGuardar(actualizada);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#161B2C] border border-gray-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Encabezado del Modal */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Detalles de Reserva</h3>
            <p className="text-xs text-gray-400">Reserva {cita.id} · {cita.fecha} - {cita.hora}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 space-y-5 text-sm">
          {/* Estado actual */}
          <div className="flex justify-between items-center bg-[#1e2538] p-3 rounded-lg border border-gray-800">
            <span className="text-gray-400">Estado de la reserva</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              • {cita.estado}
            </span>
          </div>

          {/* Cliente y Contacto */}
          <div>
            <p className="text-xs text-gray-400">Nombre del Cliente</p>
            <p className="text-base font-semibold text-white">{cita.cliente}</p>
            {cita.contacto && (
              <p className="text-xs text-gray-400 mt-1">{cita.contacto}</p>
            )}
          </div>

          {/* Servicio y Barbero */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Detalles del Servicio</p>
              <p className="font-medium text-gray-200">{cita.servicioOpaquete}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Barbero</p>
              <p className="font-medium text-gray-200">{cita.barberoAsignado}</p>
            </div>
          </div>

          {/* Precio Total */}
          <div className="bg-[#1e2538] p-4 rounded-lg flex justify-between items-center border border-gray-800">
            <span className="font-medium text-gray-300">Precio Total</span>
            <span className="text-2xl font-bold text-white">${cita.precioTotal}.00 MXN</span>
          </div>

          {/* Método de Pago */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Método de pago</p>
            <div className="flex gap-4">
              {(['Efectivo', 'Tarjeta', 'Transferencia'] as MetodoPago[]).map((metodo) => (
                <label key={metodo} className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="metodoPago"
                    value={metodo}
                    checked={metodoPago === metodo}
                    onChange={() => setMetodoPago(metodo)}
                    className="text-indigo-600 focus:ring-0 bg-gray-800 border-gray-700"
                  />
                  <span>{metodo}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3 bg-[#131726]/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleMarcarAtendida}
            className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-200 text-sm font-semibold"
          >
            Marcar Atendida
          </button>
        </div>
      </div>
    </div>
  );
};