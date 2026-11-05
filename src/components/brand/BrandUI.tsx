import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'claro' | 'destaque' | 'ciano' | 'escuro';
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * Componente <Card /> com bordas sutis de 1px e sombra suave,
 * funcionando perfeitamente no Modo Claro (padrão) e no Modo Escuro.
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
    default: 'gp-card-surface',
    claro:
      'bg-[#F3EDF9] dark:bg-[#342049] text-[#3F2757] dark:text-white border border-[#D9CBE7] dark:border-[#AF81E9]/30',
    destaque:
      'gp-card-surface border-[#3CC7E8]/70 ring-1 ring-[#3CC7E8]/30',
    ciano:
      'bg-[#BCEFF9]/65 dark:bg-[#3CC7E8]/15 text-[#3F2757] dark:text-white border border-[#3CC7E8]/50',
    escuro:
      'bg-[#3F2757] text-white border border-[#AF81E9]/25 shadow-gp-md',
  };

  const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-2xl gp-transition ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface BadgeProps {
  variant?: 'roxo' | 'ciano' | 'lilas' | 'sucesso' | 'atencao' | 'escuro';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'roxo',
  icon,
  children,
  className = '',
}) => {
  const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
    roxo: 'bg-[#9847EE]/12 text-[#7B2CBF] dark:bg-[#9847EE]/25 dark:text-[#D9CBE7] border border-[#9847EE]/25',
    ciano:
      'bg-[#3CC7E8]/15 text-[#0E7490] dark:bg-[#3CC7E8]/20 dark:text-[#3CC7E8] border border-[#3CC7E8]/35',
    lilas:
      'bg-[#D9CBE7]/65 text-[#3F2757] dark:bg-[#AF81E9]/20 dark:text-[#D9CBE7] border border-[#AF81E9]/30',
    sucesso:
      'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30',
    atencao:
      'bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30',
    escuro: 'bg-[#3F2757] text-[#D9CBE7] border border-[#AF81E9]/30',
  };

  const defaultIcons: Record<NonNullable<BadgeProps['variant']>, React.ReactNode> = {
    roxo: <Sparkles className="w-3.5 h-3.5" />,
    ciano: <Info className="w-3.5 h-3.5" />,
    lilas: <ShieldCheck className="w-3.5 h-3.5" />,
    sucesso: <CheckCircle2 className="w-3.5 h-3.5" />,
    atencao: <AlertTriangle className="w-3.5 h-3.5" />,
    escuro: <Zap className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {icon !== undefined ? icon : defaultIcons[variant]}
      <span>{children}</span>
    </span>
  );
};

export interface BarraProgressoProps {
  valor: number;
  maximo?: number;
  label?: string;
  sublabel?: string;
  tipo?: 'seguranca' | 'xp' | 'padrao';
  mostrarValor?: boolean;
  tone?: 'auto' | 'escuro';
  className?: string;
}

export const BarraProgresso: React.FC<BarraProgressoProps> = ({
  valor,
  maximo = 100,
  label,
  sublabel,
  tipo = 'seguranca',
  mostrarValor = true,
  tone = 'auto',
  className = '',
}) => {
  const percentual = Math.max(0, Math.min(100, Math.round((valor / maximo) * 100)));

  let barColorClass = 'bg-[#9847EE]';
  let statusText = 'Progresso';
  let statusIcon = <Sparkles className="w-4 h-4 text-[#3CC7E8]" />;

  if (tipo === 'seguranca') {
    if (percentual >= 85) {
      barColorClass = 'bg-emerald-500';
      statusText = 'Prompt Seguro';
      statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    } else if (percentual >= 50) {
      barColorClass = 'bg-amber-500';
      statusText = 'Ajustes Recomendados';
      statusIcon = <AlertTriangle className="w-4 h-4 text-amber-500" />;
    } else {
      barColorClass = 'bg-amber-500';
      statusText = 'Atenção Educativa';
      statusIcon = <AlertTriangle className="w-4 h-4 text-amber-500" />;
    }
  } else if (tipo === 'xp') {
    barColorClass = 'bg-[#3CC7E8]';
    statusText = 'Experiência (XP)';
    statusIcon = <Zap className="w-4 h-4 text-[#3CC7E8]" />;
  }

  const labelColor =
    tone === 'escuro' ? 'text-white' : 'gp-text-primary';

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || mostrarValor) && (
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <div className={`flex items-center gap-1.5 font-bold ${labelColor}`}>
            {statusIcon}
            <span>{label || statusText}</span>
          </div>
          {mostrarValor && (
            <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#9847EE]/15 text-[#9847EE] dark:text-[#3CC7E8]">
              {valor}/{maximo}
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full h-2.5 rounded-full overflow-hidden ${
          tone === 'escuro'
            ? 'bg-white/15'
            : 'bg-[#D9CBE7]/60 dark:bg-white/15'
        }`}
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={maximo}
        aria-label={label || statusText}
      >
        <div
          className={`h-full rounded-full gp-transition ${barColorClass}`}
          style={{ width: `${percentual}%` }}
        />
      </div>

      {sublabel && (
        <p
          className={`text-xs ${
            tone === 'escuro' ? 'text-[#D9CBE7]' : 'gp-text-secondary'
          }`}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
};
