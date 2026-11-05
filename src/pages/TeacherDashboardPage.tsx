import React, { useState } from 'react';
import {
  Users,
  PlusCircle,
  ShieldCheck,
  Download,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  Lock,
  BarChart3,
  PieChart,
  FileText,
} from 'lucide-react';
import {
  Card,
  Badge,
  Botao,
  Destaque,
  BarraProgresso,
} from '@/components/brand';
import { useApp, FaixaEtaria } from '@/context/AppContext';

const MODULOS_DISPONIVEIS = [
  'Ciclo da Água (Laboratório de Prompts)',
  'Ecossistemas Brasileiros (Laboratório)',
  'Ética Digital e Redação (Laboratório)',
  'Vazamento de Dados: Onde está o risco?',
  'Deepfake ou Real? (Simulador)',
  'Verificação de Fontes e Alucinações de IA',
  'Cidadania Digital: LGPD, ECA e Marco Civil',
];

export const TeacherDashboardPage: React.FC = () => {
  const {
    turmas,
    criarTurma,
    atribuirModuloTurma,
    dadosProtegidosCount,
    plagiosEvitadosCount,
  } = useApp();

  const [turmaAtivaId, setTurmaAtivaId] = useState<string>(turmas[0]?.id || '');
  const [mostrarFormNovaTurma, setMostrarFormNovaTurma] = useState(false);
  const [nomeNovaTurma, setNomeNovaTurma] = useState('');
  const [serieNovaTurma, setSerieNovaTurma] = useState('9º Ano (Ensino Fundamental II)');
  const [faixaNovaTurma, setFaixaNovaTurma] = useState<FaixaEtaria>('fundamental');
  const [moduloSelecionadoAtribuicao, setModuloSelecionadoAtribuicao] = useState(
    MODULOS_DISPONIVEIS[4]
  );
  const [codigoCopiado, setCodigoCopiado] = useState(false);
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
        'Vazamento de Dados: Onde está o risco?',
      ],
    });
    setTurmaAtivaId(nova.id);
    setNomeNovaTurma('');
    setMostrarFormNovaTurma(false);
  };

  const copiarCodigoConvite = (codigo: string) => {
    navigator.clipboard?.writeText(codigo);
    setCodigoCopiado(true);
    setTimeout(() => setCodigoCopiado(false), 2500);
  };

  const exportarRelatorioAnonimo = () => {
    setRelatorioExportado(true);
    const conteudoRelatorio = [
      '====================================================================',
      'GUARDIAN PROMPT — RELATÓRIO PEDAGÓGICO AGREGADO E ANÔNIMO (LGPD)',
      '====================================================================',
      `Turma: ${turmaAtual.nome} (${turmaAtual.serie})`,
      `Código de Convite: ${turmaAtual.codigoConvite}`,
      `Total de Estudantes (Anonimizados): ${turmaAtual.totalAlunosAnonimos}`,
      `Taxa de Proteção de Geolocalização: ${turmaAtual.taxaProtecaoGeolocalizacao}% da turma aprendeu a não expor dados de geolocalização em prompts`,
      `Placar de Segurança Médio: ${turmaAtual.placarSegurancaMedio}/100`,
      `Plágios Evitados (Transformados em Pesquisa): ${turmaAtual.plagiosEvitados + plagiosEvitadosCount}`,
      `Dados Sensíveis Protegidos Localmente: ${turmaAtual.dadosSensiveisProtegidos + dadosProtegidosCount}`,
      `Módulo com Maior Desafio Pedagógico: ${turmaAtual.moduloMaisDificil}`,
      '',
      'DECLARAÇÃO DE CONFORMIDADE (Lei nº 13.709/2018 - LGPD):',
      'Nenhum nome de estudante ou conversa individual consta neste documento.',
      '====================================================================',
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
      // Fallback visual exibido no alerta de sucesso
    }

    setTimeout(() => setRelatorioExportado(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho e Selo Obrigatório LGPD */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gp-roxo-escuro border border-gp-lilas/30 rounded-gp-xl p-6 sm:p-8 shadow-gp-lg">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {/* Selo obrigatório da especificação (Seção 6.4) */}
            <Badge variant="sucesso" icon={<Lock className="w-3.5 h-3.5" />}>
              Dados agregados e anônimos, em conformidade com a LGPD
            </Badge>
            <Badge variant="ciano">Painel do Professor</Badge>
          </div>
          <h1 className="gp-h2 text-gp-branco">
            <Destaque>Gestão Pedagógica</Destaque> e Letramento Seguro em IA
          </h1>
          <p className="text-sm sm:text-base text-gp-lilas-claro">
            Acompanhe a evolução coletiva das turmas sem expor a identidade nem os prompts individuais dos estudantes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Botao
            variant="fantasma"
            iconLeft={<Download className="w-4 h-4 text-gp-ciano" />}
            onClick={exportarRelatorioAnonimo}
          >
            Exportar relatório
          </Botao>
          <Botao
            variant="secundario"
            iconLeft={<PlusCircle className="w-4 h-4" />}
            onClick={() => setMostrarFormNovaTurma(!mostrarFormNovaTurma)}
          >
            Criar nova turma
          </Botao>
        </div>
      </div>

      {/* Aviso de Exportação */}
      {relatorioExportado && (
        <Card variant="ciano" className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-gp-sucesso shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="text-gp-branco block">
                Relatório anônimo da {turmaAtual.nome} exportado com sucesso!
              </strong>
              <span className="text-gp-lilas-claro">
                Documento gerado sem identificadores pessoais, em total conformidade com o Art. 14 da LGPD.
              </span>
            </div>
          </div>
          <Badge variant="sucesso">Download concluído</Badge>
        </Card>
      )}

      {/* Formulário de Criação de Nova Turma */}
      {mostrarFormNovaTurma && (
        <Card variant="destaque" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-gp-branco">
              Criar Nova Turma (Gera Código de Convite Fictício)
            </h2>
            <Badge variant="ciano">Persistência Local</Badge>
          </div>
          <form
            onSubmit={handleCriarTurma}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5">
              <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                Nome da Turma / Disciplina
              </label>
              <input
                type="text"
                value={nomeNovaTurma}
                onChange={(e) => setNomeNovaTurma(e.target.value)}
                placeholder="Ex.: Turma 9º Ano B — Projeto de Vida & IA"
                className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano"
                required
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                Série Escolar
              </label>
              <input
                type="text"
                value={serieNovaTurma}
                onChange={(e) => setSerieNovaTurma(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                Segmento
              </label>
              <select
                value={faixaNovaTurma}
                onChange={(e) => setFaixaNovaTurma(e.target.value as FaixaEtaria)}
                className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano"
              >
                <option value="fundamental">Fundamental</option>
                <option value="medio">Ensino Médio</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Botao type="submit" variant="secundario" fullWidth>
                Salvar Turma
              </Botao>
            </div>
          </form>
        </Card>
      )}

      {/* Seletor de Turmas e Código de Convite */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {turmas.map((turma) => (
            <button
              key={turma.id}
              type="button"
              onClick={() => setTurmaAtivaId(turma.id)}
              className={`px-4 py-2.5 rounded-gp-md text-xs sm:text-sm font-bold border gp-transition ${
                turmaAtual.id === turma.id
                  ? 'bg-gp-roxo text-gp-branco border-gp-ciano shadow-gp-roxo-glow'
                  : 'bg-gp-roxo-escuro/80 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
              }`}
            >
              {turma.nome}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 text-xs">
          <span className="text-gp-lilas-claro">Código de Convite da Turma:</span>
          <strong className="text-gp-ciano font-extrabold tracking-wider">
            {turmaAtual.codigoConvite}
          </strong>
          <button
            type="button"
            onClick={() => copiarCodigoConvite(turmaAtual.codigoConvite)}
            className="p-1 rounded hover:bg-gp-lilas-claro/20 text-gp-ciano"
            title="Copiar código fictício da turma"
          >
            {codigoCopiado ? (
              <Check className="w-3.5 h-3.5 text-gp-sucesso" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Destaque Principal de Impacto (Frase Obrigatória da Especificação 6.4) */}
      <Card variant="ciano" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-gp-md bg-gp-sucesso/20 border border-gp-sucesso flex items-center justify-center text-gp-sucesso shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gp-ciano">
              Indicador de Impacto Coletivo da Turma ({turmaAtual.totalAlunosAnonimos} estudantes anônimos)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-gp-branco">
              &ldquo;{turmaAtual.taxaProtecaoGeolocalizacao}% da turma aprendeu a não expor dados de geolocalização em prompts&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Redução consistente de menções a nome de escola, bairro e rotina de horários após 4 semanas de uso do Auditor Local.
            </p>
          </div>
        </div>
        <Badge variant="sucesso">Meta Escolar Atingida</Badge>
      </Card>

      {/* 4 KPIs Agregados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Placar de Segurança Médio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-sucesso">
              {turmaAtual.placarSegurancaMedio}/100
            </span>
            <span className="text-xs font-bold text-gp-ciano">+34 pts desde Sem 1</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Média anônima dos comandos enviados no Laboratório.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Plágios Evitados na Turma
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-ciano">
              {turmaAtual.plagiosEvitados + plagiosEvitadosCount}
            </span>
            <span className="text-xs font-bold text-gp-lilas-claro">reformulações</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Pedidos de &ldquo;trabalho pronto&rdquo; convertidos em roteiros de pesquisa.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Dados Sensíveis Protegidos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-roxo">
              {turmaAtual.dadosSensiveisProtegidos + dadosProtegidosCount}
            </span>
            <span className="text-xs font-bold text-gp-sucesso">bloqueios locais</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Nomes completos, bairros, escolas e contatos retidos antes do envio.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Módulo Mais Desafiador
          </span>
          <div className="flex items-center gap-2 pt-1">
            <AlertTriangle className="w-5 h-5 text-gp-atencao shrink-0" />
            <span className="text-sm font-extrabold text-gp-branco leading-snug">
              {turmaAtual.moduloMaisDificil}
            </span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Recomendado reforçar em sala com o Guia Pedagógico abaixo.
          </p>
        </Card>
      </div>

      {/* 3 Gráficos Obrigatórios: Linhas (Evolução), Rosca (Geolocalização/LGPD) e Barras (Módulos/Riscos) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico 1: Linha — Evolução do Placar de Segurança Médio */}
        <Card className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-gp-branco flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gp-ciano" />
                <span>Evolução do Placar de Segurança Médio</span>
              </h3>
              <p className="text-xs text-gp-lilas-claro">
                Progressão semanal da turma (0 a 100 pontos • Dados Anônimos)
              </p>
            </div>
          </div>

          <div className="pt-2">
            <svg
              viewBox="0 0 360 190"
              className="w-full h-44 overflow-visible"
              role="img"
              aria-label="Gráfico de linha mostrando evolução do placar de segurança médio da turma de 52 para 86 pontos"
            >
              {/* Linhas de grade horizontais */}
              {[25, 50, 75, 100].map((val) => {
                const y = 155 - (val / 100) * 125;
                return (
                  <g key={val}>
                    <line
                      x1="36"
                      y1={y}
                      x2="340"
                      y2={y}
                      stroke="#AF81E9"
                      strokeOpacity="0.2"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="8"
                      y={y + 4}
                      fill="#D9CBE7"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Polilinha de evolução */}
              {(() => {
                const serie = turmaAtual.evolucaoSemanal;
                const stepX = 270 / Math.max(1, serie.length - 1);
                const points = serie
                  .map((item, idx) => {
                    const x = 52 + idx * stepX;
                    const y = 155 - (item.placar / 100) * 125;
                    return `${x},${y}`;
                  })
                  .join(' ');

                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="#3CC7E8"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                    {serie.map((item, idx) => {
                      const x = 52 + idx * stepX;
                      const y = 155 - (item.placar / 100) * 125;
                      return (
                        <g key={item.semana}>
                          <circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill="#9847EE"
                            stroke="#3CC7E8"
                            strokeWidth="2.5"
                          />
                          <text
                            x={x}
                            y={y - 11}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontWeight="800"
                          >
                            {item.placar}
                          </text>
                          <text
                            x={x}
                            y="178"
                            textAnchor="middle"
                            fill="#D9CBE7"
                            fontSize="10"
                            fontWeight="600"
                          >
                            {item.semana}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </Card>

        {/* Gráfico 2: Rosca (Donut) — Domínio de Privacidade & Geolocalização */}
        <Card className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-gp-branco flex items-center gap-2">
              <PieChart className="w-4 h-4 text-gp-roxo" />
              <span>Proteção de Geolocalização</span>
            </h3>
            <p className="text-xs text-gp-lilas-claro">
              Percentual de prompts sem dados de endereço/escola
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            {(() => {
              const pct = turmaAtual.taxaProtecaoGeolocalizacao;
              const raio = 52;
              const circunferencia = 2 * Math.PI * raio;
              const dash = (pct / 100) * circunferencia;

              return (
                <svg
                  width="145"
                  height="145"
                  viewBox="0 0 140 140"
                  role="img"
                  aria-label={`Gráfico de rosca: ${pct}% da turma protege geolocalização`}
                >
                  <circle
                    cx="70"
                    cy="70"
                    r={raio}
                    fill="none"
                    stroke="#D9CBE7"
                    strokeOpacity="0.18"
                    strokeWidth="16"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={raio}
                    fill="none"
                    stroke="#3CC7E8"
                    strokeWidth="16"
                    strokeDasharray={`${dash} ${circunferencia}`}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                  />
                  <text
                    x="70"
                    y="68"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="24"
                    fontWeight="800"
                  >
                    {pct}%
                  </text>
                  <text
                    x="70"
                    y="86"
                    textAnchor="middle"
                    fill="#D9CBE7"
                    fontSize="10"
                    fontWeight="700"
                  >
                    SEGUROS
                  </text>
                </svg>
              );
            })()}
          </div>

          <div className="text-xs text-gp-lilas-claro text-center bg-gp-roxo-escuro/80 p-2.5 rounded-gp-sm border border-gp-lilas/30">
            <strong className="text-gp-ciano">{turmaAtual.taxaProtecaoGeolocalizacao}%</strong> consolidado •{' '}
            <strong className="text-gp-atencao">
              {100 - turmaAtual.taxaProtecaoGeolocalizacao}%
            </strong>{' '}
            em reforço guiado
          </div>
        </Card>

        {/* Gráfico 3: Barras — Desempenho Coletivo por Competência */}
        <Card className="lg:col-span-4 space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-gp-branco flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gp-sucesso" />
              <span>Domínio por Competência Digital</span>
            </h3>
            <p className="text-xs text-gp-lilas-claro">
              Taxa de acerto agregada da turma por módulo (sem dados nominais)
            </p>
          </div>

          <div className="space-y-3.5 pt-1">
            <BarraProgresso
              valor={88}
              maximo={100}
              tipo="seguranca"
              label="Omissão de Nome e Escola (LGPD)"
            />
            <BarraProgresso
              valor={turmaAtual.taxaProtecaoGeolocalizacao}
              maximo={100}
              tipo="seguranca"
              label="Proteção de Bairro e Rotina"
            />
            <BarraProgresso
              valor={82}
              maximo={100}
              tipo="seguranca"
              label="Rejeição ao Plágio (Uso de Roteiros)"
            />
            <BarraProgresso
              valor={64}
              maximo={100}
              tipo="seguranca"
              label="Identificação de Deepfakes"
            />
          </div>
        </Card>
      </div>

      {/* Atribuição de Módulos + Guia Pedagógico para Sala de Aula */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Módulos Atribuídos à Turma */}
        <Card className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-extrabold text-gp-branco flex items-center gap-2">
              <Users className="w-5 h-5 text-gp-ciano" />
              <span>Atividades Atribuídas à Turma</span>
            </h3>
            <Badge variant="roxo">{turmaAtual.modulosAtribuidos.length} ativas</Badge>
          </div>

          <ul className="space-y-2">
            {turmaAtual.modulosAtribuidos.map((mod, idx) => (
              <li
                key={idx}
                className="p-3 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 flex items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <span className="font-semibold text-gp-branco">{mod}</span>
                <Badge variant="sucesso">Em andamento</Badge>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-gp-lilas/25 space-y-2.5">
            <label className="block text-xs font-bold uppercase text-gp-ciano">
              Atribuir nova missão ou atividade à turma:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={moduloSelecionadoAtribuicao}
                onChange={(e) => setModuloSelecionadoAtribuicao(e.target.value)}
                className="flex-1 px-3 py-2 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-xs sm:text-sm focus:outline-none focus:border-gp-ciano"
              >
                {MODULOS_DISPONIVEIS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <Botao
                type="button"
                variant="primario"
                size="sm"
                onClick={() =>
                  atribuirModuloTurma(turmaAtual.id, moduloSelecionadoAtribuicao)
                }
              >
                Atribuir
              </Botao>
            </div>
          </div>
        </Card>

        {/* Guia Pedagógico Curto para Sala de Aula (Obrigatório Seção 6.4) */}
        <Card variant="destaque" className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gp-ciano" />
              <h3 className="text-base sm:text-lg font-extrabold text-gp-branco">
                Guia Pedagógico: Aplicando &ldquo;Segurança com IA&rdquo; em Sala (50 min)
              </h3>
            </div>
            <Badge variant="ciano" icon={<FileText className="w-3.5 h-3.5" />}>
              BNCC Computação & Cidadania Digital
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-gp-lilas-claro leading-relaxed">
            Roteiro prático para o professor transformar o Guardian Prompt em uma aula dinâmica e formativa, sem precisar de conhecimento técnico avançado:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
              <span className="font-extrabold text-gp-ciano block">
                1. Aquecimento (10 min)
              </span>
              <strong className="text-gp-branco block">
                O Teste do Megafone na Praça
              </strong>
              <p className="text-gp-lilas-claro">
                Pergunte à turma: &ldquo;Vocês gritariam seu nome completo, o bairro da escola e a hora que ficam sozinhos em casa no meio de uma praça lotada?&rdquo; Conecte a resposta ao funcionamento dos chatbots de IA.
              </p>
            </div>

            <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
              <span className="font-extrabold text-gp-ciano block">
                2. Prática no Lab (25 min)
              </span>
              <strong className="text-gp-branco block">
                Desafio do Placar 100/100
              </strong>
              <p className="text-gp-lilas-claro">
                Em duplas, os estudantes abrem a atividade da disciplina no Laboratório de Prompts e precisam construir 3 perguntas que alcancem 100 pontos no Auditor, trocando pedidos prontos por roteiros de pesquisa.
              </p>
            </div>

            <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
              <span className="font-extrabold text-gp-ciano block">
                3. Roda de Fechamento (15 min)
              </span>
              <strong className="text-gp-branco block">
                Checagem & Autoria
              </strong>
              <p className="text-gp-lilas-claro">
                Projete o gráfico anônimo da turma no quadro, celebre os avanços coletivos e peça que cada dupla compartilhe como reescreveu o roteiro com suas próprias palavras.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
