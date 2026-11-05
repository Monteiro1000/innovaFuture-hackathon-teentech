import React from 'react';

export interface LogoGuardianPromptProps {
  variant?: 'horizontal' | 'vertical' | 'icone';
  tone?: 'claro' | 'escuro' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 32,
  md: 42,
  lg: 56,
  xl: 76,
};

/**
 * Logo oficial do Guardian Prompt (SVG vetorial fiel ao Guia de Marca).
 * - Wordmark: "Guardian" sobre "Prompt" em duas linhas, Montserrat 700.
 * - Ícone: quadrado de cantos arredondados só com contorno grosso (#9847EE),
 *   com entalhe no canto superior direito que lembra balão de conversa e
 *   rosto minimalista (dois quadrados preenchidos como olhos + curva de sorriso).
 */
export const LogoGuardianPrompt: React.FC<LogoGuardianPromptProps> = ({
  variant = 'horizontal',
  tone = 'claro',
  size = 'md',
  className = '',
}) => {
  const pxSize = typeof size === 'number' ? size : SIZE_MAP[size];

  // Definição das cores baseadas no tone (fiel à página 2 do Guia de Marca)
  const wordmarkColor =
    tone === 'claro'
      ? '#D9CBE7'
      : tone === 'escuro'
      ? '#3F2757'
      : '#FFFFFF';

  const iconColor =
    tone === 'claro'
      ? '#9847EE'
      : tone === 'escuro'
      ? '#3F2757'
      : '#FFFFFF';

  const renderIconSVG = (dimension: number) => (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Barra superior com pequeno entalhe no canto superior direito e abertura sutil à esquerda */}
      <path
        d="M15 12 H76 V22 H86 V68 C86 80.1503 76.1503 90 64 90 H10 V24"
        stroke={iconColor}
        strokeWidth="10"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Dois pequenos quadrados preenchidos como olhos */}
      <rect x="44" y="33" width="10" height="12.5" fill={iconColor} />
      <rect x="60" y="33" width="10" height="12.5" fill={iconColor} />
      {/* Curva de sorriso com a mesma espessura do contorno */}
      <path
        d="M29 44 C29 60 42 70 58 70"
        stroke={iconColor}
        strokeWidth="9.5"
        strokeLinecap="square"
      />
    </svg>
  );

  if (variant === 'icone') {
    return (
      <span
        className={`inline-flex items-center justify-center select-none ${className}`}
        role="img"
        aria-label="Guardian Prompt"
      >
        {renderIconSVG(pxSize)}
      </span>
    );
  }

  if (variant === 'vertical') {
    const fontSize = Math.max(13, Math.round(pxSize * 0.34));
    return (
      <span
        className={`inline-flex flex-col items-center gap-2 select-none ${className}`}
        role="img"
        aria-label="Guardian Prompt"
      >
        {renderIconSVG(pxSize)}
        <span
          className="font-montserrat font-bold leading-[1.02] tracking-tight text-left"
          style={{ color: wordmarkColor, fontSize: `${fontSize}px` }}
        >
          <span className="block">Guardian</span>
          <span className="block">Prompt</span>
        </span>
      </span>
    );
  }

  // Variant horizontal (padrão)
  const fontSize = Math.max(14, Math.round(pxSize * 0.42));
  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      role="img"
      aria-label="Guardian Prompt"
    >
      <span
        className="font-montserrat font-bold leading-[0.98] tracking-tight text-left"
        style={{ color: wordmarkColor, fontSize: `${fontSize}px` }}
      >
        <span className="block">Guardian</span>
        <span className="block">Prompt</span>
      </span>
      {renderIconSVG(pxSize)}
    </span>
  );
};

export default LogoGuardianPrompt;
