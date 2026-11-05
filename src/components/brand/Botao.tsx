import React from 'react';

export interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Componente <Botao /> com variantes oficiais da marca:
 * - primario: #9847EE (roxo), hover #AF81E9
 * - secundario: #3CC7E8 (ciano) com texto #3F2757 (alto contraste AA/AAA)
 * - fantasma: borda #AF81E9, fundo translúcido
 * - perigo: alerta com borda e ícone educativo
 */
export const Botao: React.FC<BotaoProps> = ({
  variant = 'primario',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-montserrat font-bold rounded-gp-md gp-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gp-ciano focus-visible:ring-offset-2 focus-visible:ring-offset-gp-roxo-escuro disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]';

  const variantClasses: Record<NonNullable<BotaoProps['variant']>, string> = {
    primario:
      'bg-gp-roxo text-gp-branco hover:bg-gp-lilas hover:text-gp-roxo-escuro shadow-gp-roxo-glow border border-gp-lilas/40',
    secundario:
      'bg-gp-ciano text-gp-roxo-escuro hover:bg-gp-lilas-claro hover:text-gp-roxo-escuro shadow-gp-glow border border-gp-ciano',
    fantasma:
      'bg-gp-lilas-claro/10 text-gp-branco hover:bg-gp-lilas-claro/20 border border-gp-lilas/50 hover:border-gp-ciano',
    perigo:
      'bg-gp-atencao/20 text-gp-atencao hover:bg-gp-atencao hover:text-gp-roxo-escuro border border-gp-atencao/60',
  };

  const sizeClasses: Record<NonNullable<BotaoProps['size']>, string> = {
    sm: 'px-3.5 py-2 text-xs sm:text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-7 py-3.5 text-base sm:text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};

export default Botao;
