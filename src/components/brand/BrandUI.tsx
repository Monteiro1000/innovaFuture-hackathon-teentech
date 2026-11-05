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
  variant?: 'default' | 'claro' | 'destaque' | 'ciano';
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
    default:
      'bg-gp-roxo-escuro/85 backdrop-blur-md border border-gp-lilas/30 text-gp-branco shadow-gp-md',
    claro:
      'bg-gp-lilas-claro text-gp-roxo-escuro border border-gp-lilas/50 shadow-gp-md',
    destaque:
      'bg-gradient-to-br from-gp-roxo/25 via-gp-roxo-escuro to-gp-roxo-escuro border-2 border-gp-roxo text-gp-branco shadow-gp-lg',
    ciano:
      'bg-gradient-to-br from-gp-ciano/20 via-gp-roxo-escuro to-gp-roxo-escuro border-2 border-gp-ciano/70 text-gp-branco shadow-gp-md',
  };

  const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-gp-lg gp-transition ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
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
    roxo: 'bg-gp-roxo/25 text-gp-lilas-claro border border-gp-roxo',
    ciano: 'bg-gp-ciano/20 text-gp-ciano border border-gp-ciano/60',
    lilas: 'bg-gp-lilas-claro text-gp-roxo-escuro border border-gp-lilas',
    sucesso: 'bg-gp-sucesso/20 text-gp-sucesso border border-gp-sucesso/60',
    atencao: 'bg-gp-atencao/20 text-gp-atencao border border-gp-atencao/60',
    escuro: 'bg-gp-roxo-escuro text-gp-lilas-claro border border-gp-lilas/40',
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
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-gp-sm text-xs font-bold tracking-wide ${variantClasses[variant]} ${className}`}
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
  className?: string;
}

/**
 * BarraProgresso para o Placar de Segurança (0 a 100) e progresso de XP.
 * Sempre acompanha ícone e rótulo textual do estado (acessibilidade AA).
 */
export const BarraProgresso: React.FC<BarraProgressoProps> = ({
  valor,
  maximo = 100,
  label,
  sublabel,
  tipo = 'seguranca',
  mostrarValor = true,
  className = '',
}) => {
  const percentual = Math.max(0, Math.min(100, Math.round((valor / maximo) * 100)));

  let barColorClass = 'bg-gp-roxo';
  let statusText = 'Progresso';
  let statusIcon = <Sparkles className="w-4 h-4 text-gp-ciano" />;

  if (tipo === 'seguranca') {
    if (percentual >= 85) {
      barColorClass = 'bg-gp-sucesso';
      statusText = 'Prompt Seguro';
      statusIcon = <CheckCircle2 className="w-4 h-4 text-gp-sucesso" />;
    } else if (percentual >= 50) {
      barColorClass = 'bg-gp-atencao';
      statusText = 'Atenção: Ajustes Recomendados';
      statusIcon = <AlertTriangle className="w-4 h-4 text-gp-atencao" />;
    } else {
      barColorClass = 'bg-gp-atencao';
      statusText = 'Risco de Exposição ou Atalho';
      statusIcon = <AlertTriangle className="w-4 h-4 text-gp-atencao" />;
    }
  } else if (tipo === 'xp') {
    barColorClass = 'bg-gradient-to-r from-gp-roxo via-gp-lilas to-gp-ciano';
    statusText = 'Experiência (XP)';
    statusIcon = <Zap className="w-4 h-4 text-gp-ciano" />;
  }

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-bold text-gp-branco">
          {statusIcon}
          <span>{label || statusText}</span>
        </div>
        {mostrarValor && (
          <div className="flex items-center gap-2">
            {tipo === 'seguranca' && (
              <span className="text-xs text-gp-lilas-claro hidden sm:inline">
                {statusText}
              </span>
            )}
            <span className="font-extrabold px-2.5 py-0.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-ciano">
              {valor}/{maximo}
            </span>
          </div>
        )}
      </div>

      <div
        className="w-full h-3.5 rounded-gp-sm bg-gp-roxo-escuro/90 border border-gp-lilas/40 overflow-hidden p-0.5"
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={maximo}
        aria-label={label || statusText}
      >
        <div
          className={`h-full rounded-[6px] gp-transition ${barColorClass}`}
          style={{ width: `${percentual}%` }}
        />
      </div>

      {sublabel && (
        <p className="text-xs text-gp-lilas-claro/90 font-medium">{sublabel}</p>
      )}
    </div>
  );
};
