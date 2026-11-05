import React, { useState } from 'react';
import {
  Users,
  Plus,
  ShieldCheck,
  Download,
  BookOpen,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';
import {
  BannerGP,
  Card,
  Botao,
} from '@/components/brand';
import { useApp, FaixaEtaria } from '@/context/AppContext';

export const TeacherDashboardPage: React.FC = () => {
  const {
    turmas,
    criarTurma,
    plagiosEvitadosCount,
  } = useApp();

  const [turmaAtivaId, setTurmaAtivaId] = useState<string>(turmas[0]?.id || '');
  const [mostrarFormNovaTurma, setMostrarFormNovaTurma] = useState(false);
  const [nomeNovaTurma, setNomeNovaTurma] = useState('');
  const [serieNovaTurma, setSerieNovaTurma] = useState('9º Ano • Ciências');
  const [faixaNovaTurma, setFaixaNovaTurma] = useState<FaixaEtaria>('fundamental');
  const [relatorioExportado, setRelatorioExportado] = useState(false);

  const turmaAtual =
    turmas.find((t) => t.id === turmaAtivaId) || turmas[0];

  const handleCriarTurma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeNovaTurma.trim()) return;
    const nova = criarTurma({
      nome: nomeNovaTurma.trim(),
      serie: serieNovaTurma,
      faixa: faixaNovaTurma,
      modulosAtribuidos: [
        'Ciclo da Água (Laboratório de Prompts)',
        'Vazamento de Dados',
      ],
    });
    setTurmaAtivaId(nova.id);
    setNomeNovaTurma('');
    setMostrarFormNovaTurma(false);
  };

  const exportarRelatorioAnonimo = () => {
    setRelatorioExportado(true);
    const conteudoRelatorio = [
      'GUARDIAN PROMPT — RELATÓRIO PEDAGÓGICO AGREGADO E ANÔNIMO (LGPD)',
      `Turma: ${turmaAtual.nome}`,
      `Código de Convite: ${turmaAtual.codigoConvite}`,
      `Participações ativas: ${turmaAtual.totalAlunosAnonimos}`,
      `Segurança média: ${turmaAtual.placarSegurancaMedio}/100`,
      `Tentativas de atalho evitadas: ${turmaAtual.plagiosEvitados + plagiosEvitadosCount}`,
      `Destaque: ${turmaAtual.taxaProtecaoGeolocalizacao}% da turma aprendeu a não expor dados de geolocalização em prompts.`,
    ].join('\n');

    try {
      const blob = new Blob([conteudoRelatorio], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-lgpd-${turmaAtual.codigoConvite.toLowerCase()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // fallback
    }

    setTimeout(() => setRelatorioExportado(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banner Fiel à Tela 8 */}
      <BannerGP
        destaque="Painel do Professor"
        titulo={turmaAtual.nome}
        subtitulo="Métricas da turma para orientar a próxima aula, sempre com dados fictícios e agregados."
      />

      {/* Barra de Turmas + Botões "+ Criar turma" e "Exportar relatório" */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {turmas.map((turma) => (
            <button
              key={turma.id}
              type="button"
              onClick={() => setTurmaAtivaId(turma.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                turmaAtual.id === turma.id
                  ? 'bg-[#3F2757] text-white dark:bg-[#9847EE]'
                  : 'gp-card-surface gp-text-secondary hover:gp-text-primary'
              }`}
            >
              {turma.nome}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Botao
            variant="fantasma"
            size="sm"
            iconLeft={<Plus className="w-4 h-4" />}
            onClick={() => setMostrarFormNovaTurma(!mostrarFormNovaTurma)}
          >
            Criar turma
          </Botao>
          <Botao
            variant="primario"
            size="sm"
            iconLeft={<Download className="w-4 h-4" />}
            onClick={exportarRelatorioAnonimo}
          >
            Exportar relatório
          </Botao>
        </div>
      </div>

      {relatorioExportado && (
        <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/35 px-4 py-3 text-xs font-semibold gp-text-primary flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Relatório anônimo da turma {turmaAtual.nome} exportado com sucesso (LGPD).
          </span>
        </div>
      )}

      {/* Formulário Criar Turma */}
      {mostrarFormNovaTurma && (
        <Card className="space-y-4">
          <h2 className="text-sm font-extrabold gp-text-primary">
            Criar nova turma (Código de convite fictício gerado automaticamente)
          </h2>
          <form
            onSubmit={handleCriarTurma}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
          >
            <div className="sm:col-span-5">
              <label className="block text-xs font-bold gp-text-secondary mb-1">
                Nome da turma e matéria
              </label>
              <input
                type="text"
                value={nomeNovaTurma}
                onChange={(e) => setNomeNovaTurma(e.target.value)}
                placeholder="Ex.: 9º ano B • História"
                className="w-full px-3.5 py-2 rounded-xl gp-subtle-surface border border-[#AF81E9]/30 gp-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#9847EE]"
                required
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold gp-text-secondary mb-1">
                Segmento
              </label>
              <select
                value={faixaNovaTurma}
                onChange={(e) => {
                  const val = e.target.value as FaixaEtaria;
                  setFaixaNovaTurma(val);
                  setSerieNovaTurma(
                    val === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'
                  );
                }}
                className="w-full px-3.5 py-2 rounded-xl gp-subtle-surface border border-[#AF81E9]/30 gp-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#9847EE]"
              >
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <Botao type="submit" variant="primario" size="sm" fullWidth>
                Salvar turma
              </Botao>
            </div>
          </form>
        </Card>
      )}

      {/* Barra Ciano LGPD Fiel à Tela 8 */}
      <div className="rounded-xl bg-[#A5EBFA] dark:bg-[#3CC7E8]/20 border border-[#3CC7E8]/60 px-5 py-3.5 text-xs font-bold text-[#3F2757] dark:text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Dados agregados e anônimos — em conformidade com a LGPD.</span>
        </div>
        <span className="font-extrabold">
          • {turmaAtual.taxaProtecaoGeolocalizacao}% da turma aprendeu a não expor dados de geolocalização em prompts
        </span>
      </div>

      {/* 4 KPIs Fiéis à Tela 8 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <Users className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            {turmaAtual.totalAlunosAnonimos}
          </div>
          <p className="text-xs gp-text-secondary">participações ativas</p>
        </Card>

        <Card className="space-y-2">
          <ShieldCheck className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            {turmaAtual.placarSegurancaMedio}/100
          </div>
          <p className="text-xs gp-text-secondary">segurança média</p>
        </Card>

        <Card className="space-y-2">
          <BarChart2 className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            {turmaAtual.plagiosEvitados + plagiosEvitadosCount}
          </div>
          <p className="text-xs gp-text-secondary">tentativas de atalho evitadas</p>
        </Card>

        <Card className="space-y-2">
          <BookOpen className="w-5 h-5 text-[#9847EE]" />
          <div className="text-2xl sm:text-3xl font-extrabold gp-text-primary">
            {turmaAtual.modulosConcluidosPct}%
          </div>
          <p className="text-xs gp-text-secondary">módulos concluídos</p>
        </Card>
      </div>

      {/* Grade 2x2 de Gráficos e Guia Pedagógico Fiel à Tela 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Evolução do Placar de Segurança (Linha) */}
        <Card className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-base font-extrabold gp-text-primary">
              Evolução do Placar de Segurança
            </h2>
            <p className="text-xs gp-text-secondary">Média da turma por semana.</p>
          </div>

          <svg
            viewBox="0 0 400 185"
            className="w-full h-44 overflow-visible"
            role="img"
            aria-label="Gráfico de evolução semanal do placar de segurança"
          >
            {/* Eixos */}
            <line x1="42" y1="15" x2="42" y2="155" stroke="currentColor" strokeOpacity="0.25" />
            <line x1="42" y1="155" x2="375" y2="155" stroke="currentColor" strokeOpacity="0.25" />

            {[0, 25, 50, 75, 100].map((val) => {
              const y = 155 - (val / 100) * 135;
              return (
                <text
                  key={val}
                  x="34"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="currentColor"
                  opacity="0.65"
                >
                  {val}
                </text>
              );
            })}

            {(() => {
              const serie = turmaAtual.evolucaoSemanal;
              const stepX = 330 / Math.max(1, serie.length - 1);
              const pts = serie
                .map((s, idx) => {
                  const x = 42 + idx * stepX;
                  const y = 155 - (s.placar / 100) * 135;
                  return `${x},${y}`;
                })
                .join(' ');

              return (
                <>
                  <polyline
                    fill="none"
                    stroke="#9847EE"
                    strokeWidth="2.5"
                    points={pts}
                  />
                  {serie.map((s, idx) => {
                    const x = 42 + idx * stepX;
                    const y = 155 - (s.placar / 100) * 135;
                    return (
                      <g key={s.semana}>
                        <circle
                          cx={x}
                          cy={y}
                          r="3.5"
                          fill="#FFFFFF"
                          stroke="#9847EE"
                          strokeWidth="2.5"
                        />
                        <text
                          x={x}
                          y="172"
                          textAnchor="middle"
                          fontSize="10"
                          fill="currentColor"
                          opacity="0.7"
                        >
                          {s.semana}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </Card>

        {/* 2. Aprendizagens por tema (Barras Ciano) */}
        <Card className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-base font-extrabold gp-text-primary">
              Aprendizagens por tema
            </h2>
            <p className="text-xs gp-text-secondary">
              Percentual de acertos em desafios.
            </p>
          </div>

          <svg
            viewBox="0 0 400 185"
            className="w-full h-44 overflow-visible"
            role="img"
            aria-label="Gráfico de barras de aprendizagens por tema"
          >
            <line x1="42" y1="15" x2="42" y2="155" stroke="currentColor" strokeOpacity="0.25" />
            <line x1="42" y1="155" x2="375" y2="155" stroke="currentColor" strokeOpacity="0.25" />

            {[0, 20, 40, 60, 80].map((val) => {
              const y = 155 - (val / 85) * 135;
              return (
                <text
                  key={val}
                  x="34"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="currentColor"
                  opacity="0.65"
                >
                  {val}
                </text>
              );
            })}

            {turmaAtual.aprendizagensPorTema.map((item, idx) => {
              const barWidth = 82;
              const x = 62 + idx * 106;
              const barHeight = (item.percentual / 85) * 135;
              const y = 155 - barHeight;

              return (
                <g key={item.tema}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="#3CC7E8"
                  />
                  <text
                    x={x + barWidth / 2}
                    y="172"
                    textAnchor="middle"
                    fontSize="11"
                    fill="currentColor"
                    opacity="0.75"
                  >
                    {item.tema}
                  </text>
                </g>
              );
            })}
          </svg>
        </Card>

        {/* 3. Adesão à trilha (Rosca) */}
        <Card className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <h2 className="text-base font-extrabold gp-text-primary">
            Adesão à trilha
          </h2>

          <div className="flex items-center justify-center py-2">
            {(() => {
              const pct = turmaAtual.adesaoPercentual;
              const raio = 48;
              const circunferencia = 2 * Math.PI * raio;
              const dash = (pct / 100) * circunferencia;

              return (
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 130 130"
                  role="img"
                  aria-label={`Adesão à trilha: ${pct}%`}
                >
                  <circle
                    cx="65"
                    cy="65"
                    r={raio}
                    fill="none"
                    stroke="#D9CBE7"
                    strokeWidth="18"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r={raio}
                    fill="none"
                    stroke="#9847EE"
                    strokeWidth="18"
                    strokeDasharray={`${dash} ${circunferencia}`}
                    transform="rotate(-90 65 65)"
                  />
                </svg>
              );
            })()}
          </div>
        </Card>

        {/* 4. Guia Pedagógico Fiel à Tela 9 */}
        <Card className="lg:col-span-7 border-l-4 border-l-[#3CC7E8] space-y-3 flex flex-col justify-center">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9847EE] dark:text-[#3CC7E8]">
            GUIA PEDAGÓGICO
          </span>
          <h2 className="text-lg font-extrabold gp-text-primary">
            Uma aula de segurança com IA
          </h2>
          <ol className="space-y-2 text-xs sm:text-sm gp-text-secondary">
            <li>
              <strong className="gp-text-primary">1. Aquecimento:</strong> peça exemplos de prompts cotidianos.
            </li>
            <li>
              <strong className="gp-text-primary">2. Laboratório:</strong> a turma melhora os pedidos antes do envio.
            </li>
            <li>
              <strong className="gp-text-primary">3. Fechamento:</strong> conversem sobre decisões, não sobre notas.
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
