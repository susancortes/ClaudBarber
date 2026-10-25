import React from 'react';

interface PropsTarjeta {
  titulo: string;
  valor: string | number;
  subtitulo: string;
  icono: string;
}

export const TarjetaMetrica: React.FC<PropsTarjeta> = ({ titulo, valor, subtitulo, icono }) => {
  return (
    <div className="bg-[#161B2C] border border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-md">
      <div className="flex items-center justify-between text-gray-400 mb-4">
        <span className="text-sm font-medium">{titulo}</span>
        <span className="text-lg">{icono}</span>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-1">{valor}</h3>
        <p className="text-xs text-gray-400">{subtitulo}</p>
      </div>
    </div>
  );
};