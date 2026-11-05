import React from 'react';

export interface DestaqueProps {
  children: React.ReactNode;
  tone?: 'auto' | 'claro';
  className?: string;
}

/**
 * Componente <Destaque> que pinta em ciano as primeiras palavras de um título.
 * - Em banners escuros (tone="claro"): #3CC7E8 vibrante.
 * - Em fundos claros/escuros adaptáveis (tone="auto"): usa --gp-ciano-heading para contraste AA perfeito.
 */
export const Destaque: React.FC<DestaqueProps> = ({
  children,
  tone = 'auto',
  className = '',
}) => {
  const colorClass =
    tone === 'claro' ? 'text-[#3CC7E8]' : 'gp-destaque-adaptive';

  return <span className={`font-extrabold ${colorClass} ${className}`}>{children}</span>;
};

export default Destaque;
