import React from 'react';

interface PropsBarraLateral {
  paginaActual: string;
  setPaginaActual: (pagina: string) => void;
}

export const BarraLateral: React.FC<PropsBarraLateral> = ({ paginaActual, setPaginaActual }) => {
  const menu = [
    { id: 'panel', label: 'Panel', icon: '📊' },
    { id: 'citas', label: 'Citas', icon: '📅' },
    { id: 'barberos', label: 'Barberos', icon: '👤' },
    { id: 'servicios', label: 'Servicios', icon: '✂️' },
  ];

  return (
    <aside className="w-64 bg-[#161B2C] text-gray-300 min-h-screen flex flex-col justify-between border-r border-gray-800 p-4">
      <div>
        {/* Logo / Título */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-gray-800 mb-6">
          <div className="w-8 h-8 rounded border border-gray-600 flex items-center justify-center font-bold text-white">
            ✂
          </div>
          <span className="font-semibold text-white tracking-wide">BARBERÍA Admin</span>
        </div>

        {/* Opciones del menú */}
        <nav className="space-y-1">
          {menu.map((item) => {
            const activo = paginaActual === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPaginaActual(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activo
                    ? 'bg-[#272F4A] text-white'
                    : 'hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pie de página de la barra lateral */}
      <div className="border-t border-gray-800 pt-4 px-3 text-xs text-gray-500">
        <p className="font-semibold text-gray-400">ESPACIO DE ADMINISTRACIÓN</p>
        <p>Sucursal Centro</p>
      </div>
    </aside>
  );
};