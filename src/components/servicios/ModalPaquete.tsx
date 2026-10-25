import React, { useState } from 'react';
import type { Paquete } from '../../types';

interface PropsModalPaquete {
  onClose: () => void;
  onGuardar: (paquete: Paquete) => void;
  paqueteAEditar?: Paquete | null;
}

export const ModalPaquete: React.FC<PropsModalPaquete> = ({
  onClose,
  onGuardar,
  paqueteAEditar,
}) => {
  const [nombrePaquete, setNombrePaquete] = useState(paqueteAEditar?.nombrePaquete ?? '');
  const [descripcion, setDescripcion] = useState(paqueteAEditar?.descripcion ?? '');
  const [serviciosIncluidosTexto, setServiciosIncluidosTexto] = useState(
    paqueteAEditar?.serviciosIncluidos.join(', ') ?? ''
  );
  const [duracionTotal, setDuracionTotal] = useState(paqueteAEditar?.duracionTotal ?? '60 min');
  const [precioRegular, setPrecioRegular] = useState(paqueteAEditar?.precioRegular ?? 400);
  const [tieneOferta, setTieneOferta] = useState(paqueteAEditar?.tieneOferta ?? false);
  const [precioOfertado, setPrecioOfertado] = useState(
    paqueteAEditar?.precioOfertado ?? paqueteAEditar?.precioRegular ?? 350
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombrePaquete.trim()) return;

    const paqueteData: Paquete = {
      id: paqueteAEditar ? paqueteAEditar.id : Date.now().toString(),
      nombrePaquete,
      descripcion,
      serviciosIncluidos: serviciosIncluidosTexto.split(',').map((s) => s.trim()).filter(Boolean),
      duracionTotal,
      precioRegular: Number(precioRegular),
      tieneOferta,
      precioOfertado: tieneOferta ? Number(precioOfertado) : undefined,
      estado: paqueteAEditar ? paqueteAEditar.estado : 'Activo',
    };

    onGuardar(paqueteData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#161B2C] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">
            {paqueteAEditar ? 'Editar Paquete' : 'Añadir Nuevo Paquete'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre del paquete</label>
            <input
              type="text"
              required
              placeholder="Ej. Paquete Ejecutivo"
              value={nombrePaquete}
              onChange={(e) => setNombrePaquete(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Descripción</label>
            <textarea
              placeholder="Breve descripción..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Servicios incluidos (separados por coma)</label>
            <input
              type="text"
              placeholder="Ej. Corte clásico, Arreglo de barba"
              value={serviciosIncluidosTexto}
              onChange={(e) => setServiciosIncluidosTexto(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Duración total</label>
              <input
                type="text"
                placeholder="Ej. 1h 15min"
                value={duracionTotal}
                onChange={(e) => setDuracionTotal(e.target.value)}
                className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Precio regular ($ MXN)</label>
              <input
                type="number"
                required
                value={precioRegular}
                onChange={(e) => setPrecioRegular(Number(e.target.value))}
                className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
              />
            </div>
          </div>

          {/* Opción para activar o desactivar la oferta especial */}
          <div className="bg-[#131726] p-3 rounded-lg border border-gray-800 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tieneOferta}
                onChange={(e) => setTieneOferta(e.target.checked)}
                className="rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-0"
              />
              <span className="text-xs font-semibold text-white">¿Activar precio de oferta especial hoy?</span>
            </label>

            {tieneOferta && (
              <div>
                <label className="block text-xs text-gray-400 mb-1">Precio con oferta ($ MXN)</label>
                <input
                  type="number"
                  value={precioOfertado}
                  onChange={(e) => setPrecioOfertado(Number(e.target.value))}
                  className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-200 font-semibold"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};