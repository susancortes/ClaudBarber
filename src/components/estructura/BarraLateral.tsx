import React, { useState } from 'react';

interface PropsBarraLateral {
  paginaActual: string;
  setPaginaActual: (pagina: string) => void;
}

export const BarraLateral: React.FC<PropsBarraLateral> = ({ paginaActual, setPaginaActual }) => {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const menu = [
    { id: 'panel', label: 'Panel', icon: '📊' },
    { id: 'citas', label: 'Citas', icon: '📅' },
    { id: 'barberos', label: 'Barberos', icon: '👤' },
    { id: 'servicios', label: 'Servicios', icon: '✂️' },
  ];

  const seleccionarPagina = (pagina: string) => {
    setPaginaActual(pagina);
    setMenuMovilAbierto(false);
  };

  return (
    <>
      <div className="relative z-50 border-b border-gray-800 bg-[#161B2C] text-gray-300 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-gray-600 font-bold text-white">
              ✂
            </div>
            <span className="font-semibold tracking-wide text-white">BARBERÍA Admin</span>
          </div>
          <button
            type="button"
            aria-label={menuMovilAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuMovilAbierto}
            onClick={() => setMenuMovilAbierto((abierto) => !abierto)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-xl text-gray-200 hover:bg-gray-800"
          >
            {menuMovilAbierto ? '✕' : '☰'}
          </button>
        </div>

        {menuMovilAbierto && (
          <nav className="space-y-1 border-t border-gray-800 px-3 py-3">
            {menu.map((item) => {
              const activo = paginaActual === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={activo ? 'page' : undefined}
                  onClick={() => seleccionarPagina(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activo ? 'bg-[#272F4A] text-white' : 'hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-gray-800 bg-[#161B2C] p-4 text-gray-300 lg:flex lg:min-h-screen">
        <div>
          <div className="mb-6 flex items-center gap-3 border-b border-gray-800 px-3 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-gray-600 font-bold text-white">
              ✂
            </div>
            <span className="font-semibold tracking-wide text-white">BARBERÍA Admin</span>
          </div>

          <nav className="space-y-1">
            {menu.map((item) => {
              const activo = paginaActual === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={activo ? 'page' : undefined}
                  onClick={() => seleccionarPagina(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activo ? 'bg-[#272F4A] text-white' : 'hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-800 px-3 pt-4 text-xs text-gray-500">
          <p className="font-semibold text-gray-400">ESPACIO DE ADMINISTRACIÓN</p>
          <p>Sucursal Centro</p>
        </div>
      </aside>
    </>
  );
};