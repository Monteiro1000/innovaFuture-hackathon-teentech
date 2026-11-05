import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  Card,
  Badge,
  Botao,
  Destaque,
  PadraoBlocos,
  LogoGuardianPrompt,
} from '@/components/brand';
import { useApp, FaixaEtaria } from '@/context/AppContext';

export const DemoEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { faixaEtaria, setFaixaEtaria, setPerfil } = useApp();

  const entrarComoAluno = (faixa: FaixaEtaria) => {
    setFaixaEtaria(faixa);
    setPerfil('aluno');
    navigate('/aluno');
  };

  const entrarComoProfessor = () => {
    setPerfil('professor');
    navigate('/professor');
  };

  const entrarComoGestor = () => {
    setPerfil('gestor');
    navigate('/gestor');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cabeçalho com Padrão de Blocos */}
      <div className="relative overflow-hidden rounded-gp-xl bg-gp-roxo-escuro border border-gp-lilas/30 p-7 sm:p-10 shadow-gp-lg">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-25 pointer-events-none hidden md:flex justify-end">
          <PadraoBlocos variant="barras" className="h-full w-auto" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="ciano">Autenticação Simulada (Mock LGPD)</Badge>
            <Badge variant="sucesso" icon={<Lock className="w-3.5 h-3.5" />}>
              Zero Coleta de Dados Pessoais
            </Badge>
          </div>

          <h1 className="gp-h1 text-gp-branco">
            <Destaque>Escolha seu perfil</Destaque> para explorar a demonstração
          </h1>

          <p className="text-gp-lilas-claro gp-body-lg">
            Teste o fluxo completo de ponta a ponta sem cadastro real. Você pode alternar entre Aluno, Professor e Gestor a qualquer momento pelo menu superior.
          </p>
        </div>
      </div>

      {/* Cards dos 3 Perfis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* PERFIL 1: ALUNO */}
        <Card
          variant="destaque"
          className="flex flex-col justify-between space-y-6 border-2 border-gp-ciano"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-gp-md bg-gp-ciano text-gp-roxo-escuro flex items-center justify-center shadow-gp-glow">
                <GraduationCap className="w-7 h-7" />
              </div>
              <Badge variant="ciano">Passo 1 Recomendado</Badge>
            </div>

            <div>
              <h2 className="gp-h3 text-gp-branco">1. Perfil Estudante</h2>
              <p className="text-xs font-bold text-gp-ciano mt-0.5">
                Sessão Anônima: &ldquo;Estudante #01&rdquo;
              </p>
            </div>

            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              Acesse o <strong>Laboratório de Prompts com Auditor Automático</strong>, o <strong>Simulador de Cenários de Risco</strong> (Vazamento de Dados, Deepfake, Fontes e LGPD) e as <strong>Trilhas Gamificadas</strong>.
            </p>

            {/* Seletor de Faixa Etária */}
            <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/40 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gp-ciano block">
                Selecione a trilha etária do estudante:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFaixaEtaria('fundamental')}
                  className={`p-2.5 rounded-gp-sm text-left border gp-transition ${
                    faixaEtaria === 'fundamental'
                      ? 'bg-gp-roxo text-gp-branco border-gp-ciano font-bold'
                      : 'bg-gp-lilas-claro/5 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
                  }`}
                >
                  <span className="block text-xs font-extrabold">Ensino Fundamental</span>
                  <span className="block text-[11px] opacity-85">
                    Linguagem lúdica e missões guiadas
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFaixaEtaria('medio')}
                  className={`p-2.5 rounded-gp-sm text-left border gp-transition ${
                    faixaEtaria === 'medio'
                      ? 'bg-gp-roxo text-gp-branco border-gp-ciano font-bold'
                      : 'bg-gp-lilas-claro/5 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
                  }`}
                >
                  <span className="block text-xs font-extrabold">Ensino Médio</span>
                  <span className="block text-[11px] opacity-85">
                    Pensamento crítico e ética em pesquisa
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <Botao
              variant="secundario"
              fullWidth
              iconRight={<ArrowRight className="w-4 h-4" />}
              onClick={() => entrarComoAluno(faixaEtaria)}
            >
              Entrar como Estudante ({faixaEtaria === 'fundamental' ? 'Fundamental' : 'Médio'})
            </Botao>
          </div>
        </Card>

        {/* PERFIL 2: PROFESSOR */}
        <Card className="flex flex-col justify-between space-y-6 hover:border-gp-roxo">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-gp-md bg-gp-roxo/25 border border-gp-roxo text-gp-lilas-claro flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <Badge variant="roxo">Docente & Mediação</Badge>
            </div>

            <div>
              <h2 className="gp-h3 text-gp-branco">2. Perfil Professor(a)</h2>
              <p className="text-xs font-bold text-gp-lilas-claro mt-0.5">
                Sessão Simulada: &ldquo;Prof. Coordenação Digital&rdquo;
              </p>
            </div>

            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              Crie turmas com código de convite, atribua atividades e acompanhe métricas <strong>100% agregadas e anônimas</strong> sobre proteção de geolocalização, plágios evitados e evolução do Placar de Segurança.
            </p>

            <ul className="space-y-2 text-xs text-gp-lilas-claro pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Sem nome de aluno em nenhum gráfico (LGPD)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Gráficos de evolução, barras e distribuição</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Guia pedagógico prático para aula de 50 min</span>
              </li>
            </ul>
          </div>

          <Botao
            variant="primario"
            fullWidth
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={entrarComoProfessor}
          >
            Entrar como Professor(a)
          </Botao>
        </Card>

        {/* PERFIL 3: GESTOR ESCOLAR */}
        <Card className="flex flex-col justify-between space-y-6 hover:border-gp-lilas">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-gp-md bg-gp-lilas-claro/15 border border-gp-lilas text-gp-ciano flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <Badge variant="lilas">Visão Institucional</Badge>
            </div>

            <div>
              <h2 className="gp-h3 text-gp-branco">3. Perfil Gestor Escolar</h2>
              <p className="text-xs font-bold text-gp-lilas-claro mt-0.5">
                Sessão Simulada: &ldquo;Direção / Rede de Ensino&rdquo;
              </p>
            </div>

            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              Visualize o panorama consolidado da escola ou rede de ensino: comparativo anônimo entre turmas, taxa de adesão, maturidade digital por série e indicadores de conformidade LGPD.
            </p>

            <ul className="space-y-2 text-xs text-gp-lilas-claro pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Comparativo anônimo entre Fundamental e Médio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Indicadores de impacto social e prevenção de riscos</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>Relatório executivo de governança em IA</span>
              </li>
            </ul>
          </div>

          <Botao
            variant="fantasma"
            fullWidth
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={entrarComoGestor}
          >
            Entrar como Gestor Escolar
          </Botao>
        </Card>
      </div>

      {/* Roteiro sugerido para a Banca Avaliadora (Seção 8 da especificação) */}
      <Card variant="ciano" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gp-ciano" />
            <h3 className="font-extrabold text-gp-branco text-base sm:text-lg">
              Roteiro Rápido de Demonstração (Banca Hackathon TeenTech 2026)
            </h3>
          </div>
          <LogoGuardianPrompt variant="icone" tone="claro" size={32} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1">
            <span className="font-extrabold text-gp-ciano block">1. Selecionar Aluno</span>
            <p className="text-gp-lilas-claro">
              Entre no Laboratório de Prompts e clique no botão de teste rápido ou digite um comando com dados sensíveis e plágio.
            </p>
          </div>
          <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1">
            <span className="font-extrabold text-gp-ciano block">2. Reformular & Ganhar XP</span>
            <p className="text-gp-lilas-claro">
              Veja os alertas de Dados Sensíveis + Plágio, aplique a reformulação segura em 1 clique e libere a resposta formativa (+50 XP).
            </p>
          </div>
          <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1">
            <span className="font-extrabold text-gp-ciano block">3. Simulador & Badges</span>
            <p className="text-gp-lilas-claro">
              Complete uma missão de Deepfake ou Verificação de Fontes na aba Simulador para desbloquear uma conquista (Badge).
            </p>
          </div>
          <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1">
            <span className="font-extrabold text-gp-ciano block">4. Painel do Professor</span>
            <p className="text-gp-lilas-claro">
              Acesse a visão docente para conferir os gráficos 100% anônimos, criar uma nova turma e consultar o Guia Pedagógico.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DemoEntryPage;
