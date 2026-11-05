import React from 'react';
import {
  CheckCircle2,
  Lock,
  Sparkles,
  Play,
  ShieldCheck,
  BrainCircuit,
  Eye,
  Scale,
} from 'lucide-react';
import { Card, Badge, Botao } from '@/components/brand';
import { useApp } from '@/context/AppContext';

interface EtapaTrilha {
  id: string;
  ordem: number;
  tituloFundamental: string;
  descricaoFundamental: string;
  tituloMedio: string;
  descricaoMedio: string;
  xp: number;
  destinoAba: 'laboratorio' | 'simulador';
  icone: React.ReactNode;
}

const ETAPAS_JORNADA: EtapaTrilha[] = [
  {
    id: 'trilha-fund-1',
    ordem: 1,
    tituloFundamental: 'Fase 1: O Segredo do Crachá Invisível',
    descricaoFundamental:
      'Aprenda por que não devemos contar nosso nome completo, escola e bairro para robôs na internet.',
    tituloMedio: 'Módulo 1: Autodeterminação Informativa & Privacidade em LLMs',
    descricaoMedio:
      'Como funcionam os modelos de linguagem e por que dados pessoais inseridos em prompts podem vazar ou alimentar treinamentos.',
    xp: 50,
    destinoAba: 'laboratorio',
    icone: <ShieldCheck className="w-6 h-6 text-gp-ciano" />,
  },
  {
    id: 'trilha-fund-2',
    ordem: 2,
    tituloFundamental: 'Fase 2: Academia do Cérebro Forte',
    descricaoFundamental:
      'Descubra como usar a IA para dar ideias de pesquisa sem deixar seu cérebro preguiçoso!',
    tituloMedio: 'Módulo 2: Coautoria Crítica vs. Terceirização Cognitiva',
    descricaoMedio:
      'Metodologias para utilizar assistentes generativos como tutores socráticos e estruturadores de tópicos em redações e pesquisas.',
    xp: 60,
    destinoAba: 'laboratorio',
    icone: <BrainCircuit className="w-6 h-6 text-gp-roxo" />,
  },
  {
    id: 'sim-deepfake-1',
    ordem: 3,
    tituloFundamental: 'Fase 3: Caçadores de Ilusões (Deepfakes & Fontes)',
    descricaoFundamental:
      'Treine seus olhos para perceber vídeos inventados por computador e notícias sem comprovação.',
    tituloMedio: 'Módulo 3: Mídias Sintéticas, Alucinações e Checagem Cruzada',
    descricaoMedio:
      'Análise forense básica de deepfakes audiovisuais e verificação de referências acadêmicas inventadas por IA.',
    xp: 75,
    destinoAba: 'simulador',
    icone: <Eye className="w-6 h-6 text-gp-atencao" />,
  },
  {
    id: 'sim-cidadania-1',
    ordem: 4,
    tituloFundamental: 'Fase 4: Guardiões da Cidadania Digital',
    descricaoFundamental:
      'Conheça seus direitos e deveres no ECA, na LGPD e no Marco Civil para proteger toda a escola.',
    tituloMedio: 'Módulo 4: Marco Legal Brasileiro (LGPD, ECA e Marco Civil)',
    descricaoMedio:
      'Estudo de casos reais sobre responsabilidade civil, proteção de dados de menores (Art. 14 da LGPD) e combate à violência digital.',
    xp: 100,
    destinoAba: 'simulador',
    icone: <Scale className="w-6 h-6 text-gp-sucesso" />,
  },
];

export interface LiteracyTracksProps {
  onIrParaAba: (aba: 'laboratorio' | 'simulador') => void;
}

