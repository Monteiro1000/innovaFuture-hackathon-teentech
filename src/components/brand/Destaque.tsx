import React from 'react';

export interface DestaqueProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente <Destaque> que pinta em ciano (#3CC7E8) as primeiras palavras
 * ou trechos estratégicos de um título, conforme o Guia de Marca.
 */
export const Destaque: React.FC<DestaqueProps> = ({ children, className = '' }) => {
  return (
    <span className={`text-gp-ciano font-extrabold ${className}`}>
      {children}
    </span>
  );
};

export default Destaque;
