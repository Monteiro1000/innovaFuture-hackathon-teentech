import React from 'react';

export interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Componente <Botao /> com acabamento polido e sem bordas pesadas:
 * - primario: #9847EE (roxo), hover #AF81E9
 * - secundario: #3CC7E8 (ciano) com texto #3F2757
 * - fantasma: adaptável ao modo claro e escuro com borda sutil 1px
 * - perigo: alerta educativo suave
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
    'inline-flex items-center justify-center gap-2 font-montserrat font-semibold rounded-xl gp-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC7E8] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.99]';

  const variantClasses: Record<NonNullable<BotaoProps['variant']>, string> = {
    primario:
      'bg-[#9847EE] text-white hover:bg-[#8636DC] shadow-sm',
    secundario:
      'bg-[#3CC7E8] text-[#3F2757] font-bold hover:bg-[#2EB5D6] shadow-sm',
    fantasma:
      'gp-card-surface hover:border-[#9847EE] gp-text-primary',
    perigo:
      'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25',
  };

  const sizeClasses: Record<NonNullable<BotaoProps['size']>, string> = {
    sm: 'px-3.5 py-2 text-xs sm:text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm sm:text-base',
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
