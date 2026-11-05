import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  BrainCircuit,
  Compass,
  Play,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Users,
  School,
  BookOpen,
  HeartHandshake,
  Lock,
  Scale,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Palette,
  X,
} from 'lucide-react';
import {
  BannerGP,
  Destaque,
  Botao,
  Card,
  Badge,
  PadraoBlocos,
  AlertaAuditor,
  BarraProgresso,
} from '@/components/brand';
import { useApp } from '@/context/AppContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPerfil, setFaixaEtaria } = useApp();
  const [modalDemoB2B, setModalDemoB2B] = useState(false);
  const [demoSolicitada, setDemoSolicitada] = useState(false);

  const entrarDiretoComo = (
    perfil: 'aluno' | 'professor' | 'gestor',
    rota: string,
    faixa?: 'fundamental' | 'medio'
  ) => {
    setPerfil(perfil);
    if (faixa) setFaixaEtaria(faixa);
    navigate(rota);
  };

  return (
    <div className="space-y-20 pb-12">
      {/* HERO PRINCIPAL COM BANNERGP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <BannerGP
          tag="Hackathon TeenTech 2026 • Conexão Segura • Prevenção à Violência"
          destaque="IA na escola,"
          titulo="com proteção de dados e pensamento crítico."
          subtitulo="O Guardian Prompt é a plataforma gamificada B2B2C que ensina estudantes do Ensino Fundamental e Médio a usar Inteligência Artificial sem expor dados pessoais e sem terceirizar o próprio cérebro."
        >
          <Botao
            variant="secundario"
            size="lg"
            iconLeft={<Play className="w-5 h-5 fill-current" />}
            onClick={() => navigate('/entrar')}
          >
            Entrar na demo interativa
          </Botao>
          <Botao
            variant="primario"
            size="lg"
            iconLeft={<CalendarCheck className="w-5 h-5" />}
            onClick={() => {
              setDemoSolicitada(false);
              setModalDemoB2B(true);
            }}
          >
            Solicitar demonstração para escola
          </Botao>
        </BannerGP>

        {/* Barra de Destaques e Prévia Interativa Rápida */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <Card variant="destaque" className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="ciano">Demonstração em 1 clique</Badge>
              <span className="text-xs text-gp-lilas-claro font-semibold">
                100% Algorítmico Local • Sem coleta de dados reais
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-gp-branco">
                Veja o <Destaque>Auditor de Prompts</Destaque> em ação antes da resposta da IA:
              </h2>
              <p className="text-xs sm:text-sm text-gp-lilas-claro">
                Exemplo real do fluxo do estudante ao tentar enviar nome, escola, bairro e pedir o trabalho pronto:
              </p>
            </div>

            <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro border border-gp-lilas/40 text-xs sm:text-sm font-medium text-gp-lilas-claro">
              <span className="text-gp-ciano font-bold block mb-1">
                Comando digitado pelo estudante:
              </span>
              &ldquo;Oi, me chamo{' '}
              <mark className="px-1.5 py-0.5 rounded bg-gp-atencao/25 text-gp-atencao font-bold">
                Maria Souza
              </mark>{' '}
              e estudo na{' '}
              <mark className="px-1.5 py-0.5 rounded bg-gp-atencao/25 text-gp-atencao font-bold">
                Escola X no bairro Y
              </mark>
              ,{' '}
              <mark className="px-1.5 py-0.5 rounded bg-gp-roxo/40 text-gp-lilas-claro font-bold">
                faz meu trabalho de ciências completo
              </mark>
              .&rdquo;
            </div>

            <BarraProgresso
              valor={35}
              maximo={100}
              tipo="seguranca"
              label="Placar de Segurança do Prompt Analisado"
              sublabel="Descontos: -35 pts (Nome completo, escola e bairro expostos) • -30 pts (Pedido de trabalho completo)"
            />

            <div className="pt-1 flex flex-wrap gap-3">
              <Botao
                variant="secundario"
                size="sm"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => entrarDiretoComo('aluno', '/aluno', 'fundamental')}
              >
                Testar este prompt agora no Laboratório
              </Botao>
              <Botao
                variant="fantasma"
                size="sm"
                onClick={() => entrarDiretoComo('professor', '/professor')}
              >
                Ver Painel do Professor
              </Botao>
            </div>
          </Card>

          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <AlertaAuditor
              tipo="dados"
              titulo="Proteção de Privacidade em Tempo Real"
              mensagem="Você mencionou seu nome completo e o bairro da sua escola. Veja como reformular sem se expor."
              sugestaoReformulacao="Estou no Ensino Fundamental e preciso de um roteiro de tópicos para pesquisar sobre meu trabalho de ciências."
              onAplicarSugestao={() => entrarDiretoComo('aluno', '/aluno', 'fundamental')}
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 1: O PROBLEMA EM 3 CARDS */}
      <section
        id="problema"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="max-w-3xl space-y-3">
          <Badge variant="atencao">Diagnóstico Educacional</Badge>
          <h2 className="gp-h2 text-gp-branco">
            <Destaque>O problema</Destaque> que as escolas enfrentam hoje com a IA generativa
          </h2>
          <p className="text-gp-lilas-claro gp-body-lg">
            Estudos internacionais (UNICEF e ONU) apontam que crianças e adolescentes já utilizam IAs diariamente, mas sem filtros de privacidade nem mediação pedagógica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Dados expostos */}
          <Card className="flex flex-col justify-between space-y-4 hover:border-gp-ciano gp-transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-gp-md bg-gp-atencao/20 border border-gp-atencao/50 flex items-center justify-center text-gp-atencao">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <Badge variant="atencao">1. Dados Pessoais Expostos</Badge>
              <h3 className="gp-h3 text-gp-branco">
                Vazamento de rotina, localização e desabafos íntimos
              </h3>
              <p className="text-sm text-gp-lilas-claro leading-relaxed">
                Crianças e adolescentes compartilham nome completo, nome da escola, bairro, horários de saída e questões emocionais profundas com chatbots abertos, ficando vulneráveis a exposição e engenharia social.
              </p>
            </div>
            <div className="pt-3 border-t border-gp-lilas/20 text-xs font-bold text-gp-ciano">
              Proteção ativa: Filtro local antes de qualquer envio.
            </div>
          </Card>

          {/* Card 2: Cérebro no piloto automático */}
          <Card className="flex flex-col justify-between space-y-4 hover:border-gp-ciano gp-transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-gp-md bg-gp-roxo/25 border border-gp-roxo flex items-center justify-center text-gp-lilas-claro">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <Badge variant="roxo">2. Cérebro no Piloto Automático</Badge>
              <h3 className="gp-h3 text-gp-branco">
                A IA como &ldquo;muleta cognitiva&rdquo; e atalho escolar
              </h3>
              <p className="text-sm text-gp-lilas-claro leading-relaxed">
                Ao pedir &ldquo;faça meu trabalho completo&rdquo;, o estudante terceiriza o raciocínio e deixa de exercitar leitura crítica, interpretação, argumentação e autoria — prejudicando o desenvolvimento cognitivo de longo prazo.
              </p>
            </div>
            <div className="pt-3 border-t border-gp-lilas/20 text-xs font-bold text-gp-ciano">
              Transformação: De respostas prontas para roteiros de pesquisa.
            </div>
          </Card>

          {/* Card 3: Escola sem mapa */}
          <Card className="flex flex-col justify-between space-y-4 hover:border-gp-ciano gp-transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-gp-md bg-gp-ciano/20 border border-gp-ciano/60 flex items-center justify-center text-gp-ciano">
                <Compass className="w-6 h-6" />
              </div>
              <Badge variant="ciano">3. Escola sem Mapa & Sobrecarga</Badge>
              <h3 className="gp-h3 text-gp-branco">
                Ausência de estrutura pedagógica e fadiga digital
              </h3>
              <p className="text-sm text-gp-lilas-claro leading-relaxed">
                Proibir a IA não funciona e liberar sem orientação gera insegurança. Educadores precisam de uma trilha curricular estruturada e métricas anônimas para ensinar segurança digital sem invadir a privacidade dos alunos.
              </p>
            </div>
            <div className="pt-3 border-t border-gp-lilas/20 text-xs font-bold text-gp-ciano">
              Solução: Trilhas prontas + Guia Pedagógico para sala de aula.
            </div>
          </Card>
        </div>
      </section>

      {/* SEÇÃO 2: COMO FUNCIONA EM 3 PASSOS */}
      <section
        id="como-funciona"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-3">
            <Badge variant="ciano">Arquitetura Educativa</Badge>
            <h2 className="gp-h2 text-gp-branco">
              <Destaque>Como funciona</Destaque> a jornada no Guardian Prompt
            </h2>
            <p className="text-gp-lilas-claro gp-body-lg">
              Três pilares integrados que conectam a prática do aluno em laboratório seguro à gestão pedagógica do professor.
            </p>
          </div>
          <Botao
            variant="secundario"
            onClick={() => navigate('/entrar')}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Testar os 3 passos agora
          </Botao>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Passo 1 */}
          <Card variant="destaque" className="relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-gp-sm bg-gp-ciano text-gp-roxo-escuro font-extrabold text-sm">
                Passo 01
              </span>
              <Sparkles className="w-6 h-6 text-gp-ciano" />
            </div>
            <h3 className="gp-h3 text-gp-branco">
              Auditor de Prompts Local & Educativo
            </h3>
            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              Antes de simular qualquer resposta, nosso motor algorítmico local analisa o texto digitado em busca de dados pessoais, localização, plágio ou desabafos íntimos, gerando o <strong>Placar de Segurança (0 a 100)</strong> e uma sugestão de reformulação imediata.
            </p>
            <div className="pt-2">
              <Botao
                variant="fantasma"
                size="sm"
                fullWidth
                onClick={() => entrarDiretoComo('aluno', '/aluno', 'fundamental')}
              >
                Abrir Laboratório de Prompts
              </Botao>
            </div>
          </Card>

          {/* Passo 2 */}
          <Card variant="destaque" className="relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-gp-sm bg-gp-roxo text-gp-branco font-extrabold text-sm">
                Passo 02
              </span>
              <BookOpen className="w-6 h-6 text-gp-lilas-claro" />
            </div>
            <h3 className="gp-h3 text-gp-branco">
              Trilhas & Simulador de Riscos por Idade
            </h3>
            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              Missões gamificadas adaptadas ao <strong>Ensino Fundamental</strong> (linguagem lúdica e protetiva) e ao <strong>Ensino Médio</strong> (pensamento crítico, ética e pesquisa), cobrindo Vazamento de Dados, Deepfakes, Verificação de Fontes e Cidadania Digital.
            </p>
            <div className="pt-2">
              <Botao
                variant="fantasma"
                size="sm"
                fullWidth
                onClick={() => entrarDiretoComo('aluno', '/aluno?aba=simulador', 'medio')}
              >
                Explorar Simulador e Trilhas
              </Botao>
            </div>
          </Card>

          {/* Passo 3 */}
          <Card variant="destaque" className="relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-gp-sm bg-gp-lilas-claro text-gp-roxo-escuro font-extrabold text-sm">
                Passo 03
              </span>
              <Users className="w-6 h-6 text-gp-ciano" />
            </div>
            <h3 className="gp-h3 text-gp-branco">
              Painel do Professor 100% Anônimo
            </h3>
            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              O educador cria turmas, atribui atividades e acompanha métricas coletivas e anônimas (ex.: <em>&ldquo;80% da turma aprendeu a não expor dados de geolocalização&rdquo;</em>), sem jamais expor conversas individuais.
            </p>
            <div className="pt-2">
              <Botao
                variant="fantasma"
                size="sm"
                fullWidth
                onClick={() => entrarDiretoComo('professor', '/professor')}
              >
                Acessar Painel do Professor
              </Botao>
            </div>
          </Card>
        </div>
      </section>

      {/* SEÇÃO 3: PARA QUEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="roxo">Ecossistema B2B2C</Badge>
          <h2 className="gp-h2 text-gp-branco">
            <Destaque>Para quem</Destaque> o Guardian Prompt foi desenhado
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="space-y-3">
            <School className="w-8 h-8 text-gp-ciano" />
            <h3 className="text-lg font-extrabold text-gp-branco">Escolas Privadas</h3>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Diferencial pedagógico de inovação segura, alinhado à BNCC Computação e às demandas das famílias por uso ético de IA.
            </p>
          </Card>

          <Card className="space-y-3">
            <Users className="w-8 h-8 text-gp-roxo" />
            <h3 className="text-lg font-extrabold text-gp-branco">Redes de Ensino</h3>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Visão executiva e comparativa entre unidades escolares, com baixíssimo custo operacional por rodar localmente nos dispositivos.
            </p>
          </Card>

          <Card className="space-y-3">
            <BookOpen className="w-8 h-8 text-gp-sucesso" />
            <h3 className="text-lg font-extrabold text-gp-branco">Educadores</h3>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Roteiros de aula prontos de 50 minutos, atividades guiadas e métricas claras para trabalhar cidadania digital em qualquer disciplina.
            </p>
          </Card>

          <Card className="space-y-3">
            <HeartHandshake className="w-8 h-8 text-gp-atencao" />
            <h3 className="text-lg font-extrabold text-gp-branco">Famílias & Alunos</h3>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Tranquilidade para os responsáveis e autonomia gamificada para crianças e adolescentes navegarem no mundo digital sem armadilhas.
            </p>
          </Card>
        </div>
      </section>

      {/* SEÇÃO 4: ÉTICA E CONFORMIDADE */}
      <section
        id="etica"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Card variant="ciano" padding="lg" className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="sucesso">Privacidade por Design (Privacy by Design)</Badge>
              <h2 className="gp-h2 text-gp-branco">
                <Destaque>Ética e conformidade</Destaque> legal em primeiro lugar
              </h2>
              <p className="text-gp-lilas-claro text-sm sm:text-base leading-relaxed">
                Para ensinar proteção de dados, uma plataforma escolar precisa dar o exemplo. O Guardian Prompt opera sob os princípios de minimização de dados e processamento local:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-gp-sucesso font-bold text-sm">
                    <Lock className="w-4 h-4" />
                    <span>LGPD (Lei nº 13.709/2018)</span>
                  </div>
                  <p className="text-xs text-gp-lilas-claro">
                    Art. 14 (Melhor interesse de crianças e adolescentes): nenhum dado pessoal real é coletado. Métricas docentes são 100% anonimizadas.
                  </p>
                </div>

                <div className="p-4 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-gp-ciano font-bold text-sm">
                    <Scale className="w-4 h-4" />
                    <span>Marco Civil & ECA</span>
                  </div>
                  <p className="text-xs text-gp-lilas-claro">
                    Alinhado ao Art. 26 do Marco Civil da Internet (Lei nº 12.965/2014) para capacitação em uso seguro, consciente e responsável da rede.
                  </p>
                </div>

                <div className="p-4 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-gp-lilas-claro font-bold text-sm">
                    <Cpu className="w-4 h-4 text-gp-roxo" />
                    <span>Auditor 100% Local</span>
                  </div>
                  <p className="text-xs text-gp-lilas-claro">
                    O filtro de prompts roda direto no navegador do aluno via regras algorítmicas, sem enviar textos sensíveis para APIs externas.
                  </p>
                </div>

                <div className="p-4 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-gp-atencao font-bold text-sm">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Pedagogia Não-Punitiva</span>
                  </div>
                  <p className="text-xs text-gp-lilas-claro">
                    Sem vigilância invasiva nem bloqueios assustadores: cada alerta explica o motivo e orienta como reformular com autonomia.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-gp-lg bg-gp-roxo-escuro border border-gp-lilas/40 space-y-4 text-center">
              <ShieldCheck className="w-16 h-16 text-gp-sucesso" />
              <h3 className="text-xl font-extrabold text-gp-branco">
                Selo Escola Protegida LGPD
              </h3>
              <p className="text-xs sm:text-sm text-gp-lilas-claro">
                Todas as telas do Professor e do Gestor exibem apenas indicadores coletivos da turma. Nenhum estudante é exposto individualmente em relatórios.
              </p>
              <Link
                to="/identidade"
                className="inline-flex items-center gap-2 text-xs font-bold text-gp-ciano hover:underline"
              >
                <Palette className="w-4 h-4" />
                <span>Consultar diretrizes completas de tom e ética no Guia de Marca</span>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* SEÇÃO 5: PLANOS B2B (EXEMPLO FICTÍCIO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-3">
            <Badge variant="lilas">Modelo de Sustentabilidade SaaS B2B2C</Badge>
            <h2 className="gp-h2 text-gp-branco">
              <Destaque>Planos para escolas</Destaque> e redes de ensino
            </h2>
            <p className="text-gp-lilas-claro text-sm sm:text-base">
              *Valores fictícios meramente ilustrativos para demonstração de viabilidade econômica no Hackathon TeenTech 2026.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Plano 1 */}
          <Card className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Badge variant="ciano">Exemplo • Piloto Escolar</Badge>
              <h3 className="text-xl font-extrabold text-gp-branco">Escola Inicial</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gp-ciano">R$ 490</span>
                <span className="text-xs text-gp-lilas-claro">/mês (valor fictício)</span>
              </div>
              <p className="text-xs text-gp-lilas-claro">
                Ideal para escolas em fase de implantação da disciplina de Cidadania Digital e IA.
              </p>
              <ul className="space-y-2.5 pt-3 text-xs sm:text-sm text-gp-lilas-claro">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Até 200 estudantes (acesso anônimo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Laboratório de Prompts com Auditor Local</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Trilhas Ensino Fundamental e Médio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Painel do Professor + Guia Pedagógico</span>
                </li>
              </ul>
            </div>
            <Botao
              variant="fantasma"
              fullWidth
              onClick={() => navigate('/entrar')}
            >
              Testar na Demo
            </Botao>
          </Card>

          {/* Plano 2 (Destaque) */}
          <Card variant="destaque" className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="roxo">Mais Escolhido (Exemplo)</Badge>
                <span className="text-xs font-bold text-gp-ciano">B2B Escolar</span>
              </div>
              <h3 className="text-xl font-extrabold text-gp-branco">Escola Completa</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gp-ciano">R$ 1.290</span>
                <span className="text-xs text-gp-lilas-claro">/mês (valor fictício)</span>
              </div>
              <p className="text-xs text-gp-lilas-claro">
                Para instituições com múltiplas turmas de Fundamental II e Ensino Médio.
              </p>
              <ul className="space-y-2.5 pt-3 text-xs sm:text-sm text-gp-lilas-claro">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Até 1.000 estudantes e turmas ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Simulador completo (Deepfake, Fontes, LGPD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Painel do Gestor Escolar com comparativo anônimo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Formação docente e relatórios LGPD exportáveis</span>
                </li>
              </ul>
            </div>
            <Botao
              variant="secundario"
              fullWidth
              onClick={() => navigate('/entrar')}
            >
              Experimentar Fluxo Completo
            </Botao>
          </Card>

          {/* Plano 3 */}
          <Card className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Badge variant="sucesso">Redes Públicas & Grupos</Badge>
              <h3 className="text-xl font-extrabold text-gp-branco">Rede de Ensino</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-gp-ciano">Sob consulta</span>
                <span className="text-xs text-gp-lilas-claro">(licença por rede)</span>
              </div>
              <p className="text-xs text-gp-lilas-claro">
                Para Secretarias de Educação e grupos educacionais com dezenas de unidades.
              </p>
              <ul className="space-y-2.5 pt-3 text-xs sm:text-sm text-gp-lilas-claro">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Painel consolidado multi-escolas 100% anônimo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Customização de regras regionais no Auditor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Operação leve (baixo consumo de banda e servidor)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                  <span>Material didático alinhado ao MEC e BNCC</span>
                </li>
              </ul>
            </div>
            <Botao
              variant="primario"
              fullWidth
              onClick={() => {
                setDemoSolicitada(false);
                setModalDemoB2B(true);
              }}
            >
              Solicitar apresentação
            </Botao>
          </Card>
        </div>
      </section>

      {/* Modal Simulado de Solicitação de Demonstração B2B */}
      {modalDemoB2B && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gp-roxo-escuro/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-demo-titulo"
        >
          <Card variant="destaque" className="max-w-lg w-full space-y-5 relative">
            <button
              type="button"
              onClick={() => setModalDemoB2B(false)}
              aria-label="Fechar janela"
              className="absolute top-4 right-4 p-2 rounded-gp-sm bg-gp-lilas-claro/10 text-gp-lilas-claro hover:text-gp-ciano"
            >
              <X className="w-5 h-5" />
            </button>

            <Badge variant="ciano">Simulação Comercial B2B • Sem coleta de dados reais</Badge>
            <h3 id="modal-demo-titulo" className="gp-h3 text-gp-branco">
              Leve o <Destaque>Guardian Prompt</Destaque> para sua instituição
            </h3>

            {demoSolicitada ? (
              <div className="p-5 rounded-gp-md bg-gp-sucesso/15 border border-gp-sucesso space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-gp-sucesso mx-auto" />
                <h4 className="font-bold text-gp-branco text-lg">
                  Demonstração simulada registrada!
                </h4>
                <p className="text-xs sm:text-sm text-gp-lilas-claro">
                  Como este ambiente segue a LGPD e é um protótipo de Hackathon, nenhum dado real foi enviado. Você já pode explorar todos os perfis da plataforma agora mesmo!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Botao
                    variant="secundario"
                    onClick={() => {
                      setModalDemoB2B(false);
                      navigate('/entrar');
                    }}
                  >
                    Ir para a Demo Completa
                  </Botao>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSolicitada(true);
                }}
                className="space-y-4"
              >
                <p className="text-xs text-gp-lilas-claro">
                  Formulário pré-preenchido com dados fictícios para proteger sua privacidade:
                </p>
                <div>
                  <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                    Instituição de Ensino (Fictícia)
                  </label>
                  <input
                    type="text"
                    defaultValue="Colégio Estadual Inovação Segura"
                    className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                      Segmento Principal
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano">
                      <option>Ensino Fundamental II & Médio</option>
                      <option>Apenas Ensino Fundamental</option>
                      <option>Apenas Ensino Médio</option>
                      <option>Rede Municipal / Estadual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gp-lilas-claro mb-1">
                      Nº Estimado de Alunos
                    </label>
                    <input
                      type="text"
                      defaultValue="450 estudantes"
                      className="w-full px-3.5 py-2.5 rounded-gp-sm bg-gp-roxo-escuro border border-gp-lilas/40 text-gp-branco text-sm focus:outline-none focus:border-gp-ciano"
                    />
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap justify-end gap-3">
                  <Botao
                    type="button"
                    variant="fantasma"
                    onClick={() => setModalDemoB2B(false)}
                  >
                    Cancelar
                  </Botao>
                  <Botao type="submit" variant="secundario">
                    Simular Solicitação de Piloto
                  </Botao>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
