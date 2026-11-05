import React from 'react';
import {
  ShieldAlert,
  BrainCircuit,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Botao } from './Botao';

export type TipoAlertaAuditor = 'dados' | 'plagio' | 'emocional' | 'sucesso';

export interface AlertaAuditorProps {
  tipo: TipoAlertaAuditor;
  titulo: string;
  mensagem: string;
  trechosDestacados?: string[];
  sugestaoReformulacao?: string;
  onAplicarSugestao?: (sugestao: string) => void;
  descontoPontos?: number;
  className?: string;
}

/**
 * Componente <AlertaAuditor /> com design leve, acolhedor e adaptável ao modo claro e escuro.
 */
export const AlertaAuditor: React.FC<AlertaAuditorProps> = ({
  tipo,
  titulo,
  mensagem,
  trechosDestacados = [],
  sugestaoReformulacao,
  onAplicarSugestao,
  descontoPontos,
  className = '',
}) => {
  const config: Record<
    TipoAlertaAuditor,
    {
      icon: React.ReactNode;
      badgeLabel: string;
      accentBorder: string;
      badgeClass: string;
    }
  > = {
    dados: {
      icon: <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
      badgeLabel: 'Atenção • Proteção de Dados Pessoais (LGPD)',
      accentBorder: 'border-l-4 border-l-amber-500',
      badgeClass:
        'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
    },
    plagio: {
      icon: <BrainCircuit className="w-5 h-5 text-[#9847EE] shrink-0" />,
      badgeLabel: 'Sugestão Pedagógica • Pensamento Crítico',
      accentBorder: 'border-l-4 border-l-[#9847EE]',
      badgeClass:
        'bg-[#9847EE]/12 text-[#7B2CBF] dark:text-[#D9CBE7] border-[#9847EE]/30',
    },
    emocional: {
      icon: <HeartHandshake className="w-5 h-5 text-[#0E7490] dark:text-[#3CC7E8] shrink-0" />,
      badgeLabel: 'Acolhimento • Apoio Humano e Bem-Estar',
      accentBorder: 'border-l-4 border-l-[#3CC7E8]',
      badgeClass:
        'bg-[#3CC7E8]/15 text-[#0E7490] dark:text-[#3CC7E8] border-[#3CC7E8]/35',
    },
    sucesso: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      badgeLabel: 'Sucesso • Prompt Seguro e Consciente',
      accentBorder: 'border-l-4 border-l-emerald-500',
      badgeClass:
        'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    },
  };

  const current = config[tipo];

  return (
    <div
      role="region"
      aria-label={titulo}
      className={`gp-card-surface rounded-2xl ${current.accentBorder} p-5 space-y-3.5 gp-transition ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${current.badgeClass}`}
        >
          {current.icon}
          <span>{current.badgeLabel}</span>
        </span>

        {typeof descontoPontos === 'number' && descontoPontos > 0 && (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300">
            -{descontoPontos} pts no Placar
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-bold gp-text-primary">{titulo}</h4>
        <p className="text-sm gp-text-secondary leading-relaxed">{mensagem}</p>
      </div>

      {trechosDestacados.length > 0 && (
        <div className="p-3 rounded-xl gp-subtle-surface space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider gp-text-secondary block">
            Trechos identificados no seu comando:
          </span>
          <div className="flex flex-wrap gap-2">
            {trechosDestacados.map((trecho, idx) => (
              <mark
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/35 font-semibold text-xs"
              >
                “{trecho}”
              </mark>
            ))}
          </div>
        </div>
      )}

      {sugestaoReformulacao && (
        <div className="p-4 rounded-xl bg-[#F3EDF9] dark:bg-[#342049] border border-[#AF81E9]/35 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9847EE] dark:text-[#3CC7E8]">
            <Sparkles className="w-4 h-4" />
            <span>Sugestão de reformulação segura:</span>
          </div>
          <p className="text-sm font-medium gp-text-primary bg-white dark:bg-[#241634] p-3 rounded-lg border border-[#D9CBE7] dark:border-[#AF81E9]/25">
            “{sugestaoReformulacao}”
          </p>
          {onAplicarSugestao && (
            <div className="flex flex-wrap items-center gap-3">
              <Botao
                type="button"
                variant="primario"
                size="sm"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => onAplicarSugestao(sugestaoReformulacao)}
              >
                Reformular meu prompt
              </Botao>
              <span className="text-xs gp-text-secondary">
                Substitui os dados expostos por termos genéricos e pede um roteiro de estudo
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertaAuditor;
