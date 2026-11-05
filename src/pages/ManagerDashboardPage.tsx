import React from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { BannerGP, Card } from '@/components/brand';
import { useApp } from '@/context/AppContext';

/**
 * Painel do Gestor Escolar fiel às Telas 10 e 11 de referência:
 * - BannerGP "Visão da Escola Panorama de cidadania com IA"
 * - Barra ciano LGPD: "Métricas agregadas e anônimas. Nenhum nome ou prompt individual aparece aqui."
 * - 3 KPIs: 4 turmas ativas, 86% adesão às trilhas, +14 pts evolução média
 * - Gráfico de barras roxas "Placar médio por turma" (6º A, 7º B, 8º B, 1º M)
 * - 2 cards inferiores com borda lateral colorida: "Sinal de atenção pedagógica" e "Boa evolução"
 */
export const ManagerDashboardPage: React.FC = () => {
  const { turmas } = useApp();

  const dadosGraficoTurmas = [
    { rotulo: '6º A', placar: 76 },
    { rotulo: '7º B', placar: 79 },
    { rotulo: '8º B', placar: 81 },
    { rotulo: '1º M', placar: 74 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banner Fiel à Tela 10 */}
      <BannerGP
        destaque="Visão da Escola"
        titulo="Panorama de cidadania com IA"
        subtitulo="Indicadores por turma, sempre sem identificar estudantes."
      />

      {/* Barra Ciano LGPD */}
      <div className="rounded-xl bg-[#A5EBFA] dark:bg-[#3CC7E8]/20 border border-[#3CC7E8]/60 px-5 py-3.5 text-xs font-bold text-[#3F2757] dark:text-white flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          Métricas agregadas e anônimas. Nenhum nome ou prompt individual aparece aqui.
        </span>
      </div>

      {/* 3 KPIs Fiéis às Telas 10 & 11 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="space-y-2">
          <Building2 className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            {turmas.length}
          </div>
          <p className="text-xs gp-text-secondary">turmas ativas</p>
        </Card>

        <Card className="space-y-2">
          <Users className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            86%
          </div>
          <p className="text-xs gp-text-secondary">adesão às trilhas</p>
        </Card>

        <Card className="space-y-2">
          <TrendingUp className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            +14 pts
          </div>
          <p className="text-xs gp-text-secondary">evolução média</p>
        </Card>
      </div>

      {/* Gráfico: Placar médio por turma (6º A, 7º B, 8º B, 1º M) */}
      <Card className="space-y-5">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold gp-text-primary">
            Placar médio por turma
          </h2>
          <p className="text-xs gp-text-secondary">
            Comparativo anonimizado do último ciclo de atividades.
          </p>
        </div>

        <svg
          viewBox="0 0 680 215"
          className="w-full h-56 overflow-visible"
          role="img"
          aria-label="Gráfico de barras comparando o placar médio por turma: 6º A, 7º B, 8º B e 1º M"
        >
          <line
            x1="42"
            y1="15"
            x2="42"
            y2="180"
            stroke="currentColor"
            strokeOpacity="0.25"
          />
          <line
            x1="42"
            y1="180"
            x2="650"
            y2="180"
            stroke="currentColor"
            strokeOpacity="0.25"
          />

          {[0, 25, 50, 75, 100].map((val) => {
            const y = 180 - (val / 100) * 160;
            return (
              <g key={val}>
                <line
                  x1="38"
                  y1={y}
                  x2="42"
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.25"
                />
                <text
                  x="34"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  opacity="0.65"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {dadosGraficoTurmas.map((item, idx) => {
            const barWidth = 122;
            const x = 58 + idx * 148;
            const barHeight = (item.placar / 100) * 160;
            const y = 180 - barHeight;

            return (
              <g key={item.rotulo}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill="#9847EE"
                />
                <text
                  x={x + barWidth / 2}
                  y="198"
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  opacity="0.75"
                >
                  {item.rotulo}
                </text>
              </g>
            );
          })}
        </svg>
      </Card>

      {/* 2 Cards Inferiores Fiéis à Tela 11: "Sinal de atenção pedagógica" e "Boa evolução" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="border-l-4 border-l-[#9847EE] space-y-2">
          <h3 className="text-base font-extrabold gp-text-primary">
            Sinal de atenção pedagógica
          </h3>
          <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
            O módulo de deepfake teve a menor taxa de acerto. Uma oficina curta de checagem pode reforçar a habilidade.
          </p>
        </Card>

        <Card className="border-l-4 border-l-[#3CC7E8] space-y-2">
          <h3 className="text-base font-extrabold gp-text-primary">
            Boa evolução
          </h3>
          <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
            Privacidade em prompts foi o tema com maior avanço. Hora de celebrar e consolidar o hábito.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
