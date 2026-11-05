import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Bot,
  User,
  Wand2,
  HeartHandshake,
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

interface HistoricoInteracao {
  id: string;
  promptEnviado: string;
  auditoria: ResultadoAuditoriaPrompt;
  respostaLiberada?: string;
  horario: string;
}

export const PromptLab: React.FC = () => {
  const {
    faixaEtaria,
    adicionarXP,
    desbloquearBadge,
    registrarAuditoriaAluno,
  } = useApp();

  const [atividadeSelecionadaId, setAtividadeSelecionadaId] = useState<string>(
    ATIVIDADES_LABORATORIO[0].id
  );
  const [textoPrompt, setTextoPrompt] = useState<string>(
    'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo'
  );
  const [ultimaAuditoria, setUltimaAuditoria] =
    useState<ResultadoAuditoriaPrompt | null>(null);
  const [historico, setHistorico] = useState<HistoricoInteracao[]>([]);
  const [teveReformulacaoPendente, setTeveReformulacaoPendente] =
    useState<boolean>(false);

  const atividadeAtual =
    ATIVIDADES_LABORATORIO.find((a) => a.id === atividadeSelecionadaId) ||
    ATIVIDADES_LABORATORIO[0];

  const executarAuditoriaEEnvio = (textoParaAnalisar: string) => {
    const texto = textoParaAnalisar.trim();
    if (!texto) return;

    const resultado = auditPrompt(texto, faixaEtaria, atividadeAtual.id);
    setUltimaAuditoria(resultado);

    registrarAuditoriaAluno(
      resultado.teveDadosSensiveis,
      resultado.tevePlagio,
      resultado.aprovado
    );

    let respostaIA: string | undefined;
    if (resultado.aprovado) {
      respostaIA =
        faixaEtaria === 'fundamental'
          ? atividadeAtual.respostaSimuladaFundamental
          : atividadeAtual.respostaSimuladaMedio;

      adicionarXP(
        50,
        teveReformulacaoPendente
          ? 'Prompt reformulado com segurança e pensamento crítico!'
          : 'Prompt 100% seguro no Laboratório!'
      );
      desbloquearBadge('guardiao-dados');
      desbloquearBadge('pensador-critico');
      setTeveReformulacaoPendente(false);
    } else {
      setTeveReformulacaoPendente(true);
    }

    const novaInteracao: HistoricoInteracao = {
      id: `msg-${Date.now()}`,
      promptEnviado: texto,
      auditoria: resultado,
      respostaLiberada: respostaIA,
      horario: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setHistorico((prev) => [novaInteracao, ...prev]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executarAuditoriaEEnvio(textoPrompt);
  };

  const aplicarSugestaoNoCampo = (sugestao: string) => {
    setTextoPrompt(sugestao);
    setTeveReformulacaoPendente(true);
    // Rola suavemente para a caixa de texto para o aluno ver a reformulação e poder reenviar
    const inputEl = document.getElementById('campo-prompt-aluno');
    inputEl?.focus();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* COLUNA ESQUERDA (8 colunas): Atividade Escolar + Chat + Entrada do Prompt */}
      <div className="lg:col-span-8 space-y-6">
        {/* Card da Atividade Proposta no Topo */}
        <Card variant="destaque" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gp-ciano" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-gp-ciano">
                Atividade Escolar Proposta ({atividadeAtual.disciplina})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {ATIVIDADES_LABORATORIO.map((ativ) => (
                <button
                  key={ativ.id}
                  type="button"
                  onClick={() => {
                    setAtividadeSelecionadaId(ativ.id);
                    setTextoPrompt(ativ.promptRiscoDemo);
                    setUltimaAuditoria(null);
                  }}
                  className={`px-2.5 py-1 rounded-gp-sm text-xs font-bold gp-transition ${
                    atividadeAtual.id === ativ.id
                      ? 'bg-gp-ciano text-gp-roxo-escuro'
                      : 'bg-gp-lilas-claro/10 text-gp-lilas-claro hover:bg-gp-lilas-claro/20'
                  }`}
                >
                  {ativ.id === 'ciclo-da-agua'
                    ? '1. Ciclo da Água'
                    : ativ.id === 'ecossistemas-brasileiros'
                    ? '2. Biomas'
                    : '3. Redação & Ética'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gp-branco">
              {atividadeAtual.titulo}
            </h2>
            <p className="text-sm text-gp-lilas-claro leading-relaxed">
              {atividadeAtual.enunciado}
            </p>
          </div>

          <div className="p-3 rounded-gp-md bg-gp-roxo-escuro/80 border border-gp-ciano/40 flex items-start gap-2.5 text-xs text-gp-lilas-claro">
            <Sparkles className="w-4 h-4 text-gp-ciano shrink-0 mt-0.5" />
            <span>
              <strong className="text-gp-ciano">Dica do Guardião:</strong>{' '}
              {atividadeAtual.dicaPedagogica}
            </span>
          </div>
        </Card>

        {/* Formulário do Laboratório de Prompts */}
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="campo-prompt-aluno"
              className="text-sm sm:text-base font-extrabold text-gp-branco flex items-center gap-2"
            >
              <Bot className="w-5 h-5 text-gp-ciano" />
              <span>Converse com o Assistente Escolar Simulado</span>
            </label>

            {/* Botões de preenchimento rápido para a demonstração */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setTextoPrompt(
                    'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo'
                  );
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-gp-sm bg-gp-atencao/20 text-gp-atencao border border-gp-atencao/40 text-xs font-bold hover:bg-gp-atencao hover:text-gp-roxo-escuro gp-transition"
                title="Preenche o prompt oficial do roteiro de demonstração"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Demo: Dados + Plágio</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTextoPrompt(
                    'Estou muito triste e sozinho na escola, ninguém gosta de mim, quero contar um segredo íntimo'
                  );
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-gp-sm bg-gp-ciano/20 text-gp-ciano border border-gp-ciano/40 text-xs font-bold hover:bg-gp-ciano hover:text-gp-roxo-escuro gp-transition"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Demo: Desabafo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTextoPrompt(atividadeAtual.promptSeguroSugerido);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-gp-sm bg-gp-sucesso/20 text-gp-sucesso border border-gp-sucesso/40 text-xs font-bold hover:bg-gp-sucesso hover:text-gp-roxo-escuro gp-transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Demo: Prompt Seguro</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              id="campo-prompt-aluno"
              rows={4}
              value={textoPrompt}
              onChange={(e) => setTextoPrompt(e.target.value)}
              placeholder="Digite aqui seu comando para o assistente virtual escolar..."
              className="w-full p-4 rounded-gp-md bg-gp-roxo-escuro border-2 border-gp-lilas/40 focus:border-gp-ciano focus:outline-none text-gp-branco text-sm sm:text-base placeholder:text-gp-lilas-claro/50 leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gp-lilas-claro flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gp-sucesso shrink-0" />
                <span>
                  Auditor local ativo: nenhum dado sai do seu navegador (LGPD).
                </span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {ultimaAuditoria && !ultimaAuditoria.aprovado && (
                  <Botao
                    type="button"
                    variant="secundario"
                    size="md"
                    iconLeft={<Wand2 className="w-4 h-4" />}
                    onClick={() => {
                      setTextoPrompt(ultimaAuditoria.sugestaoGlobalSegura);
                      executarAuditoriaEEnvio(ultimaAuditoria.sugestaoGlobalSegura);
                    }}
                  >
                    Aplicar Reformulação e Reenviar (+50 XP)
                  </Botao>
                )}

                <Botao
                  type="submit"
                  variant="primario"
                  size="md"
                  iconRight={<Send className="w-4 h-4" />}
                >
                  Enviar
                </Botao>
              </div>
            </div>
          </form>
        </Card>

        {/* Resultados da Última Auditoria (Alertas Educativos) */}
        {ultimaAuditoria && (
          <div className="space-y-4" aria-live="polite">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-gp-branco flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gp-ciano" />
                <span>Análise Educativa do Auditor de Prompts</span>
              </h3>
              <Badge variant={ultimaAuditoria.aprovado ? 'sucesso' : 'atencao'}>
                {ultimaAuditoria.aprovado
                  ? 'Prompt Aprovado • Resposta Liberada'
                  : 'Pausa Educativa • Reformulação Sugerida'}
              </Badge>
            </div>

            {ultimaAuditoria.alertas.map((alerta, index) => (
              <AlertaAuditor
                key={`${alerta.tipo}-${index}`}
                tipo={alerta.tipo}
                titulo={alerta.titulo}
                mensagem={alerta.mensagem}
                trechosDestacados={alerta.trechosDestacados}
                sugestaoReformulacao={alerta.sugestaoReformulacao}
                descontoPontos={alerta.descontoPontos}
                onAplicarSugestao={
                  alerta.sugestaoReformulacao
                    ? (sugestao) => aplicarSugestaoNoCampo(sugestao)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* Histórico de Conversa e Resposta Simulada da IA */}
        {historico.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gp-lilas-claro">
                Histórico de Tentativas no Laboratório ({historico.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  setHistorico([]);
                  setUltimaAuditoria(null);
                }}
                className="text-xs font-semibold text-gp-lilas-claro hover:text-gp-ciano inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Limpar conversa
              </button>
            </div>

            {historico.map((item) => (
              <Card key={item.id} className="space-y-4">
                {/* Mensagem do Estudante */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-gp-sm bg-gp-roxo flex items-center justify-center text-gp-branco shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs text-gp-lilas-claro">
                      <span className="font-bold text-gp-branco">
                        Estudante #01 (Você)
                      </span>
                      <span>
                        {item.horario} • Placar: {item.auditoria.placarSeguranca}/100
                      </span>
                    </div>
                    <p className="text-sm text-gp-lilas-claro bg-gp-roxo-escuro/80 p-3 rounded-gp-md border border-gp-lilas/30">
                      {item.promptEnviado}
                    </p>
                  </div>
                </div>

                {/* Resposta Simulada da IA (Apenas quando o prompt é seguro!) */}
                {item.respostaLiberada ? (
                  <div className="flex items-start gap-3 pt-2 border-t border-gp-lilas/20">
                    <div className="w-9 h-9 rounded-gp-sm bg-gp-ciano/20 border border-gp-ciano flex items-center justify-center shrink-0">
                      <LogoGuardianPrompt variant="icone" tone="claro" size={24} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-gp-ciano uppercase tracking-wider">
                          Assistente Virtual Guardian (Modo Formativo •{' '}
                          {faixaEtaria === 'fundamental'
                            ? 'Ensino Fundamental'
                            : 'Ensino Médio'}
                          )
                        </span>
                        <Badge variant="sucesso">+50 XP Conquistados</Badge>
                      </div>
                      <div className="p-4 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-ciano/40 text-sm text-gp-branco whitespace-pre-line leading-relaxed">
                        {item.respostaLiberada}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-gp-md bg-gp-atencao/10 border border-gp-atencao/40 text-xs text-gp-atencao flex items-center justify-between gap-2">
                    <span>
                      A resposta do assistente foi pausada pelo Auditor para proteger seus dados e seu aprendizado. Clique em &ldquo;Reformular meu prompt&rdquo; acima!
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* COLUNA DIREITA (4 colunas): Placar de Segurança 0 a 100 e Explicação dos Descontos */}
      <div className="lg:col-span-4 space-y-6 sticky top-24">
        <Card variant="ciano" className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gp-branco">
              Placar de Segurança do Prompt
            </h3>
            <ShieldCheck className="w-5 h-5 text-gp-ciano" />
          </div>

          <BarraProgresso
            valor={ultimaAuditoria ? ultimaAuditoria.placarSeguranca : 100}
            maximo={100}
            tipo="seguranca"
            label="Pontuação Atual"
            sublabel={
              ultimaAuditoria
                ? ultimaAuditoria.aprovado
                  ? 'Parabéns! Nenhum risco de privacidade ou plágio detectado.'
                  : 'Reescreva usando a sugestão segura para alcançar 100/100!'
                : 'Envie um prompt ao lado para ver a análise detalhada de 0 a 100.'
            }
          />

          {/* Detalhamento dos Descontos */}
          <div className="space-y-2.5 pt-2 border-t border-gp-lilas/30">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gp-ciano block">
              Detalhamento da Auditoria (0 a 100):
            </span>

            {!ultimaAuditoria ? (
              <p className="text-xs text-gp-lilas-claro">
                Clique em <strong>&ldquo;Enviar&rdquo;</strong> no formulário ao lado para testar o filtro algorítmico em tempo real.
              </p>
            ) : ultimaAuditoria.descontos.length === 0 ? (
              <div className="p-3 rounded-gp-md bg-gp-sucesso/15 border border-gp-sucesso/50 text-xs text-gp-sucesso flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero descontos! Prompt 100% seguro e ético.</span>
              </div>
            ) : (
              <ul className="space-y-2">
                {ultimaAuditoria.descontos.map((desc) => (
                  <li
                    key={desc.id}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-gp-sm bg-gp-roxo-escuro/90 border border-gp-atencao/40 text-xs"
                  >
                    <span className="text-gp-lilas-claro font-medium">
                      {desc.motivo}
                    </span>
                    <span className="font-extrabold text-gp-atencao shrink-0">
                      -{desc.pontos} pts
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Checklist educativo fixo */}
          <div className="p-3.5 rounded-gp-md bg-gp-roxo-escuro/90 border border-gp-lilas/30 space-y-2 text-xs">
            <span className="font-extrabold text-gp-branco block">
              O que o Auditor verifica localmente:
            </span>
            <ul className="space-y-1.5 text-gp-lilas-claro">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gp-ciano" />
                <span>Nome completo, e-mail, telefone e CPF</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gp-ciano" />
                <span>Nome da escola, bairro, CEP e rotina de horários</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gp-roxo" />
                <span>Pedidos de trabalho pronto / plágio integral</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gp-sucesso" />
                <span>Desabafos íntimos que pedem escuta humana</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PromptLab;
