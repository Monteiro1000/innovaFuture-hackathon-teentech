import React from 'react';

export interface PadraoBlocosProps {
  variant?: 'barras' | 'cantos' | 'minimal';
  className?: string;
  opacity?: number;
}

/**
 * Padrão decorativo de blocos retangulares e barras verticais sobrepostos
 * fiel ao Guia de Marca (Páginas 1 e 4 do PDF oficial), para fundos de seção,
 * estados vazios e telas de entrada.
 */
export const PadraoBlocos: React.FC<PadraoBlocosProps> = ({
  variant = 'barras',
  className = '',
  opacity = 1,
}) => {
  if (variant === 'cantos') {
    return (
      <svg
        viewBox="0 0 260 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
        className={`pointer-events-none select-none ${className}`}
      >
        <rect x="0" y="0" width="180" height="65" fill="#D9CBE7" fillOpacity="0.85" />
        <rect x="180" y="0" width="80" height="65" fill="#9847EE" />
        <rect x="180" y="65" width="80" height="155" fill="#7635C9" />
        <polygon points="180,220 220,165 260,220" fill="#3F2757" />
      </svg>
    );
  }

  if (variant === 'minimal') {
    return (
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
        className={`pointer-events-none select-none ${className}`}
      >
        <rect x="40" y="70" width="56" height="110" fill="#3CC7E8" />
        <rect x="128" y="70" width="60" height="110" fill="#3CC7E8" />
        <rect x="116" y="0" width="20" height="145" fill="#9847EE" />
        <rect x="172" y="0" width="44" height="105" fill="#9847EE" />
        <rect x="235" y="0" width="66" height="125" fill="#9847EE" />
        <rect x="96" y="38" width="18" height="110" fill="#D9CBE7" />
        <rect x="136" y="38" width="18" height="110" fill="#D9CBE7" />
        <rect x="210" y="38" width="18" height="110" fill="#D9CBE7" />
        <rect x="284" y="38" width="36" height="90" fill="#D9CBE7" />
      </svg>
    );
  }

  // Variant 'barras' — composição completa inspirada na Capa e Banner do Guia de Marca
  return (
    <svg
      viewBox="0 0 560 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Blocos ciano de base (como no Banner Exemplo pág. 4) */}
      <rect x="120" y="180" width="76" height="140" fill="#3CC7E8" />
      <rect x="225" y="180" width="96" height="140" fill="#3CC7E8" />

      {/* Barras roxas superiores (#9847EE) */}
      <rect x="162" y="0" width="24" height="190" fill="#9847EE" />
      <rect x="234" y="0" width="24" height="190" fill="#9847EE" />
      <rect x="272" y="0" width="58" height="180" fill="#9847EE" />
      <rect x="358" y="0" width="24" height="220" fill="#9847EE" />
      <rect x="415" y="0" width="84" height="185" fill="#9847EE" />
      <rect x="518" y="0" width="24" height="220" fill="#9847EE" />

      {/* Barras intermediárias lilás (#AF81E9) */}
      <rect x="18" y="140" width="22" height="145" fill="#AF81E9" />
      <rect x="86" y="140" width="22" height="145" fill="#AF81E9" />
      <rect x="162" y="140" width="24" height="110" fill="#AF81E9" />
      <rect x="200" y="140" width="22" height="145" fill="#AF81E9" />
      <rect x="310" y="140" width="48" height="110" fill="#AF81E9" />
      <rect x="382" y="140" width="22" height="110" fill="#AF81E9" />

      {/* Barras claras (#D9CBE7) */}
      <rect x="54" y="180" width="22" height="140" fill="#D9CBE7" />
      <rect x="198" y="95" width="20" height="175" fill="#D9CBE7" />
      <rect x="256" y="95" width="20" height="175" fill="#D9CBE7" />
      <rect x="346" y="210" width="20" height="110" fill="#D9CBE7" />
      <rect x="395" y="75" width="20" height="195" fill="#D9CBE7" />
      <rect x="488" y="75" width="46" height="170" fill="#D9CBE7" />

      {/* Triângulo de apoio característico da marca */}
      <polygon points="440,320 495,255 550,320" fill="#3F2757" fillOpacity="0.9" />
    </svg>
  );
};

export default PadraoBlocos;
