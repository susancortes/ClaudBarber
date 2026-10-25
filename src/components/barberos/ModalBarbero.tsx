import React, { useState } from 'react';
import type { Barbero } from '../../types';

interface PropsModalBarbero {
  onClose: () => void;
  onGuardar: (barbero: Barbero) => void;
  barberoAEditar?: Barbero | null;
}

export const ModalBarbero: React.FC<PropsModalBarbero> = ({
  onClose,
  onGuardar,
  barberoAEditar,
}) => {
  const [nombre, setNombre] = useState(barberoAEditar?.nombre ?? '');
  const [rol, setRol] = useState(barberoAEditar?.rol ?? 'Barbero');
  const [fotoPerfil, setFotoPerfil] = useState(barberoAEditar?.fotoPerfil ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const barberoData: Barbero = {
      id: barberoAEditar ? barberoAEditar.id : Date.now().toString(),
      nombre,
      rol,
      fotoPerfil,
      estado: barberoAEditar ? barberoAEditar.estado : 'Activo',
      historialCortes: barberoAEditar ? barberoAEditar.historialCortes : [],
    };

    onGuardar(barberoData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#161B2C] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">
            {barberoAEditar ? 'Editar Barbero' : 'Añadir Nuevo Barbero'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre completo</label>
            <input
              type="text"
              required
              placeholder="Ej. Carlos Ruiz"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Rol / Puesto</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full bg-[#1e2538] border border-gray-700 text-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-gray-500"
            >
              <option value="Barbero">Barbero</option>
              <option value="Barbero sénior">Barbero sénior</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">URL de foto de perfil (Opcional)</label>
            <input
              type="text"
              placeholder="https://..."
              value={fotoPerfil}
              onChange={(e) => setFotoPerfil(e.target.value)}
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