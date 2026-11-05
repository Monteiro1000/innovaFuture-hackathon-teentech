import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Search,
  Lock,
  Award,
  ChevronRight,
  Wand2,
  CheckCircle2,
  User,
} from 'lucide-react';
import {
  Card,
  Badge,
  Botao,
  BarraProgresso,
  AlertaAuditor,
  LogoGuardianPrompt,
} from '@/components/brand';
import { ATIVIDADES_LABORATORIO } from '@/lib/auditorRules';
import { auditPrompt, ResultadoAuditoriaPrompt } from '@/lib/promptAuditor';
import { useApp } from '@/context/AppContext';

export interface PromptLabProps {
  atividadeSelecionadaId: string;
  onSelectAtividade: (id: string) => void;
  onIrParaTrilhas: () => void;
}

export const PromptLab: React.FC<PromptLabProps> = ({
  atividadeSelecionadaId,
  onSelectAtividade,
  onIrParaTrilhas,
}) => {
  const {
    faixaEtaria,
    xp,
    nivelCalculado,
    badges,
    adicionarXP,
    desbloquearBadge,
    registrarAuditoriaAluno,
  } = useApp();

  const [textoPrompt, setTextoPrompt] = useState<string>('');
  const [ultimaAuditoria, setUltimaAuditoria] =
    useState<ResultadoAuditoriaPrompt | null>(null);
  const [respostaLiberada, setRespostaLiberada] = useState<string | null>(null);

  const atividadeAtual =
    ATIVIDADES_LABORATORIO.find((a) => a.id === atividadeSelecionadaId) ||
    ATIVIDADES_LABORATORIO[0];

  const executarAuditoria = (textoParaAnalisar: string) => {
    const texto =
      textoParaAnalisar.trim() ||
      'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo';

    if (!textoParaAnalisar.trim()) {
      setTextoPrompt(texto);
    }

    const resultado = auditPrompt(texto, faixaEtaria, atividadeAtual.id);
    setUltimaAuditoria(resultado);

    registrarAuditoriaAluno(
      resultado.teveDadosSensiveis,
      resultado.tevePlagio,
      resultado.aprovado
    );

    if (resultado.aprovado) {
      const resposta =
        faixaEtaria === 'fundamental'
          ? atividadeAtual.respostaSimuladaFundamental
          : atividadeAtual.respostaSimuladaMedio;
      setRespostaLiberada(resposta);
      adicionarXP(20, 'Prompt seguro enviado no Laboratório!');
      desbloquearBadge('guardiao-dados');
      desbloquearBadge('pensador-critico');
    } else {
      setRespostaLiberada(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executarAuditoria(textoPrompt);
  };

  const aplicarSugestaoReformulacao = (sugestao: string) => {
    setTextoPrompt(sugestao);
    executarAuditoria(sugestao);
  };

  const xpProgressoBarra = Math.min(100, Math.round(((xp % 100) / 100) * 100)) || 65;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* COLUNA ESQUERDA (8 colunas) FIEL ÀS TELAS 6 & 7 */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="space-y-5">
          {/* Topo: Pílula de XP + Seletor de Temas */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9CBE7]/70 dark:bg-[#9847EE]/25 text-[#3F2757] dark:text-[#D9CBE7] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#9847EE] dark:text-[#3CC7E8]" />
              <span>+20 XP por prompt seguro</span>
            </span>

            <div className="flex items-center gap-1.5">
              {ATIVIDADES_LABORATORIO.map((ativ) => (
                <button
                  key={ativ.id}
                  type="button"
                  onClick={() => {
                    onSelectAtividade(ativ.id);
                    setUltimaAuditoria(null);
                    setRespostaLiberada(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold gp-transition ${
                    atividadeAtual.id === ativ.id
                      ? 'bg-[#9847EE] text-white'
                      : 'gp-subtle-surface gp-text-secondary hover:gp-text-primary'
                  }`}
                >
                  {ativ.id === 'ciclo-da-agua'
                    ? 'Ciclo da Água'
                    : ativ.id === 'ecossistemas-brasileiros'
                    ? 'Biomas'
                    : 'Redação & Ética'}
                </button>
              ))}
            </div>
          </div>

          {/* Box Dica do Dia com barra lateral ciano */}
          <div className="p-4 rounded-xl bg-[#F3EDF9] dark:bg-[#342049] border-l-4 border-l-[#3CC7E8] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold gp-text-primary">
              <Lightbulb className="w-4 h-4 text-[#1AA3C4] dark:text-[#3CC7E8]" />
              <span>Dica do dia</span>
            </div>
            <p className="text-xs sm:text-sm gp-text-secondary">
              Peça explicações, exemplos e roteiros — não respostas prontas para entregar.
            </p>
          </div>

          {/* Campo do Prompt */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="campo-prompt-aluno"
                className="block text-xs sm:text-sm font-extrabold gp-text-primary"
              >
                Seu prompt
              </label>
              <textarea
                id="campo-prompt-aluno"
                rows={4}
                value={textoPrompt}
                onChange={(e) => setTextoPrompt(e.target.value)}
                placeholder="Ex.: Crie um roteiro com tópicos para eu pesquisar sobre o Ciclo da Água."
                className="w-full p-4 rounded-xl bg-white dark:bg-[#221432] border border-[#D9CBE7] dark:border-[#AF81E9]/35 focus:border-[#9847EE] focus:outline-none gp-text-primary text-sm placeholder:gp-text-secondary/60 leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const demoText =
                      'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo';
                    setTextoPrompt(demoText);
                    executarAuditoria(demoText);
                  }}
                  className="text-xs font-extrabold text-[#3F2757] dark:text-[#D9CBE7] underline underline-offset-4 hover:text-[#9847EE]"
                >
                  Usar exemplo de teste
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const emoText =
                      'Estou muito triste e sozinho na escola, ninguém gosta de mim, quero contar um segredo íntimo';
                    setTextoPrompt(emoText);
                    executarAuditoria(emoText);
                  }}
                  className="text-xs font-semibold gp-text-secondary hover:text-[#9847EE]"
                >
                  • Testar desabafo
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#AF81E9] hover:bg-[#9847EE] text-white font-bold text-xs sm:text-sm gp-transition shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Auditar antes de enviar</span>
              </button>
            </div>
          </form>
        </Card>

        {/* Resultado da Auditoria Local */}
        {ultimaAuditoria && (
          <div className="space-y-4" aria-live="polite">
            {/* Placar de Segurança 0 a 100 */}
            <Card className="space-y-4">
              <BarraProgresso
                valor={ultimaAuditoria.placarSeguranca}
                maximo={100}
                tipo="seguranca"
                label="Placar de Segurança do Prompt"
                sublabel={
                  ultimaAuditoria.aprovado
                    ? 'Nenhum dado pessoal exposto e foco em pesquisa autoral.'
                    : 'Reformule seu comando com a sugestão abaixo para atingir 100/100 e liberar a resposta.'
                }
              />

              {ultimaAuditoria.descontos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {ultimaAuditoria.descontos.map((d) => (
                    <span
                      key={d.id}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/12 text-amber-800 dark:text-amber-300 border border-amber-500/25"
                    >
                      -{d.pontos} pts: {d.motivo}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            {/* Cards de Alerta do Auditor */}
            {ultimaAuditoria.alertas.map((alerta, idx) => (
              <AlertaAuditor
                key={`${alerta.tipo}-${idx}`}
                tipo={alerta.tipo}
                titulo={alerta.titulo}
                mensagem={alerta.mensagem}
                trechosDestacados={alerta.trechosDestacados}
                sugestaoReformulacao={alerta.sugestaoReformulacao}
                descontoPontos={alerta.descontoPontos}
                onAplicarSugestao={
                  alerta.sugestaoReformulacao
                    ? (sug) => aplicarSugestaoReformulacao(sug)
                    : undefined
                }
              />
            ))}

            {/* Resposta Simulada da IA (Liberada quando seguro) */}
            {respostaLiberada && (
              <Card className="space-y-4 border-[#3CC7E8]/60">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <LogoGuardianPrompt variant="icone" tone="claro" size={28} />
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#1AA3C4] dark:text-[#3CC7E8] block">
                        Assistente Escolar Guardian (Resposta Liberada)
                      </span>
                      <span className="text-xs gp-text-secondary">
                        Trilha {faixaEtaria === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'}
                      </span>
                    </div>
                  </div>
                  <Badge variant="sucesso">+20 XP</Badge>
                </div>

                <div className="p-4 rounded-xl gp-subtle-surface text-sm gp-text-primary whitespace-pre-line leading-relaxed">
                  {respostaLiberada}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* COLUNA DIREITA (4 colunas) FIEL ÀS TELAS 6 & 7 */}
      <div className="lg:col-span-4 space-y-5">
        {/* Card Escuro: SEU PROGRESSO */}
        <Card variant="escuro" className="space-y-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#3CC7E8] block">
            SEU PROGRESSO
          </span>
          <div className="text-3xl font-extrabold text-white">{xp} XP</div>
          <p className="text-xs text-[#D9CBE7]">
            Nível {nivelCalculado} • Guardião em treino
          </p>
          <div className="pt-1">
            <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#3CC7E8] gp-transition"
                style={{ width: `${xpProgressoBarra}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Card Branco: Suas conquistas */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#9847EE]" />
            <h3 className="text-sm font-extrabold gp-text-primary">
              Suas conquistas
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm">
            {badges.slice(0, 4).map((b) => (
              <li
                key={b.id}
                className={`flex items-center gap-2.5 ${
                  b.desbloqueada
                    ? 'gp-text-primary font-semibold'
                    : 'gp-text-secondary opacity-75'
                }`}
              >
                {b.id === 'primeiro-prompt-seguro' ? (
                  <ShieldCheck className="w-4 h-4 text-[#3CC7E8] shrink-0" />
                ) : b.id === 'checador-fontes' ? (
                  <Search className="w-4 h-4 text-[#3CC7E8] shrink-0" />
                ) : b.desbloqueada ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{b.titulo}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Botão Card: Explorar trilhas */}
        <Card
          padding="sm"
          onClick={onIrParaTrilhas}
          className="cursor-pointer hover:border-[#9847EE] flex items-center justify-between"
        >
          <span className="text-xs sm:text-sm font-extrabold gp-text-primary">
            Explorar trilhas
          </span>
          <ChevronRight className="w-4 h-4 gp-text-secondary" />
        </Card>
      </div>
    </div>
  );
};

export default PromptLab;
