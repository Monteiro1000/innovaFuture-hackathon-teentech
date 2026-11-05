import React from 'react';

export interface LogoGuardianPromptProps {
  variant?: 'horizontal' | 'vertical' | 'icone';
  tone?: 'claro' | 'escuro' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 32,
  md: 38,
  lg: 50,
  xl: 68,
};

/**
 * Logo oficial do Guardian Prompt (refinada conforme as telas de referência):
 * - Ícone à esquerda: quadrado de cantos arredondados com contorno elegante (#9847EE),
 *   entalhe no canto superior direito e rosto minimalista acolhedor.
 * - Wordmark à direita: "Guardian" sobre "Prompt" em duas linhas, alinhado à esquerda, Montserrat 700.
 */
export const LogoGuardianPrompt: React.FC<LogoGuardianPromptProps> = ({
  variant = 'horizontal',
  tone = 'claro',
  size = 'md',
  className = '',
}) => {
  const pxSize = typeof size === 'number' ? size : SIZE_MAP[size];

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
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Quadrado arredondado com pequeno entalhe no canto superior direito */}
      <path
        d="M44 8 H18 C12.4772 8 8 12.4772 8 18 V46 C8 51.5228 12.4772 56 18 56 H46 C51.5228 56 56 51.5228 56 46 V20 H48 V12"
        stroke={iconColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dois pequenos quadrados preenchidos como olhos */}
      <rect x="22" y="23" width="5.5" height="6" rx="1.2" fill={iconColor} />
      <rect x="35" y="23" width="5.5" height="6" rx="1.2" fill={iconColor} />
      {/* Curva de sorriso suave com a mesma espessura do contorno */}
      <path
        d="M22 36 C24.5 41.5 30 43.5 38 40.5"
        stroke={iconColor}
        strokeWidth="4.2"
        strokeLinecap="round"
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
          className="font-montserrat font-bold leading-[1.05] tracking-tight text-center"
          style={{ color: wordmarkColor, fontSize: `${fontSize}px` }}
        >
          <span className="block">Guardian</span>
          <span className="block">Prompt</span>
        </span>
      </span>
    );
  }

  const fontSize = Math.max(13, Math.round(pxSize * 0.41));
  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      role="img"
      aria-label="Guardian Prompt"
    >
      {renderIconSVG(pxSize)}
      <span
        className="font-montserrat font-bold leading-[1.04] tracking-tight text-left"
        style={{ color: wordmarkColor, fontSize: `${fontSize}px` }}
      >
        <span className="block">Guardian</span>
        <span className="block">Prompt</span>
      </span>
    </span>
  );
};

export default LogoGuardianPrompt;
