import React, { useState } from 'react';
import { ModalServicio } from '../components/servicios/ModalServicio';
import { ModalPaquete } from '../components/servicios/ModalPaquete';
import type { Paquete, Servicio } from '../types';

export const Servicios: React.FC = () => {
  const [pestanaActiva, setPestanaActiva] = useState<'servicios' | 'paquetes'>('servicios');

  const [servicios, setServicios] = useState<Servicio[]>([
    {
      id: '1',
      nombreServicio: 'Corte clásico',
      descripcion: 'Corte tradicional con máquina y tijera.',
      duracion: '30 min',
      precio: 200,
      estado: 'Activo',
    },
    {
      id: '2',
      nombreServicio: 'Arreglo de barba',
      descripcion: 'Perfilado con navaja y toalla caliente.',
      duracion: '25 min',
      precio: 150,
      estado: 'Activo',
    },
  ]);

  const [paquetes, setPaquetes] = useState<Paquete[]>([
    {
      id: 'p1',
      nombrePaquete: 'Paquete Ejecutivo',
      descripcion: 'Corte clásico + Arreglo de barba.',
      serviciosIncluidos: ['Corte clásico', 'Arreglo de barba'],
      duracionTotal: '1h 15min',
      precioRegular: 450,
      precioOfertado: 390,
      tieneOferta: true,
      estado: 'Activo',
    },
  ]);

  // Modales de Servicios
  const [modalServicioAbierto, setModalServicioAbierto] = useState(false);
  const [servicioAEditar, setServicioAEditar] = useState<Servicio | null>(null);

  // Modales de Paquetes
  const [modalPaqueteAbierto, setModalPaqueteAbierto] = useState(false);
  const [paqueteAEditar, setPaqueteAEditar] = useState<Paquete | null>(null);

  // Manejadores Servicios
  const handleGuardarServicio = (serv: Servicio) => {
    if (servicioAEditar) {
      setServicios((prev) => prev.map((s) => (s.id === serv.id ? serv : s)));
    } else {
      setServicios((prev) => [serv, ...prev]);
    }
  };

  const handleCambiarEstadoServicio = (id: string) => {
    setServicios((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, estado: s.estado === 'Activo' ? 'Inactivo' : 'Activo' } : s
      )
    );
  };

  // Manejadores Paquetes
  const handleGuardarPaquete = (pq: Paquete) => {
    if (paqueteAEditar) {
      setPaquetes((prev) => prev.map((p) => (p.id === pq.id ? pq : p)));
    } else {
      setPaquetes((prev) => [pq, ...prev]);
    }
  };

  const handleCambiarEstadoPaquete = (id: string) => {
    setPaquetes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, estado: p.estado === 'Activo' ? 'Inactivo' : 'Activo' } : p
      )
    );
  };

  // Lógica de cola (activos primero, inactivos abajo)
  const serviciosOrdenados = [...servicios].sort((a, b) => {
    if (a.estado === 'Activo' && b.estado === 'Inactivo') return -1;
    if (a.estado === 'Inactivo' && b.estado === 'Activo') return 1;
    return 0;
  });

  const paquetesOrdenados = [...paquetes].sort((a, b) => {
    if (a.estado === 'Activo' && b.estado === 'Inactivo') return -1;
    if (a.estado === 'Inactivo' && b.estado === 'Activo') return 1;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Catálogo de Servicios</h1>
          <p className="text-sm text-gray-400">Administra los cortes, paquetes y precios de tu barbería.</p>
        </div>
        <button
          onClick={() => {
            if (pestanaActiva === 'servicios') {
              setServicioAEditar(null);
              setModalServicioAbierto(true);
            } else {
              setPaqueteAEditar(null);
              setModalPaqueteAbierto(true);
            }
          }}
          className="bg-white text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          {pestanaActiva === 'servicios' ? '+ Añadir Servicio' : '+ Añadir Paquete'}
        </button>
      </div>

      {/* Pestañas */}
      <div className="flex gap-4 border-b border-gray-800 mb-6">
        <button
          onClick={() => setPestanaActiva('servicios')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            pestanaActiva === 'servicios'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Servicios individuales ({servicios.length})
        </button>
        <button
          onClick={() => setPestanaActiva('paquetes')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            pestanaActiva === 'paquetes'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Paquetes de ofertas ({paquetes.length})
        </button>
      </div>

      {/* Tabla Servicios */}
      {pestanaActiva === 'servicios' ? (
        <div className="bg-[#161B2C] border border-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider bg-[#131726]/50">
                  <th className="px-6 py-3 font-medium">Servicio</th>
                  <th className="px-6 py-3 font-medium">Descripción</th>
                  <th className="px-6 py-3 font-medium">Duración</th>
                  <th className="px-6 py-3 font-medium">Precio</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {serviciosOrdenados.map((serv) => {
                  const activo = serv.estado === 'Activo';
                  return (
                    <tr key={serv.id} className={`hover:bg-[#1e2538]/50 transition-colors ${!activo ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-white">{serv.nombreServicio}</td>
                      <td className="px-6 py-4 text-gray-300 max-w-xs truncate">{serv.descripcion}</td>
                      <td className="px-6 py-4 text-gray-300">{serv.duracion}</td>
                      <td className="px-6 py-4 font-bold text-white">${serv.precio}.00 MXN</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${activo ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                          {serv.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setServicioAEditar(serv);
                            setModalServicioAbierto(true);
                          }}
                          className="px-2.5 py-1 bg-[#1e2538] hover:bg-gray-700 rounded text-xs text-gray-300 border border-gray-700"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleCambiarEstadoServicio(serv.id)}
                          className="px-2.5 py-1 bg-[#1e2538] hover:bg-gray-700 rounded text-xs text-gray-300 border border-gray-700"
                        >
                          {activo ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tabla Paquetes */
        <div className="bg-[#161B2C] border border-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider bg-[#131726]/50">
                  <th className="px-6 py-3 font-medium">Paquete</th>
                  <th className="px-6 py-3 font-medium">Incluye</th>
                  <th className="px-6 py-3 font-medium">Duración</th>
                  <th className="px-6 py-3 font-medium">Precios</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {paquetesOrdenados.map((pq) => {
                  const activo = pq.estado === 'Activo';
                  return (
                    <tr key={pq.id} className={`hover:bg-[#1e2538]/50 transition-colors ${!activo ? 'opacity-60' : ''}`}>
                      {/* Columna Paquete (solo nombre, sin descripción repetida) */}
                      <td className="px-6 py-4 font-semibold text-white">
                        {pq.nombrePaquete}
                      </td>

                      {/* Columna Incluye */}
                      <td className="px-6 py-4 text-gray-300 max-w-xs">
                        {pq.serviciosIncluidos.join(', ')}
                      </td>

                      {/* Columna Duración */}
                      <td className="px-6 py-4 text-gray-300">{pq.duracionTotal}</td>

                      {/* Columna Precios (Diseño vertical ordenado) */}
                      <td className="px-6 py-4">
                        {pq.tieneOferta ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">
                              ${pq.precioRegular}.00 MXN
                            </span>
                            <span className="font-bold text-emerald-400 text-base">
                              ${pq.precioOfertado}.00 MXN
                            </span>
                            <span className="text-[10px] text-amber-400 font-medium mt-0.5">
                              ¡Oferta Activa!
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-white">
                            ${pq.precioRegular}.00 MXN
                          </span>
                        )}
                      </td>

                      {/* Columna Estado */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${activo ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                          {pq.estado}
                        </span>
                      </td>

                      {/* Columna Acciones (Botones bien separados y alineados) */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setPaqueteAEditar(pq);
                              setModalPaqueteAbierto(true);
                            }}
                            className="px-3 py-1.5 bg-[#1e2538] hover:bg-gray-700 rounded-lg text-xs font-medium text-gray-200 border border-gray-700 transition-colors flex items-center gap-1"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleCambiarEstadoPaquete(pq.id)}
                            className="px-3 py-1.5 bg-[#1e2538] hover:bg-gray-700 rounded-lg text-xs font-medium text-gray-200 border border-gray-700 transition-colors"
                          >
                            {activo ? 'Desactivar' : 'Activar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modales */}
      {modalServicioAbierto && (
        <ModalServicio
          key={servicioAEditar?.id ?? 'nuevo'}
          onClose={() => setModalServicioAbierto(false)}
          onGuardar={handleGuardarServicio}
          servicioAEditar={servicioAEditar}
        />
      )}

      {modalPaqueteAbierto && (
        <ModalPaquete
          key={paqueteAEditar?.id ?? 'nuevo'}
          onClose={() => setModalPaqueteAbierto(false)}
          onGuardar={handleGuardarPaquete}
          paqueteAEditar={paqueteAEditar}
        />
      )}
    </div>
  );
};