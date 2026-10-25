import React, { useState } from 'react';
import type { Servicio } from '../../types';

interface PropsModalServicio {
  onClose: () => void;
  onGuardar: (servicio: Servicio) => void;
  servicioAEditar?: Servicio | null;
}

export const ModalServicio: React.FC<PropsModalServicio> = ({
  onClose,
  onGuardar,
  servicioAEditar,
}) => {
  const [nombreServicio, setNombreServicio] = useState(servicioAEditar?.nombreServicio ?? '');
  const [descripcion, setDescripcion] = useState(servicioAEditar?.descripcion ?? '');
  const [duracion, setDuracion] = useState(servicioAEditar?.duracion ?? '30 min');
  const [precio, setPrecio] = useState(servicioAEditar?.precio ?? 200);
  const [foto, setFoto] = useState(servicioAEditar?.foto ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreServicio.trim()) return;

    const servicioData: Servicio = {
      id: servicioAEditar ? servicioAEditar.id : Date.now().toString(),
      nombreServicio,
      descripcion,
      duracion,
      precio: Number(precio),
      foto,
      estado: servicioAEditar ? servicioAEditar.estado : 'Activo',
    };

    onGuardar(servicioData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#161B2C] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">
            {servicioAEditar ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre del servicio</label>
            <input
              type="text"
              required
              placeholder="Ej. Corte clásico"
              value={nombreServicio}
              onChange={(e) => setNombreServicio(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Descripción</label>
            <textarea
              placeholder="Breve descripción del servicio..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Duración</label>
              <input
                type="text"
                placeholder="Ej. 30 min"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Precio ($ MXN)</label>
              <input
                type="number"
                required
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
                className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">URL de foto referencial (Opcional)</label>
            <input
              type="text"
              placeholder="https://..."
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
            />
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