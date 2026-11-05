import React from 'react';
import {
  CheckCircle2,
  Lock,
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
      'Como funcionam os modelos de linguagem e por que dados pessoais inseridos em prompts podem vazar.',
    xp: 50,
    destinoAba: 'laboratorio',
    icone: <ShieldCheck className="w-5 h-5 text-[#1AA3C4] dark:text-[#3CC7E8]" />,
  },
  {
    id: 'trilha-fund-2',
    ordem: 2,
    tituloFundamental: 'Fase 2: Academia do Cérebro Forte',
    descricaoFundamental:
      'Descubra como usar a IA para dar ideias de pesquisa sem deixar seu cérebro preguiçoso!',
    tituloMedio: 'Módulo 2: Coautoria Crítica vs. Terceirização Cognitiva',
    descricaoMedio:
      'Metodologias para utilizar assistentes generativos como estruturadores de tópicos em redações e pesquisas.',
    xp: 60,
    destinoAba: 'laboratorio',
    icone: <BrainCircuit className="w-5 h-5 text-[#9847EE]" />,
  },
  {
    id: 'sim-deepfake-1',
    ordem: 3,
    tituloFundamental: 'Fase 3: Caçadores de Ilusões (Deepfakes & Fontes)',
    descricaoFundamental:
      'Treine seus olhos para perceber vídeos inventados por computador e notícias sem comprovação.',
    tituloMedio: 'Módulo 3: Mídias Sintéticas, Alucinações e Checagem Cruzada',
    descricaoMedio:
      'Análise de sinais visuais e sonoros de deepfakes e verificação de referências acadêmicas.',
    xp: 75,
    destinoAba: 'simulador',
    icone: <Eye className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 'sim-cidadania-1',
    ordem: 4,
    tituloFundamental: 'Fase 4: Guardiões da Cidadania Digital',
    descricaoFundamental:
      'Conheça seus direitos e deveres no ECA, na LGPD e no Marco Civil para proteger toda a escola.',
    tituloMedio: 'Módulo 4: Marco Legal Brasileiro (LGPD, ECA e Marco Civil)',
    descricaoMedio:
      'Estudo de casos práticos sobre proteção de dados de menores (Art. 14 da LGPD) e convivência digital.',
    xp: 100,
    destinoAba: 'simulador',
    icone: <Scale className="w-5 h-5 text-emerald-500" />,
  },
];

export interface LiteracyTracksProps {
  onIrParaAba: (aba: 'laboratorio' | 'simulador') => void;
}

export const LiteracyTracks: React.FC<LiteracyTracksProps> = ({ onIrParaAba }) => {
  const { faixaEtaria, setFaixaEtaria, fasesConcluidas } = useApp();

  return (
    <div className="space-y-5">
      {/* Alternador Fundamental vs Médio */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-extrabold gp-text-primary">
            {faixaEtaria === 'fundamental'
              ? 'Trilha Ensino Fundamental (Linguagem Lúdica)'
              : 'Trilha Ensino Médio (Pensamento Crítico & Pesquisa)'}
          </h2>
          <p className="text-xs gp-text-secondary">
            Alterne a faixa etária para adaptar o vocabulário das missões:
          </p>
        </div>

        <div className="inline-flex items-center p-1 rounded-full gp-subtle-surface">
          <button
            type="button"
            onClick={() => setFaixaEtaria('fundamental')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
              faixaEtaria === 'fundamental'
                ? 'bg-[#9847EE] text-white'
                : 'gp-text-secondary hover:gp-text-primary'
            }`}
          >
            Fundamental
          </button>
          <button
            type="button"
            onClick={() => setFaixaEtaria('medio')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
              faixaEtaria === 'medio'
                ? 'bg-[#9847EE] text-white'
                : 'gp-text-secondary hover:gp-text-primary'
            }`}
          >
            Ensino Médio
          </button>
        </div>
      </Card>

      {/* Lista de Etapas da Trilha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ETAPAS_JORNADA.map((etapa, idx) => {
          const concluida = fasesConcluidas.includes(etapa.id);
          const desbloqueada =
            idx === 0 ||
            concluida ||
            fasesConcluidas.includes(ETAPAS_JORNADA[idx - 1].id);

          return (
            <Card
              key={etapa.id}
              className="flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl gp-subtle-surface flex items-center justify-center">
                      {concluida ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : !desbloqueada ? (
                        <Lock className="w-4 h-4 gp-text-secondary" />
                      ) : (
                        etapa.icone
                      )}
                    </div>
                    <Badge variant={concluida ? 'sucesso' : 'roxo'}>
                      {concluida ? 'Concluída' : `+${etapa.xp} XP`}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold gp-text-primary">
                  {faixaEtaria === 'fundamental'
                    ? etapa.tituloFundamental
                    : etapa.tituloMedio}
                </h3>

                <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
                  {faixaEtaria === 'fundamental'
                    ? etapa.descricaoFundamental
                    : etapa.descricaoMedio}
                </p>
              </div>

              <div className="pt-1">
                <Botao
                  variant="primario"
                  size="sm"
                  iconLeft={<Play className="w-3.5 h-3.5 fill-current" />}
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
