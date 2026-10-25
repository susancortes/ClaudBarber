import React, { useState } from 'react';
import { TarjetaBarbero } from '../components/barberos/TarjetaBarbero';
import { ModalBarbero } from '../components/barberos/ModalBarbero';
import type { Barbero } from '../types';

export const Barberos: React.FC = () => {
  const [barberos, setBarberos] = useState<Barbero[]>([
    {
      id: '1',
      nombre: 'Carlos Ruiz',
      rol: 'Barbero sénior',
      fotoPerfil: '',
      estado: 'Activo',
      historialCortes: [],
    },
    {
      id: '2',
      nombre: 'Diego Martín',
      rol: 'Barbero',
      fotoPerfil: '',
      estado: 'Activo',
      historialCortes: [],
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [barberoAEditar, setBarberoAEditar] = useState<Barbero | null>(null);

  const handleAbrirCrear = () => {
    setBarberoAEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (barbero: Barbero) => {
    setBarberoAEditar(barbero);
    setModalAbierto(true);
  };

  const handleGuardarBarbero = (barb: Barbero) => {
    if (barberoAEditar) {
      // Editar existente
      setBarberos((prev) => prev.map((b) => (b.id === barb.id ? barb : b)));
    } else {
      // Crear nuevo
      setBarberos((prev) => [barb, ...prev]);
    }
  };

  const handleCambiarEstado = (id: string) => {
    setBarberos((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, estado: b.estado === 'Activo' ? 'Inactivo' : 'Activo' } : b
      )
    );
  };

  const handleAgregarCorte = (idBarbero: string, urlFoto: string) => {
    setBarberos((prev) =>
      prev.map((b) =>
        b.id === idBarbero ? { ...b, historialCortes: [...b.historialCortes, urlFoto] } : b
      )
    );
  };

  const barberosOrdenados = [...barberos].sort((a, b) => {
    if (a.estado === 'Activo' && b.estado === 'Inactivo') return -1;
    if (a.estado === 'Inactivo' && b.estado === 'Activo') return 1;
    return 0;
  });

  const activosCount = barberos.filter((b) => b.estado === 'Activo').length;
  const inactivosCount = barberos.filter((b) => b.estado === 'Inactivo').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Equipo de Barberos</h1>
          <p className="text-sm text-gray-400">Administra los perfiles y la disponibilidad de tu equipo.</p>
        </div>
        <button
          onClick={handleAbrirCrear}
          className="bg-white text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          + Añadir Barbero
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
        <span>{barberos.length} barberos en el equipo</span>
        <span>{activosCount} activos · {inactivosCount} inactivos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barberosOrdenados.map((barbero) => (
          <TarjetaBarbero
            key={barbero.id}
            barbero={barbero}
            onEditar={handleAbrirEditar}
            onCambiarEstado={handleCambiarEstado}
            onAgregarCorte={handleAgregarCorte}
          />
        ))}
      </div>

      {modalAbierto && (
        <ModalBarbero
          onClose={() => setModalAbierto(false)}
          onGuardar={handleGuardarBarbero}
          barberoAEditar={barberoAEditar}
        />
      )}
    </div>
  );
};