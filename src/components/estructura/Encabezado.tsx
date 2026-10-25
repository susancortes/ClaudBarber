import React, { useState } from 'react';

interface PropsEncabezado {
  onBuscar?: (termino: string) => void;
}

export const Encabezado: React.FC<PropsEncabezado> = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Simulación de elementos que se pueden encontrar rápidamente
  const resultadosMock = [
    { tipo: 'Cliente', nombre: 'Juan Pérez', detalle: 'Corte clásico · 17/10/2026' },
    { tipo: 'Cliente', nombre: 'Miguel López', detalle: 'Corte + barba · 17/10/2026' },
    { tipo: 'Barbero', nombre: 'Carlos Ruiz', detalle: 'Barbero sénior · Activo' },
    { tipo: 'Servicio', nombre: 'Paquete Ejecutivo', detalle: '$390.00 MXN · Oferta' },
  ].filter(
    (item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.detalle.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <header className="h-16 bg-[#161B2C] border-b border-gray-800 px-8 flex items-center justify-between relative z-40">
      {/* Buscador Global Interactivo */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          🔍
        </div>
        <input
          type="text"
          placeholder="Buscar clientes, barberos o servicios..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setMostrarResultados(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (busqueda.trim().length > 0) setMostrarResultados(true);
          }}
          className="w-full bg-[#0d101d] border border-gray-800 text-gray-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-gray-600 transition-colors"
        />

        {/* Menú desplegable con resultados de la búsqueda */}
        {mostrarResultados && (
          <div className="absolute left-0 right-0 mt-2 bg-[#161B2C] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="px-4 py-2 border-b border-gray-800 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
              Resultados de búsqueda ({resultadosMock.length})
            </div>
            {resultadosMock.length === 0 ? (
              <div className="px-4 py-4 text-xs text-gray-500 text-center">
                No se encontraron coincidencias para "{busqueda}"
              </div>
            ) : (
              <div className="divide-y divide-gray-800/50 max-h-60 overflow-y-auto">
                {resultadosMock.map((res, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      alert(`Seleccionaste: ${res.nombre} (${res.tipo})`);
                      setMostrarResultados(false);
                      setBusqueda('');
                    }}
                    className="px-4 py-3 hover:bg-[#1e2538] transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{res.nombre}</p>
                      <p className="text-[10px] text-gray-400">{res.detalle}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {res.tipo}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Perfil del Administrador y Notificaciones */}
      <div className="flex items-center gap-4">
        <button className="w-9 h-9 bg-[#0d101d] border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          🔔
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-gray-800">
          <div className="text-right">
            <p className="text-xs font-semibold text-white">Administrador</p>
            <p className="text-[10px] text-gray-400">Sucursal Centro</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
};