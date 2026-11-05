import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  BrainCircuit,
  Compass,
  School,
  Building2,
  GraduationCap,
  Users,
  ShieldCheck,
  Scale,
  Heart,
  EyeOff,
  Cpu,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Destaque,
  Botao,
  Card,
  PadraoBlocos,
} from '@/components/brand';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalDemoB2B, setModalDemoB2B] = useState(false);
  const [demoSolicitada, setDemoSolicitada] = useState(false);

  return (
    <div className="space-y-20 pb-8">
      {/* HERO EM ROXO ESCURO (#3F2757) FIEL À TELA 1 */}
      <section className="bg-[#3F2757] text-white py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/5 border border-[#AF81E9]/40 text-[#D9CBE7] text-[11px] font-bold tracking-wider uppercase">
              HACKATHON TEENTECH 2026 • PREVENÇÃO À VIOLÊNCIA
            </div>

            <h1 className="gp-h1 text-white">
              <Destaque tone="claro">IA na escola,</Destaque>{' '}
              <span>com proteção e pensamento crítico.</span>
            </h1>

            <p className="text-[#D9CBE7] text-sm sm:text-base max-w-lg leading-relaxed">
              O Guardian Prompt ensina estudantes a conversar com a Inteligência Artificial sem expor dados e sem terceirizar o próprio pensamento.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Botao
                variant="primario"
                size="lg"
                onClick={() => navigate('/entrar')}
              >
                Entrar na demo
              </Botao>
              <Botao
                variant="secundario"
                size="lg"
                onClick={() => {
                  setDemoSolicitada(false);
                  setModalDemoB2B(true);
                }}
              >
                Solicitar demonstração
              </Botao>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PadraoBlocos variant="hero" className="w-72 sm:w-80 h-auto" />
          </div>
        </div>
      </section>

      {/* SEÇÃO: O PROBLEMA */}
      <section id="problema" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9847EE] dark:text-[#AF81E9]">
            O PROBLEMA
          </span>
          <h2 className="gp-h2 gp-text-primary">
            <Destaque>A IA chegou à sala de aula</Destaque> antes da educação para usá-la.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#9847EE]/10 flex items-center justify-center text-[#9847EE]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold gp-text-primary">
              Dados pessoais expostos
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              Estudantes compartilham nome completo, escola, bairro, rotina de horários e desabafos íntimos com IAs generativas sem perceber os riscos de vazamento.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3CC7E8]/15 flex items-center justify-center text-[#0E7490] dark:text-[#3CC7E8]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold gp-text-primary">
              Cérebro no piloto automático
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              Quando o aluno pede o trabalho pronto, a IA vira uma muleta cognitiva que substitui a leitura, a escrita autoral e o pensamento crítico.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#AF81E9]/20 flex items-center justify-center text-[#7B2CBF] dark:text-[#D9CBE7]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold gp-text-primary">
              Escola sem mapa pedagógico
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              Educadores precisam de uma ferramenta formativa com métricas agregadas e anônimas para orientar a turma sem vigiar conversas individuais.
            </p>
          </Card>
        </div>
      </section>

      {/* SEÇÃO: COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9847EE] dark:text-[#AF81E9]">
            COMO FUNCIONA
          </span>
          <h2 className="gp-h2 gp-text-primary">
            <Destaque>Três passos</Destaque> para transformar risco em aprendizagem.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="space-y-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#9847EE] text-white font-extrabold text-xs">
              01
            </span>
            <h3 className="text-base font-extrabold gp-text-primary">
              Auditor de Prompts Local
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              Antes de qualquer resposta, um filtro algorítmico local analisa o prompt, calcula o Placar de Segurança (0 a 100) e sugere reformulações seguras.
            </p>
          </Card>

          <Card className="space-y-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#3CC7E8] text-[#3F2757] font-extrabold text-xs">
              02
            </span>
            <h3 className="text-base font-extrabold gp-text-primary">
              Trilhas e Simulador por Idade
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              Missões gamificadas para Ensino Fundamental e Médio sobre vazamento de dados, deepfakes, verificação de fontes e cidadania digital.
            </p>
          </Card>

          <Card className="space-y-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#3F2757] text-white font-extrabold text-xs">
              03
            </span>
            <h3 className="text-base font-extrabold gp-text-primary">
              Painel do Professor Anônimo
            </h3>
            <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
              O educador cria turmas, atribui atividades e acompanha métricas 100% agregadas e anônimas em conformidade com a LGPD.
            </p>
          </Card>
        </div>
      </section>

      {/* SEÇÃO: PARA QUEM (FIEL À TELA 2) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9847EE] dark:text-[#AF81E9]">
            PARA QUEM
          </span>
          <h2 className="gp-h2 gp-text-primary">
            <Destaque>Feito para</Destaque> toda a comunidade escolar.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="flex flex-col items-center justify-center text-center py-7 space-y-2.5">
            <School className="w-7 h-7 text-[#9847EE]" strokeWidth={1.75} />
            <h3 className="text-sm font-extrabold gp-text-primary">Escolas</h3>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center py-7 space-y-2.5">
            <Building2 className="w-7 h-7 text-[#9847EE]" strokeWidth={1.75} />
            <h3 className="text-sm font-extrabold gp-text-primary">Redes de ensino</h3>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center py-7 space-y-2.5">
            <GraduationCap className="w-7 h-7 text-[#9847EE]" strokeWidth={1.75} />
            <h3 className="text-sm font-extrabold gp-text-primary">Educadores</h3>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center py-7 space-y-2.5">
            <Users className="w-7 h-7 text-[#9847EE]" strokeWidth={1.75} />
            <h3 className="text-sm font-extrabold gp-text-primary">Famílias</h3>
          </Card>
        </div>
      </section>

      {/* SEÇÃO: ÉTICA E CONFORMIDADE (FIEL À TELA 2) */}
      <section id="etica" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9847EE] dark:text-[#AF81E9]">
            ÉTICA E CONFORMIDADE
          </span>
          <h2 className="gp-h2 gp-text-primary">
            <Destaque>Proteção</Destaque> desde a primeira linha de código.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card padding="sm" className="space-y-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-extrabold gp-text-primary">LGPD</h3>
            <p className="text-xs gp-text-secondary leading-relaxed">
              Lei 13.709/2018: minimização de dados e métricas sempre agregadas.
            </p>
          </Card>

          <Card padding="sm" className="space-y-2.5">
            <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-extrabold gp-text-primary">Marco Civil</h3>
            <p className="text-xs gp-text-secondary leading-relaxed">
              Lei 12.965/2014: privacidade e uso responsável da internet.
            </p>
          </Card>

          <Card padding="sm" className="space-y-2.5">
            <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-extrabold gp-text-primary">ECA</h3>
            <p className="text-xs gp-text-secondary leading-relaxed">
              Proteção integral de crianças e adolescentes também no digital.
            </p>
          </Card>

          <Card padding="sm" className="space-y-2.5">
            <EyeOff className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-extrabold gp-text-primary">Sem dados reais</h3>
            <p className="text-xs gp-text-secondary leading-relaxed">
              O protótipo usa apenas perfis fictícios, como &ldquo;Aluno 01&rdquo;.
            </p>
          </Card>

          <Card padding="sm" className="space-y-2.5">
            <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-extrabold gp-text-primary">Processamento local</h3>
            <p className="text-xs gp-text-secondary leading-relaxed">
              O Auditor roda no navegador, sem enviar texto a IAs externas.
            </p>
          </Card>
        </div>
      </section>

      {/* SEÇÃO: PLANOS B2B (FIEL ÀS TELAS 3 & 4) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9847EE] dark:text-[#AF81E9]">
            PLANOS B2B
          </span>
          <h2 className="gp-h2 gp-text-primary">
            <Destaque>Planos</Destaque> para cada realidade escolar.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Escola */}
          <Card className="space-y-4">
            <div>
              <h3 className="text-sm font-extrabold gp-text-primary">Escola</h3>
              <p className="text-2xl sm:text-3xl font-extrabold gp-text-primary mt-1">
                R$ 9
              </p>
              <span className="text-xs gp-text-secondary">por aluno/mês</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm gp-text-secondary pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Laboratório + Auditor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Trilhas por idade</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Painel do Professor</span>
              </li>
            </ul>
          </Card>

          {/* Rede (Destaque com borda ciano refinada) */}
          <Card
            variant="destaque"
            className="space-y-4 border-[#1AA3C4] dark:border-[#3CC7E8]"
          >
            <div>
              <h3 className="text-sm font-extrabold gp-text-primary">Rede</h3>
              <p className="text-2xl sm:text-3xl font-extrabold gp-text-primary mt-1">
                R$ 7
              </p>
              <span className="text-xs gp-text-secondary">por aluno/mês</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm gp-text-secondary pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tudo do plano Escola</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Painel do Gestor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Formação docente</span>
              </li>
            </ul>
          </Card>

          {/* Pública */}
          <Card className="space-y-4">
            <div>
              <h3 className="text-sm font-extrabold gp-text-primary">Pública</h3>
              <p className="text-2xl sm:text-3xl font-extrabold gp-text-primary mt-1">
                Sob consulta
              </p>
              <span className="text-xs gp-text-secondary">convênios</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm gp-text-secondary pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Condições para redes públicas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Implantação assistida</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Relatórios para secretarias</span>
              </li>
            </ul>
          </Card>
        </div>

        <p className="text-[11px] gp-text-secondary">
          * Valores fictícios, apenas como exemplo.
        </p>

        {/* Banner Roxo CTA Final (Fiel às Telas 3 & 4) */}
        <div className="pt-8">
          <div className="rounded-2xl bg-[#9847EE] px-7 py-6 sm:px-10 sm:py-7 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base sm:text-xl font-extrabold">
              Pronto para ver o Guardian Prompt em ação?
            </h3>
            <Botao
              variant="secundario"
              size="md"
              onClick={() => navigate('/entrar')}
            >
              Entrar na demo
            </Botao>
          </div>
        </div>
      </section>

      {/* Modal de Solicitação de Demonstração */}
      {modalDemoB2B && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F2757]/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-demo-titulo"
        >
          <Card className="max-w-md w-full space-y-4 relative">
            <button
              type="button"
              onClick={() => setModalDemoB2B(false)}
              aria-label="Fechar janela"
              className="absolute top-4 right-4 p-1.5 rounded-lg gp-subtle-surface gp-text-secondary hover:gp-text-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#9847EE]">
              <Sparkles className="w-4 h-4" />
              <span>Simulação B2B • Sem coleta de dados reais</span>
            </div>

            <h3 id="modal-demo-titulo" className="text-lg font-extrabold gp-text-primary">
              Solicitar demonstração para sua escola
            </h3>

            {demoSolicitada ? (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs sm:text-sm gp-text-primary font-semibold">
                  Solicitação simulada registrada! Nenhum dado real foi coletado (LGPD).
                </p>
                <Botao
                  variant="primario"
                  size="sm"
                  onClick={() => {
                    setModalDemoB2B(false);
                    navigate('/entrar');
                  }}
                >
                  Ir para a Demo Interativa
                </Botao>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSolicitada(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold gp-text-secondary mb-1">
                    Nome da Escola (Fictício)
                  </label>
                  <input
                    type="text"
                    defaultValue="Colégio Inovação Segura"
                    className="w-full px-3.5 py-2 rounded-xl gp-subtle-surface border border-[#AF81E9]/30 gp-text-primary text-sm focus:outline-none focus:border-[#9847EE]"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Botao
                    type="button"
                    variant="fantasma"
                    size="sm"
                    onClick={() => setModalDemoB2B(false)}
                  >
                    Cancelar
                  </Botao>
                  <Botao type="submit" variant="primario" size="sm">
                    Enviar simulação
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
