// --- BARBEROS ---
export interface Barbero {
  id: string;
  nombre: string;
  rol: string; // ej. 'Barbero sénior', 'Barbero'
  fotoPerfil: string;
  estado: 'Activo' | 'Inactivo';
  historialCortes: string[]; // Lista de URLs/rutas de fotos de cortes realizados
}

// --- SERVICIOS ---
export interface Servicio {
  id: string;
  nombreServicio: string;
  descripcion: string;
  duracion: string; // ej. '30 min'
  precio: number;
  foto?: string; // Foto opcional del servicio
  estado: 'Activo' | 'Inactivo';
}

// --- PAQUETES ---
export interface Paquete {
  id: string;
  nombrePaquete: string;
  descripcion: string;
  serviciosIncluidos: string[]; // Lista de IDs o nombres de los servicios que abarca
  duracionTotal: string; // ej. '60 min'
  precioRegular: number;
  precioOfertado?: number; // Opcional por si no tiene oferta
  tieneOferta: boolean; // Indica si la oferta está activa o no
  estado: 'Activo' | 'Inactivo';
}

// --- CITAS ---
export type EstadoCita = 'Confirmada' | 'Pendiente' | 'Realizada' | 'Cancelada';
export type MetodoPago = 'Efectivo' | 'Tarjeta' | 'Transferencia';

export interface Cita {
  id: string; // ej. '#001'
  cliente: string;
  contacto?: string; // Teléfono o correo
  servicioOpaquete: string; // Nombre del servicio o paquete
  barberoAsignado: string; // Nombre del barbero
  fecha: string; // Separado: ej. "17/10/2026"
  hora: string; // Separado: ej. "10:00 h"
  estado: EstadoCita;
  precioTotal: number;
  pagado: boolean;
  metodoPago?: MetodoPago;
}

// --- MÉTRICAS DEL PANEL ---
export interface MetricaPanel {
  citasHoy: number;
  confirmadasHoy: number;
  pendientesHoy: number;
  ingresosDia: number;
}