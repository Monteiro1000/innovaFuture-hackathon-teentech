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
 * Componente <AlertaAuditor tipo="dados|plagio|emocional|sucesso" />
 * Feedback 100% educativo, acolhedor e nunca punitivo.
 * Sempre exibe ícone Lucide + rótulo de estado + explicação + botão de ação.
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
      borderClass: string;
      bgClass: string;
      badgeClass: string;
    }
  > = {
    dados: {
      icon: <ShieldAlert className="w-6 h-6 text-gp-atencao shrink-0" />,
      badgeLabel: 'Atenção • Proteção de Dados Pessoais (LGPD)',
      borderClass: 'border-gp-atencao',
      bgClass: 'bg-gp-roxo-escuro/95',
      badgeClass: 'bg-gp-atencao/20 text-gp-atencao border-gp-atencao/50',
    },
    plagio: {
      icon: <BrainCircuit className="w-6 h-6 text-gp-roxo shrink-0" />,
      badgeLabel: 'Sugestão Pedagógica • Pensamento Crítico',
      borderClass: 'border-gp-roxo',
      bgClass: 'bg-gp-roxo-escuro/95',
      badgeClass: 'bg-gp-roxo/25 text-gp-lilas-claro border-gp-roxo',
    },
    emocional: {
      icon: <HeartHandshake className="w-6 h-6 text-gp-ciano shrink-0" />,
      badgeLabel: 'Acolhimento • Apoio Humano e Bem-Estar',
      borderClass: 'border-gp-ciano',
      bgClass: 'bg-gp-roxo-escuro/95',
      badgeClass: 'bg-gp-ciano/20 text-gp-ciano border-gp-ciano/60',
    },
    sucesso: {
      icon: <CheckCircle2 className="w-6 h-6 text-gp-sucesso shrink-0" />,
      badgeLabel: 'Sucesso • Prompt Seguro e Consciente',
      borderClass: 'border-gp-sucesso',
      bgClass: 'bg-gp-roxo-escuro/95',
      badgeClass: 'bg-gp-sucesso/20 text-gp-sucesso border-gp-sucesso/60',
    },
  };

  const current = config[tipo];

  return (
    <div
      role="region"
      aria-label={titulo}
      className={`rounded-gp-lg border-2 ${current.borderClass} ${current.bgClass} p-5 shadow-gp-md space-y-3.5 gp-transition ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-gp-sm text-xs font-bold border ${current.badgeClass}`}
        >
          {current.icon}
          <span>{current.badgeLabel}</span>
        </span>

        {typeof descontoPontos === 'number' && descontoPontos > 0 && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-gp-sm bg-gp-atencao/15 text-gp-atencao border border-gp-atencao/40">
            -{descontoPontos} pts no Placar de Segurança
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base sm:text-lg font-bold text-gp-branco">{titulo}</h4>
        <p className="text-sm sm:text-base text-gp-lilas-claro leading-relaxed">
          {mensagem}
        </p>
      </div>

      {trechosDestacados.length > 0 && (
        <div className="p-3 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gp-ciano block">
            Trechos identificados no seu comando:
          </span>
          <div className="flex flex-wrap gap-2">
            {trechosDestacados.map((trecho, idx) => (
              <mark
                key={idx}
                className="px-2.5 py-1 rounded-gp-sm bg-gp-atencao/25 text-gp-atencao border border-gp-atencao/50 font-semibold text-xs sm:text-sm"
              >
                “{trecho}”
              </mark>
            ))}
          </div>
        </div>
      )}

      {sugestaoReformulacao && (
        <div className="p-4 rounded-gp-md bg-gp-roxo/15 border border-gp-ciano/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gp-ciano">
            <Sparkles className="w-4 h-4" />
            <span>Sugestão de reformulação segura e formativa:</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-gp-branco bg-gp-roxo-escuro/90 p-3 rounded-gp-sm border border-gp-lilas/30">
            “{sugestaoReformulacao}”
          </p>
          {onAplicarSugestao && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Botao
                type="button"
                variant="secundario"
                size="sm"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => onAplicarSugestao(sugestaoReformulacao)}
              >
                Reformular meu prompt
              </Botao>
              <span className="text-xs text-gp-lilas-claro">
                Substitui os dados sensíveis por termos genéricos e pede um roteiro de estudo
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertaAuditor;
