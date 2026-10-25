import React, { useState } from 'react';
import type { Barbero } from '../../types';

interface PropsTarjetaBarbero {
  barbero: Barbero;
  onEditar: (barbero: Barbero) => void;
  onCambiarEstado: (id: string) => void;
  onAgregarCorte: (idBarbero: string, urlFoto: string) => void;
}

export const TarjetaBarbero: React.FC<PropsTarjetaBarbero> = ({
  barbero,
  onEditar,
  onCambiarEstado,
  onAgregarCorte,
}) => {
  const activo = barbero.estado === 'Activo';
  const [nuevaFotoUrl, setNuevaFotoUrl] = useState('');
  const [mostrarSubida, setMostrarSubida] = useState(false);

  const handleSubirCorte = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaFotoUrl.trim()) return;
    onAgregarCorte(barbero.id, nuevaFotoUrl);
    setNuevaFotoUrl('');
    setMostrarSubida(false);
  };

  return (
    <div
      className={`bg-[#161B2C] border rounded-xl p-5 flex flex-col justify-between shadow-md transition-all ${
        activo ? 'border-gray-800' : 'border-gray-800/50 opacity-75'
      }`}
    >
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xl text-gray-400 overflow-hidden">
            {barbero.fotoPerfil ? (
              <img src={barbero.fotoPerfil} alt={barbero.nombre} className="w-full h-full object-cover" />
            ) : (
              '👤'
            )}
          </div>
          <button
            onClick={() => onEditar(barbero)}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-[#1e2538] px-3 py-1.5 rounded-lg border border-gray-700 transition-colors"
          >
            ✏️ Editar
          </button>
        </div>

        {/* Información del Barbero */}
        <h3 className="text-lg font-bold text-white mb-0.5">{barbero.nombre}</h3>
        <p className="text-xs text-gray-400 mb-4">{barbero.rol}</p>

        {/* Apartado: Historial de fotos de cortes */}
        <div className="mb-5 bg-[#131726] p-3 rounded-lg border border-gray-800/80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-300">Historial de Cortes ({barbero.historialCortes.length})</span>
            <button
              onClick={() => setMostrarSubida(!mostrarSubida)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              {mostrarSubida ? 'Cancelar' : '+ Subir corte'}
            </button>
          </div>

          {/* Formulario rápido para simular subida de foto */}
          {mostrarSubida && (
            <form onSubmit={handleSubirCorte} className="mb-3 flex gap-2">
              <input
                type="text"
                placeholder="URL de la foto del corte..."
                value={nuevaFotoUrl}
                onChange={(e) => setNuevaFotoUrl(e.target.value)}
                className="flex-1 bg-[#1e2538] text-xs text-gray-200 px-2.5 py-1.5 rounded border border-gray-700 focus:outline-none"
              />
              <button type="submit" className="bg-white text-gray-900 text-xs px-2.5 py-1.5 rounded font-semibold">
                Guardar
              </button>
            </form>
          )}

          {/* Galería de miniaturas */}
          {barbero.historialCortes.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No hay fotos de cortes registradas aún.</p>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {barbero.historialCortes.map((foto, index) => (
                <div key={index} className="w-12 h-12 rounded bg-gray-800 flex-shrink-0 overflow-hidden border border-gray-700">
                  <img src={foto} alt={`Corte ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pie de la tarjeta: Estatus Activo / Inactivo */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
        <span className={`text-xs font-medium ${activo ? 'text-emerald-400' : 'text-gray-500'}`}>
          {barbero.estado}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={activo}
            onChange={() => onCambiarEstado(barbero.id)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>
    </div>
  );
};