export const LiteracyTracks: React.FC<LiteracyTracksProps> = ({ onIrParaAba }) => {
  const { faixaEtaria, setFaixaEtaria, fasesConcluidas, concluirFase } = useApp();

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Alternância Fundamental vs Médio */}
      <Card variant="ciano" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="ciano">Adaptação Pedagógica por Faixa Etária</Badge>
          <h2 className="text-lg sm:text-xl font-extrabold text-gp-branco">
            {faixaEtaria === 'fundamental'
              ? 'Trilha Ensino Fundamental: Linguagem Lúdica e Missões Guiadas'
              : 'Trilha Ensino Médio: Pensamento Crítico, Pesquisa e Ética Digital'}
          </h2>
          <p className="text-xs sm:text-sm text-gp-lilas-claro">
            Alterne abaixo para comparar como o Guardian Prompt adapta o vocabulário e a profundidade dos desafios:
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-gp-roxo-escuro p-1.5 rounded-gp-md border border-gp-lilas/40">
          <button
            type="button"
            onClick={() => setFaixaEtaria('fundamental')}
            className={`px-3.5 py-2 rounded-gp-sm text-xs font-extrabold gp-transition ${
              faixaEtaria === 'fundamental'
                ? 'bg-gp-ciano text-gp-roxo-escuro'
                : 'text-gp-lilas-claro hover:text-gp-branco'
            }`}
          >
            Ensino Fundamental
          </button>
          <button
            type="button"
            onClick={() => setFaixaEtaria('medio')}
            className={`px-3.5 py-2 rounded-gp-sm text-xs font-extrabold gp-transition ${
              faixaEtaria === 'medio'
                ? 'bg-gp-ciano text-gp-roxo-escuro'
                : 'text-gp-lilas-claro hover:text-gp-branco'
            }`}
          >
            Ensino Médio
          </button>
        </div>
      </Card>

      {/* Mapa de Progresso Estilo Jornada */}
      <div className="relative space-y-4">
        {ETAPAS_JORNADA.map((etapa, idx) => {
          const concluida = fasesConcluidas.includes(etapa.id);
          const desbloqueada =
            idx === 0 ||
            concluida ||
            fasesConcluidas.includes(ETAPAS_JORNADA[idx - 1].id);

          return (
            <Card
              key={etapa.id}
              variant={concluida ? 'default' : desbloqueada ? 'destaque' : 'default'}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                !desbloqueada ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-gp-md flex items-center justify-center shrink-0 border ${
                    concluida
                      ? 'bg-gp-sucesso/20 border-gp-sucesso text-gp-sucesso'
                      : desbloqueada
                      ? 'bg-gp-roxo/30 border-gp-ciano text-gp-ciano'
                      : 'bg-gp-roxo-escuro border-gp-lilas/30 text-gp-lilas-claro'
                  }`}
                >
                  {concluida ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : !desbloqueada ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    etapa.icone
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        concluida ? 'sucesso' : desbloqueada ? 'ciano' : 'escuro'
                      }
                    >
                      {concluida
                        ? 'Etapa Concluída'
                        : desbloqueada
                        ? 'Disponível Agora'
                        : 'Desbloqueável'}
                    </Badge>
                    <span className="text-xs font-extrabold text-gp-ciano">
                      +{etapa.xp} XP
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-gp-branco">
                    {faixaEtaria === 'fundamental'
                      ? etapa.tituloFundamental
                      : etapa.tituloMedio}
                  </h3>

                  <p className="text-xs sm:text-sm text-gp-lilas-claro max-w-2xl leading-relaxed">
                    {faixaEtaria === 'fundamental'
                      ? etapa.descricaoFundamental
                      : etapa.descricaoMedio}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                {!concluida && (
                  <Botao
                    variant="fantasma"
                    size="sm"
                    onClick={() => concluirFase(etapa.id, etapa.xp)}
                  >
                    Marcar concluída (+{etapa.xp} XP)
                  </Botao>
                )}
                <Botao
                  variant={concluida ? 'fantasma' : 'secundario'}
                  size="sm"
                  iconLeft={<Play className="w-4 h-4 fill-current" />}
                  onClick={() => onIrParaAba(etapa.destinoAba)}
                >
                  {etapa.destinoAba === 'laboratorio'
                    ? 'Praticar no Laboratório'
                    : 'Jogar no Simulador'}
                </Botao>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LiteracyTracks;
