import React from 'react';

export interface PadraoBlocosProps {
  variant?: 'hero' | 'banner' | 'fundo' | 'barras' | 'cantos' | 'minimal';
  className?: string;
  opacity?: number;
}

/**
 * Composição geométrica oficial de blocos e barras verticais sobrepostos
 * fiel às telas do Lovable e do imagiEdu.
 */
export const PadraoBlocos: React.FC<PadraoBlocosProps> = ({
  variant = 'banner',
  className = '',
  opacity = 1,
}) => {
  // Composição do Hero da Landing Page (Barras arredondadas com triângulo de apoio)
  if (variant === 'hero') {
    return (
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
        className={`pointer-events-none select-none ${className}`}
      >
        {/* Triângulo de apoio inferior esquerdo */}
        <polygon points="34,252 64,200 64,252" fill="#6D4696" />
        {/* Barra vertical roxa principal */}
        <rect x="60" y="64" width="64" height="188" rx="10" fill="#9847EE" />
        {/* Bloco central lilás claro com faixa vertical interna */}
        <rect x="106" y="114" width="64" height="138" rx="10" fill="#D9CBE7" />
        <rect x="134" y="114" width="16" height="138" fill="#7D5BA0" />
        {/* Barra vertical ciano alta */}
        <rect x="170" y="42" width="44" height="210" rx="10" fill="#3CC7E8" />
        {/* Bloco direito lilás médio */}
        <rect x="198" y="138" width="62" height="114" rx="10" fill="#AF81E9" />
      </svg>
    );
  }

  // Composição de fundo suave para a tela /entrar (/demo)
  if (variant === 'fundo') {
    return (
      <svg
        viewBox="0 0 800 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
        className={`pointer-events-none select-none ${className}`}
      >
        <rect x="160" y="0" width="150" height="120" rx="18" fill="#D9CBE7" fillOpacity="0.45" />
        <rect x="260" y="95" width="90" height="280" rx="16" fill="#D9CBE7" fillOpacity="0.35" />
        <rect x="520" y="0" width="190" height="110" rx="18" fill="#3CC7E8" fillOpacity="0.18" />
        <rect x="490" y="110" width="110" height="260" rx="16" fill="#D9CBE7" fillOpacity="0.28" />
        <rect x="180" y="340" width="100" height="115" rx="14" fill="#3CC7E8" fillOpacity="0.18" />
      </svg>
    );
  }

  // Composição dos Banners Internos (Laboratório, Professor, Gestor, Identidade)
  return (
    <svg
      viewBox="0 0 280 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Bloco roxo vertical à esquerda */}
      <rect x="35" y="48" width="62" height="136" rx="4" fill="#9847EE" />
      {/* Barra ciano vertical alta à direita */}
      <rect x="175" y="22" width="46" height="162" rx="4" fill="#3CC7E8" />
      {/* Bloco horizontal lilás claro sobreposto */}
      <rect x="85" y="72" width="88" height="56" rx="4" fill="#D9CBE7" />
      {/* Bloco lilás médio inferior direito */}
      <rect x="202" y="110" width="60" height="74" rx="4" fill="#AF81E9" />
      {/* Triângulo de apoio na base */}
      <polygon points="45,210 92,162 139,210" fill="#D9CBE7" />
    </svg>
  );
};

export default PadraoBlocos;
