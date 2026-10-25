import React from 'react';
import { TarjetaMetrica } from '../components/panel/TarjetaMetrica';
import { AgendaDelDia } from '../components/panel/AgendaDelDia';
import type { Cita } from '../types';

interface PropsPanel {
  irACitas: () => void;
}

export const Panel: React.FC<PropsPanel> = ({ irACitas }) => {
  // Datos de prueba basados en tu wireframe del Panel
  const citasMock: Cita[] = [
    {
      id: '#001',
      cliente: 'Juan Pérez',
      servicioOpaquete: 'Corte clásico',
      barberoAsignado: 'Carlos Ruiz',
      fecha: '17/10/2026',
      hora: '10:00',
      estado: 'Confirmada',
      precioTotal: 200,
      pagado: false,
    },
    {
      id: '#002',
      cliente: 'Miguel López',
      servicioOpaquete: 'Corte + barba',
      barberoAsignado: 'Diego Martín',
      fecha: '17/10/2026',
      hora: '11:00',
      estado: 'Pendiente',
      precioTotal: 350,
      pagado: false,
    },
    {
      id: '#003',
      cliente: 'Pedro García',
      servicioOpaquete: 'Arreglo de barba',
      barberoAsignado: 'Luis Torres',
      fecha: '17/10/2026',
      hora: '12:00',
      estado: 'Confirmada',
      precioTotal: 150,
      pagado: true,
    },
    {
      id: '#004',
      cliente: 'Andrés Gómez',
      servicioOpaquete: 'Corte clásico',
      barberoAsignado: 'Carlos Ruiz',
      fecha: '17/10/2026',
      hora: '13:00',
      estado: 'Pendiente',
      precioTotal: 200,
      pagado: false,
    },
  ];

  return (
    <div>
      {/* Título de la vista */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
          <p className="text-sm text-gray-400">Resumen de la actividad de tu barbería.</p>
        </div>
        <span className="text-xs text-gray-400 bg-[#161B2C] border border-gray-800 px-3 py-1.5 rounded-lg">
          Sábado, 17 de octubre de 2026
        </span>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TarjetaMetrica
          titulo="Citas hoy"
          valor="4"
          subtitulo="2 confirmadas · 2 pendientes"
          icono="📅"
        />
        <TarjetaMetrica
          titulo="Pendientes"
          valor="2"
          subtitulo="Reservas por confirmar"
          icono="⏱️"
        />
        <TarjetaMetrica
          titulo="Ingresos del día"
          valor="$0,00 MXN"
          subtitulo="$85,00 MXN previstos en reservas"
          icono="💳"
        />
      </div>

      {/* Tabla de la Agenda del Día */}
      <AgendaDelDia citas={citasMock} verTodasLasCitas={irACitas} />
    </div>
  );
};