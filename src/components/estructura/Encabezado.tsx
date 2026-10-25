import React from 'react';

export const Encabezado: React.FC = () => {
  return (
    <header className="h-16 bg-[#161B2C] border-b border-gray-800 px-6 flex items-center justify-between">
      {/* Buscador */}
      <div className="relative w-80">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Buscar en el panel..."
          className="w-full bg-[#1e2538] text-sm text-gray-200 placeholder-gray-500 rounded-md pl-9 pr-4 py-1.5 border border-gray-700 focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* Notificaciones y Perfil */}
      <div className="flex items-center gap-5 text-sm text-gray-300">
        <button className="text-gray-400 hover:text-white relative">
          🔔
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
          <span className="text-sm font-medium text-gray-200">Administrador</span>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
};