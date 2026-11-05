import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  Lock,
  CheckCircle2,
  Download,
  Scale,
  BarChart3,
} from 'lucide-react';
import {
  Card,
  Badge,
  Botao,
  Destaque,
  BarraProgresso,
} from '@/components/brand';
import { useApp } from '@/context/AppContext';

export const ManagerDashboardPage: React.FC = () => {
  const { turmas, dadosProtegidosCount, plagiosEvitadosCount } = useApp();
  const [filtroSegmento, setFiltroSegmento] = useState<
    'todos' | 'fundamental' | 'medio'
  >('todos');
  const [relatorioRedeGerado, setRelatorioRedeGerado] = useState(false);

  const turmasFiltradas = turmas.filter((t) =>
    filtroSegmento === 'todos' ? true : t.faixa === filtroSegmento
  );

  const totalEstudantesEscola = turmasFiltradas.reduce(
    (acc, t) => acc + t.totalAlunosAnonimos,
    0
  );
  const mediaAdesao = Math.round(
    turmasFiltradas.reduce((acc, t) => acc + t.adesaoPercentual, 0) /
      Math.max(1, turmasFiltradas.length)
  );
  const mediaPlacarSeguranca = Math.round(
    turmasFiltradas.reduce((acc, t) => acc + t.placarSegurancaMedio, 0) /
      Math.max(1, turmasFiltradas.length)
  );
  const mediaProtecaoGeo = Math.round(
    turmasFiltradas.reduce((acc, t) => acc + t.taxaProtecaoGeolocalizacao, 0) /
      Math.max(1, turmasFiltradas.length)
  );
  const totalPlagiosEvitados =
    turmasFiltradas.reduce((acc, t) => acc + t.plagiosEvitados, 0) +
    plagiosEvitadosCount;
  const totalDadosProtegidos =
    turmasFiltradas.reduce((acc, t) => acc + t.dadosSensiveisProtegidos, 0) +
    dadosProtegidosCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho Institucional do Gestor */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gp-roxo-escuro border border-gp-lilas/30 rounded-gp-xl p-6 sm:p-8 shadow-gp-lg">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="sucesso" icon={<Lock className="w-3.5 h-3.5" />}>
              Governança & Conformidade LGPD • 100% Anônimo
            </Badge>
            <Badge variant="lilas">Painel do Gestor Escolar / Rede</Badge>
          </div>
          <h1 className="gp-h2 text-gp-branco">
            <Destaque>Visão Institucional</Destaque> de Maturidade e Segurança em IA
          </h1>
          <p className="text-sm sm:text-base text-gp-lilas-claro">
            Comparativo consolidado e anônimo entre turmas e segmentos (Ensino Fundamental e Ensino Médio), com indicadores de adesão, proteção de dados e prevenção ao plágio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30">
            <button
              type="button"
              onClick={() => setFiltroSegmento('todos')}
              className={`px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                filtroSegmento === 'todos'
                  ? 'bg-gp-roxo text-gp-branco'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              Toda a Escola
            </button>
            <button
              type="button"
              onClick={() => setFiltroSegmento('fundamental')}
              className={`px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                filtroSegmento === 'fundamental'
                  ? 'bg-gp-roxo text-gp-branco'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              Fundamental
            </button>
            <button
              type="button"
              onClick={() => setFiltroSegmento('medio')}
              className={`px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                filtroSegmento === 'medio'
                  ? 'bg-gp-roxo text-gp-branco'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              Médio
            </button>
          </div>

          <Botao
            variant="secundario"
            size="sm"
            iconLeft={<Download className="w-4 h-4" />}
            onClick={() => {
              setRelatorioRedeGerado(true);
              setTimeout(() => setRelatorioRedeGerado(false), 4000);
            }}
          >
            Exportar Panorama da Escola
          </Botao>
        </div>
      </div>

      {relatorioRedeGerado && (
        <Card variant="ciano" className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-6 h-6 text-gp-sucesso shrink-0" />
            <div>
              <strong className="text-gp-branco block">
                Panorama Institucional Consolidado gerado com sucesso!
              </strong>
              <span className="text-gp-lilas-claro">
                Indicadores prontos para apresentação ao Conselho Escolar e Secretaria de Educação (zero dados pessoais).
              </span>
            </div>
          </div>
          <Badge variant="sucesso">Relatório LGPD</Badge>
        </Card>
      )}

      {/* KPIs Consolidados da Escola/Rede */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card variant="destaque" className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-ciano">
            Adesão Escolar Ativa
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-branco">
              {mediaAdesao}%
            </span>
            <span className="text-xs font-bold text-gp-sucesso">
              {totalEstudantesEscola} alunos anônimos
            </span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Distribuídos em {turmasFiltradas.length} turmas monitoradas.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Índice Geral de Segurança
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-sucesso">
              {mediaPlacarSeguranca}/100
            </span>
            <span className="text-xs font-bold text-gp-ciano">+31 pts no bimestre</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Evolução média de todas as turmas da instituição.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Proteção de Geolocalização
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-ciano">
              {mediaProtecaoGeo}%
            </span>
            <span className="text-xs font-bold text-gp-lilas-claro">das interações</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            {totalDadosProtegidos} exposições de dados evitadas localmente.
          </p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold uppercase text-gp-lilas-claro">
            Integridade Acadêmica
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gp-roxo">
              {totalPlagiosEvitados}
            </span>
            <span className="text-xs font-bold text-gp-sucesso">trabalhos autorais</span>
          </div>
          <p className="text-xs text-gp-lilas-claro">
            Tentativas de plágio convertidas em roteiros de pesquisa.
          </p>
        </Card>
      </div>

      {/* Comparativo Anônimo Entre Turmas */}
      <Card className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gp-branco flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gp-ciano" />
              <span>Comparativo Anônimo entre Turmas da Instituição</span>
            </h2>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Visão agregada por série para direcionar formação docente e oficinas de Cidadania Digital
            </p>
          </div>
          <Badge variant="ciano">{turmasFiltradas.length} turmas exibidas</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gp-lilas/30 text-xs font-extrabold uppercase tracking-wider text-gp-ciano">
                <th className="py-3 px-4">Turma / Série</th>
                <th className="py-3 px-4">Segmento</th>
                <th className="py-3 px-4">Adesão Anônima</th>
                <th className="py-3 px-4">Placar Segurança Médio</th>
                <th className="py-3 px-4">Proteção Geolocalização</th>
                <th className="py-3 px-4">Plágios Evitados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gp-lilas/20 text-xs sm:text-sm">
              {turmasFiltradas.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gp-lilas-claro/5 gp-transition"
                >
                  <td className="py-4 px-4 font-bold text-gp-branco">
                    {t.nome}
                    <span className="block text-xs font-normal text-gp-lilas-claro">
                      Código: {t.codigoConvite} • {t.totalAlunosAnonimos} alunos
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={t.faixa === 'fundamental' ? 'ciano' : 'roxo'}>
                      {t.faixa === 'fundamental' ? 'Fundamental' : 'Ensino Médio'}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-bold text-gp-branco">
                    {t.adesaoPercentual}%
                  </td>
                  <td className="py-4 px-4 min-w-[180px]">
                    <BarraProgresso
                      valor={t.placarSegurancaMedio}
                      maximo={100}
                      tipo="seguranca"
                      label={`${t.placarSegurancaMedio} pts`}
                    />
                  </td>
                  <td className="py-4 px-4 font-extrabold text-gp-sucesso">
                    {t.taxaProtecaoGeolocalizacao}% seguros
                  </td>
                  <td className="py-4 px-4 font-bold text-gp-ciano">
                    {t.plagiosEvitados} casos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Conformidade Institucional (LGPD, ECA e Marco Civil) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-2.5">
          <div className="flex items-center gap-2 text-gp-sucesso font-extrabold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Conformidade LGPD (Lei 13.709/2018)</span>
          </div>
          <p className="text-xs text-gp-lilas-claro leading-relaxed">
            A escola não armazena nem compartilha dados pessoais de menores com provedores externos de IA. Toda a filtragem ocorre localmente no navegador do estudante.
          </p>
        </Card>

        <Card className="space-y-2.5">
          <div className="flex items-center gap-2 text-gp-ciano font-extrabold text-sm">
            <Scale className="w-5 h-5" />
            <span>Marco Civil da Internet & ECA</span>
          </div>
          <p className="text-xs text-gp-lilas-claro leading-relaxed">
            Cumpre o dever legal de educação digital previsto no Art. 26 do Marco Civil e as diretrizes de proteção integral do Estatuto da Criança e do Adolescente.
          </p>
        </Card>

        <Card className="space-y-2.5">
          <div className="flex items-center gap-2 text-gp-roxo font-extrabold text-sm">
            <TrendingUp className="w-5 h-5" />
            <span>Escalabilidade B2B2C</span>
          </div>
          <p className="text-xs text-gp-lilas-claro leading-relaxed">
            Como o Auditor de Prompts é 100% algorítmico local, a escola ou rede pública tem custo zero de tokens de IA para auditar milhares de prompts por dia.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
